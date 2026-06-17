import { useState } from 'react'
import DeleteAccountModal from '../modals/DeleteAccountModal'

function Toggle({ defaultOn }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <label style={{ position: 'relative', width: 44, height: 24, cursor: 'pointer', display: 'block', flexShrink: 0 }}>
      <input type="checkbox" checked={on} onChange={() => setOn(o => !o)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: on ? '#00C9A7' : 'rgba(255,255,255,0.1)', transition: 'background 0.2s' }} />
      <div style={{ position: 'absolute', width: 18, height: 18, background: '#fff', borderRadius: '50%', top: 3, left: 3, transform: on ? 'translateX(20px)' : 'none', transition: 'transform 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
    </label>
  )
}

const inputStyle = {
  width: '100%', padding: '10px 14px',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  fontFamily: 'Inter, sans-serif', fontSize: 14,
  background: 'rgba(255,255,255,0.05)',
  color: '#fff', outline: 'none',
}

export default function Settings() {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 16px 64px' }}>
      <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 32, color: '#fff', marginBottom: 32 }}>
        Settings
      </h1>

      {/* Profile */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 20, color: '#fff', marginBottom: 18 }}>Profile</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00C9A7, #0D9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Playfair Display", serif', fontSize: 22, fontWeight: 700, color: '#fff',
            boxShadow: '0 4px 16px rgba(0,201,167,0.3)', flexShrink: 0,
          }}>NW</div>
          <button style={{ border: '1.5px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#9CA3AF', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Change photo</button>
        </div>

        {[['Full name', 'text', 'Nachum Weinstock'], ['Email', 'email', 'nachumweinstock@gmail.com'], ['Phone number', 'tel', '']].map(([label, type, val]) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
            <input type={type} defaultValue={val} placeholder={type === 'tel' ? '(555) 000-0000' : ''} style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = '#00C9A7'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
          </div>
        ))}

        <button style={{
          background: '#00C9A7', border: 'none', color: '#0D0F14',
          borderRadius: 8, padding: '10px 22px', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          boxShadow: '0 4px 16px rgba(0,201,167,0.3)',
        }}>Save changes</button>
      </section>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 0 28px' }} />

      {/* Notifications */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 20, color: '#fff', marginBottom: 16 }}>Notifications</h3>
        {['Application status updates', 'New roommate matches', 'Landlord connection requests'].map((label, i, arr) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <span style={{ fontSize: 14, color: '#fff' }}>{label}</span>
            <Toggle defaultOn />
          </div>
        ))}
      </section>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 0 28px' }} />

      {/* Account */}
      <section>
        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 20, color: '#fff', marginBottom: 16 }}>Account</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', fontSize: 14, color: '#9CA3AF', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.textDecoration = 'none' }}
          >Change password</button>
          <button onClick={() => setDeleteOpen(true)} style={{ background: 'none', border: 'none', fontSize: 14, color: '#EF4444', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >Delete account</button>
        </div>
      </section>

      {deleteOpen && <DeleteAccountModal onClose={() => setDeleteOpen(false)} />}
    </div>
  )
}
