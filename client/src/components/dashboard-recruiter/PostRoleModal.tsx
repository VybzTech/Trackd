import { SENIORITY_OPTS, URGENCY_OPTS, VALUE_OPTS } from './data'
import { ModalShell, SegmentButton, Field, Pill, GhostButton, PrimaryButton } from './ui'

export interface NewRoleFormState {
  title: string
  location: string
  comp: string
  years: string
  stack: string
  desc: string
  seniority: string
  urgency: string
  values: string[]
}

export default function PostRoleModal({
  mode,
  onModeChange,
  link,
  onLinkChange,
  form,
  onFormChange,
  onClose,
  onConfirm,
}: {
  mode: 'link' | 'form'
  onModeChange: (m: 'link' | 'form') => void
  link: string
  onLinkChange: (v: string) => void
  form: NewRoleFormState
  onFormChange: (patch: Partial<NewRoleFormState>) => void
  onClose: () => void
  onConfirm: () => void
}) {
  const toggleValue = (label: string) => {
    onFormChange({ values: form.values.includes(label) ? form.values.filter((v) => v !== label) : [...form.values, label] })
  }

  return (
    <ModalShell onClose={onClose} maxWidth={600} labelledBy="post-role-title">
      <h3 id="post-role-title" className="mb-1.5 text-lg font-bold">
        Post a role
      </h3>
      <p className="mb-[18px] text-[13px]" style={{ color: 'var(--text-3)' }}>
        Roles posted here surface to Trackd candidates immediately.
      </p>

      <div className="mb-[22px] flex w-fit gap-0.5 rounded-[10px] border p-[3px]" style={{ borderColor: 'var(--border)' }}>
        <SegmentButton label="Paste a link" active={mode === 'link'} onClick={() => onModeChange('link')} />
        <SegmentButton label="Full details" active={mode === 'form'} onClick={() => onModeChange('form')} />
      </div>

      {mode === 'link' ? (
        <div className="mb-5 flex flex-col gap-3.5">
          <Field
            label="Posting URL"
            value={link}
            onChange={onLinkChange}
            placeholder="https://jobs.example.com/senior-designer or a Google Form link"
            hint="Works with your career page, a job board, or a Google Form — we'll keep it discoverable and scoreable without duplicating your workflow."
          />
        </div>
      ) : (
        <div className="mb-5 flex flex-col gap-3.5">
          <div className="flex flex-wrap gap-3">
            <Field label="Job title" value={form.title} onChange={(v) => onFormChange({ title: v })} placeholder="e.g. Staff Product Designer" />
            <Field label="Location" value={form.location} onChange={(v) => onFormChange({ location: v })} placeholder="e.g. Remote" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Field label="Compensation" value={form.comp} onChange={(v) => onFormChange({ comp: v })} placeholder="$150k–190k" />
            <Field
              label="Preferred years of experience"
              value={form.years}
              onChange={(v) => onFormChange({ years: v })}
              placeholder="4–7 years"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
              Seniority level
            </label>
            <div className="flex flex-wrap gap-2">
              {SENIORITY_OPTS.map((label) => (
                <Pill key={label} label={label} active={form.seniority === label} onClick={() => onFormChange({ seniority: label })} />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
              Level of determination
            </label>
            <p className="mb-2 text-[11px]" style={{ color: 'var(--text-3)' }}>
              How urgently are you hiring for this role?
            </p>
            <div className="flex flex-wrap gap-2">
              {URGENCY_OPTS.map((label) => (
                <Pill key={label} label={label} active={form.urgency === label} onClick={() => onFormChange({ urgency: label })} />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
              What matters most in a hire?
            </label>
            <p className="mb-2 text-[11px]" style={{ color: 'var(--text-3)' }}>
              Select all that apply — this shapes how we rank and score applicants.
            </p>
            <div className="flex flex-wrap gap-2">
              {VALUE_OPTS.map((label) => (
                <Pill key={label} label={label} active={form.values.includes(label)} onClick={() => toggleValue(label)} />
              ))}
            </div>
          </div>

          <Field
            label="Required skills / stack"
            value={form.stack}
            onChange={(v) => onFormChange({ stack: v })}
            placeholder="React, TypeScript, GraphQL"
          />

          <Field
            label="Role description"
            optional
            textarea
            rows={3}
            value={form.desc}
            onChange={(v) => onFormChange({ desc: v })}
            placeholder="Responsibilities, team context, anything candidates should know…"
          />
        </div>
      )}

      <div className="flex gap-2.5">
        <GhostButton onClick={onClose} className="flex-1">
          Cancel
        </GhostButton>
        <PrimaryButton onClick={onConfirm} className="flex-1 justify-center">
          Publish role
        </PrimaryButton>
      </div>
    </ModalShell>
  )
}
