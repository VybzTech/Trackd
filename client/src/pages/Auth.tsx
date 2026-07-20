import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import MinimalHeader from '../components/landing/MinimalHeader'
import DecorativePanel from '../components/auth/DecorativePanel'
import SignInForm from '../components/auth/SignInForm'
import SignUpForm from '../components/auth/SignUpForm'
import RolePicker from '../components/auth/RolePicker'
import OnboardingWizard from '../components/auth/OnboardingWizard'
import DoneScreen from '../components/auth/DoneScreen'
import type { AuthFields, Role, Screen } from '../components/auth/types'

const INITIAL_FIELDS: AuthFields = {
  fullName: '',
  email: '',
  password: '',
  targetRole: '',
  experience: null,
  jobStatus: null,
  companyName: '',
  industry: '',
  companySize: null,
  hiringRoles: [],
  urgency: null,
}

const ROLE_STEPS = 2

export default function Auth() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Seed screen/role from the URL once on mount, mirroring the source's
  // componentDidMount whitelist: only signin/signup seed `screen`, only
  // candidate/recruiter seed `role`; anything else is ignored.
  const [screen, setScreen] = useState<Screen>(() => {
    const s = searchParams.get('screen')
    return s === 'signup' || s === 'signin' ? s : 'signin'
  })
  const [role, setRole] = useState<Role | null>(() => {
    const r = searchParams.get('role')
    return r === 'candidate' || r === 'recruiter' ? r : null
  })

  const [signinRole, setSigninRole] = useState<Role>('candidate')
  const [onboardStep, setOnboardStep] = useState(0)
  const [cameFromSignIn, setCameFromSignIn] = useState(false)
  const [fields, setFields] = useState<AuthFields>(INITIAL_FIELDS)

  // Left panel hides at <= 860px, matching the source's isMobile check.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 860)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // --- field helpers ---
  const setField = <K extends keyof AuthFields>(key: K, value: AuthFields[K]) =>
    setFields((f) => ({ ...f, [key]: value }))
  const selectChip = (key: 'experience' | 'jobStatus' | 'companySize' | 'urgency', value: string) =>
    setFields((f) => ({ ...f, [key]: value }))
  const toggleMultiChip = (key: 'hiringRoles', value: string) =>
    setFields((f) => {
      const arr = f[key]
      return { ...f, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] }
    })

  // --- transitions ---
  const submitSignin = () => {
    setRole(signinRole)
    setCameFromSignIn(true)
    setScreen('done')
  }
  const submitSignup = () => {
    setCameFromSignIn(false)
    setScreen('role')
  }
  const googleContinue = () => {
    if (screen === 'signin') {
      setRole(signinRole)
      setCameFromSignIn(true)
      setScreen('done')
    } else {
      setCameFromSignIn(false)
      setScreen('role')
    }
  }
  const continueFromRole = () => {
    if (role) {
      setOnboardStep(0)
      setScreen('onboard')
    }
  }
  const continueOnboard = () => {
    if (onboardStep >= ROLE_STEPS - 1) setScreen('done')
    else setOnboardStep((s) => s + 1)
  }
  const backOnboard = () => {
    if (onboardStep === 0) setScreen('role')
    else setOnboardStep((s) => s - 1)
  }
  const clickDashboard = () => navigate(role === 'recruiter' ? '/dashboard/recruiter' : '/dashboard/candidate')

  const onboardStepValid =
    role === 'candidate' && onboardStep === 0
      ? !!fields.targetRole && !!fields.experience
      : role === 'candidate' && onboardStep === 1
        ? !!fields.jobStatus
        : role === 'recruiter' && onboardStep === 0
          ? !!fields.companyName && !!fields.companySize
          : role === 'recruiter' && onboardStep === 1
            ? fields.hiringRoles.length > 0 && !!fields.urgency
            : false

  const doneHeadline = cameFromSignIn
    ? 'Welcome back.'
    : role === 'recruiter'
      ? 'Welcome aboard — recruiter workspace ready.'
      : "You're all set."
  const doneSubtext = cameFromSignIn
    ? 'Taking you to your workspace.'
    : role === 'recruiter'
      ? 'Your hiring workspace is configured and ready.'
      : 'Your candidate workspace is configured and ready.'

  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <MinimalHeader theme={theme} toggleTheme={toggleTheme} />

      <div className="flex min-h-0 flex-1">
        {!isMobile && <DecorativePanel />}

        <div className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-8">
          <div className="w-full max-w-[400px]" style={{ animation: 'revealUp .4s ease-out both' }}>
            {screen === 'signin' && (
              <SignInForm
                signinRole={signinRole}
                email={fields.email}
                password={fields.password}
                onSelectRole={setSigninRole}
                onEmailChange={(v) => setField('email', v)}
                onPasswordChange={(v) => setField('password', v)}
                onGoogleContinue={googleContinue}
                onSubmit={submitSignin}
                onGoSignup={() => setScreen('signup')}
              />
            )}

            {screen === 'signup' && (
              <SignUpForm
                fullName={fields.fullName}
                email={fields.email}
                password={fields.password}
                onFullNameChange={(v) => setField('fullName', v)}
                onEmailChange={(v) => setField('email', v)}
                onPasswordChange={(v) => setField('password', v)}
                onGoogleContinue={googleContinue}
                onSubmit={submitSignup}
                onGoSignin={() => setScreen('signin')}
              />
            )}

            {screen === 'role' && (
              <RolePicker
                role={role}
                onSelectRole={setRole}
                onContinue={continueFromRole}
                onBack={() => setScreen('signup')}
              />
            )}

            {screen === 'onboard' && role && (
              <OnboardingWizard
                role={role}
                onboardStep={onboardStep}
                fields={fields}
                stepValid={onboardStepValid}
                onFieldChange={setField}
                onSelectChip={selectChip}
                onToggleMultiChip={toggleMultiChip}
                onBack={backOnboard}
                onContinue={continueOnboard}
              />
            )}

            {screen === 'done' && (
              <DoneScreen headline={doneHeadline} subtext={doneSubtext} onDashboard={clickDashboard} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
