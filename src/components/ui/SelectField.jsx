import { forwardRef } from 'react'
import { FieldShell, inputClass } from './FormField.jsx'

const SelectField = forwardRef(function SelectField(
  { id, label, required, hint, error, options, placeholder = 'Select an option', ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      {(aria) => (
        <select id={id} ref={ref} className={`${inputClass} ${error ? 'border-danger' : 'border-line'}`} {...aria} {...rest}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}
    </FieldShell>
  )
})

export default SelectField
