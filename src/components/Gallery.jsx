import { motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import { GALLERY } from '../lib/content'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const card = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Gallery({ onOpenStore }) {
  return (
    <section id="gallery" className="bg-cream px-6 py-24 sm:px-10 lg:px-16">
      <h2 className="text-center font-display font-extrabold uppercase text-display-md text-ink">
        The Shelf
      </h2>
      <p className="mx-auto mt-4 max-w-md text-center font-sans text-ink/60">
        A look at what's currently in-store — placeholder shots, swap in real product photography any time.
      </p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
      >
        {GALLERY.map((item) => (
          <motion.figure
            key={item.id}
            variants={card}
            className="group cursor-pointer"
            onClick={onOpenStore}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <ImagePlaceholder className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="rounded-full bg-cream/90 px-3 py-1 font-sans text-xs uppercase tracking-wideish text-ink shadow-sm">
                  View
                </span>
              </div>
            </div>
            <figcaption className="mt-3">
              <p className="font-sans text-xs uppercase tracking-wideish text-ink transition-colors duration-300 group-hover:text-rose-deep">
                {item.label}
              </p>
              <p className="mt-1 font-sans text-xs uppercase tracking-wideish text-rose-deep">{item.tag}</p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      <div className="mt-14 flex justify-center">
        <button
          onClick={onOpenStore}
          className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-sans text-sm text-cream transition-colors duration-300 hover:bg-rose-deep"
        >
          View the store
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}