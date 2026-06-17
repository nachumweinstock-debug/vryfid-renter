function Overlay({ onClose, children }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {children}
    </div>
  )
}

export default function JointAppModal({ profile, onClose }) {
  const p = profile || { name: 'Marcus Thompson', initials: 'MT', color: '#0D9488' }
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: '#1B2A4A', borderRadius: 18, padding: 28, maxWidth: 500, width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 72px rgba(0,0,0,0.6)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#9CA3AF', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 16 }}>✕</button>

        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 22, color: '#fff', marginBottom: 22, paddingRight: 32, lineHeight: 1.25 }}>
          Joint application — You + {p.name}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
          {[
            { name: 'You (Nachum)', pct: 60, pctColor: '#00C9A7', label: '3 / 5', badge: 'Documents ready', bc: '#00C9A7', bb: 'rgba(0,201,167,0.12)' },
            { name: p.name.split(' ')[0] + ' T.', pct: 75, pctColor: '#FBBF24', label: '3 / 4', badge: 'Missing credit report', bc: '#FBBF24', bb: 'rgba(251,191,36,0.12)' },
          ].map(t => (
            <div key={t.name} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 12 }}>{t.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9CA3AF', marginBottom: 5 }}>
                <span>Documents</span><span>{t.label}</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ height: '100%', width: `${t.pct}%`, background: t.pctColor, borderRadius: 3 }} />
              </div>
              <span style={{ background: t.bb, color: t.bc, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{t.badge}</span>
            </div>
          ))}
        </div>

        <button style={{ width: '100%', background: '#00C9A7', border: 'none', color: '#0D0F14', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 10, boxShadow: '0 4px 16px rgba(0,201,167,0.3)' }}>
          Submit joint application
        </button>
        <button style={{ width: '100%', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.1)', color: '#9CA3AF', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          Remind {p.name.split(' ')[0]} to upload credit report
        </button>
      </div>
    </Overlay>
  )
}
