import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

const localeLabel = (locale) => {
  if (locale === 'en') return 'English'
  if (locale === 'ur') return 'Urdu'
  return locale
}

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (locale) => {
    setOpen(false)
    if (locale !== activeLocale) {
      const { pathname, query, asPath } = router
      router.push({ pathname, query }, asPath, { locale })
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded border px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {localeLabel(activeLocale)}
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-full overflow-hidden rounded border border-gray-200 bg-[#FDFBEF] text-sm shadow-md dark:border-gray-700 dark:bg-gray-900"
        >
          {locales?.map((locale) => (
            <li
              key={locale}
              role="option"
              aria-selected={locale === activeLocale}
              onClick={() => handleSelect(locale)}
              className={`cursor-pointer px-4 py-2 text-gray-900 hover:bg-black/5 dark:text-gray-100 dark:hover:bg-gray-800 ${
                locale === activeLocale ? 'font-semibold' : ''
              }`}
            >
              {localeLabel(locale)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
