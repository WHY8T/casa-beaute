import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import { GALLERY, SALON_NAME } from '../lib/content'

/**
 * Full-screen "enter the store" overlay: a searchable grid of the
 * boutique's products. Reuses the GALLERY placeholder items as the
 * catalog — add more entries to GALLERY in content.js to expand it.
 */
export default function StoreModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('')

    useEffect(() => {
        document.documentElement.classList.toggle('no-scroll', isOpen)
        if (!isOpen) setQuery('')
    }, [isOpen])

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose?.()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return GALLERY
        return GALLERY.filter(
            (item) => item.label.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)
        )
    }, [query])

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
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10 lg:px-16">
                        {results.length === 0 ? (
                            <p className="mt-20 text-center font-sans text-ink/50">
                                Nothing matches "{query}" yet — try a different word.
                            </p>
                        ) : (
                            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
                                {results.map((item) => (
                                    <figure key={item.id}>
                                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                                            <ImagePlaceholder className="absolute inset-0" />
                                        </div>
                                        <figcaption className="mt-3">
                                            <p className="font-sans text-xs uppercase tracking-wideish text-ink">{item.label}</p>
                                            <p className="mt-1 font-sans text-xs uppercase tracking-wideish text-rose-deep">{item.tag}</p>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}