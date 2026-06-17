function Overlay({ onClose, children }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {children}
    </div>
  )
}

const DOCS_LIST = [
  { id: 'sd1', label: 'Government ID',        ok: true },
  { id: 'sd2', label: 'Proof of Income',      ok: true },
  { id: 'sd3', label: 'Bank Statements',      ok: true },
  { id: 'sd4', label: 'Credit Report',        ok: false },
  { id: 'sd5', label: 'Additional Documents', ok: false },
]

export default function ShareDocsModal({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: '#1B2A4A', borderRadius: 18, padding: 28, maxWidth: 480, width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 72px rgba(0,0,0,0.6)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#9CA3AF', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 16 }}>✕</button>

        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 22, color: '#fff', marginBottom: 22, paddingRight: 32 }}>
          Share documents with a landlord
        </h3>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Select application</label>
          <select style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, background: '#0D0F14', color: '#fff' }}>
            {['143 W 143rd St — Heights Realty Group', '507 W 158th St — Uptown Realty', '88 Arden St — Private Landlord (J. Morales)'].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Documents to include</div>
          {DOCS_LIST.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <input type="checkbox" id={d.id} defaultChecked={d.ok} disabled={!d.ok} style={{ width: 15, height: 15, accentColor: '#7C3AED', flexShrink: 0 }} />
              <label htmlFor={d.id} style={{ fontSize: 14, color: d.ok ? '#fff' : '#6B7280', flex: 1, cursor: d.ok ? 'pointer' : 'default' }}>{d.label}</label>
              {!d.ok && <span style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>Missing</span>}
            </div>
          ))}
        </div>

        <button style={{ width: '100%', background: '#7C3AED', border: 'none', color: '#fff', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }}>
          Send documents
        </button>
      </div>
    </Overlay>
  )
}
