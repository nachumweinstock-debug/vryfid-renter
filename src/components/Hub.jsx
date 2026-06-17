import { useNavigate } from 'react-router-dom'

const TILES = [
  {
    path: '/homey',
    gradient: 'linear-gradient(135deg, #1B3A6B 0%, #0C2560 100%)',
    iconBg: 'rgba(255,255,255,0.12)',
    icon: '⚡',
    label: 'Homey',
    sub: 'Your AI rental concierge',
    desc: 'Homey knows your docs, your applications, and your matches. Ask anything.',
    badge: 'AI-powered',
    badgeColor: '#FBBF24',
    badgeText: '#0C2560',
  },
  {
    path: '/roommates',
    gradient: 'linear-gradient(135deg, #0D9488 0%, #06B6D4 100%)',
    iconBg: 'rgba(255,255,255,0.12)',
    icon: '🤝',
    label: 'Roommate Finder',
    sub: 'Find your perfect co-renter',
    desc: 'Browse verified renters, match on lifestyle and budget, co-apply instantly.',
    badge: '4 matches',
    badgeColor: 'rgba(255,255,255,0.2)',
    badgeText: '#fff',
  },
  {
    path: '/documents',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
    iconBg: 'rgba(255,255,255,0.12)',
    icon: '📂',
    label: 'Documents',
    sub: 'Manage your rental profile',
    desc: 'Upload, verify, and share your ID, income proof, and bank statements securely.',
    badge: '3 of 5 complete',
    badgeColor: 'rgba(255,255,255,0.2)',
    badgeText: '#fff',
  },
  {
    path: '/applications',
    gradient: 'linear-gradient(135deg, #FF6B5B 0%, #FBBF24 100%)',
    iconBg: 'rgba(255,255,255,0.12)',
    icon: '🗺️',
    label: 'Applications',
    sub: 'Track your apartment hunt',
    desc: 'Map and list view of every unit you applied to, plus Homey recommendations.',
    badge: '3 active apps',
    badgeColor: 'rgba(255,255,255,0.2)',
    badgeText: '#fff',
  },
]

export default function Hub() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#07051A', display: 'flex', flexDirection: 'column' }}>

      {/* Nav strip */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 60,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/vryfid-logo.jpeg" alt="VryfID"
            style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
          <span style={{
            fontFamily: '"DM Serif Display", serif',
            color: '#fff', fontSize: 18, letterSpacing: '-0.3px',
          }}>VryfID</span>
        </div>
        <button
          onClick={() => navigate('/settings')}
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13, fontWeight: 500,
            padding: '7px 14px', cursor: 'pointer',
          }}
        >Settings</button>
      </header>

      {/* Hero */}
      <div style={{
        padding: '64px 24px 48px',
        textAlign: 'center',
        maxWidth: 680,
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(13,148,136,0.15)',
          border: '1px solid rgba(13,148,136,0.3)',
          borderRadius: 20, padding: '5px 14px',
          marginBottom: 24,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0D9488', display: 'inline-block' }} />
          <span style={{ color: '#0D9488', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
            RENTER PLATFORM
          </span>
        </div>

        <h1 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(32px, 6vw, 52px)',
          color: '#fff',
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          Your apartment search,<br />
          <span style={{ background: 'linear-gradient(135deg,#FF6B5B,#FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            finally organized.
          </span>
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: 16, lineHeight: 1.65,
          maxWidth: 480, margin: '0 auto',
        }}>
          Everything you need to find, apply for, and move into your next apartment —
          in one place, with your identity verified.
        </p>
      </div>

      {/* Tile grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
        padding: '0 24px 64px',
        maxWidth: 1080,
        margin: '0 auto',
        width: '100%',
      }}>
        {TILES.map((t) => (
          <button
            key={t.path}
            onClick={() => navigate(t.path)}
            style={{
              background: t.gradient,
              border: 'none',
              borderRadius: 20,
              padding: '28px 24px 24px',
              cursor: 'pointer',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.38)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.28)'
            }}
          >
            {/* Noise texture overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
              pointerEvents: 'none',
              borderRadius: 20,
            }} />

            {/* Icon */}
            <div style={{
              width: 48, height: 48,
              background: t.iconBg,
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, marginBottom: 16,
              border: '1px solid rgba(255,255,255,0.18)',
            }}>
              {t.icon}
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: t.badgeColor,
              color: t.badgeText,
              borderRadius: 20, padding: '3px 10px',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: 10,
            }}>
              {t.badge}
            </div>

            <div style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: 22, color: '#fff',
              marginBottom: 4, lineHeight: 1.2,
            }}>{t.label}</div>

            <div style={{
              fontSize: 12, fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              marginBottom: 10, letterSpacing: '0.02em',
            }}>{t.sub}</div>

            <div style={{
              fontSize: 13, color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.55,
            }}>{t.desc}</div>

            {/* Arrow */}
            <div style={{
              position: 'absolute', top: 24, right: 24,
              color: 'rgba(255,255,255,0.4)', fontSize: 18,
            }}>→</div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '0 24px 32px',
        color: 'rgba(255,255,255,0.2)',
        fontSize: 12,
      }}>
        VryfID Renter Platform · 2026
      </div>
    </div>
  )
}
