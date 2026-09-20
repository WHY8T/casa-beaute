import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import useProducts from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { WHATSAPP_NUMBER } from '../lib/content'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Gallery({ onOpenStore }) {
  const { products, loading } = useProducts()
  const { addItem } = useCart()
  const [selected, setSelected] = useState(null)
  const [qty, setQty] = useState(1)

  const featured = products.slice(0, 6)

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
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display font-extrabold uppercase text-display-md text-ink">Les Essentiels</h2>
        <p className="mt-4 font-sans text-ink/60">A few favourites from the shelf.</p>
      </div>

      {loading && <p className="mt-14 text-center text-ink/40">Loading…</p>}
      {!loading && featured.length === 0 && (
        <p className="mt-14 text-center text-ink/40">No products yet — check back soon.</p>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3"
      >
        {featured.map((item) => {
          const outOfStock = item.stock <= 0
          return (
            <motion.button
              key={item.id}
              variants={card}
              className="group text-left"
              onClick={() => setSelected(item)}
            >
              <motion.div
                layoutId={`shelf-image-${item.id}`}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-peach/40"
              >
                <ImagePlaceholder
                  src={item.image}
                  alt={item.label}
                  className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] ${outOfStock ? 'opacity-50' : ''
                    }`}
                />
              </motion.div>
              <div className="mt-4">
                <p className="font-sans text-[11px] uppercase tracking-wideish text-ink/40">{item.tag}</p>
                <p className="mt-1 font-display text-base text-ink">{item.label}</p>
                <p
                  className={`mt-1 h-5 font-sans text-sm text-ink/60 transition-opacity duration-300 ${outOfStock ? '' : 'sm:opacity-0 sm:group-hover:opacity-100'
                    }`}
                >
                  {outOfStock ? <span className="text-ink/40">Sold out</span> : item.price}
                </p>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {!loading && products.length > featured.length && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={onOpenStore}
            className="font-sans text-sm uppercase tracking-wideish text-ink/60 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-rose-deep"
          >
            View full store
          </button>
        </div>
      )}

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
              className="relative mx-auto h-[46vh] w-full max-w-md overflow-hidden rounded-2xl sm:h-[55vh]"
            >
              <ImagePlaceholder
                src={selected.image}
                alt={selected.label}
                className={`absolute inset-0 ${selected.stock <= 0 ? 'opacity-50' : ''}`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
              className="mx-auto mt-6 max-w-sm px-6 text-center"
            >
              <p className="font-display text-xl font-bold uppercase text-ink">{selected.label}</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-wideish text-ink/40">{selected.tag}</p>
              <p className="mt-4 font-sans text-sm text-ink/60">{selected.description}</p>
              <p className="mt-2 font-sans text-sm font-medium text-ink">{selected.price}</p>

              {selected.stock <= 0 ? (
                <p className="mt-6 font-sans text-sm uppercase tracking-wideish text-ink/40">Currently sold out</p>
              ) : (
                <>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-peach"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm text-ink">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(selected.stock, q + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-peach"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addItem(selected, qty)
                      setSelected(null)
                    }}
                    className="mt-5 w-full rounded-full bg-ink py-3 font-sans text-sm text-cream transition-colors hover:bg-rose-deep"
                  >
                    Add to cart
                  </button>
                  <a
                    href={whatsappLink(selected)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block font-sans text-xs uppercase tracking-wideish text-ink/50 underline decoration-ink/20 underline-offset-4 hover:text-ink"
                  >
                    Ask on WhatsApp
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}