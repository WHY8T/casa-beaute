import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'casa-beaute-cart'

export function CartProvider({ children }) {
    const [items, setItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY)
            if (saved) setItems(JSON.parse(saved))
        } catch {
            // ignore corrupted storage
        }
    }, [])

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } catch {
            // storage full or unavailable — cart still works for this session
        }
    }, [items])

    function addItem(product, quantity = 1) {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
                )
            }
            return [
                ...prev,
                {
                    id: product.id,
                    label: product.label,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                    quantity,
                },
            ]
        })
        setIsOpen(true)
    }

    function removeItem(id) {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }

    function updateQuantity(id, quantity) {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
    }

    function clearCart() {
        setItems([])
    }

    const count = items.reduce((sum, i) => sum + i.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, count, isOpen, setIsOpen }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used inside CartProvider')
    return ctx
}