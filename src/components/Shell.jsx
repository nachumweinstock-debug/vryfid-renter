import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/homey',        label: '⚡ Homey' },
  { path: '/roommates',    label: 'Roommate Finder' },
  { path: '/documents',    label: 'Documents' },
  { path: '/applications', label: 'Applications' },
  { path: '/settings',     label: 'Settings' },
]

export default function Shell() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Top nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60,
        background: '#fff',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        zIndex: 1000,
        padding: '0 8px',
      }}>
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 12px', height: '100%', flexShrink: 0,
          }}
        >
          <img src="/vryfid-logo.jpeg" alt="VryfID"
            style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
          <span style={{
            fontFamily: '"DM Serif Display", serif',
            color: 'var(--navy)', fontSize: 16,
            display: 'none',
          }}
            className="sm:block"
          >VryfID</span>
        </button>

        {/* Tabs — scrollable on mobile */}
        <div style={{
          display: 'flex', alignItems: 'center',
          flex: 1, overflowX: 'auto',
          scrollbarWidth: 'none',
          height: '100%',
        }}>
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                display: 'inline-flex', alignItems: 'center',
                height: '100%', padding: '0 14px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--navy)' : 'var(--ink-light)',
                textDecoration: 'none',
                borderBottom: `3px solid ${isActive ? 'var(--navy)' : 'transparent'}`,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.15s, border-color 0.15s',
              })}
            >{label}</NavLink>
          ))}
        </div>
      </nav>

      {/* Page content */}
      <main style={{ marginTop: 60 }}>
        <Outlet />
      </main>
    </div>
  )
}
