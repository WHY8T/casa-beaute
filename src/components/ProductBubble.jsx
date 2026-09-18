import { motion } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'

/**
 * A glassy sphere that gently floats forever, with the product photo
 * centered inside it. Used on both the shelf grid and the full product
 * view — the parent applies the shared layoutId, so the bubble itself
 * smoothly grows from a small shelf card into the full-screen view.
 *
 * The sphere and the product photo float on very slightly different
 * timings so they drift apart and back together — that's what reads as
 * "floating" rather than just bobbing in lockstep.
 */
export default function ProductBubble({ src, alt, outOfStock = false, floatDelay = 0, className = '' }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* the glass sphere itself */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-[4%] rounded-full"
                style={{
                    background:
                        'radial-gradient(circle at 30% 26%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 38%, rgba(230,214,255,0.18) 62%, rgba(200,132,128,0.14) 100%)',
                    boxShadow:
                        'inset 0 0 40px rgba(255,255,255,0.55), inset 0 -14px 30px rgba(107,58,42,0.08), 0 24px 40px rgba(107,58,42,0.14)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(1.5px)',
                }}
                animate={{ y: [0, -8, 0], scale: [1, 1.015, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
            />

            {/* soft diagonal sheen so it reads as glass, not a flat circle */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[4%] rounded-full"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 26%)' }}
            />

            {/* the product, floating slightly out of phase with the sphere */}
            <motion.div
                className="relative z-10 flex h-[58%] w-[58%] items-center justify-center overflow-hidden rounded-full"
                animate={{ y: [0, -11, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay + 0.15 }}
            >
                <ImagePlaceholder
                    src={src}
                    alt={alt}
                    className={`h-full w-full !object-contain drop-shadow-[0_18px_18px_rgba(60,30,20,0.22)] ${outOfStock ? 'grayscale opacity-50' : ''
                        }`}
                />
            </motion.div>
        </div>
    )
}