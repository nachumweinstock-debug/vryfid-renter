function Overlay({ onClose, children }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {children}
    </div>
  )
}

export default function DeleteAccountModal({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: '#1B2A4A', borderRadius: 18, padding: 28, maxWidth: 420, width: '100%', position: 'relative', boxShadow: '0 24px 72px rgba(0,0,0,0.6)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#9CA3AF', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 16 }}>✕</button>

        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 22, color: '#EF4444', marginBottom: 18, paddingRight: 32 }}>
          Delete account
        </h3>

        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: 14, fontSize: 14, color: '#FCA5A5', lineHeight: 1.55, marginBottom: 16 }}>
          ⚠️ This action cannot be undone. All your documents, applications, and matches will be permanently deleted.
        </div>

        <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 22, lineHeight: 1.5 }}>
          Are you sure you want to delete your VryfID account?
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', borderRadius: 10, padding: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Cancel
          </button>
          <button style={{ flex: 1, background: '#EF4444', border: 'none', color: '#fff', borderRadius: 10, padding: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(239,68,68,0.3)' }}>
            Yes, delete my account
          </button>
        </div>
      </div>
    </Overlay>
  )
}
