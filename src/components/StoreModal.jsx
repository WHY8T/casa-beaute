import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import useProducts from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { SALON_NAME, WHATSAPP_NUMBER } from '../lib/content'

const CATEGORIES = ['All', 'Skincare', 'Haircare', 'Parfumerie', 'Makeup', 'Gift Sets']

export default function StoreModal({ isOpen, initialCategory, onClose }) {
    const { products, loading } = useProducts()
    const { addItem } = useCart()
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    const [selected, setSelected] = useState(null)
    const [qty, setQty] = useState(1)

    useEffect(() => {
        if (isOpen) {
            setCategory(initialCategory || 'All')
        }
        document.documentElement.classList.toggle('no-scroll', isOpen)
        if (!isOpen) {
            setQuery('')
            setSelected(null)
        }
    }, [isOpen, initialCategory])

    useEffect(() => {
        if (selected) setQty(1)
    }, [selected])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key !== 'Escape') return
            if (selected) {
                setSelected(null)
            } else {
                onClose?.()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose, selected])

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        return products.filter((item) => {
            const matchesCategory = category === 'All' || item.tag === category
            const matchesQuery =
                !q || item.label.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)
            return matchesCategory && matchesQuery
        })
    }, [query, category, products])

    const whatsappLink = (product) => {
        const message = `Hi! I'm interested in "${product.label}"${product.price ? ` (${product.price})` : ''}.`
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[90] flex flex-col bg-cream"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${SALON_NAME} store`}
                >
                    <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-10 lg:px-16">
                        <p className="font-display font-extrabold uppercase text-xl text-ink">The Store</p>
                        <button
                            onClick={onClose}
                            aria-label="Close store"
                            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-peach"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M5 5l14 14M19 5 5 19" />
                            </svg>
                        </button>
                    </div>

                    <div className="border-b border-ink/10 px-6 py-5 sm:px-10 lg:px-16">
                        <div className="mx-auto flex max-w-lg items-center gap-3 rounded-full border border-ink/15 bg-white px-5 py-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-ink/40">
                                <circle cx="11" cy="11" r="7" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                autoFocus
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='Search products, e.g. "serum" or "makeup"'
                                className="w-full bg-transparent font-sans text-sm text-ink placeholder:text-ink/40 outline-none"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="shrink-0 font-sans text-xs uppercase tracking-wideish text-ink/40 hover:text-ink"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
                            {CATEGORIES.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c)}
                                    className={`rounded-full px-4 py-2 font-sans text-xs uppercase tracking-wideish transition-colors ${category === c
                                            ? 'bg-ink text-cream'
                                            : 'bg-white text-ink/60 hover:bg-peach'
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10 lg:px-16">
                        {loading && <p className="mt-20 text-center font-sans text-ink/50">Loading products…</p>}
                        {!loading && results.length === 0 ? (
                            <p className="mt-20 text-center font-sans text-ink/50">
                                Nothing matches here yet — try a different word or category.
                            </p>
                        ) : (
                            <motion.div
                                layout
                                className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
                            >
                                <AnimatePresence>
                                    {results.map((item) => {
                                        const outOfStock = item.stock <= 0
                                        return (
                                            <motion.figure
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <motion.div
                                                    layoutId={`product-image-${item.id}`}
                                                    onClick={() => setSelected(item)}
                                                    className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl cursor-pointer"
                                                >
                                                    <ImagePlaceholder
                                                        src={item.image}
                                                        alt={item.label}
                                                        className={`absolute inset-0 ${outOfStock ? 'grayscale opacity-60' : ''}`}
                                                    />
                                                    {outOfStock && (
                                                        <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 font-sans text-[10px] uppercase tracking-wideish text-cream">
                                                            Out of stock
                                                        </span>
                                                    )}
                                                </motion.div>
                                                <figcaption className="mt-3">
                                                    <p className="font-sans text-xs uppercase tracking-wideish text-ink">{item.label}</p>
                                                    <p className="mt-1 font-sans text-xs uppercase tracking-wideish text-rose-deep">{item.tag}</p>
                                                </figcaption>
                                            </motion.figure>
                                        )
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>

                    <AnimatePresence>
                        {selected && (
                            <motion.div
                                className="fixed inset-0 z-[100] flex flex-col bg-cream"
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
                                    layoutId={`product-image-${selected.id}`}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="relative mx-auto h-[50vh] w-full max-w-xl overflow-hidden rounded-2xl sm:h-[60vh]"
                                >
                                    <ImagePlaceholder
                                        src={selected.image}
                                        alt={selected.label}
                                        className={`absolute inset-0 ${selected.stock <= 0 ? 'grayscale opacity-60' : ''}`}
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
                </motion.div>
            )}
        </AnimatePresence>
    )
}