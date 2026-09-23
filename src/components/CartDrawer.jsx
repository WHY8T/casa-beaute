import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { formatPrice, parsePrice } from '../lib/format'
import ImagePlaceholder from './ImagePlaceholder'
import CheckoutModal from './CheckoutModal'

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart()
    const [checkoutOpen, setCheckoutOpen] = useState(false)
    const [placedOrder, setPlacedOrder] = useState(false)

    const total = items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0)

    function close() {
        setIsOpen(false)
        setPlacedOrder(false)
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-[105] bg-ink/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                        />
                        <motion.div
                            className="fixed right-0 top-0 z-[106] flex h-full w-full max-w-sm flex-col bg-cream shadow-xl"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                        >
                            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                                <p className="font-display text-lg font-extrabold uppercase text-ink">Votre panier</p>
                                <button
                                    onClick={close}
                                    aria-label="Fermer le panier"
                                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-peach"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d="M5 5l14 14M19 5 5 19" />
                                    </svg>
                                </button>
                            </div>

                            {placedOrder ? (
                                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                                    <p className="font-display text-2xl font-extrabold uppercase text-ink">Commande passée !</p>
                                    <p className="mt-2 text-sm text-ink/60">
                                        Nous vous contacterons pour confirmer la livraison. Merci d'avoir choisi Casa Beauté.
                                    </p>
                                    <button
                                        onClick={close}
                                        className="mt-6 rounded-full bg-ink px-6 py-3 text-sm text-cream hover:bg-rose-deep"
                                    >
                                        Terminé
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1 overflow-y-auto px-6 py-4">
                                        {items.length === 0 ? (
                                            <p className="mt-10 text-center text-sm text-ink/50">Votre panier est vide.</p>
                                        ) : (
                                            items.map((item) => (
                                                <div key={item.id} className="flex gap-3 border-b border-ink/10 py-4">
                                                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                                                        <ImagePlaceholder src={item.image} alt={item.label} className="h-full w-full" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-sans text-sm font-medium text-ink">{item.label}</p>
                                                        <p className="mt-1 text-xs text-ink/50">{item.price}</p>
                                                        <div className="mt-2 flex items-center gap-3">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-ink hover:bg-peach"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="text-sm text-ink">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-ink hover:bg-peach"
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="ml-auto text-xs uppercase tracking-wideish text-ink/40 hover:text-red-600"
                                                            >
                                                                Retirer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {items.length > 0 && (
                                        <div className="border-t border-ink/10 px-6 py-5">
                                            <div className="flex justify-between font-sans text-sm text-ink">
                                                <span>Total</span>
                                                <span className="font-semibold">{formatPrice(total)}</span>
                                            </div>
                                            <button
                                                onClick={() => setCheckoutOpen(true)}
                                                className="mt-4 w-full rounded-full bg-ink py-3 text-sm text-cream transition-colors hover:bg-rose-deep"
                                            >
                                                Commander
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <CheckoutModal
                isOpen={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
                onSuccess={() => {
                    setCheckoutOpen(false)
                    setPlacedOrder(true)
                }}
            />
        </>
    )
}