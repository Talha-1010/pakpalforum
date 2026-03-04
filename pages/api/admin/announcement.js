import crypto from 'crypto'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const MAX_TEXT_LENGTH = 500

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a))
  const bufB = Buffer.from(String(b))
  if (bufA.length !== bufB.length) {
    crypto.timingSafeEqual(bufA, Buffer.alloc(bufA.length))
    return false
  }
  return crypto.timingSafeEqual(bufA, bufB)
}

function verifyToken(token) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false

  const colonIdx = token.indexOf(':')
  if (colonIdx === -1) return false

  const issuedAt = token.slice(0, colonIdx)
  const hmac = token.slice(colonIdx + 1)
  if (!issuedAt || !hmac) return false

  const age = Date.now() - parseInt(issuedAt, 10)
  if (isNaN(age) || age < 0 || age > TOKEN_MAX_AGE_MS) return false

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}:${issuedAt}`)
    .digest('hex')

  return timingSafeEqual(hmac, expected)
}

export default async function handler(req, res) {
  if (!process.env.ADMIN_SECRET) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const token = req.headers['x-admin-token']
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const data = (await redis.get('announcement')) || {
      active: false,
      text: '',
      type: 'info',
      updatedAt: '',
    }
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { text, active, type, publishKey } = req.body

    const expectedKey = process.env.ADMIN_PUBLISH_KEY
    if (!expectedKey || !timingSafeEqual(String(publishKey ?? ''), expectedKey)) {
      return res.status(403).json({ error: 'Invalid publish key' })
    }

    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid announcement text' })
    }

    if (text.trim().length > MAX_TEXT_LENGTH) {
      return res.status(400).json({ error: `Text must be ${MAX_TEXT_LENGTH} characters or fewer` })
    }

    const data = {
      active: Boolean(active),
      text: text.trim(),
      type: ['info', 'warning', 'urgent'].includes(type) ? type : 'info',
      updatedAt: new Date().toISOString(),
    }

    await redis.set('announcement', data)
    return res.status(200).json({ success: true, data })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
