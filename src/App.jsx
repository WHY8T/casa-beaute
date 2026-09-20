import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import SectionWipe from './components/SectionWipe'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Story from './components/Story'
import Testimonials from './components/Testimonials'
import Marquee from './components/Marquee'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StoreModal from './components/StoreModal'
import CartDrawer from './components/CartDrawer'
import Admin from './components/Admin'
import { CartProvider } from './context/CartContext'
import useReducedMotion from './hooks/useReducedMotion'
import { initLenis, destroyLenis } from './lib/lenis'
import { MARQUEE_CTA, BRANDS } from './lib/content'

export default function App() {
  const reducedMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)
  const [storeCategory, setStoreCategory] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkHash = () => setIsAdmin(window.location.hash === '#admin')
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  useEffect(() => {
    if (isAdmin) return
    initLenis({ reducedMotion })
    return () => destroyLenis()
  }, [reducedMotion, isAdmin])

  if (isAdmin) {
    return <Admin />
  }

  function openStore(category) {
    setStoreCategory(category || null)
    setStoreOpen(true)
  }

  return (
    <CartProvider>
      <Preloader onDone={() => setLoaded(true)} />
      <Nav />
      <main>
        <Hero />
        <div className="bg-cream py-8">
          <Marquee items={BRANDS} />
        </div>
        <Services onShopCategory={(category) => openStore(category)} />
        <Gallery onOpenStore={() => openStore(null)} />
        <SectionWipe from="cream" to="peach" />
        <Story />
        <Testimonials />
        <div className="bg-cream py-10">
          <Marquee items={Array(8).fill(MARQUEE_CTA)} size="lg" />
        </div>
        <Contact />
      </main>
      <Footer />
      <StoreModal
        isOpen={storeOpen}
        initialCategory={storeCategory}
        onClose={() => setStoreOpen(false)}
      />
      <CartDrawer />
    </CartProvider>
  )
}