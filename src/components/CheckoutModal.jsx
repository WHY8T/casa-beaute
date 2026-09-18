import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import { useCart } from '../context/CartContext'
import { formatPrice, parsePrice } from '../lib/format'

const WILAYAS = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
    'Ghardaïa', 'Relizane',
]

export default function CheckoutModal({ isOpen, onClose, onSuccess }) {
    const { items, clearCart } = useCart()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [wilaya, setWilaya] = useState('')
    const [address, setAddress] = useState('')
    const [notes, setNotes] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    const total = items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0)

    async function handleSubmit(e) {
        e.preventDefault()
        setBusy(true)
        setError('')

        const payload = items.map((i) => ({
            product_id: i.id,
            name: i.label,
            price: i.price,
            quantity: i.quantity,
        }))

        const { error: rpcError } = await supabase.rpc('place_order', {
            p_customer_name: name,
            p_phone: phone,
            p_address: address,
            p_wilaya: wilaya,
            p_notes: notes,
            p_items: payload,
        })

        setBusy(false)

        if (rpcError) {
            setError(rpcError.message)
            return
        }

        clearCart()
        onSuccess()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <h2 className="font-display text-xl font-extrabold uppercase text-ink">Checkout</h2>
                        <p className="mt-1 text-sm text-ink/60">Pay when your order arrives — no card needed.</p>

                        <div className="mt-5 rounded-xl bg-peach/50 p-4">
                            {items.map((i) => (
                                <div key={i.id} className="flex justify-between text-sm text-ink/80">
                                    <span>
                                        {i.label} × {i.quantity}
                                    </span>
                                    <span>{formatPrice(parsePrice(i.price) * i.quantity)}</span>
                                </div>
                            ))}
                            <div className="mt-2 flex justify-between border-t border-ink/10 pt-2 font-semibold text-ink">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        <label className="mt-5 block text-xs uppercase tracking-wideish text-ink/50">Full name</label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
                        />

                        <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Phone number</label>
                        <input
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="05XX XX XX XX"
                            className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
                        />

                        <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Wilaya</label>
                        <select
                            required
                            value={wilaya}
                            onChange={(e) => setWilaya(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
                        >
                            <option value="" disabled>
                                Select your wilaya
                            </option>
                            {WILAYAS.map((w) => (
                                <option key={w} value={w}>
                                    {w}
                                </option>
                            ))}
                        </select>

                        <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Delivery address</label>
                        <textarea
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={2}
                            className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
                        />

                        <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Notes (optional)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                            className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
                        />

                        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                        <div className="mt-6 flex gap-3">
                            <button
                                type="submit"
                                disabled={busy || items.length === 0}
                                className="flex-1 rounded-full bg-ink py-3 text-sm text-cream transition-colors hover:bg-rose-deep disabled:opacity-50"
                            >
                                {busy ? 'Placing order…' : 'Place order'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-full border border-ink/20 px-5 py-3 text-sm text-ink hover:bg-peach"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}