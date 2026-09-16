import { useEffect, useState } from 'react'
import { SALON_NAME } from '../lib/content'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Full-screen loader: a single realistic glass/soap bubble that gently
 * floats and shimmers, with the brand name and a live percentage fading
 * in at its center. Fades out once loading completes. Skipped entirely
 * for reduced motion.
 */
export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      onDone?.()
      setHidden(true)
      return
    }

    const start = performance.now()
    const duration = 1800
    let raf

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(Math.round(t * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setHidden(true)
          onDone?.()
        }, 400)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion, onDone])

  if (reducedMotion) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream transition-opacity duration-500 ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      aria-hidden="true"
    >
      <div className="bubble">
        <span className="bubble-shine" />
        <span className="bubble-shimmer" />
        <div className="relative flex flex-col items-center">
          <p className="font-display font-extrabold text-sm tracking-wideish text-ink/80">
            {SALON_NAME.toUpperCase()}
          </p>
          <p className="mt-2 font-sans text-xs tabular-nums text-ink/40">{progress}%</p>
        </div>
      </div>

      <style>{`
        .bubble {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle at 30% 26%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 40%, rgba(200,200,200,0.25) 75%, rgba(160,160,160,0.35) 100%);
          box-shadow:
            inset 0 0 24px rgba(255,255,255,0.6),
            inset 0 -14px 26px rgba(120,120,120,0.18),
            0 24px 50px rgba(80,80,80,0.18);
          border: 1px solid rgba(255,255,255,0.7);
          animation: bob 3.2s ease-in-out infinite;
        }
        .bubble-shine {
          position: absolute;
          top: 14%;
          left: 18%;
          width: 34%;
          height: 20%;
          border-radius: 999px;
          background: rgba(255,255,255,0.85);
          filter: blur(4px);
          transform: rotate(-18deg);
        }
        .bubble-shimmer {
          position: absolute;
          inset: -40%;
          background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%);
          animation: shimmer 3.6s ease-in-out infinite;
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-30%) translateY(-10%); }
          50% { transform: translateX(20%) translateY(10%); }
          100% { transform: translateX(-30%) translateY(-10%); }
        }
      `}</style>
    </div>
  )
}