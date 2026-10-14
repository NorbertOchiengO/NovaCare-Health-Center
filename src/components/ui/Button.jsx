const variants = {
  primary: 'bg-teal-deep text-white hover:bg-teal-dark border-2 border-teal-deep hover:border-teal-dark',
  secondary: 'bg-white text-teal-dark border-2 border-teal-deep hover:bg-mint',
  light: 'bg-white text-teal-dark border-2 border-white hover:bg-mint hover:border-mint',
  outlineLight: 'bg-transparent text-white border-2 border-white hover:bg-white/10',
}

export default function Button({ href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-bold transition-colors ${variants[variant]} ${className}`
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
