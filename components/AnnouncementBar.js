import { useState, useEffect } from 'react'

const typeConfig = {
  info: {
    bar: 'bg-gradient-to-br from-[#2A4C23] to-[#3a6432]',
    border: 'border-[#2A4C23]/40',
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  warning: {
    bar: 'bg-gradient-to-br from-amber-600 to-amber-500',
    border: 'border-amber-500/40',
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  urgent: {
    bar: 'bg-gradient-to-br from-[#B92025] to-[#d42d33]',
    border: 'border-[#B92025]/40',
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
}

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  function load() {
    fetch('/api/announcement')
      .then((r) => r.json())
      .then((data) => {
        if (!data.active || !data.text) {
          setVisible(false)
          return
        }
        setDismissed(false)
        setAnnouncement(data)
        setTimeout(() => setVisible(true), 300)
      })
      .catch(() => {})
  }

  useEffect(() => {
    load()
    // Poll every 30 s to pick up changes published from the portal
    const id = setInterval(load, 30000)
    return () => clearInterval(id)
  }, [])

  function dismiss() {
    setVisible(false)
    // Dismissed state is in-memory only — resets on page refresh
    setTimeout(() => setDismissed(true), 350)
  }

  if (dismissed || !announcement) return null

  const cfg = typeConfig[announcement.type] || typeConfig.info

  return (
    <div
      className={`fixed bottom-4 right-4 z-[60] w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-2xl shadow-2xl shadow-black/20 transition-all duration-350 ease-out ${cfg.bar} ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-3 p-4 text-white">
        <div className="mt-0.5">{cfg.icon}</div>
        <p className="flex-1 text-sm leading-snug">{announcement.text}</p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="mt-0.5 shrink-0 rounded-full p-0.5 opacity-60 transition-opacity hover:opacity-100"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
