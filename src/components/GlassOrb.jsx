export default function GlassOrb({ size = 180, className = '' }) {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{
        width: `clamp(140px, 40vw, ${size}px)`,
        height: `clamp(140px, 40vw, ${size}px)`,
        background:
          'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.25) 35%, rgba(200,132,128,0.25) 65%, rgba(107,58,42,0.25) 100%)',
        boxShadow: 'inset 0 0 30px rgba(255,255,255,0.3), 0 20px 40px rgba(200,132,128,0.2)',
        border: '1px solid rgba(255,255,255,0.4)',
        backdropFilter: 'blur(2px)',
      }}
      aria-hidden="true"
    />
  )
}
