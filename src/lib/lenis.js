import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

/**
 * Initializes Lenis inertia scrolling and syncs it with GSAP's ticker so
 * ScrollTrigger stays perfectly in step with the smoothed scroll position.
 * No-ops (returns null) when the user prefers reduced motion — native
 * scrolling is left untouched in that case.
 */
export function initLenis({ reducedMotion } = {}) {
  if (reducedMotion) return null
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.1,
  })

  lenisInstance.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function destroyLenis() {
  lenisInstance?.destroy()
  lenisInstance = null
}
