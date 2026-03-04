import crypto from 'crypto'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const MAX_ATTEMPTS = 10
const WINDOW_SECONDS = 15 * 60 // 15-minute window

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a))
  const bufB = Buffer.from(String(b))
  if (bufA.length !== bufB.length) {
    // Run a dummy comparison to avoid leaking length timing
    crypto.timingSafeEqual(bufA, Buffer.alloc(bufA.length))
    return false
  }
  return crypto.timingSafeEqual(bufA, bufB)
}

async function checkRateLimit(ip) {
  const key = `ratelimit:login:${ip}`
  const attempts = await redis.incr(key)
  if (attempts === 1) {
    await redis.expire(key, WINDOW_SECONDS)
  }
  return attempts <= MAX_ATTEMPTS
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secret = process.env.ADMIN_SECRET
  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD

  if (!secret || !validUsername || !validPassword) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  // Rate limit by IP
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'

  const allowed = await checkRateLimit(ip)
  if (!allowed) {
    return res.status(429).json({ error: 'Too many login attempts. Try again in 15 minutes.' })
  }

  const { username, password } = req.body

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid request' })
  }

  // Always run both comparisons to avoid timing leaks
  const usernameOk = timingSafeEqual(username, validUsername)
  const passwordOk = timingSafeEqual(password, validPassword)

  if (!usernameOk || !passwordOk) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Token includes issuedAt for expiry enforcement
  const issuedAt = Date.now()
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(`${username}:${password}:${issuedAt}`)
    .digest('hex')

  return res.status(200).json({ token: `${issuedAt}:${hmac}` })
}
