import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NEIGHBORHOODS = [
  'Washington Heights', 'Inwood', 'Upper West Side',
  'Upper East Side', 'Harlem', 'Morningside Heights',
  'Yorkville', 'Riverdale', 'Fort George',
]

const LIFESTYLE_TAGS = [
  'Night owl', 'Early riser', 'WFH', 'Gym-goer',
  'Pet-friendly', 'Social', 'Quiet', 'Music',
  'Clean freak', 'Chef at home', 'No smoking', 'Students ok',
]

const DOC_SLOTS = [
  { id: 'gov',    label: 'Government ID',       icon: '🪪', required: true  },
  { id: 'income', label: 'Proof of Income',     icon: '💼', required: true  },
  { id: 'bank',   label: 'Bank Statements',     icon: '🏦', required: false },
  { id: 'credit', label: 'Credit Report',       icon: '📊', required: false },
  { id: 'other',  label: 'Additional Documents',icon: '📎', required: false },
]

/* ── Shared styles ── */
const S = {
  wrap: {
    minHeight: '100vh', background: '#0D0F14',
    display: 'flex', flexDirection: 'column',
    alignItems: 'stretch',
  },
  inner: {
    flex: 1, display: 'flex', flexDirection: 'column',
    padding: '0 24px 48px', maxWidth: 440, margin: '0 auto', width: '100%',
  },
  label: {
    display: 'block', fontSize: 11, fontWeight: 700,
    color: '#6B7280', marginBottom: 7,
    textTransform: 'uppercase', letterSpacing: '0.07em',
  },
  input: {
    width: '100%', padding: '12px 14px',
    background: '#1B2A4A',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: 10, color: '#fff',
    fontFamily: 'Inter, sans-serif', fontSize: 15,
    outline: 'none', transition: 'border-color 0.15s',
  },
  ctaPrimary: {
    width: '100%', padding: '14px 0',
    background: '#00C9A7', border: 'none',
    color: '#0D0F14', borderRadius: 12,
    fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,201,167,0.35)',
    transition: 'opacity 0.15s, transform 0.12s',
  },
  ctaGhost: {
    width: '100%', padding: '13px 0',
    background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.12)',
    color: '#9CA3AF', borderRadius: 12,
    fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500,
    cursor: 'pointer',
  },
}

