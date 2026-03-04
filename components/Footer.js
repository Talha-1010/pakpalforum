import Link from './Link'
import SocialIcon from './social-icons'
import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.png'
import Image from 'next/image'

const chapters = [
  { city: 'Islamabad', href: 'https://www.instagram.com/pakpalforum_isb' },
  { city: 'Lahore', href: 'https://www.instagram.com/pakpalforum_lahore' },
  { city: 'Karachi', href: 'https://www.instagram.com/pakpalforum_khi' },
  { city: 'Faisalabad', href: 'https://www.instagram.com/pakpalforum_fsd' },
  { city: 'Multan', href: 'https://www.instagram.com/pakpalforum_multan' },
]

export default function Footer() {
  return (
    <footer
      className="bg-gray-50 dark:bg-[#08080a]"
      style={{ borderTop: '1px solid rgba(128,128,128,0.12)' }}
    >
      <div className="mt-16 flex flex-col items-center">
        {/* Logo + Copyright */}
        <div className="mb-2 flex flex-col-reverse items-center space-x-2 text-sm text-gray-600 sm:flex-row-reverse">
          <Link href={'/'} className="hidden hover:text-[#2A4C23] md:block">
            {' '}
            Pak-Palestine Forum {`© ${new Date().getFullYear()}`}. All rights reserved.
          </Link>
          <div className="sm: my-2 mx-4">
            <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
              <div className="mr-4">
                <Image
                  src={Logo}
                  alt="Pak-Palestine Forum logo"
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="block text-gray-400 md:hidden">Pak-Palestine Forum</span>
              </div>
            </Link>
            <span className="block text-center text-gray-600 md:hidden">
              {`© ${new Date().getFullYear()}`}. All rights reserved.
            </span>
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-8 w-full max-w-2xl px-4">
          {/* Main handle */}
          <div className="mb-4 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">
              Follow Us
            </span>
            <a
              href="https://www.instagram.com/pakpalforum2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#E1306C]"
            >
              <SocialIcon kind="instagram" size="5" />
              @pakpalforum2
            </a>
          </div>

          {/* Chapter handles */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">
              Our Chapters
            </span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
              {chapters.map(({ city, href }) => (
                <a
                  key={city}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-[#E1306C]"
                >
                  <SocialIcon kind="instagram" size="4" />
                  {city}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal links */}
        <div className="mb-16 flex flex-wrap justify-center gap-x-6 gap-y-3">
          <Link href={'/privacy-policy'} className="text-sm text-gray-600 hover:text-white">
            Privacy Policy
          </Link>
          <Link href={'/terms-and-conditions'} className="text-sm text-gray-600 hover:text-white">
            Terms and Conditions
          </Link>
          <Link href={'/cookie-policy'} className="text-sm text-gray-600 hover:text-white">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
