const MESSAGES = [
  { role: 'bot', text: "Hey Nachum, you have 3 active applications. The one on 143rd St in Washington Heights moved to Under Review today." },
  { role: 'user', text: "Which docs did I send them?" },
  { role: 'bot', text: "You sent your Government ID, proof of income, and bank statements. Your credit report was not included." },
  { role: 'user', text: "What neighborhoods did you recommend for me?" },
  { role: 'bot', text: "Based on your Vibes score, I suggested Washington Heights, Inwood, and Upper West Side. You've applied to 2 units in those areas." },
  { role: 'bot', text: "Also — Marcus T. (your roommate match) confirmed he wants to co-apply. Want me to pull up your joint application?" },
]

const CHIPS = [
  'Check my application status',
  'Show my matched roommates',
  'Are my documents complete?',
]

export default function Homey() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 48px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 26, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
          ⚡ Homey
        </h1>
        <p style={{ color: 'var(--ink-light)', marginTop: 4, fontSize: 14 }}>
          Your AI rental concierge — knows your docs, your apps, your matches.
        </p>
      </div>

      {/* Chat thread */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 20, marginBottom: 16,
        display: 'flex', flexDirection: 'column', gap: 14,
        boxShadow: 'var(--shadow-sm)',
      }}>
        {MESSAGES.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '100%',
          }}>
            <div style={{ maxWidth: '78%' }}>
              <div style={{
                fontSize: 11, fontWeight: 600,
                color: 'var(--ink-light)',
                marginBottom: 4,
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}>
                {msg.role === 'bot' ? 'Homey' : 'You'}
              </div>
              <div style={{
                padding: '11px 15px',
                borderRadius: 16,
                fontSize: 14, lineHeight: 1.55,
                background: msg.role === 'bot'
                  ? 'linear-gradient(135deg, var(--navy), var(--navy-deep))'
                  : '#F3F4F6',
                color: msg.role === 'bot' ? '#fff' : '#1F2937',
                borderBottomLeftRadius:  msg.role === 'bot'  ? 4 : 16,
                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                boxShadow: msg.role === 'bot' ? 'var(--shadow-navy)' : 'var(--shadow-sm)',
              }}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          disabled
          placeholder="Homey is coming soon — AI features launching next."
          style={{
            flex: 1, padding: '12px 16px',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            background: '#F9FAFB', color: 'var(--ink-light)',
            cursor: 'not-allowed',
          }}
        />
        <button disabled style={{
          padding: '10px 18px',
          background: '#D1D5DB', color: 'var(--ink-light)',
          border: 'none', borderRadius: 8,
          fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
          cursor: 'not-allowed',
        }}>Send</button>
      </div>

      {/* Suggestion chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CHIPS.map(c => (
          <span key={c} style={{
            padding: '8px 14px',
            border: '1px solid var(--border)',
            borderRadius: 20, fontSize: 13,
            color: 'var(--ink-light)', background: '#fff',
            opacity: 0.6, userSelect: 'none',
          }}>{c}</span>
        ))}
      </div>
    </div>
  )
}
