export default function HudCorner({ position = 'tl', size = 20, color = 'var(--cyan)' }) {
  const rotMap = { tl: 0, tr: 90, br: 180, bl: 270 }
  const rot    = rotMap[position] ?? 0

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{
        position:  'absolute',
        top:       position.startsWith('t') ? 0 : 'auto',
        bottom:    position.startsWith('b') ? 0 : 'auto',
        left:      position.endsWith('l')   ? 0 : 'auto',
        right:     position.endsWith('r')   ? 0 : 'auto',
        transform: `rotate(${rot}deg)`,
        pointerEvents: 'none',
      }}
    >
      <path d="M0 12 L0 0 L12 0" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  )
}
