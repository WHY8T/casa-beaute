import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', Boolean(selected))
  }, [selected])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
            onClick={() => setSelected(item)}
          >
            <motion.div
              layoutId={`shelf-image-${item.id}`}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl"
            >
              <ImagePlaceholder className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="rounded-full bg-cream/90 px-3 py-1 font-sans text-xs uppercase tracking-wideish text-ink shadow-sm">
                  View
                </span>
              </div>
            </motion.div>
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

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close product"
              className="self-end m-6 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-peach"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>

            <motion.div
              layoutId={`shelf-image-${selected.id}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative mx-auto h-[55vh] w-full max-w-xl overflow-hidden rounded-2xl sm:h-[65vh]"
            >
              <ImagePlaceholder className="absolute inset-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
              className="mx-auto mt-6 max-w-xl px-6 text-center"
            >
              <p className="font-display text-2xl font-extrabold uppercase text-ink">{selected.label}</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-wideish text-rose-deep">{selected.tag}</p>
              <p className="mt-4 font-sans text-ink/70">{selected.description}</p>
              <p className="mt-2 font-sans font-semibold text-ink">{selected.price}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}