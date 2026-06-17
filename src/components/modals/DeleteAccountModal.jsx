function Overlay({ onClose, children }) {
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {children}
    </div>
  )
}

export default function DeleteAccountModal({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 440, width: '100%', position: 'relative', boxShadow: '0 24px 72px rgba(0,0,0,0.22)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-light)', fontSize: 18, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>✕</button>

        <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 22, color: 'var(--red)', marginBottom: 20, paddingRight: 32 }}>
          Delete account
        </h3>

        <div style={{ background: 'var(--red-bg)', border: '1px solid #FECACA', borderRadius: 8, padding: 14, fontSize: 14, color: '#7F1D1D', lineHeight: 1.55, marginBottom: 16 }}>
          ⚠️ This action cannot be undone. All your documents, applications, and matches will be permanently deleted.
        </div>

        <p style={{ fontSize: 14, color: 'var(--ink-light)', marginBottom: 22, lineHeight: 1.5 }}>
          Are you sure you want to delete your VryfID account?
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, background: 'transparent', border: '1.5px solid var(--border)', color: '#374151', borderRadius: 8, padding: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Cancel
          </button>
          <button style={{ flex: 1, background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 8, padding: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Yes, delete my account
          </button>
        </div>
      </div>
    </Overlay>
  )
}
