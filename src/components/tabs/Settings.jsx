import { useState } from 'react'
import DeleteAccountModal from '../modals/DeleteAccountModal'

function Toggle({ defaultOn }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <label style={{ position: 'relative', width: 44, height: 24, cursor: 'pointer', display: 'block', flexShrink: 0 }}>
      <input type="checkbox" checked={on} onChange={() => setOn(o => !o)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 12,
        background: on ? 'var(--navy)' : '#D1D5DB',
        transition: 'background 0.2s',
      }} />
      <div style={{
        position: 'absolute',
        width: 18, height: 18,
        background: '#fff',
        borderRadius: '50%',
        top: 3, left: 3,
        transform: on ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </label>
  )
}

export default function Settings() {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 16px 48px' }}>
      <h1 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 26, color: 'var(--navy)', marginBottom: 28 }}>
        Settings
      </h1>

      {/* Profile */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 20, color: 'var(--navy)', marginBottom: 18 }}>Profile</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--navy), var(--navy-deep))',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"DM Serif Display",serif', fontSize: 22, flexShrink: 0,
            boxShadow: 'var(--shadow-navy)',
          }}>NW</div>
          <button style={{
            border: '1.5px solid var(--border)', background: 'transparent',
            color: '#374151', borderRadius: 8,
            padding: '7px 14px', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}>Change photo</button>
        </div>

        {[
          { label: 'Full name',    type: 'text',  value: 'Nachum Weinstock' },
          { label: 'Email',        type: 'email', value: 'nachumweinstock@gmail.com' },
          { label: 'Phone number', type: 'tel',   value: '' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{f.label}</label>
            <input
              type={f.type}
              defaultValue={f.value}
              placeholder={f.type === 'tel' ? '(555) 000-0000' : ''}
              style={{
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--border)', borderRadius: 8,
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                background: '#fff', color: '#1F2937', outline: 'none',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--navy)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>
        ))}

        <button style={{
          background: 'linear-gradient(135deg, var(--navy), var(--navy-deep))',
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '10px 20px', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          boxShadow: 'var(--shadow-navy)',
        }}>Save changes</button>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 28px' }} />

      {/* Notifications */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 20, color: 'var(--navy)', marginBottom: 18 }}>Notifications</h3>
        {[
          'Application status updates',
          'New roommate matches',
          'Landlord connection requests',
        ].map((label, i) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 0',
            borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
          }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
            <Toggle defaultOn />
          </div>
        ))}
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 28px' }} />

      {/* Account */}
      <section>
        <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 20, color: 'var(--navy)', marginBottom: 18 }}>Account</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: 'var(--ink-light)', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-light)'; e.currentTarget.style.textDecoration = 'none' }}
          >Change password</button>
          <button
            onClick={() => setDeleteOpen(true)}
            style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: 'var(--red)', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#b91c1c'; e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.textDecoration = 'none' }}
          >Delete account</button>
        </div>
      </section>

      {deleteOpen && <DeleteAccountModal onClose={() => setDeleteOpen(false)} />}
    </div>
  )
}
