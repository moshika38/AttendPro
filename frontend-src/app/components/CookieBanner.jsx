
'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {

    const hasAccepted = localStorage.getItem('cookie_accepted')
    if (!hasAccepted) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_accepted', 'true')
    setShowBanner(false)
  }


  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 m-4 p-4 md:m-6 md:p-6 max-w-7xl mx-auto bg-zinc-900 border border-zinc-800 text-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* බැනර් එකේ විස්තරය */}
      <div className="text-sm text-zinc-300 max-w-3xl text-center md:text-left">
        <p>
          We use cookies to enhance your browsing experience, By clicking <span className="text-white font-semibold">"Accept All"</span>, you consent to our use of cookies.
        </p>
      </div>

      {/* Buttons දෙක */}
      <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-center">
        <button
          onClick={() => setShowBanner(false)}
          className="text-xs text-zinc-400 hover:text-white px-4 py-2 rounded-lg transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="text-sm font-medium bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-xl transition shadow-md w-full md:w-auto text-center"
        >
          Accept All
        </button>
      </div>

    </div>
  )
}