import { useEffect, useRef, useState } from 'react'
import { EXTENSION_CAPTURES, PARSE_POOL, primaryBtnStyle, type DraftApp, type ExtensionCapture } from './data'
import { CheckIcon } from './icons'

interface IngestionTabProps {
  onCommit: (draft: DraftApp) => void
}

type Mode = 'link' | 'text'
type Stage = 'idle' | 'loading' | 'ready'

export default function IngestionTab({ onCommit }: IngestionTabProps) {
  const [mode, setMode] = useState<Mode>('link')
  const [input, setInput] = useState('')
  const [stage, setStage] = useState<Stage>('idle')
  const [draft, setDraft] = useState<DraftApp | null>(null)
  const [newTag, setNewTag] = useState('')
  const [justCommitted, setJustCommitted] = useState(false)
  const [captures, setCaptures] = useState<ExtensionCapture[]>(EXTENSION_CAPTURES)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const committedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (committedTimerRef.current) clearTimeout(committedTimerRef.current)
    },
    [],
  )

  const extract = () => {
    if (!input.trim()) return
    setStage('loading')
    setJustCommitted(false)
    timerRef.current = setTimeout(() => {
      const pick = PARSE_POOL[Math.floor(Math.random() * PARSE_POOL.length)]
      setDraft({ source: 'paste', extId: null, ...pick, tags: [...pick.tags] })
      setStage('ready')
    }, 1200)
  }

  const reviewCapture = (cap: ExtensionCapture) => {
    if (cap.committed) return
    setDraft({ source: 'extension', extId: cap.id, company: cap.company, role: cap.role, location: cap.location, comp: cap.comp, tags: [...cap.tags] })
    setStage('ready')
    setJustCommitted(false)
  }

  const removeTag = (tag: string) => setDraft((d) => (d ? { ...d, tags: d.tags.filter((t) => t !== tag) } : d))
  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const val = newTag.trim()
    if (!val) return
    setDraft((d) => (d && !d.tags.includes(val) ? { ...d, tags: [...d.tags, val] } : d))
    setNewTag('')
  }

  const discard = () => {
    setDraft(null)
    setStage('idle')
    setInput('')
  }

  const commit = () => {
    if (!draft) return
    onCommit(draft)
    if (draft.source === 'extension' && draft.extId != null) {
      setCaptures((cs) => cs.map((c) => (c.id === draft.extId ? { ...c, committed: true } : c)))
    }
    setDraft(null)
    setStage('idle')
    setInput('')
    setJustCommitted(true)
    if (committedTimerRef.current) clearTimeout(committedTimerRef.current)
    committedTimerRef.current = setTimeout(() => setJustCommitted(false), 2600)
  }

  const toggleBase = 'flex-1 rounded-lg px-4 py-[7px] text-[13px] font-semibold transition-colors duration-150'
  const toggleStyle = (active: boolean) =>
    active ? { background: 'var(--surface-2)', color: 'var(--text)', cursor: 'pointer' as const, border: 'none' as const } : { background: 'transparent', color: 'var(--text-3)', cursor: 'pointer' as const, border: 'none' as const }

  return (
    <div>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Ingestion</h2>
      <p className="mb-6 text-[14px]" style={{ color: 'var(--text-2)' }}>
        Paste a link, paste the full posting, or pull in what the browser extension captured — verify it, then commit to your pipeline.
      </p>

      <div className="flex flex-wrap items-start gap-5">
        <div className="min-w-[300px] flex-1 basis-96">
          <div className="mb-6 rounded-2xl p-5 sm:p-6" style={{ border: '1px solid var(--border)' }}>
            <div className="mb-4 flex w-fit gap-0.5 rounded-[10px] p-[3px]" style={{ border: '1px solid var(--border)' }}>
              <button type="button" onClick={() => setMode('link')} className={toggleBase} style={toggleStyle(mode === 'link')}>
                Paste link
              </button>
              <button type="button" onClick={() => setMode('text')} className={toggleBase} style={toggleStyle(mode === 'text')}>
                Paste full text
              </button>
            </div>

            {mode === 'link' ? (
              <input
                type="text"
                placeholder="https://jobs.example.com/senior-backend-engineer"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="mb-4 w-full rounded-[10px] px-3.5 py-3 text-[14px]"
                style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
              />
            ) : (
              <textarea
                rows={7}
                placeholder="Paste the full job posting text here…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="mb-4 w-full resize-none rounded-[10px] px-3.5 py-3 text-[13.5px]"
                style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
              />
            )}

            <button
              type="button"
              onClick={extract}
              disabled={!input.trim() || stage === 'loading'}
              className="w-full rounded-[10px] py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-150"
              style={{
                border: 'none',
                background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                opacity: input.trim() ? 1 : 0.5,
              }}
            >
              {stage === 'loading' ? 'Extracting…' : 'Extract with AI'}
            </button>

            {stage === 'loading' && (
              <div
                className="mt-4 rounded-[10px] p-3.5 text-[11px] leading-[1.7]"
                style={{ border: '1px solid var(--border)', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
              >
                <div
                  className="mb-2 h-2 rounded-[3px]"
                  style={{ width: '85%', background: 'linear-gradient(90deg, var(--border), var(--border-glass), var(--border))', backgroundSize: '300% 100%', animation: 'shimmerSweep 1.4s linear infinite' }}
                />
                <div
                  className="h-2 rounded-[3px]"
                  style={{ width: '65%', background: 'linear-gradient(90deg, var(--border), var(--border-glass), var(--border))', backgroundSize: '300% 100%', animation: 'shimmerSweep 1.4s linear infinite .2s' }}
                />
              </div>
            )}
          </div>

          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            From your browser extension
          </div>
          <div className="flex flex-col gap-2.5">
            {captures.map((cap) => (
              <div key={cap.id} className="flex flex-wrap items-center gap-3.5 rounded-xl px-4 py-3.5" style={{ border: '1px solid var(--border)' }}>
                <div
                  className="flex items-center justify-center rounded-lg text-[12px] font-bold"
                  style={{ width: 32, height: 32, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', flexShrink: 0 }}
                >
                  {cap.company[0]}
                </div>
                <div className="min-w-[180px] flex-1">
                  <div className="text-[13.5px] font-bold" style={{ color: 'var(--text)' }}>
                    {cap.company}
                  </div>
                  <div className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                    {cap.role} · {cap.capturedAt}
                  </div>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
                >
                  Extension capture
                </span>
                <button
                  type="button"
                  onClick={() => reviewCapture(cap)}
                  disabled={cap.committed}
                  className="flex-shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold"
                  style={
                    cap.committed
                      ? { border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-3)', cursor: 'default' }
                      : { border: '1px solid var(--border-glass)', background: 'var(--surface-alt)', color: 'var(--glow-top)', cursor: 'pointer' }
                  }
                >
                  {cap.committed ? 'Added ✓' : 'Review'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-[300px] flex-1 basis-[340px] lg:sticky lg:top-[84px]">
          {draft && stage === 'ready' && (
            <div className="rounded-2xl p-5 sm:p-6" style={{ border: '1px solid var(--border-glass)', background: 'var(--surface-alt)' }}>
              <div className="mb-4 flex items-center gap-2" style={{ color: 'var(--glow-top)' }}>
                <CheckIcon size={17} />
                <h3 className="text-[15.5px] font-bold" style={{ color: 'var(--text)' }}>
                  Verify &amp; commit
                </h3>
              </div>
              <div className="mb-3.5 flex flex-col gap-3">
                <div>
                  <label className="mb-1 block text-[11.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                    Role title
                  </label>
                  <input
                    type="text"
                    value={draft.role}
                    onChange={(e) => setDraft((d) => (d ? { ...d, role: e.target.value } : d))}
                    className="w-full rounded-lg px-3 py-2.5 text-[13.5px]"
                    style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    value={draft.company}
                    onChange={(e) => setDraft((d) => (d ? { ...d, company: e.target.value } : d))}
                    className="w-full rounded-lg px-3 py-2.5 text-[13.5px]"
                    style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                  />
                </div>
                <div className="flex gap-2.5">
                  <div className="flex-1">
                    <label className="mb-1 block text-[11.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={draft.location}
                      onChange={(e) => setDraft((d) => (d ? { ...d, location: e.target.value } : d))}
                      className="w-full rounded-lg px-3 py-2.5 text-[13.5px]"
                      style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-[11.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                      Comp
                    </label>
                    <input
                      type="text"
                      value={draft.comp}
                      onChange={(e) => setDraft((d) => (d ? { ...d, comp: e.target.value } : d))}
                      className="w-full rounded-lg px-3 py-2.5 text-[13.5px]"
                      style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                    Skills / tags
                  </label>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {draft.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full py-1 pl-2.5 pr-1.5 text-[11.5px] font-semibold"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => removeTag(t)}
                          className="flex items-center justify-center"
                          style={{ width: 14, height: 14, border: 'none', background: 'transparent', color: 'var(--glow-top)', cursor: 'pointer', padding: 0 }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a tag, press Enter"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={onTagKeyDown}
                    className="w-full rounded-lg px-3 py-2 text-[12.5px]"
                    style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                  />
                </div>
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={discard}
                  className="flex-1 rounded-[10px] py-2.5 text-[13px] font-semibold"
                  style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}
                >
                  Discard
                </button>
                <button type="button" onClick={commit} className="flex-1 justify-center" style={{ ...primaryBtnStyle, justifyContent: 'center' }}>
                  Commit to Pipeline
                </button>
              </div>
            </div>
          )}

          {!draft && justCommitted && (
            <div
              className="rounded-2xl p-5 sm:p-6 text-center"
              style={{ border: '1px solid var(--border-glass)', background: 'color-mix(in srgb, var(--glow-top) 10%, var(--surface))', animation: 'scaleIn .2s ease-out both' }}
            >
              <div
                className="mx-auto mb-3 flex items-center justify-center rounded-full"
                style={{ width: 40, height: 40, background: 'var(--surface-alt)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
              >
                <CheckIcon size={19} />
              </div>
              <div className="mb-0.5 text-[14px] font-bold" style={{ color: 'var(--text)' }}>
                Added to Saved
              </div>
              <div className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                Find it in Pipeline → Kanban
              </div>
            </div>
          )}

          {!draft && !justCommitted && (
            <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ border: '1px dashed var(--border)' }}>
              <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--text-3)' }}>
                Paste a link or text, or review a capture from the extension — the extracted details show up here to verify before they join your pipeline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