/* ── OTP input ── */
function OTPInput({ value, onChange }) {
  const refs = useRef([])

  function handleChange(i, v) {
    const digit = v.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[i] = digit
    onChange(next)
    if (digit && i < 5) refs.current[i + 1]?.focus()
  }

  function handleKey(i, e) {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    e.preventDefault()
    const next = Array(6).fill('')
    text.split('').forEach((ch, i) => { next[i] = ch })
    onChange(next)
    refs.current[Math.min(text.length, 5)]?.focus()
  }

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {value.map((v, i) => (
        <input
          key={i}
          ref={el => refs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          onPaste={handlePaste}
          style={{
            width: 46, height: 54,
            background: '#1B2A4A',
            border: `2px solid ${v ? '#00C9A7' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 10,
            color: '#fff',
            fontSize: 22, fontWeight: 700,
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#00C9A7' }}
          onBlur={e  => { if (!v) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
        />
      ))}
    </div>
  )
}

/* ── Toggle ── */
function Toggle({ on, onChange }) {
  return (
    <label style={{ position: 'relative', width: 44, height: 24, cursor: 'pointer', display: 'block', flexShrink: 0 }}>
      <input type="checkbox" checked={on} onChange={() => onChange(!on)}
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: on ? '#00C9A7' : 'rgba(255,255,255,0.1)', transition: 'background 0.2s' }} />
      <div style={{ position: 'absolute', width: 18, height: 18, background: '#fff', borderRadius: '50%', top: 3, left: 3, transform: on ? 'translateX(20px)' : 'none', transition: 'transform 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
    </label>
  )
}

/* ── Multi-select chip ── */
function Chip({ label, active, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
      background: active ? '#00C9A7' : 'rgba(255,255,255,0.06)',
      color: active ? '#0D0F14' : '#9CA3AF',
      fontSize: 13, fontWeight: active ? 700 : 400,
      fontFamily: 'Inter, sans-serif',
      transition: 'all 0.15s',
    }}>{label}</button>
  )
}

/* ═══════════════════════════════════════
   Main component
═══════════════════════════════════════ */
export default function Onboarding() {
  const navigate = useNavigate()

  const [step, setStep]   = useState(1)
  const [dir,  setDir]    = useState('fwd')
  const [data, setData]   = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '', showPw: false,
    phone: '', showOTP: false, otp: Array(6).fill(''), otpVerified: false,
    countdown: 30, canResend: false,
    budgetMin: '', budgetMax: '', moveInDate: '',
    bedrooms: [], neighborhoods: [], openToRoommate: true,
    bio: '', tags: [], photo: null,
    docs: {},
  })

  /* Dynamic step list */
  const STEPS = ['welcome', 'basics', 'phone', 'prefs',
    ...(data.openToRoommate ? ['vibe'] : []), 'docs', 'success']
  const total    = STEPS.length
  const stepName = STEPS[step - 1]

  /* Progress: step 1 has no bar; 100% at final step */
  const progress = step < 2 ? 0 : ((step - 1) / (total - 1)) * 100

  function upd(key, val) { setData(d => ({ ...d, [key]: val })) }

  function goNext() {
    if (step >= total) {
      localStorage.setItem('vryfid_user', JSON.stringify({
        firstName: data.firstName,
        lastName:  data.lastName,
        budgetMin: data.budgetMin || '1500',
        budgetMax: data.budgetMax || '3000',
      }))
      localStorage.setItem('vryfid_onboarded', '1')
      navigate('/')
      return
    }
    setDir('fwd')
    setStep(s => s + 1)
  }

  function goBack() {
    if (step <= 1) return
    setDir('back')
    setStep(s => s - 1)
  }

  /* OTP countdown */
  useEffect(() => {
    if (!data.showOTP || data.otpVerified) return
    if (data.countdown <= 0) { upd('canResend', true); return }
    const t = setTimeout(() => upd('countdown', data.countdown - 1), 1000)
    return () => clearTimeout(t)
  }, [data.showOTP, data.countdown, data.otpVerified])

  /* OTP auto-verify when all 6 filled */
  useEffect(() => {
    if (!data.showOTP || data.otpVerified) return
    if (data.otp.every(v => v !== '')) {
      upd('otpVerified', true)
      setTimeout(goNext, 900)
    }
  }, [data.otp])

  /* ─────── Step renderers ─────── */

  function StepWelcome() {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px 48px', maxWidth: 440, margin: '0 auto', width: '100%' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <img src="/vryfid-logo.jpeg" alt="VryfID" style={{ height: 56, borderRadius: 12 }} />
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 38, fontWeight: 900, color: '#fff',
          textAlign: 'center', lineHeight: 1.15, marginBottom: 14,
        }}>
          Find your home,<br />
          <em style={{ color: '#F97316' }}>stress-free.</em>
        </h1>

        <p style={{ color: '#9CA3AF', fontSize: 15, textAlign: 'center', lineHeight: 1.6, marginBottom: 48, maxWidth: 320, alignSelf: 'center' }}>
          VryfID organizes your entire search — applications, documents, and the perfect roommate — in one place.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={goNext} style={S.ctaPrimary}>
            Create account
          </button>
          <button onClick={() => {
            localStorage.setItem('vryfid_onboarded', '1')
            navigate('/')
          }} style={S.ctaGhost}>
            I already have an account
          </button>
        </div>
      </div>
    )
  }

  function StepBasics() {
    const allFilled = data.firstName && data.lastName && data.email &&
                      data.password.length >= 6 && data.password === data.confirmPassword
    return (
      <div style={S.inner}>
        <div style={{ paddingTop: 56 }}>
          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Step 1 of {total - 1}</p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 32 }}>
            Tell us about yourself
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {[['First name', 'firstName'], ['Last name', 'lastName']].map(([ph, key]) => (
              <div key={key}>
                <label style={S.label}>{ph}</label>
                <input value={data[key]} onChange={e => upd(key, e.target.value)}
                  placeholder={ph} style={S.input}
                  onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
                  onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={S.label}>Email address</label>
            <input type="email" value={data.email} onChange={e => upd('email', e.target.value)}
              placeholder="you@email.com" style={S.input}
              onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
              onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>

          <div style={{ marginBottom: 14, position: 'relative' }}>
            <label style={S.label}>Password</label>
            <input type={data.showPw ? 'text' : 'password'} value={data.password}
              onChange={e => upd('password', e.target.value)}
              placeholder="Min 6 characters" style={{ ...S.input, paddingRight: 44 }}
              onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
              onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
            <button onClick={() => upd('showPw', !data.showPw)} style={{
              position: 'absolute', right: 12, top: 34,
              background: 'none', border: 'none',
              color: '#6B7280', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter, sans-serif',
            }}>{data.showPw ? 'Hide' : 'Show'}</button>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={S.label}>Confirm password</label>
            <input type="password" value={data.confirmPassword}
              onChange={e => upd('confirmPassword', e.target.value)}
              placeholder="Repeat password" style={{
                ...S.input,
                borderColor: data.confirmPassword && data.confirmPassword !== data.password
                  ? '#EF4444' : 'rgba(255,255,255,0.08)',
              }}
              onFocus={e => e.currentTarget.style.borderColor = data.confirmPassword !== data.password ? '#EF4444' : '#00C9A7'}
              onBlur={e  => e.currentTarget.style.borderColor = data.confirmPassword && data.confirmPassword !== data.password ? '#EF4444' : 'rgba(255,255,255,0.08)'} />
            {data.confirmPassword && data.confirmPassword !== data.password && (
              <p style={{ fontSize: 12, color: '#EF4444', marginTop: 5 }}>Passwords don't match</p>
            )}
          </div>

          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 20, lineHeight: 1.5 }}>
            By continuing you agree to VryfID's <span style={{ color: '#9CA3AF', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#9CA3AF', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>

          <button onClick={goNext} disabled={!allFilled} style={{
            ...S.ctaPrimary,
            opacity: allFilled ? 1 : 0.4,
            cursor: allFilled ? 'pointer' : 'not-allowed',
          }}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function StepPhone() {
    const canContinue = data.phone.replace(/\D/g, '').length >= 10

    return (
      <div style={S.inner}>
        <div style={{ paddingTop: 56 }}>
          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Step 2 of {total - 1}</p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            {data.showOTP ? 'Enter verification code' : 'Verify your phone'}
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 32, lineHeight: 1.5 }}>
            {data.showOTP
              ? `We sent a 6-digit code to ${data.phone}`
              : 'We\'ll text you a quick code to verify your number.'}
          </p>

          {!data.showOTP ? (
            <>
              <label style={S.label}>Phone number</label>
              <div style={{ display: 'flex', gap: 0, marginBottom: 28 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '12px 14px',
                  background: '#1B2A4A',
                  border: '1.5px solid rgba(255,255,255,0.08)',
                  borderRight: 'none',
                  borderRadius: '10px 0 0 10px',
                  color: '#fff', fontSize: 15,
                  flexShrink: 0,
                }}>
                  <span>🇺🇸</span>
                  <span style={{ color: '#9CA3AF' }}>+1</span>
                </div>
                <input type="tel" value={data.phone} onChange={e => upd('phone', e.target.value)}
                  placeholder="(555) 000-0000"
                  style={{ ...S.input, borderRadius: '0 10px 10px 0', flex: 1 }}
                  onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
                  onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>

              <button onClick={() => {
                upd('showOTP', true)
                upd('countdown', 30)
                upd('canResend', false)
              }} disabled={!canContinue} style={{
                ...S.ctaPrimary,
                opacity: canContinue ? 1 : 0.4,
                cursor: canContinue ? 'pointer' : 'not-allowed',
              }}>
                Send code
              </button>
            </>
          ) : (
            <>
              {data.otpVerified ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'rgba(0,201,167,0.12)',
                    border: '2px solid #00C9A7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: 28,
                    animation: 'scale-in-bounce 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
                  }}>✓</div>
                  <p style={{ color: '#00C9A7', fontWeight: 600 }}>Verified!</p>
                </div>
              ) : (
                <>
                  <OTPInput value={data.otp} onChange={v => upd('otp', v)} />
                  <div style={{ textAlign: 'center', marginTop: 22 }}>
                    {data.canResend ? (
                      <button onClick={() => {
                        upd('otp', Array(6).fill(''))
                        upd('countdown', 30)
                        upd('canResend', false)
                      }} style={{
                        background: 'none', border: 'none',
                        color: '#00C9A7', fontSize: 14, fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      }}>Resend code</button>
                    ) : (
                      <span style={{ color: '#6B7280', fontSize: 13 }}>
                        Resend in {data.countdown}s
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#6B7280', fontSize: 12, textAlign: 'center', marginTop: 12 }}>
                    Enter any code — this is a demo
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  function StepPrefs() {
    const bedroomOpts = ['Studio', '1 BR', '2 BR', '3 BR+']

    function toggleBed(b) {
      upd('bedrooms', data.bedrooms.includes(b)
        ? data.bedrooms.filter(x => x !== b)
        : [...data.bedrooms, b])
    }
    function toggleHood(h) {
      upd('neighborhoods', data.neighborhoods.includes(h)
        ? data.neighborhoods.filter(x => x !== h)
        : [...data.neighborhoods, h])
    }

    return (
      <div style={S.inner}>
        <div style={{ paddingTop: 56 }}>
          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Step 3 of {total - 1}</p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 32 }}>
            Rental preferences
          </h2>

          {/* Budget */}
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Monthly budget</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'center' }}>
              <input type="number" value={data.budgetMin} onChange={e => upd('budgetMin', e.target.value)}
                placeholder="Min $" style={S.input}
                onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
                onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
              <span style={{ color: '#6B7280', fontSize: 13, textAlign: 'center' }}>to</span>
              <input type="number" value={data.budgetMax} onChange={e => upd('budgetMax', e.target.value)}
                placeholder="Max $" style={S.input}
                onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
                onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
            </div>
          </div>

          {/* Move-in */}
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Target move-in</label>
            <input type="month" value={data.moveInDate} onChange={e => upd('moveInDate', e.target.value)}
              style={{ ...S.input, colorScheme: 'dark' }}
              onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
              onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>

          {/* Bedrooms */}
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Bedrooms</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {bedroomOpts.map(b => (
                <Chip key={b} label={b} active={data.bedrooms.includes(b)} onToggle={() => toggleBed(b)} />
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Neighborhoods</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {NEIGHBORHOODS.map(h => (
                <Chip key={h} label={h} active={data.neighborhoods.includes(h)} onToggle={() => toggleHood(h)} />
              ))}
            </div>
          </div>

          {/* Roommate toggle */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#1B2A4A', borderRadius: 12, padding: '14px 16px',
            marginBottom: 32,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Open to a roommate</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>We'll find financially compatible matches</div>
            </div>
            <Toggle on={data.openToRoommate} onChange={v => upd('openToRoommate', v)} />
          </div>

          <button onClick={goNext} style={S.ctaPrimary}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function StepVibe() {
    const MAX_BIO = 160

    function toggleTag(t) {
      upd('tags', data.tags.includes(t)
        ? data.tags.filter(x => x !== t)
        : [...data.tags, t])
    }

    return (
      <div style={S.inner}>
        <div style={{ paddingTop: 56 }}>
          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Step 4 of {total - 1}</p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            Your vibe profile
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 28 }}>
            This is what potential roommates will see first.
          </p>

          {/* Photo upload circle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <button onClick={() => upd('photo', 'mock-photo')} style={{
              width: 90, height: 90, borderRadius: '50%',
              background: data.photo ? 'linear-gradient(135deg, #00C9A7, #06B6D4)' : '#1B2A4A',
              border: `2px dashed ${data.photo ? '#00C9A7' : 'rgba(255,255,255,0.15)'}`,
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
              transition: 'all 0.15s',
            }}>
              {data.photo
                ? <span style={{ fontSize: 32, fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#fff' }}>
                    {data.firstName?.[0]?.toUpperCase() || '?'}
                  </span>
                : <>
                    <span style={{ fontSize: 20 }}>📷</span>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>Add photo</span>
                  </>
              }
            </button>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <label style={S.label}>Bio</label>
              <span style={{ fontSize: 11, color: data.bio.length > MAX_BIO - 10 ? '#FBBF24' : '#6B7280' }}>
                {data.bio.length}/{MAX_BIO}
              </span>
            </div>
            <textarea value={data.bio} onChange={e => upd('bio', e.target.value.slice(0, MAX_BIO))}
              placeholder="I'm a remote designer who loves Sunday markets and quiet mornings…"
              style={{
                ...S.input, height: 96, resize: 'none', lineHeight: 1.55,
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
              onBlur={e  => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>

          {/* Lifestyle tags */}
          <div style={{ marginBottom: 32 }}>
            <label style={S.label}>Lifestyle tags (pick any)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {LIFESTYLE_TAGS.map(t => (
                <Chip key={t} label={t} active={data.tags.includes(t)} onToggle={() => toggleTag(t)} />
              ))}
            </div>
          </div>

          <button onClick={goNext} style={S.ctaPrimary}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function StepDocs() {
    const vibeStep = data.openToRoommate ? 4 : 3
    const docStep  = vibeStep + 1

    function handleDocClick(id) {
      upd('docs', { ...data.docs, [id]: data.docs[id] ? null : `sample_${id}.pdf` })
    }

    return (
      <div style={S.inner}>
        <div style={{ paddingTop: 56 }}>
          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Step {docStep} of {total - 1}</p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            Upload documents
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 28, lineHeight: 1.5 }}>
            Landlords always ask. Upload once, share everywhere. You can skip this for now.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {DOC_SLOTS.map(d => {
              const uploaded = !!data.docs[d.id]
              return (
                <div key={d.id} onClick={() => handleDocClick(d.id)} style={{
                  background: '#1B2A4A',
                  border: `1.5px solid ${uploaded ? 'rgba(0,201,167,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 12, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer', transition: 'border-color 0.15s',
                }}>
                  <span style={{ fontSize: 22 }}>{d.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{d.label}</div>
                    {uploaded && (
                      <div style={{ fontSize: 12, color: '#00C9A7', marginTop: 2 }}>
                        sample_{d.id}.pdf
                      </div>
                    )}
                    {!uploaded && d.required && (
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Recommended</div>
                    )}
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: uploaded ? '#00C9A7' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, color: uploaded ? '#0D0F14' : '#6B7280',
                    transition: 'all 0.15s', flexShrink: 0,
                  }}>{uploaded ? '✓' : '+'}</div>
                </div>
              )
            })}
          </div>

          <button onClick={goNext} style={S.ctaPrimary}>
            {Object.values(data.docs).some(Boolean) ? 'Continue' : 'Skip for now'}
          </button>
        </div>
      </div>
    )
  }

  function StepSuccess() {
    const name = data.firstName || 'there'

    const actions = [
      { icon: '🏠', label: 'Find your apartment', sub: 'Browse listings & track applications', path: '/applications', color: '#F97316' },
      { icon: '🤝', label: 'Find a roommate',      sub: 'Swipe to connect on vibe & budget',   path: '/roommates',    color: '#00C9A7' },
      { icon: '📁', label: 'Organize documents',   sub: 'Upload once, share with anyone',       path: '/documents',    color: '#7C3AED' },
    ]

    return (
      <div style={{ ...S.inner, alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
        {/* Animated checkmark */}
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: 'rgba(0,201,167,0.1)',
          border: '2px solid #00C9A7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
          animation: 'scale-in-bounce 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M11 22l8 8 14-14"
              stroke="#00C9A7" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              style={{
                strokeDasharray: 80,
                animation: 'draw-check 0.5s ease-out 0.3s both',
              }} />
          </svg>
        </div>

        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 30, fontWeight: 900, color: '#fff',
          textAlign: 'center', marginBottom: 10,
          animation: 'fadeUp 0.4s ease-out 0.2s both',
        }}>
          Welcome to VryfID,<br />{name}!
        </h2>

        <p style={{
          color: '#9CA3AF', fontSize: 15, textAlign: 'center',
          marginBottom: 36, lineHeight: 1.5,
          animation: 'fadeUp 0.4s ease-out 0.35s both',
        }}>
          Your search starts now. Where do you want to go?
        </p>

        <div style={{
          width: '100%', display: 'flex', flexDirection: 'column', gap: 10,
          marginBottom: 24,
          animation: 'fadeUp 0.4s ease-out 0.5s both',
        }}>
          {actions.map(a => (
            <button key={a.path} onClick={() => {
              localStorage.setItem('vryfid_onboarded', '1')
              navigate(a.path)
            }} style={{
              background: '#1B2A4A',
              border: `1.5px solid rgba(255,255,255,0.07)`,
              borderRadius: 12, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.15s',
              width: '100%',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#203055'}
            onMouseLeave={e => e.currentTarget.style.background = '#1B2A4A'}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: `${a.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
                border: `1px solid ${a.color}30`,
              }}>{a.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{a.label}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{a.sub}</div>
              </div>
              <span style={{ color: a.color, fontSize: 18, flexShrink: 0 }}>→</span>
            </button>
          ))}
        </div>

        <button onClick={goNext} style={{
          background: 'none', border: 'none',
          color: '#9CA3AF', fontSize: 14, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          animation: 'fadeUp 0.4s ease-out 0.65s both',
          textDecoration: 'underline',
        }}>
          Or go to my dashboard →
        </button>
      </div>
    )
  }

  /* ─────── Step map ─────── */
  const stepComponents = {
    welcome: StepWelcome,
    basics:  StepBasics,
    phone:   StepPhone,
    prefs:   StepPrefs,
    vibe:    StepVibe,
    docs:    StepDocs,
    success: StepSuccess,
  }
  const CurrentStep = stepComponents[stepName] || StepWelcome

  return (
    <div style={S.wrap}>
      {/* Progress bar (hidden on welcome + success) */}
      {step > 1 && step < total && (
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: '#00C9A7',
            transition: 'width 0.35s ease',
          }} />
        </div>
      )}

      {/* Back button */}
      {step > 1 && step < total && (
        <button onClick={goBack} style={{
          position: 'fixed', top: 18, left: 18,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, width: 38, height: 38,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 18, color: '#9CA3AF',
          zIndex: 100, transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >‹</button>
      )}

      {/* Animated step */}
      <div
        key={step}
        className={dir === 'fwd' ? 'onboard-fwd' : 'onboard-back'}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <CurrentStep />
      </div>
    </div>
  )
}
