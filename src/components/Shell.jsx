import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const TABS = [
  { path: '/homey',        label: 'Homey' },
  { path: '/roommates',    label: 'Roommate Finder' },
  { path: '/documents',    label: 'Documents' },
  { path: '/applications', label: 'Applications' },
  { path: '/settings',     label: 'Settings' },
]

export default function Shell() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60,
        background: 'rgba(13,15,20,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--divider)',
        display: 'flex', alignItems: 'center',
        zIndex: 1000, padding: '0 8px',
      }}>
        {/* Back to hub */}
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 12px', height: '100%', flexShrink: 0,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'Inter, sans-serif', fontSize: 18,
        }}>
          <img src="/vryfid-logo.jpeg" alt="VryfID"
            style={{ width: 26, height: 26, borderRadius: 6, objectFit: 'cover' }} />
        </button>

        {/* Tabs */}
        <div style={{
          display: 'flex', alignItems: 'center',
          flex: 1, overflowX: 'auto', scrollbarWidth: 'none', height: '100%',
        }}>
          {TABS.map(({ path, label }) => (
            <NavLink key={path} to={path} style={({ isActive }) => ({
              display: 'inline-flex', alignItems: 'center',
              height: '100%', padding: '0 14px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              borderBottom: `2px solid ${isActive ? '#fff' : 'transparent'}`,
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'color 0.15s',
            })}>{label}</NavLink>
          ))}
        </div>
      </nav>

      <main style={{ marginTop: 60 }}>
        <Outlet />
      </main>
    </div>
  )
}
