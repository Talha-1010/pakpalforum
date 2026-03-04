import { useState, useEffect, useCallback } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTheme } from 'next-themes'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

const TOKEN_KEY = 'ppf_admin_token'

const INITIAL = { text: '', active: false, type: 'info' }

const TYPE_CFG = {
  info: {
    bg: 'rgba(42,76,35,0.15)',
    border: 'rgba(42,76,35,0.5)',
    color: '#2A4C23',
    label: 'Info',
  },
  warning: {
    bg: 'rgba(217,119,6,0.12)',
    border: 'rgba(217,119,6,0.5)',
    color: '#b45309',
    label: 'Warning',
  },
  urgent: {
    bg: 'rgba(185,32,37,0.15)',
    border: 'rgba(185,32,37,0.5)',
    color: '#B92025',
    label: 'Urgent',
  },
}

export default function AdminPortal() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [token, setToken] = useState('')

  // Login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // CMS form — local editable copy
  const [form, setForm] = useState(INITIAL)
  const [publishKey, setPublishKey] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchAnnouncement = useCallback(async (t) => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/announcement', {
        headers: { 'x-admin-token': t },
      })
      if (!res.ok) return false
      const data = await res.json()
      setForm({
        text: data.text ?? '',
        active: data.active ?? false,
        type: data.type ?? 'info',
      })
      return true
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Check stored token on mount
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) {
      fetchAnnouncement(stored).then((ok) => {
        if (ok) {
          setToken(stored)
          setAuthed(true)
        }
        setChecking(false)
      })
    } else {
      setChecking(false)
    }
  }, [fetchAnnouncement])

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token)
        setToken(data.token)
        const ok = await fetchAnnouncement(data.token)
        if (ok) setAuthed(true)
        else setLoginError('Logged in but could not load data.')
      } else {
        setLoginError(data.error || 'Invalid credentials')
      }
    } catch {
      setLoginError('Network error. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    try {
      const res = await fetch('/api/admin/announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ ...form, publishKey }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSaveMsg('✓ Saved & published.')
        setForm({
          text: data.data.text,
          active: data.data.active,
          type: data.data.type,
        })
      } else {
        setSaveMsg('Error: ' + (data.error || 'Save failed.'))
      }
    } catch {
      setSaveMsg('Network error.')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 4000)
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY)
    setAuthed(false)
    setToken('')
    setForm(INITIAL)
    setUsername('')
    setPassword('')
  }

  // ── Loading spinner ──
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0f1117]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2A4C23] border-t-transparent" />
      </div>
    )
  }

  // ── Login screen ──
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-[#0f1117]">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2A4C23] to-[#B92025]">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Portal</h1>
            <p className="mt-1 text-xs text-gray-500">Pak-Palestine Forum</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#2A4C23] focus:ring-1 focus:ring-[#2A4C23] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#2A4C23] focus:ring-1 focus:ring-[#2A4C23] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-lg bg-gradient-to-r from-[#2A4C23] to-[#3a6432] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {loginLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── CMS screen ──
  const activeCfg = TYPE_CFG[form.type] || TYPE_CFG.info

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 dark:bg-[#0f1117] dark:text-white">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Announcement CMS</h1>
            <p className="mt-0.5 text-xs text-gray-500">Pak-Palestine Forum · Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-500 hover:border-red-500/50 hover:text-red-500 dark:border-white/10 dark:text-gray-400 dark:hover:border-red-500/50 dark:hover:text-red-400"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2A4C23] border-t-transparent" />
          </div>
        ) : (
          <form
            onSubmit={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault()
            }}
            className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none"
          >
            {/* Active toggle */}
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div>
                <p className="text-sm font-semibold">Show on live site</p>
                <p
                  className={`mt-0.5 text-xs font-medium ${
                    form.active
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {form.active ? '● ON — visitors will see this' : '○ OFF — hidden from visitors'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                aria-pressed={form.active}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                  form.active ? 'bg-[#2A4C23]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transition-transform duration-200 ${
                    form.active ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Type selector */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Type
              </label>
              <div className="flex gap-2">
                {Object.entries(TYPE_CFG).map(([key, cfg]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type: key }))}
                    className="flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-all"
                    style={
                      form.type === key
                        ? { background: cfg.bg, borderColor: cfg.border, color: cfg.color }
                        : {
                            background: 'transparent',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)',
                            color: '#6b7280',
                          }
                    }
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text input */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Announcement text
              </label>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                rows={4}
                placeholder="e.g. Join us for our upcoming webinar on Saturday 1st March at 6PM PKT…"
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#2A4C23] focus:ring-1 focus:ring-[#2A4C23] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />
            </div>

            {/* Preview */}
            {form.text && (
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Preview (bottom-right toast)
                </p>
                <div
                  className="rounded-xl border px-4 py-3 text-sm leading-snug"
                  style={{
                    background: activeCfg.bg,
                    borderColor: activeCfg.border,
                    color: activeCfg.color,
                    transition: 'none',
                  }}
                >
                  {form.text}
                </div>
              </div>
            )}

            {/* Publish key */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Publish key <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={publishKey}
                onChange={(e) => setPublishKey(e.target.value)}
                required
                placeholder="Enter your secret publish key to save"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#2A4C23] focus:ring-1 focus:ring-[#2A4C23] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />
              <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-600">
                Required every time you publish. Set via ADMIN_PUBLISH_KEY in .env
              </p>
            </div>

            {/* Save */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-gradient-to-r from-[#2A4C23] to-[#3a6432] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save & Publish'}
              </button>
              {saveMsg && (
                <p
                  className={`text-xs ${
                    saveMsg.startsWith('✓')
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {saveMsg}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
