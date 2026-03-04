import crypto from 'crypto'

function generateToken(username, password) {
  const secret = process.env.ADMIN_SECRET || 'fallback-secret-change-me'
  return crypto.createHmac('sha256', secret).update(`${username}:${password}`).digest('hex')
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { username, password } = req.body

  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD

  if (!validUsername || !validPassword) {
    return res.status(500).json({ error: 'Admin credentials not configured' })
  }

  if (username !== validUsername || password !== validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = generateToken(username, password)
  return res.status(200).json({ token })
}
