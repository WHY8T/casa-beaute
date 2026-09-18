import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import useProducts from '../hooks/useProducts'

const CATEGORIES = ['Skincare', 'Haircare', 'Parfumerie', 'Makeup', 'Gift Sets']
const ORDER_STATUSES = ['pending', 'confirmed', 'delivered', 'cancelled']
const ORIGINAL_TITLE = 'Casa Beauté Admin'

function playChime() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const notes = [880, 1046.5]
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.value = freq
            const start = ctx.currentTime + i * 0.15
            gain.gain.setValueAtTime(0.001, start)
            gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02)
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4)
            osc.start(start)
            osc.stop(start + 0.4)
        })
    } catch {
        // audio not available in this browser context — safe to ignore
    }
}

export default function Admin() {
    const [session, setSession] = useState(null)
    const [checkingSession, setCheckingSession] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setCheckingSession(false)
        })
        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession)
        })
        return () => listener.subscription.unsubscribe()
    }, [])

    useEffect(() => {
        document.title = ORIGINAL_TITLE
    }, [])

    if (checkingSession) {
        return <div className="flex min-h-screen items-center justify-center bg-cream text-ink">Loading…</div>
    }

    return session ? <Dashboard /> : <Login />
}

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setBusy(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setError(error.message)
        setBusy(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="font-display text-2xl font-extrabold uppercase text-ink">Admin login</h1>
                <p className="mt-1 text-sm text-ink/60">Casa Beauté product manager</p>

                <label className="mt-6 block text-xs uppercase tracking-wideish text-ink/50">Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-rose-deep"
                />

                <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-rose-deep"
                />

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={busy}
                    className="mt-6 w-full rounded-full bg-ink py-3 text-sm text-cream transition-colors hover:bg-rose-deep disabled:opacity-50"
                >
                    {busy ? 'Signing in…' : 'Log in'}
                </button>
            </form>
        </div>
    )
}

