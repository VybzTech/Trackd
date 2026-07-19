import { AuthPrimaryButton, GoogleButton, OrEmailDivider, TextField } from './authPrimitives'

interface SignUpFormProps {
  fullName: string
  email: string
  password: string
  onFullNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onGoogleContinue: () => void
  onSubmit: () => void
  onGoSignin: () => void
}

export default function SignUpForm({
  fullName,
  email,
  password,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onGoogleContinue,
  onSubmit,
  onGoSignin,
}: SignUpFormProps) {
  return (
    <>
      <h2 className="mb-2 text-[26px] font-extrabold tracking-[-0.01em]">Create your account.</h2>
      <p className="mb-7 text-[14.5px]" style={{ color: 'var(--text-2)' }}>
        Free for candidates. Takes about two minutes.
      </p>

      <GoogleButton onClick={onGoogleContinue} />

      <OrEmailDivider />

      <div className="mb-2.5 flex flex-col gap-3.5">
        <TextField
          label="Full name"
          type="text"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder="Jordan Rivera"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@company.com"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="At least 8 characters"
        />
      </div>

      <p className="mb-5 text-xs leading-[1.5]" style={{ color: 'var(--text-3)' }}>
        By continuing you agree to Trackd's Terms of Service and Privacy Policy.
      </p>

      <AuthPrimaryButton onClick={onSubmit}>Create account</AuthPrimaryButton>

      <p className="mt-[22px] text-center text-[13.5px]" style={{ color: 'var(--text-3)' }}>
        Already have an account?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onGoSignin()
          }}
          className="font-semibold"
          style={{ color: 'var(--glow-top)' }}
        >
          Sign in
        </a>
      </p>
    </>
  )
}
