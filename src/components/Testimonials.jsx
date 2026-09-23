import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS } from '../lib/content'

export default function Testimonials() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    setActive(i)
  }

  return (
    <section id="reviews" className="bg-peach px-6 py-28 sm:px-10 lg:px-16">
      <div className="mb-14 flex items-end justify-between">
        <h2 className="font-display font-extrabold uppercase text-display-md text-ink">Ce qu'ils en disent</h2>
        <div className="hidden gap-3 sm:flex">
          <button
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            className="h-11 w-11 rounded-full border border-ink/25 font-sans text-ink transition-colors hover:border-rose-deep hover:text-rose-deep"
            aria-label="Avis précédent"
          >
            ←
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(TESTIMONIALS.length - 1, active + 1))}
            className="h-11 w-11 rounded-full border border-ink/25 font-sans text-ink transition-colors hover:border-rose-deep hover:text-rose-deep"
            aria-label="Avis suivant"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="w-[85vw] shrink-0 snap-start rounded-[24px] border border-ink/10 bg-cream p-8 sm:w-[55vw] sm:p-10 lg:w-[32vw]"
          >
            <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
              “{t.quote}”
            </p>
            <footer className="mt-8 flex items-center justify-between font-sans text-sm text-ink/60">
              <span>{t.name}</span>
              <span>{t.service}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}