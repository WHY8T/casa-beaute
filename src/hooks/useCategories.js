import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Fetches the live category list from Supabase and keeps it in sync.
 * Categories are fully admin-managed: created in the dashboard with a
 * name, description and photo, and they double as the product category
 * options everywhere else on the site (Collections tiles, the contact
 * form, the store filters, and the product form's category picker).
 *
 * Returns { categories, loading }.
 * Each category looks like: { id, name, description, image }
 */
export default function useCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true

        async function load() {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('created_at', { ascending: true })

            if (!active) return

            if (error) {
                console.error('Failed to load categories:', error.message)
                setCategories([])
            } else {
                setCategories(
                    data.map((c) => ({
                        id: c.id,
                        name: c.name,
                        description: c.description,
                        image: c.image_url,
                    }))
                )
            }
            setLoading(false)
        }

        load()

        // Unique channel name per instance — several components use this
        // hook at the same time, so a shared fixed name causes a collision.
        const channelName = `categories-changes-${Math.random().toString(36).slice(2)}`
        const channel = supabase
            .channel(channelName)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, load)
            .subscribe()

        return () => {
            active = false
            supabase.removeChannel(channel)
        }
    }, [])

    return { categories, loading }
}