import { motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import { SERVICES } from '../lib/content'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const tile = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services({ onShopCategory }) {
  return (
    <section id="services" className="bg-cream px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display font-extrabold uppercase text-display-md text-ink">Collections</h2>
        <p className="mt-4 font-sans text-ink/60">Explore by category.</p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
      >
        {SERVICES.map((s, i) => {
          const isLast = i === SERVICES.length - 1
          const isWideRow = isLast && SERVICES.length % 2 === 1

          return (
            <motion.button
              key={s.name}
              variants={tile}
              onClick={() => onShopCategory?.(s.name)}
              className={`group relative overflow-hidden rounded-2xl text-left ${isWideRow ? 'sm:col-span-2' : ''
                }`}
            >
              <div className={`relative w-full overflow-hidden ${isWideRow ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}>
                <ImagePlaceholder
                  src={s.image}
                  alt={s.name}
                  className="absolute inset-0 scale-105 blur-[2px] brightness-90 transition-all duration-700 ease-out group-hover:scale-100 group-hover:blur-none group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/0 transition-opacity duration-700 group-hover:from-ink/60 group-hover:via-ink/5" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="font-sans text-xs tracking-[0.25em] text-cream/60">
                    {s.index}
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold uppercase tracking-wide text-cream sm:text-3xl">
                    {s.name}
                  </p>
                  <span className="mt-1 block h-px w-8 origin-left scale-x-0 bg-cream/70 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <p className="mt-2 font-sans text-xs uppercase tracking-wideish text-cream/70">
                    {s.tagline}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/50 text-cream transition-all duration-300 group-hover:translate-x-1 group-hover:border-cream group-hover:bg-cream group-hover:text-ink"
                >
                  →
                </span>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}