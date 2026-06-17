function Overlay({ onClose, children }) {
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {children}
    </div>
  )
}

const APPS = [
  '143 W 143rd St — Heights Realty Group',
  '507 W 158th St — Uptown Realty',
  '88 Arden St — Private Landlord (J. Morales)',
]

const DOCS_LIST = [
  { id: 'sd1', label: 'Government ID',        available: true  },
  { id: 'sd2', label: 'Proof of Income',      available: true  },
  { id: 'sd3', label: 'Bank Statements',      available: true  },
  { id: 'sd4', label: 'Credit Report',        available: false },
  { id: 'sd5', label: 'Additional Documents', available: false },
]

export default function ShareDocsModal({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 500, width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 72px rgba(0,0,0,0.22)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-light)', fontSize: 18, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>✕</button>

        <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 22, color: 'var(--navy)', marginBottom: 22, paddingRight: 32 }}>
          Share documents with a landlord
        </h3>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Select application</label>
          <select style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, background: '#fff' }}>
            {APPS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Documents to include</div>
          {DOCS_LIST.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
              <input type="checkbox" id={d.id} defaultChecked={d.available} disabled={!d.available}
                style={{ width: 16, height: 16, accentColor: 'var(--navy)', flexShrink: 0 }} />
              <label htmlFor={d.id} style={{ fontSize: 14, color: d.available ? '#1F2937' : 'var(--ink-light)', cursor: d.available ? 'pointer' : 'default' }}>
                {d.label}
              </label>
              {!d.available && (
                <span style={{ background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid #FECACA', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700, marginLeft: 4 }}>Missing</span>
              )}
            </div>
          ))}
        </div>

        <button style={{ width: '100%', background: 'linear-gradient(135deg, var(--navy), var(--navy-deep))', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          Send documents
        </button>
      </div>
    </Overlay>
  )
}
