import { Link } from 'react-router-dom'
import { AuthPrimaryButton } from './authPrimitives'

interface DoneScreenProps {
  headline: string
  subtext: string
  onDashboard: () => void
}

export default function DoneScreen({ headline, subtext, onDashboard }: DoneScreenProps) {
  return (
    <div className="text-center">
      {/* checkPop isn't defined in the shared index.css keyframes, so scope it here. */}
      <style>{`@keyframes checkPop { 0%{ opacity:0; transform: scale(0.6); } 60%{ transform: scale(1.1); } 100%{ opacity:1; transform: scale(1); } }`}</style>
      <div
        className="mx-auto mb-[22px] flex items-center justify-center"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--surface-alt)',
          border: '1px solid var(--border-glass)',
          color: 'var(--glow-top)',
          animation: 'checkPop .5s ease-out both',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 8px color-mix(in srgb, var(--glow-top) 8%, transparent)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 5 5 9-11" />
        </svg>
      </div>
      <h2 className="mb-2.5 text-[24px] font-extrabold tracking-[-0.01em]">{headline}</h2>
      <p className="mb-7 text-[14.5px] leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
        {subtext}
      </p>
      <AuthPrimaryButton onClick={onDashboard}>Continue to dashboard →</AuthPrimaryButton>
      <p className="mt-5">
        <Link to="/" className="text-[13px]" style={{ color: 'var(--text-3)' }}>
          ← Back to Trackd
        </Link>
      </p>
    </div>
  )
}
