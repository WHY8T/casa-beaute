import { motion } from 'framer-motion'
import GlassOrb from './GlassOrb'
import SectionWipe from './SectionWipe'
import { SERVICES } from '../lib/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
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
        return (
          <div key={s.name}>
            <SectionWipe from={i === 0 ? 'cream' : tinted ? 'cream' : 'peach'} to={tinted ? 'peach' : 'cream'} />
            <div className={`px-6 py-20 sm:px-10 lg:px-16 ${tinted ? 'bg-peach' : 'bg-cream'}`}>
              <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`flex justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <GlassOrb size={220} />
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={fadeUp}
                  className={i % 2 === 1 ? 'lg:order-1' : ''}
                >
                  <p className="font-display font-extrabold text-4xl text-rose-deep">{s.index}/</p>
                  <h3 className="mt-2 font-display font-extrabold uppercase text-3xl text-ink sm:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm uppercase tracking-wideish text-ink/50">{s.tagline}</p>
                  <p className="mt-5 max-w-md font-sans text-ink/70">{s.description}</p>
                  <p className="mt-5 font-sans text-sm text-ink">{s.highlight}</p>
                </motion.div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
