import { useState } from 'react'
import { CheckIcon, MailIcon, SocialIcon, SupportIcon } from './icons'

const inputClasses = 'w-full rounded-[10px] border px-3.5 py-2.5 text-sm'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const submit = () => {
    if (name.trim() && email.trim()) setSent(true)
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1180px] border-t px-[clamp(20px,5vw,32px)] py-[clamp(60px,9vw,100px)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex flex-wrap gap-12">
        <div className="min-w-[280px] flex-[1_1_380px] [animation:revealUp_.6s_ease-out_both]">
          <div
            className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
            style={{ color: 'var(--glow-top)' }}
          >
            Contact
          </div>
          <h2 className="mb-3.5 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
            Talk to a human.
          </h2>
          <p className="mb-7 max-w-[440px] text-base leading-[1.6]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
            Questions about pricing, security, or rolling Trackd out to a team — reach out and
            we'll get back within one business day.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@trackd.io"
              className="flex items-center gap-3 transition-colors duration-150"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--glow-top)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
              >
                <MailIcon />
              </span>
              <span className="text-[14.5px] font-semibold">hello@trackd.io</span>
            </a>
            <a
              href="mailto:support@trackd.io"
              className="flex items-center gap-3 transition-colors duration-150"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--glow-top)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
              >
                <SupportIcon />
              </span>
              <div>
                <div className="text-[14.5px] font-semibold">support@trackd.io</div>
                <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                  Product &amp; account support
                </div>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
              >
                <SocialIcon />
              </span>
              <span className="text-[14.5px] font-semibold">@trackdhq — X &amp; LinkedIn</span>
            </div>
          </div>
        </div>

        <div
          className="min-w-[280px] flex-[1_1_380px] rounded-2xl border p-7 [animation:revealUp_.6s_ease-out_both]"
          style={{ borderColor: 'var(--border)' }}
        >
          {sent && (
            <div className="py-5 text-center">
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
                style={{ background: 'var(--surface-alt)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
              >
                <CheckIcon size={22} />
              </div>
              <h3 className="mb-2 text-[17px] font-bold">Message sent.</h3>
              <p className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--text-3)' }}>
                We'll reply to your email within one business day.
              </p>
            </div>
          )}
          {!sent && (
            <div>
              <div className="mb-4 flex flex-col gap-3.5">
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Rivera"
                    className={inputClasses}
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={inputClasses}
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    className={`${inputClasses} resize-none`}
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
                  />
                </div>
              </div>
              <button
                onClick={submit}
                className="w-full cursor-pointer rounded-[10px] border border-white/22 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-2)_85%,white_15%),var(--brand-2)_45%,var(--brand)_100%)] py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
              >
                Send message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
