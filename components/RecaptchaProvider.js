import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function RecaptchaV3Provider({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
