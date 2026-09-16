import { CONTACT, SALON_NAME, NAV_LINKS } from '../lib/content'

export default function Footer() {
  return (
    <footer className="bg-ink/[0.03] px-6 pb-8 pt-20 text-ink sm:px-10 lg:px-16">
      <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-ink/10 pb-16 sm:flex-row sm:items-end">
        <p className="font-display font-extrabold uppercase text-3xl">{SALON_NAME}</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-sm items-center gap-3 border-b border-ink/30 pb-2 sm:w-auto"
        >
          <label htmlFor="newsletter" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter"
            type="email"
            required
            placeholder="Subscribe to our newsletter"
            className="w-full bg-transparent font-sans text-sm text-ink placeholder:text-ink/40 outline-none"
          />
          <button type="submit" className="font-sans text-xs uppercase tracking-wideish text-rose-deep">
            Submit
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-12 border-b border-ink/10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-sans text-xs uppercase tracking-wideish text-ink/50">About</p>
          <p className="mt-4 max-w-[24ch] font-sans text-sm text-ink/60">
            A cosmetics &amp; parfumerie boutique in Sidi Bel Abbès, Algeria.
          </p>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-wideish text-ink/50">Navigate</p>
          <ul className="mt-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-sans text-sm text-ink/70 hover:text-rose-deep">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-wideish text-ink/50">Contact</p>
          <ul className="mt-4 flex flex-col gap-2 font-sans text-sm text-ink/70">
            <li>
              <a href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-rose-deep">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-rose-deep">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-deep"
              >
                {CONTACT.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-wideish text-ink/50">Hours</p>
          <ul className="mt-4 flex flex-col gap-2 font-sans text-sm text-ink/70">
            {CONTACT.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-6">
                <span>{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 pt-8 font-sans text-xs text-ink/40 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {SALON_NAME}. All rights reserved.</span>
        <span>{CONTACT.address}</span>
      </div>
    </footer>
  )
}
