import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@fontsource-variable/inter'
import '../styles/global.css'
import 'lenis/dist/lenis.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET
import { ParallaxProvider } from 'react-scroll-parallax'
import { appWithTranslation } from 'next-i18next'
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent'
import Link from 'next/link'
import RecaptchaV3Provider from '@/components/RecaptchaProvider'
import { useEffect } from 'react'

function App({ Component, pageProps }) {
  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })

    return () => {
      if (lenis) lenis.destroy()
    }
  }, [])

  return (
    <ParallaxProvider>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <RecaptchaV3Provider>
          <LayoutWrapper>
            <Component {...pageProps} />
            <CookieConsent
              contentStyle={{
                flex: '1 1 100px',
                marginTop: '5px',
                marginBottom: '5px',
                marginLeft: '10px',
                marginRight: '10px',
              }}
              style={{
                background: '#FFFFFF',
                textAlign: 'left',
                border: '2px solid #2A4C23',
                color: 'black',
                fontSize: 'x-small',
              }}
              buttonStyle={{
                background: '#FFFFFF',
                color: '#2A4C23',
                border: '2px solid #000',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '3px',
                marginLeft: '5px',
                marginRight: '5px',
                marginBottom: '3px',
              }}
              declineButtonStyle={{
                background: '#FFFFFF',
                color: 'black',
                border: '2px solid #000',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '3px',
                marginLeft: '5px',
                marginRight: '5px',
                marginBottom: '3px',
              }}
              buttonText="Accept"
              declineButtonText="Decline"
              enableDeclineButton
              hideOnDecline={true}
              expires={365}
              overlay
            >
              By using our website, you agree to essential{' '}
              <Link href="/cookie-policy" className="text-[#2A4C23]">
                cookies
              </Link>
              .
            </CookieConsent>
          </LayoutWrapper>
        </RecaptchaV3Provider>
      </ThemeProvider>
    </ParallaxProvider>
  )
}
export default appWithTranslation(App)
