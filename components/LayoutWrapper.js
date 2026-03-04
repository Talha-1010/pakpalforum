import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.png'
import Link from './Link'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image'
import LocaleSwitcher from './LocaleSwitcher'
import AnnouncementBar from './AnnouncementBar'
import { useTranslation } from 'next-i18next'

const LayoutWrapper = ({ children }) => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white dark:bg-black">
      <AnnouncementBar />
      <header
        className={`fixed top-3 z-50 rounded-full transition-all duration-500
          sm:left-28 sm:right-28 xl:left-44 xl:right-44 ${
            scrolled
              ? 'left-14 right-14 border border-[#2A4C23]/40 bg-white/95 shadow-lg shadow-black/10 backdrop-blur-xl dark:border-[#2A4C23]/60 dark:bg-black/95 dark:shadow-black/50'
              : 'left-4 right-4 border border-[#2A4C23]/20 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60'
          }`}
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-8 xl:max-w-5xl xl:px-8">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center space-x-4">
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <Image
                  src={Logo}
                  alt="Pak-Palestine Forum logo"
                  width={44}
                  height={44}
                  loading="lazy"
                />
              </Link>
              <LocaleSwitcher />
            </div>
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="hover-underline-animation p-1 font-medium text-gray-800 dark:text-white sm:p-4"
                  >
                    {t(`common:${link.title.toLowerCase()}`)}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen flex-col justify-between pt-[72px]">
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutWrapper
