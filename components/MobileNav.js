import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { useTranslation } from 'next-i18next'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const { t } = useTranslation()

  const onToggleNav = () => setNavShow((s) => !s)
  const onClose = () => setNavShow(false)

  return (
    <div className="sm:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl text-gray-900 transition-colors duration-200 hover:text-red-500 dark:text-gray-100 dark:hover:text-red-400"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <span className="flex w-[18px] flex-col gap-[3px]">
          <span
            className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${
              navShow ? 'w-full translate-y-[5px] rotate-45' : 'w-full'
            }`}
          />
          <span
            className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${
              navShow ? 'w-0 opacity-0' : 'w-3/4'
            }`}
          />
          <span
            className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${
              navShow ? 'w-full -translate-y-[5px] -rotate-45' : 'w-1/2'
            }`}
          />
        </span>
      </button>

      {/* Click-outside backdrop */}
      {navShow && <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />}

      {/* Dropdown — full-width pill, opens top to bottom */}
      <div
        className={`fixed left-4 right-4 top-[96px] z-50 flex max-h-[calc(100dvh-112px)] flex-col overflow-hidden rounded-2xl border border-white/50 bg-[#FDFBEF]/95 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-300 ease-out dark:border-gray-700/50 dark:bg-gray-900/95 ${
          navShow
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        {/* Top shimmer line — stays pinned */}
        <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-primary-400/60 to-transparent" />

        {/* Scrollable nav list */}
        <nav className="flex flex-col overflow-y-auto px-2.5 py-2">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-black/5 dark:text-gray-100 dark:hover:bg-white/5"
              onClick={onClose}
            >
              <span className="tracking-wide">{t(`common:${link.title.toLowerCase()}`)}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary-400 dark:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Bottom shimmer line — stays pinned */}
        <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent dark:via-gray-600/50" />
      </div>
    </div>
  )
}

export default MobileNav
