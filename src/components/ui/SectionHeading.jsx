export default function SectionHeading({ id, eyebrow, title, text, align = 'left', light = false }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-bold uppercase tracking-wider ${light ? 'text-accent' : 'text-teal-deep'}`}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`text-3xl sm:text-4xl ${light ? '!text-white' : ''}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-lg ${light ? 'text-mint' : 'text-ink-soft'}`}>{text}</p>}
    </div>
  )
}
