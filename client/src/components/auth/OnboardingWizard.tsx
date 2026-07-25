import type { AuthFields, Role } from './types'
import { AuthPrimaryButton, Chip, TextField } from './authPrimitives'

const EXPERIENCE_OPTIONS = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive']
const JOB_STATUS_OPTIONS = ['Actively looking', 'Open to offers', 'Not looking']
const COMPANY_SIZE_OPTIONS = ['1–10', '11–50', '51–200', '201–1000', '1000+']
const HIRING_ROLE_OPTIONS = ['Engineering', 'Design', 'Product', 'Sales', 'Marketing', 'Operations']
const URGENCY_OPTIONS = ['Immediate', 'This quarter', 'Just exploring']

const STEP_TOTAL = 2

interface OnboardingWizardProps {
  role: Role
  onboardStep: number
  fields: AuthFields
  stepValid: boolean
  onFieldChange: (key: 'targetRole' | 'companyName' | 'industry', value: string) => void
  onSelectChip: (key: 'experience' | 'jobStatus' | 'companySize' | 'urgency', value: string) => void
  onToggleMultiChip: (key: 'hiringRoles', value: string) => void
  onBack: () => void
  onContinue: () => void
}

function FieldLabel({ children }: { children: string }) {
  return (
    <label className="mb-2 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
      {children}
    </label>
  )
}

export default function OnboardingWizard({
  role,
  onboardStep,
  fields,
  stepValid,
  onFieldChange,
  onSelectChip,
  onToggleMultiChip,
  onBack,
  onContinue,
}: OnboardingWizardProps) {
  const isLastStep = onboardStep >= STEP_TOTAL - 1
  const isCandidateStep0 = role === 'candidate' && onboardStep === 0
  const isCandidateStep1 = role === 'candidate' && onboardStep === 1
  const isRecruiterStep0 = role === 'recruiter' && onboardStep === 0
  const isRecruiterStep1 = role === 'recruiter' && onboardStep === 1

  return (
    <>
      <div className="mb-2 flex items-center gap-2.5">
        <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
          STEP {onboardStep + 1} OF {STEP_TOTAL}
        </span>
      </div>
      <div className="mb-[26px] flex gap-1.5">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 overflow-hidden rounded-sm"
            style={{ background: 'var(--border)' }}
          >
            <div
              className="h-full rounded-sm"
              style={{
                background: 'var(--glow-top)',
                transition: 'width .3s ease-out',
                width: i <= onboardStep ? '100%' : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {isCandidateStep0 && (
        <>
          <h2 className="mb-2 text-[23px] font-extrabold tracking-[-0.01em]">Tell us about you.</h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--text-2)' }}>
            We'll use this to tailor your compatibility scores.
          </p>
          <div className="mb-[26px] flex flex-col gap-4">
            <TextField
              label="Target role or title"
              type="text"
              value={fields.targetRole}
              onChange={(e) => onFieldChange('targetRole', e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
            />
            <div>
              <FieldLabel>Experience level</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    selected={fields.experience === opt}
                    onClick={() => onSelectChip('experience', opt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {isCandidateStep1 && (
        <>
          <h2 className="mb-2 text-[23px] font-extrabold tracking-[-0.01em]">Resume &amp; status.</h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--text-2)' }}>
            Optional now — you can add this anytime from your dashboard.
          </p>
          <div
            className="mb-[22px] rounded-xl p-6 text-center"
            style={{
              border: '1px dashed var(--border-glass)',
              transition: 'border-color .15s ease-out, background-color .15s ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--glow-top)'
              e.currentTarget.style.backgroundColor = 'var(--surface-alt)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-glass)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <div
              className="mx-auto mb-3 flex items-center justify-center"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--surface-alt)',
                border: '1px solid var(--border-glass)',
                color: 'var(--glow-top)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4M8 8l4-4 4 4" />
                <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </svg>
            </div>
            <div className="mb-1 text-sm font-semibold" style={{ color: 'var(--text)' }}>
              Drop your resume, or browse
            </div>
            <div className="text-xs" style={{ color: 'var(--text-3)' }}>
              PDF or DOCX, up to 10MB
            </div>
          </div>
          <div>
            <FieldLabel>Job search status</FieldLabel>
            <div className="mb-[26px] flex flex-wrap gap-2">
              {JOB_STATUS_OPTIONS.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={fields.jobStatus === opt}
                  onClick={() => onSelectChip('jobStatus', opt)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {isRecruiterStep0 && (
        <>
          <h2 className="mb-2 text-[23px] font-extrabold tracking-[-0.01em]">About your company.</h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--text-2)' }}>
            This appears on every role you post.
          </p>
          <div className="mb-[26px] flex flex-col gap-4">
            <TextField
              label="Company name"
              type="text"
              value={fields.companyName}
              onChange={(e) => onFieldChange('companyName', e.target.value)}
              placeholder="Acme Inc."
            />
            <TextField
              label="Industry"
              type="text"
              value={fields.industry}
              onChange={(e) => onFieldChange('industry', e.target.value)}
              placeholder="e.g. Fintech"
            />
            <div>
              <FieldLabel>Company size</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {COMPANY_SIZE_OPTIONS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    selected={fields.companySize === opt}
                    onClick={() => onSelectChip('companySize', opt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {isRecruiterStep1 && (
        <>
          <h2 className="mb-2 text-[23px] font-extrabold tracking-[-0.01em]">What are you hiring for?</h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--text-2)' }}>
            Pick every team that applies — you can add roles later.
          </p>
          <div className="mb-5">
            <FieldLabel>Hiring for</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {HIRING_ROLE_OPTIONS.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={fields.hiringRoles.includes(opt)}
                  onClick={() => onToggleMultiChip('hiringRoles', opt)}
                />
              ))}
            </div>
          </div>
          <div>
            <FieldLabel>Hiring urgency</FieldLabel>
            <div className="mb-[26px] flex flex-wrap gap-2">
              {URGENCY_OPTIONS.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={fields.urgency === opt}
                  onClick={() => onSelectChip('urgency', opt)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-2.5">
        <button
          onClick={onBack}
          className="rounded-[10px] border px-5 py-[13px] text-[14.5px] font-semibold"
          style={{
            borderColor: 'var(--border)',
            background: 'transparent',
            color: 'var(--text)',
            cursor: 'pointer',
            transition: 'border-color .15s ease-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          ← Back
        </button>
        {/* Task spec: gate Continue on step validity (disable until required fields filled).
            The source only styles it as disabled but still fires — we actually block it. */}
        <AuthPrimaryButton onClick={onContinue} disabledLook={!stepValid} style={{ flex: 1, width: 'auto' }}>
          {isLastStep ? 'Finish →' : 'Continue →'}
        </AuthPrimaryButton>
      </div>
    </>
  )
}