function Dashboard() {
    const [tab, setTab] = useState('products')
    const [unseenCount, setUnseenCount] = useState(0)
    const [banner, setBanner] = useState(null)
    const titleIntervalRef = useRef(null)

    useEffect(() => {
        const channel = supabase
            .channel(`admin-order-alerts-${Math.random().toString(36).slice(2)}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
                setUnseenCount((c) => c + 1)
                setBanner(payload.new)
                playChime()
                setTimeout(() => setBanner((current) => (current?.id === payload.new.id ? null : current)), 7000)
            })
            .subscribe()

        return () => supabase.removeChannel(channel)
    }, [])

    useEffect(() => {
        if (unseenCount > 0 && !titleIntervalRef.current) {
            let flash = false
            titleIntervalRef.current = setInterval(() => {
                document.title = flash ? ORIGINAL_TITLE : `🔔 New Order!`
                flash = !flash
            }, 1000)
        }
        if (unseenCount === 0 && titleIntervalRef.current) {
            clearInterval(titleIntervalRef.current)
            titleIntervalRef.current = null
            document.title = ORIGINAL_TITLE
        }
        return () => {
            if (titleIntervalRef.current) {
                clearInterval(titleIntervalRef.current)
                titleIntervalRef.current = null
            }
        }
    }, [unseenCount])

    function goToOrders() {
        setTab('orders')
        setUnseenCount(0)
        setBanner(null)
    }

    return (
        <div className="min-h-screen bg-cream px-6 py-10 sm:px-10 lg:px-16">
            {banner && (
                <div className="fixed left-1/2 top-4 z-[200] w-[92%] max-w-sm -translate-x-1/2 rounded-2xl bg-ink px-5 py-4 text-cream shadow-xl">
                    <p className="font-display text-sm font-bold uppercase tracking-wideish">🔔 New order</p>
                    <p className="mt-1 text-sm text-cream/80">From {banner.customer_name} — {banner.phone}</p>
                    <button
                        onClick={goToOrders}
                        className="mt-3 rounded-full bg-cream px-4 py-1.5 text-xs uppercase tracking-wideish text-ink hover:bg-rose"
                    >
                        View order
                    </button>
                </div>
            )}

            <div className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-extrabold uppercase text-ink">Casa Beauté Admin</h1>
                        <p className="mt-1 text-sm text-ink/60">Manage your products and orders.</p>
                    </div>
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="rounded-full border border-ink/20 px-5 py-2 text-sm text-ink hover:bg-peach"
                    >
                        Log out
                    </button>
                </div>

                <div className="mt-8 flex gap-2">
                    <button
                        onClick={() => setTab('products')}
                        className={`rounded-full px-5 py-2 text-sm uppercase tracking-wideish ${tab === 'products' ? 'bg-ink text-cream' : 'bg-white text-ink/60 hover:bg-peach'
                            }`}
                    >
                        Products
                    </button>
                    <button
                        onClick={goToOrders}
                        className={`relative rounded-full px-5 py-2 text-sm uppercase tracking-wideish ${tab === 'orders' ? 'bg-ink text-cream' : 'bg-white text-ink/60 hover:bg-peach'
                            }`}
                    >
                        Orders
                        {unseenCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-deep text-[11px] text-cream">
                                {unseenCount}
                            </span>
                        )}
                    </button>
                </div>

                {tab === 'products' ? <ProductsTab /> : <OrdersTab />}
            </div>
        </div>
    )
}

function ProductsTab() {
    const { products, loading } = useProducts()
    const [editing, setEditing] = useState(null)

    async function handleDelete(id) {
        if (!confirm('Delete this product? This cannot be undone.')) return
        await supabase.from('products').delete().eq('id', id)
    }

    async function handleStockChange(id, newStock) {
        await supabase.from('products').update({ stock: newStock }).eq('id', id)
    }

    return (
        <div>
            <button
                onClick={() => setEditing({})}
                className="mt-8 rounded-full bg-rose-deep px-6 py-3 text-sm text-cream hover:bg-ink"
            >
                + Add new product
            </button>

            {editing && <ProductForm product={editing} onClose={() => setEditing(null)} />}

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {loading && <p className="text-ink/50">Loading products…</p>}
                {!loading && products.length === 0 && (
                    <p className="text-ink/50">No products yet — add your first one above.</p>
                )}
                {products.map((p) => (
                    <div key={p.id} className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-peach">
                            {p.image && <img src={p.image} alt={p.label} className="h-full w-full object-cover" />}
                            {p.stock <= 0 && (
                                <span className="absolute left-2 top-2 rounded-full bg-ink px-3 py-1 text-xs uppercase text-cream">
                                    Out of stock
                                </span>
                            )}
                        </div>
                        <p className="mt-3 font-display font-bold text-ink">{p.label}</p>
                        <p className="text-xs uppercase tracking-wideish text-rose-deep">{p.tag}</p>
                        <p className="mt-1 text-sm text-ink/70">{p.price}</p>

                        <div className="mt-3 flex items-center gap-2">
                            <label className="text-xs text-ink/50">Stock:</label>
                            <input
                                type="number"
                                defaultValue={p.stock}
                                onBlur={(e) => handleStockChange(p.id, Number(e.target.value))}
                                className="w-20 rounded-lg border border-ink/15 px-2 py-1 text-sm"
                            />
                        </div>

                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={() => setEditing(p)}
                                className="flex-1 rounded-full border border-ink/20 py-2 text-xs uppercase hover:bg-peach"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="flex-1 rounded-full border border-red-300 py-2 text-xs uppercase text-red-600 hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ProductForm({ product, onClose }) {
    const isEdit = Boolean(product.id)
    const [name, setName] = useState(product.label || '')
    const [category, setCategory] = useState(product.tag || CATEGORIES[0])
    const [price, setPrice] = useState(product.price || '')
    const [description, setDescription] = useState(product.description || '')
    const [stock, setStock] = useState(product.stock ?? 0)
    const [file, setFile] = useState(null)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setBusy(true)
        setError('')

        try {
            let imageUrl = product.image || null

            if (file) {
                const fileName = `${Date.now()}-${file.name}`
                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file)
                if (uploadError) throw uploadError

                const { data: publicUrlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName)
                imageUrl = publicUrlData.publicUrl
            }

            const payload = {
                name,
                category,
                price,
                description,
                stock: Number(stock),
                image_url: imageUrl,
            }

            if (isEdit) {
                const { error: updateError } = await supabase.from('products').update(payload).eq('id', product.id)
                if (updateError) throw updateError
            } else {
                const { error: insertError } = await supabase.from('products').insert(payload)
                if (insertError) throw insertError
            }

            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setBusy(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink">{isEdit ? 'Edit product' : 'New product'}</h2>

            <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Name</label>
            <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
            />

            <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
            >
                {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Price</label>
            <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 2 400 DA"
                className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
            />

            <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
            />

            <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">Stock quantity</label>
            <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-rose-deep"
            />

            <label className="mt-4 block text-xs uppercase tracking-wideish text-ink/50">
                Photo {isEdit && '(leave empty to keep current photo)'}
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 w-full text-sm"
            />

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex gap-3">
                <button
                    type="submit"
                    disabled={busy}
                    className="rounded-full bg-ink px-6 py-2.5 text-sm text-cream hover:bg-rose-deep disabled:opacity-50"
                >
                    {busy ? 'Saving…' : 'Save'}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-ink/20 px-6 py-2.5 text-sm text-ink hover:bg-peach"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

function OrdersTab() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    async function load() {
        setLoading(true)
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
        if (!error) setOrders(data)
        setLoading(false)
    }

    useEffect(() => {
        load()
        const channel = supabase
            .channel(`orders-changes-${Math.random().toString(36).slice(2)}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, load)
            .subscribe()
        return () => supabase.removeChannel(channel)
    }, [])

    async function updateStatus(id, status) {
        await supabase.from('orders').update({ status }).eq('id', id)
    }

    return (
        <div className="mt-8">
            {loading && <p className="text-ink/50">Loading orders…</p>}
            {!loading && orders.length === 0 && <p className="text-ink/50">No orders yet.</p>}

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="font-display font-bold text-ink">{order.customer_name}</p>
                                <p className="text-sm text-ink/60">{order.phone}</p>
                                <p className="text-sm text-ink/60">
                                    {order.wilaya ? `${order.wilaya} — ` : ''}
                                    {order.address}
                                </p>
                                {order.notes && <p className="mt-1 text-sm italic text-ink/50">"{order.notes}"</p>}
                                <p className="mt-1 text-xs text-ink/40">
                                    {new Date(order.created_at).toLocaleString()}
                                </p>
                            </div>

                            <select
                                value={order.status}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wideish ${order.status === 'pending'
                                        ? 'border-yellow-300 bg-yellow-50 text-yellow-700'
                                        : order.status === 'confirmed'
                                            ? 'border-blue-300 bg-blue-50 text-blue-700'
                                            : order.status === 'delivered'
                                                ? 'border-green-300 bg-green-50 text-green-700'
                                                : 'border-red-300 bg-red-50 text-red-700'
                                    }`}
                            >
                                {ORDER_STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-4 border-t border-ink/10 pt-4">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm text-ink/80">
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span>{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}