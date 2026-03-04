import rateLimit from 'express-rate-limit'

// Function to verify reCAPTCHA v3 token
async function verifyRecaptcha(token) {
  const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })

  return await recaptchaResponse.json()
}

// Create a custom IP extractor for Next.js
const getIP = (req) => {
  // Get IP from Next.js headers
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection?.remoteAddress || req.socket?.remoteAddress || '0.0.0.0'
  return ip
}

// Create the rate limiter
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per window
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  // The key fix - use custom IP extraction
  keyGenerator: (req) => getIP(req),
  // Skip the internal validations that are causing errors
  validate: { trustProxy: false, xForwardedForHeader: false },
})

// Helper function to wrap API routes with rate limiting
function withRateLimit(handler) {
  return async function rateLimitedHandler(req, res) {
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

// The actual form submission handler
async function handler(req, res) {
  console.log('Received form submission request')

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get form data and reCAPTCHA token from request body
    const { name, email, country, businessType, termsAccepted, agreementAccepted, token } = req.body

    console.log('Form data received:', {
      name,
      email,
      country,
      businessType,
      termsAccepted,
      agreementAccepted,
    })

    // Validate required inputs
    if (!name || !email || !country || !businessType) {
      console.error('Missing required fields:', { name, email, country, businessType })
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Validate agreement checkboxes
    if (!termsAccepted || !agreementAccepted) {
      console.error('Terms or agreement not accepted')
      return res.status(400).json({
        error: 'You must accept both the Terms of Service and Business Collaboration Agreement',
      })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email)
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Validate reCAPTCHA token
    if (!token) {
      console.error('No reCAPTCHA token provided')
      return res.status(400).json({ error: 'reCAPTCHA verification failed' })
    }

    // Verify the reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(token)
    console.log('reCAPTCHA verification result:', recaptchaResult)

    // Check if verification was successful
    if (!recaptchaResult.success) {
      console.error('reCAPTCHA verification failed:', recaptchaResult['error-codes'])
      return res.status(400).json({ error: 'reCAPTCHA verification failed' })
    }

    // Check the score (0.0 is bot, 1.0 is human)
    if (recaptchaResult.score < 0.5) {
      console.warn('Possible bot detected with score:', recaptchaResult.score)
      return res.status(400).json({ error: 'Bot activity detected' })
    }

    // Log the action and score for monitoring
    console.log(`reCAPTCHA action: ${recaptchaResult.action}, score: ${recaptchaResult.score}`)

    // Define Google Form field IDs directly based on the form structure
    const GOOGLE_FORM_URL =
      process.env.GOOGLE_FORM_URL ||
      'https://docs.google.com/forms/d/e/1FAIpQLSfEK7ZdBZRjBw2XO1CiCCMcDsDeW-NE-ztDDdXfiKNFtUkSDg/formResponse'
    const GOOGLE_FORM_EMAIL_ID = process.env.GOOGLE_FORM_EMAIL_ID
    const GOOGLE_FORM_NAME_ID = process.env.GOOGLE_FORM_NAME_ID
    const GOOGLE_FORM_COUNTRY_ID = process.env.GOOGLE_FORM_COUNTRY_ID
    const GOOGLE_FORM_BUSINESS_TYPE_ID = process.env.GOOGLE_FORM_BUSINESS_TYPE_ID
    const GOOGLE_FORM_TERMS_ID = process.env.GOOGLE_FORM_TERMS_ID
    const GOOGLE_FORM_AGREEMENT_ID = process.env.GOOGLE_FORM_AGREEMENT_ID

    console.log('Using form URL:', GOOGLE_FORM_URL)
    console.log('Using field IDs:', {
      email: GOOGLE_FORM_EMAIL_ID,
      name: GOOGLE_FORM_NAME_ID,
      country: GOOGLE_FORM_COUNTRY_ID,
      businessType: GOOGLE_FORM_BUSINESS_TYPE_ID,
      terms: GOOGLE_FORM_TERMS_ID,
      agreement: GOOGLE_FORM_AGREEMENT_ID,
    })

    // Create form data
    const formData = new URLSearchParams()
    formData.append(GOOGLE_FORM_EMAIL_ID, email)
    formData.append(GOOGLE_FORM_NAME_ID, name)
    formData.append(GOOGLE_FORM_COUNTRY_ID, country)
    formData.append(GOOGLE_FORM_BUSINESS_TYPE_ID, businessType)

    // Add checkbox values with the correct format
    formData.append(GOOGLE_FORM_TERMS_ID, 'Yes, We agree')
    formData.append(GOOGLE_FORM_AGREEMENT_ID, 'Yes, We agree')

    // Create sentinel fields for checkboxes (if needed)
    // formData.append(GOOGLE_FORM_TERMS_ID + "_sentinel", "")
    // formData.append(GOOGLE_FORM_AGREEMENT_ID + "_sentinel", "")

    console.log('Form data being submitted:', Object.fromEntries(formData))

    // Submit to Google Forms
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0', // Some forms may check for a browser user-agent
      },
    })

    console.log('Google Forms response status:', response.status)

    // Try to get response text for debugging
    const responseText = await response.text()
    console.log('Response text (first 200 chars):', responseText.substring(0, 200))

    // Since Google Forms usually returns a redirect on success
    // we consider non-error status codes as success
    if (response.status >= 200 && response.status < 400) {
      console.log('Form submitted successfully')
      return res.status(200).json({ success: true })
    } else {
      console.error('Google Forms error:', response.status)
      return res.status(500).json({ error: 'Failed to submit to Google Forms' })
    }
  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

// Export the handler wrapped with rate limiting
export default withRateLimit(handler)
