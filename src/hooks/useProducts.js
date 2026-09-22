import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Fetches the live product list from Supabase and keeps it in sync.
 * Returns { products, loading }.
 * Each product looks like:
 * { id, label, tag, price, description, image, stock }
 */
export default function useProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true

        async function load() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })

            if (!active) return

            if (error) {
                console.error('Failed to load products:', error.message)
                setProducts([])
            } else {
                setProducts(
                    data.map((p) => ({
                        id: p.id,
                        label: p.name,
                        tag: p.category,
                        price: p.price,
                        description: p.description,
                        image: p.image_url,
                        stock: p.stock,
                        isNew: p.is_new ?? false,
                    }))
                )
            }
            setLoading(false)
        }

        load()

        // Unique channel name per instance — Gallery and StoreModal both use this
        // hook at the same time, so a shared fixed name causes a collision.
        const channelName = `products-changes-${Math.random().toString(36).slice(2)}`
        const channel = supabase
            .channel(channelName)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, load)
            .subscribe()

        return () => {
            active = false
            supabase.removeChannel(channel)
        }
    }, [])

    return { products, loading }
}