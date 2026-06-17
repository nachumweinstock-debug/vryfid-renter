function Overlay({ onClose, children }) {
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      {children}
    </div>
  )
}

export default function JointAppModal({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16,
        padding: 28, maxWidth: 500, width: '100%',
        position: 'relative', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 72px rgba(0,0,0,0.22)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--ink-light)', fontSize: 18,
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%',
        }}>✕</button>

        <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 22, color: 'var(--navy)', marginBottom: 22, paddingRight: 32, lineHeight: 1.25 }}>
          Joint application — You + Marcus Thompson
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
          {[
            { name: 'You (Nachum)', pct: 60, pctColor: 'var(--navy)', label: '3 / 5', badge: 'Documents ready', badgeBg: 'var(--green-bg)', badgeColor: 'var(--green)' },
            { name: 'Marcus T.',    pct: 75, pctColor: 'var(--amber)', label: '3 / 4', badge: 'Missing credit report', badgeBg: 'var(--amber-bg)', badgeColor: 'var(--amber)' },
          ].map(t => (
            <div key={t.name} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{t.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-light)', marginBottom: 5 }}>
                <span>Documents</span><span>{t.label}</span>
              </div>
              <div style={{ height: 6, background: '#E5E7EB', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ height: '100%', width: `${t.pct}%`, background: t.pctColor, borderRadius: 3 }} />
              </div>
              <span style={{ background: t.badgeBg, color: t.badgeColor, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{t.badge}</span>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', background: 'linear-gradient(135deg, var(--navy), var(--navy-deep))',
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '12px', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          marginBottom: 10,
        }}>Submit joint application</button>

        <button style={{
          width: '100%', background: 'transparent',
          border: '1.5px solid var(--border)', color: '#374151',
          borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        }}>Remind Marcus to upload his credit report</button>
      </div>
    </Overlay>
  )
}
