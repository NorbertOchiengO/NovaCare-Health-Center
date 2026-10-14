export default function Wordmark({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="7" fill={light ? '#FFFFFF' : '#176B61'} />
        <path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6z" fill={light ? '#176B61' : '#FAFBF9'} />
        <circle cx="25" cy="8" r="2.4" fill="#DDAA67" />
      </svg>
      <span className="leading-tight">
        <span className={`block text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-teal-dark'}`}>NovaCare</span>
        <span className={`block text-xs font-semibold ${light ? 'text-mint' : 'text-ink-soft'}`}>Health Centre</span>
      </span>
    </span>
  )
}
