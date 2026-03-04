import crypto from 'crypto'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

function verifyToken(token) {
  const secret = process.env.ADMIN_SECRET || 'fallback-secret-change-me'
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`)
    .digest('hex')
  return token === expected
}

export default async function handler(req, res) {
  const token = req.headers['x-admin-token']

  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const data = (await redis.get('announcement')) || { active: false, text: '', type: 'info', updatedAt: '' }
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { text, active, type, publishKey } = req.body

    const expectedKey = process.env.ADMIN_PUBLISH_KEY
    if (!expectedKey || publishKey !== expectedKey) {
      return res.status(403).json({ error: 'Invalid publish key' })
    }

    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid announcement text' })
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
