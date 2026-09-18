import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import useProducts from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { WHATSAPP_NUMBER } from '../lib/content'
import ProductBubble from './ProductBubble'

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
  const { products, loading } = useProducts()
  const { addItem } = useCart()
  const [selected, setSelected] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', Boolean(selected))
  }, [selected])

  useEffect(() => {
    if (selected) setQty(1)
  }, [selected])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const whatsappLink = (product) => {
    const message = `Hi! I'm interested in "${product.label}"${product.price ? ` (${product.price})` : ''}.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="gallery" className="bg-cream px-6 py-24 sm:px-10 lg:px-16">
      <h2 className="text-center font-display font-extrabold uppercase text-display-md text-ink">
        The Shelf
      </h2>
      <p className="mx-auto mt-4 max-w-md text-center font-sans text-ink/60">
        A look at what's currently in-store, updated live.
      </p>

      {loading && <p className="mt-14 text-center text-ink/40">Loading products…</p>}
      {!loading && products.length === 0 && (
        <p className="mt-14 text-center text-ink/40">No products yet — check back soon.</p>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
      >
        {products.map((item, index) => {
          const outOfStock = item.stock <= 0
          return (
            <motion.figure
              key={item.id}
              variants={card}
              className="group cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <motion.div
                layoutId={`shelf-image-${item.id}`}
                className="relative aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]"
              >
                <ProductBubble
                  src={item.image}
                  alt={item.label}
                  outOfStock={outOfStock}
                  floatDelay={(index % 5) * 0.4}
                  className="h-full w-full"
                />
                {outOfStock && (
                  <span className="absolute left-3 top-3 z-20 rounded-full bg-ink/90 px-3 py-1 font-sans text-[10px] uppercase tracking-wideish text-cream">
                    Out of stock
                  </span>
                )}
                <div className="absolute inset-0 z-20 flex items-end justify-center pb-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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
          )
        })}
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
              className="relative mx-auto h-[50vh] w-full max-w-xl sm:h-[60vh]"
            >
              <ProductBubble
                src={selected.image}
                alt={selected.label}
                outOfStock={selected.stock <= 0}
                className="h-full w-full"
              />
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

              {selected.stock <= 0 ? (
                <p className="mt-6 inline-block rounded-full bg-ink/10 px-6 py-3 text-sm uppercase tracking-wideish text-ink/50">
                  Currently out of stock
                </p>
              ) : (
                <>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink hover:bg-peach"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-ink">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(selected.stock, q + 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink hover:bg-peach"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={() => {
                        addItem(selected, qty)
                        setSelected(null)
                      }}
                      className="w-full rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-rose-deep sm:w-auto"
                    >
                      Add to cart
                    </button>
                    <a
                      href={whatsappLink(selected)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
                    >
                      Ask on WhatsApp
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}