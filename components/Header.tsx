import Link from 'next/link'
import { useRouter } from 'next/router'
import kk from '@/locales/kk'

// Karakalpak ornamental logo SVG
function LogoPattern() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer diamond */}
      <rect x="4" y="4" width="44" height="44" rx="2" stroke="#00B8C8" strokeWidth="1.5" fill="none" transform="rotate(0 26 26)"/>
      {/* Inner diamond */}
      <rect x="13" y="13" width="26" height="26" rx="1" stroke="#00B8C8" strokeWidth="1.5" fill="none" transform="rotate(45 26 26)"/>
      {/* Corner diamonds */}
      <rect x="2" y="22" width="8" height="8" rx="1" fill="#00B8C8" transform="rotate(45 6 26)"/>
      <rect x="42" y="22" width="8" height="8" rx="1" fill="#00B8C8" transform="rotate(45 46 26)"/>
      <rect x="22" y="2" width="8" height="8" rx="1" fill="#00B8C8" transform="rotate(45 26 6)"/>
      <rect x="22" y="42" width="8" height="8" rx="1" fill="#00B8C8" transform="rotate(45 26 46)"/>
      {/* Center star */}
      <circle cx="26" cy="26" r="4" fill="#00B8C8"/>
      <rect x="24" y="18" width="4" height="16" rx="2" fill="#00B8C8"/>
      <rect x="18" y="24" width="16" height="4" rx="2" fill="#00B8C8"/>
    </svg>
  )
}

// Social icons
function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  )
}

export default function Header() {
  const router = useRouter()
  const currentPath = router.pathname

  const navLinks = [
    { href: '/', label: kk.nav.home },
    { href: '/materials', label: kk.nav.materials },
    { href: '/profile', label: kk.nav.about },
  ]

  return (
    <header className="bg-white border-b-2 border-[#00B8C8] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top row: logo left, socials+phone right */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <LogoPattern />
            <span className="text-[#00B8C8] font-bold text-xl tracking-tight">
              lingvomed.uz
            </span>
          </Link>

          {/* Right side: socials + phone */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-3 text-[#00B8C8]">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
            <a
              href={`tel:${kk.nav.phone.replace(/\s/g, '')}`}
              className="text-sm font-bold text-gray-700 hover:text-[#00B8C8] transition-colors"
            >
              {kk.nav.phone}
            </a>
          </div>
        </div>

        {/* Bottom row: navigation */}
        <nav className="flex items-center justify-center gap-10 mt-3">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-bold pb-1 transition-all relative ${
                  isActive
                    ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#00B8C8]'
                    : 'text-[#00B8C8] hover:text-[#0099AA]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
