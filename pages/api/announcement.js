import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const DEFAULT = { active: false, text: '', type: 'info', updatedAt: '' }

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const data = (await redis.get('announcement')) || DEFAULT
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')
    return res.status(200).json(data)
  } catch {
    return res.status(200).json(DEFAULT)
  }
}
