import { motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import SectionWipe from './SectionWipe'
import useProducts from '../hooks/useProducts'
import { SERVICES } from '../lib/content'

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const imageReveal = {
  hidden: (dir) => ({ opacity: 0, scale: 0.85, x: dir, filter: 'blur(12px)' }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Services({ onShopCategory }) {
  const { products } = useProducts()

  return (
    <section id="services">
      <div className="bg-cream px-6 pt-24 pb-16 text-center sm:px-10 lg:px-16">
        <p className="font-display font-extrabold text-8xl leading-none text-rose sm:text-9xl">
          {String(SERVICES.length).padStart(2, '0')}
        </p>
        <h2 className="mt-4 font-display font-extrabold uppercase text-display-md text-ink">
          Collections
        </h2>
        <p className="mx-auto mt-4 max-w-md font-sans text-ink/60">
          that bring PRODERMA and a curated set of international brands together, shelf by shelf.
        </p>
      </div>

      {SERVICES.map((s, i) => {
        const tinted = i % 2 === 1
        const inStock = products.filter((p) => p.tag === s.name && p.stock > 0).length
        const total = products.filter((p) => p.tag === s.name).length

        return (
          <div key={s.name}>
            <SectionWipe from={i === 0 ? 'cream' : tinted ? 'cream' : 'peach'} to={tinted ? 'peach' : 'cream'} />
            <div className={`px-6 py-20 sm:px-10 lg:px-16 ${tinted ? 'bg-peach' : 'bg-cream'}`}>
              <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={i % 2 === 1 ? 60 : -60}
                  variants={imageReveal}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onShopCategory?.(s.name)}
                  className={`flex cursor-pointer justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div className="relative h-[320px] w-full max-w-sm overflow-hidden rounded-3xl shadow-sm sm:h-[380px]">
                    <ImagePlaceholder
                      src={s.image}
                      alt={s.name}
                      className="absolute inset-0 transition-transform duration-700 hover:scale-105"
                    />
                    {total > 0 && (
                      <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1 font-sans text-xs uppercase tracking-wideish text-ink shadow-sm">
                        {inStock} in stock
                      </span>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={textContainer}
                  className={i % 2 === 1 ? 'lg:order-1' : ''}
                >
                  <motion.p variants={textItem} className="font-display font-extrabold text-4xl text-rose-deep">
                    {s.index}/
                  </motion.p>
                  <motion.h3
                    variants={textItem}
                    className="mt-2 font-display font-extrabold uppercase text-3xl text-ink sm:text-4xl"
                  >
                    {s.name}
                  </motion.h3>
                  <motion.p variants={textItem} className="mt-1 font-sans text-sm uppercase tracking-wideish text-ink/50">
                    {s.tagline}
                  </motion.p>
                  <motion.p variants={textItem} className="mt-5 max-w-md font-sans text-ink/70">
                    {s.description}
                  </motion.p>
                  <motion.p variants={textItem} className="mt-5 font-sans text-sm text-ink">
                    {s.highlight}
                  </motion.p>
                  <motion.button
                    variants={textItem}
                    onClick={() => onShopCategory?.(s.name)}
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 font-sans text-sm text-cream transition-colors duration-300 hover:bg-rose-deep"
                  >
                    Shop {s.name}
                    <span aria-hidden="true">→</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}