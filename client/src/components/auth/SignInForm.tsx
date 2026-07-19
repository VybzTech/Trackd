import type { CSSProperties } from 'react'
import type { Role } from './types'
import { AuthInput, AuthPrimaryButton, GoogleButton, OrEmailDivider, TextField } from './authPrimitives'

interface SignInFormProps {
  signinRole: Role
  email: string
  password: string
  onSelectRole: (role: Role) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onGoogleContinue: () => void
  onSubmit: () => void
  onGoSignup: () => void
}

const toggleBase: CSSProperties = {
  flex: 1,
  padding: '9px 14px',
  borderRadius: '8px',
  fontSize: '13.5px',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  transition: 'all .15s ease-out',
}

// NOTE: the prototype uses `background:var(--surface-2)` for the selected tab — a
// token that is undefined in both the prototype's THEME_VARS and our index.css, so
// no background pill renders. Kept bare to reproduce the source exactly; the
// selected tab is still distinguished by brighter text (--text vs --text-3).
function toggleStyle(active: boolean): CSSProperties {
  return {
    ...toggleBase,
    background: active ? 'var(--surface-2)' : 'transparent',
    color: active ? 'var(--text)' : 'var(--text-3)',
  }
}

export default function SignInForm({
  signinRole,
  email,
  password,
  onSelectRole,
  onEmailChange,
  onPasswordChange,
  onGoogleContinue,
  onSubmit,
  onGoSignup,
}: SignInFormProps) {
  return (
    <>
      <h2 className="mb-2 text-[26px] font-extrabold tracking-[-0.01em]">Welcome back.</h2>
      <p className="mb-5 text-[14.5px]" style={{ color: 'var(--text-2)' }}>
        Sign in to continue to your workspace.
      </p>

      <div
        className="mb-[22px] flex gap-0.5 rounded-[10px] border p-[3px]"
        style={{ borderColor: 'var(--border)' }}
      >
        <button style={toggleStyle(signinRole === 'candidate')} onClick={() => onSelectRole('candidate')}>
          Candidate
        </button>
        <button style={toggleStyle(signinRole === 'recruiter')} onClick={() => onSelectRole('recruiter')}>
          Recruiter
        </button>
      </div>

      <GoogleButton onClick={onGoogleContinue} />

      <OrEmailDivider />

      <div className="mb-[22px] flex flex-col gap-3.5">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@company.com"
        />
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
              Password
            </label>
            <a href="#" className="text-xs" style={{ color: 'var(--glow-top)' }}>
              Forgot?
            </a>
          </div>
          <AuthInput
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="••••••••"
          />
        </div>
      </div>

      <AuthPrimaryButton onClick={onSubmit}>Sign in</AuthPrimaryButton>

      <p className="mt-[22px] text-center text-[13.5px]" style={{ color: 'var(--text-3)' }}>
        New to Trackd?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onGoSignup()
          }}
          className="font-semibold"
          style={{ color: 'var(--glow-top)' }}
        >
          Create an account
        </a>
      </p>
    </>
  )
}
