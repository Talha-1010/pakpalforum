import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per window
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Helper function to wrap API routes with rate limiting
export function withRateLimit(handler) {
  return async function rateLimit(req, res) {
    return new Promise((resolve, reject) => {
      rateLimiter(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(handler(req, res))
      })
    })
  }
}
