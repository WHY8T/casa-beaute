import { useEffect, useState } from 'react'
import { LOGO_URL, NAV_LINKS, SALON_NAME } from '../lib/content'
import { useCart } from '../context/CartContext'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { count, setIsOpen } = useCart()

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', open)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 backdrop-blur-md shadow-sm">
      <nav className="relative flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-xs uppercase tracking-wideish text-ink/70 transition-colors hover:text-rose-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#top"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
        >
          {LOGO_URL ? (
            <img src={LOGO_URL} alt={SALON_NAME} className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-deep font-display text-xs font-extrabold text-rose-deep sm:h-9 sm:w-9">
              CB
            </span>
          )}
          <span className="font-display font-extrabold text-lg uppercase tracking-wideish text-rose-deep sm:text-xl">
            {SALON_NAME}
          </span>
        </a>

        <div className="ml-auto flex items-center gap-4 md:ml-0 md:gap-6">
          <a
            href="#contact"
            className="hidden font-sans text-xs uppercase tracking-wideish text-ink/70 transition-colors hover:text-rose-deep md:inline"
          >
            Visit us
          </a>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-peach"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.5 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21 8H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-deep text-[10px] text-cream">
                {count}
              </span>
            )}
          </button>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span
              className={`h-px w-6 bg-rose-deep transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-6 bg-rose-deep transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-ink/10 px-6 pb-8 pt-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-display font-extrabold text-xl uppercase text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}