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
import useReducedMotion from './hooks/useReducedMotion'
import { initLenis, destroyLenis } from './lib/lenis'
import { MARQUEE_CTA, BRANDS } from './lib/content'

export default function App() {
  const reducedMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)

  useEffect(() => {
    initLenis({ reducedMotion })
    return () => destroyLenis()
  }, [reducedMotion])

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <Nav />
      <main>
        <Hero />
        <div className="bg-cream py-8">
          <Marquee items={BRANDS} />
        </div>
        <Gallery onOpenStore={() => setStoreOpen(true)} />
        <SectionWipe from="cream" to="peach" />
        <Story />
        {/* Services renders its own internal cream/peach alternation + wipes */}
        <Services />
        <SectionWipe from="cream" to="peach" />
        <Testimonials />
        <div className="bg-cream py-10">
          <Marquee items={Array(8).fill(MARQUEE_CTA)} size="lg" />
        </div>
        <Contact />
      </main>
      <Footer />
      <StoreModal isOpen={storeOpen} onClose={() => setStoreOpen(false)} />
    </>
  )
}