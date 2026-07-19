import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const primaryClasses =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/22 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-2)_85%,white_15%),var(--brand-2)_45%,var(--brand)_100%)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.25),0_8px_20px_rgba(15,82,186,0.3)] backdrop-blur-[14px] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.3),0_12px_28px_rgba(15,82,186,0.4)] active:translate-y-0 active:scale-[0.97] cursor-pointer'

export function PrimaryButton({ children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${primaryClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

const secondaryClasses =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-6 py-3.5 text-[15px] font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 cursor-pointer'

export function SecondaryButton({ children, className = '', style, ...props }: ButtonProps) {
  return (
    <button
      className={`${secondaryClasses} ${className}`}
      style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'transparent', ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
      {...props}
    >
      {children}
    </button>
  )
}
