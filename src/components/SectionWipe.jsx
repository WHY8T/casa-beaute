/**
 * A full-width organic curve bridging two sections of alternating color,
 * echoing the wipe-style transitions between the cream/peach panels. `from`
 * is the color the section above ends in; `to` is the color the wave
 * reveals, which should match the section below's own background.
 */
const TONES = {
  ink: '#2E2E2E',
  cream: '#FAFAFA',
  peach: '#ECECEC',
}

export default function SectionWipe({ from = 'cream', to = 'peach' }) {
  const fromHex = TONES[from] ?? TONES.cream
  const toHex = TONES[to] ?? TONES.peach

  return (
    <div className="relative h-16 w-full overflow-hidden sm:h-24 lg:h-32" style={{ background: fromHex }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0,90 C280,10 420,170 760,100 C1040,40 1220,160 1440,70 L1440,200 L0,200 Z"
          fill={toHex}
        />
      </svg>
    </div>
  )
}