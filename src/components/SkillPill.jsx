export default function SkillPill({ label }) {
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border:     '1px solid rgba(255,255,255,0.10)',
        color:      'var(--gray-1)',
      }}
    >
      {label}
    </span>
  )
}
