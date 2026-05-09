import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full bg-bg-elevated text-text-primary border rounded-xl px-4 py-3',
            'placeholder:text-text-tertiary outline-none transition-colors',
            error
              ? 'border-status-error focus:border-status-error'
              : 'border-border focus:border-border-accent',
            className,
          ].join(' ')}
          {...props}
        />
        {error && <p className="text-xs text-status-error">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
