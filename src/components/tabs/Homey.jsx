const MESSAGES = [
  { role: 'bot',  text: "Hey Nachum, you have 3 active applications. The one on 143rd St in Washington Heights moved to Under Review today." },
  { role: 'user', text: "Which docs did I send them?" },
  { role: 'bot',  text: "You sent your Government ID, proof of income, and bank statements. Your credit report was not included." },
  { role: 'user', text: "What neighborhoods did you recommend for me?" },
  { role: 'bot',  text: "Based on your Vibes score, I suggested Washington Heights, Inwood, and Upper West Side. You've applied to 2 units in those areas." },
  { role: 'bot',  text: "Also — Marcus T. (your roommate match) confirmed he wants to co-apply. Want me to pull up your joint application?" },
]

const CHIPS = ['Check my application status', 'Show my matched roommates', 'Are my documents complete?']

export default function Homey() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 64px' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 32, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>⚡</span> Homey
        </h1>
        <p style={{ color: '#9CA3AF', marginTop: 6, fontSize: 14 }}>
          Your AI rental concierge — knows your docs, your apps, your matches.
        </p>
      </div>

      {/* Thread */}
      <div style={{
        background: '#1B2A4A',
        borderRadius: 16,
        padding: '20px 20px 24px',
        marginBottom: 14,
        display: 'flex', flexDirection: 'column', gap: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {MESSAGES.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{ maxWidth: '80%' }}>
              {i === 0 && msg.role === 'bot' && (
                <div style={{ fontSize: 11, fontWeight: 600, color: '#FBBF24', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ⚡ Homey
                </div>
              )}
              {msg.role === 'bot' && i > 0 && i === MESSAGES.findIndex((m, j) => j === i && m.role === 'bot') && (
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 5 }}>Homey</div>
              )}
              <div style={{
                padding: '11px 15px',
                borderRadius: 16,
                fontSize: 14, lineHeight: 1.6,
                background: msg.role === 'bot'
                  ? 'rgba(255,255,255,0.07)'
                  : '#00897B',
                color: '#fff',
                borderBottomLeftRadius:  msg.role === 'bot'  ? 4 : 16,
                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
              }}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input disabled placeholder="Homey is coming soon — AI features launching next."
          style={{
            flex: 1, padding: '12px 16px',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            background: '#1B2A4A', color: '#9CA3AF',
            cursor: 'not-allowed',
          }} />
        <button disabled style={{
          padding: '10px 18px',
          background: 'rgba(255,255,255,0.06)',
          color: '#6B7280',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10,
          fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
          cursor: 'not-allowed',
        }}>Send</button>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CHIPS.map(c => (
          <span key={c} style={{
            padding: '8px 14px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20, fontSize: 13,
            color: '#6B7280', background: 'rgba(255,255,255,0.03)',
            userSelect: 'none',
          }}>{c}</span>
        ))}
      </div>
    </div>
  )
}
