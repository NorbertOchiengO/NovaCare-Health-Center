import { forwardRef } from 'react'
import { CircleAlert } from 'lucide-react'

export const inputClass =
  'block min-h-12 w-full rounded-md border-2 bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-ink-soft/70 focus:border-teal-deep'

export function FieldShell({ id, label, required, hint, error, children }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errId = error ? `${id}-error` : undefined
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-bold text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true"> *</span>
        ) : (
          <span className="font-medium text-ink-soft"> (optional)</span>
        )}
      </label>
      {hint && <p id={hintId} className="mb-1.5 text-sm text-ink-soft">{hint}</p>}
      {children({ 'aria-describedby': [hintId, errId].filter(Boolean).join(' ') || undefined, 'aria-invalid': error ? 'true' : undefined })}
      {error && (
        <p id={errId} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-danger">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

const FormField = forwardRef(function FormField({ id, label, required, hint, error, multiline, className = '', ...rest }, ref) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      {(aria) =>
        multiline ? (
          <textarea id={id} ref={ref} rows={4} required={required} className={`${inputClass} ${error ? 'border-danger' : 'border-line'} ${className}`} {...aria} {...rest} />
        ) : (
          <input id={id} ref={ref} required={required} className={`${inputClass} ${error ? 'border-danger' : 'border-line'} ${className}`} {...aria} {...rest} />
        )
      }
    </FieldShell>
  )
})

export default FormField
