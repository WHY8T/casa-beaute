import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import useProducts from '../hooks/useProducts'

const CATEGORIES = ['Skincare', 'Haircare', 'Parfumerie', 'Makeup', 'Gift Sets']

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
        <div className="min-h-screen bg-cream px-6 py-10 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-extrabold uppercase text-ink">Products</h1>
                        <p className="mt-1 text-sm text-ink/60">Add, edit, or remove what's on your site.</p>
                    </div>
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="rounded-full border border-ink/20 px-5 py-2 text-sm text-ink hover:bg-peach"
                    >
                        Log out
                    </button>
                </div>

                <button
                    onClick={() => setEditing({})}
                    className="mt-8 rounded-full bg-rose-deep px-6 py-3 text-sm text-cream hover:bg-ink"
                >
                    + Add new product
                </button>

                {editing && (
                    <ProductForm
                        product={editing}
                        onClose={() => setEditing(null)}
                    />
                )}

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