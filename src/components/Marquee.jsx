import useReducedMotion from '../hooks/useReducedMotion'

/**
 * A continuously scrolling row of text/logos, duplicated once so the loop
 * is seamless. Falls back to a static, wrapped row when reduced motion is
 * requested.
 */
export default function Marquee({ items, size = 'sm' }) {
  const reducedMotion = useReducedMotion()

  const toneClass = size === 'lg' ? 'text-ink' : 'text-ink/60'
  const sizeClass = size === 'lg' ? 'font-extrabold uppercase text-3xl sm:text-4xl' : 'text-sm sm:text-base'

  if (reducedMotion) {
    return (
      <div className={`flex flex-wrap justify-center gap-x-10 gap-y-3 px-6 ${toneClass} font-sans ${sizeClass}`}>
        {items.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`font-sans ${sizeClass} ${toneClass}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
