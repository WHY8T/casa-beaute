import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SALON_NAME, TAGLINE } from '../lib/content'
import useReducedMotion from '../hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -60])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-cream"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_53%]"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Light wash for text legibility — keeps the hero bright, no dark scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-cream/10" />
      <div className="pointer-events-none absolute inset-0 bg-cream/10" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16"
      >
        <p className="font-sans text-sm uppercase tracking-wideish text-ink/60">{TAGLINE}</p>

        <h1 className="mt-4 max-w-4xl font-display font-extrabold uppercase text-display-xl text-ink">
          Cosmetics, chosen well
        </h1>

        <p className="mt-6 max-w-md font-sans text-lg text-ink/70">
          engineered for a shelf you can trust
        </p>

        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full bg-rose-deep px-7 py-4 font-sans text-sm text-cream transition-colors duration-300 hover:bg-rose"
          >
            Visit the boutique
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
