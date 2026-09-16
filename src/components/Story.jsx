import { motion } from 'framer-motion'
import { STORY } from '../lib/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Story() {
  return (
    <section id="story" className="bg-peach px-6 py-28 text-center sm:px-10 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto max-w-3xl"
      >
        <p className="flex items-center justify-center gap-2 font-sans text-sm uppercase tracking-wideish text-ink/60">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-deep" />
          {STORY.eyebrow}
        </p>

        <h2 className="mt-6 font-display font-extrabold uppercase text-display-md text-ink">
          {STORY.heading}
        </h2>

        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-5">
          {STORY.paragraphs.map((p, i) => (
            <p key={i} className="font-sans text-ink/70">
              {p}
            </p>
          ))}
        </div>

        <dl className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-10">
          {STORY.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display font-extrabold text-3xl text-rose-deep sm:text-4xl">{stat.value}</dd>
              <dd className="mt-1 font-sans text-xs uppercase tracking-wideish text-ink/50 sm:text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
