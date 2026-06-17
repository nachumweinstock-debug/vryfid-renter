import { useNavigate } from 'react-router-dom'

const TILES = [
  {
    path: '/homey',
    bg: '#1B2A4A',
    icon: '⚡',
    badge: 'AI-powered',
    badgeBg: 'rgba(251,191,36,0.2)',
    badgeColor: '#FBBF24',
    title: 'Homey',
    sub: 'Your AI rental concierge',
    desc: 'Homey knows your docs, your applications, and your matches. Ask anything.',
  },
  {
    path: '/roommates',
    bg: '#00897B',
    icon: '🤝',
    badge: '4 matches',
    badgeBg: 'rgba(255,255,255,0.18)',
    badgeColor: '#fff',
    title: 'Roommate Finder',
    sub: 'Find your perfect co-renter',
    desc: 'Browse verified renters, match on lifestyle and budget, co-apply instantly.',
  },
  {
    path: '/documents',
    bg: '#7C3AED',
    icon: '📂',
    badge: '3 of 5 complete',
    badgeBg: 'rgba(255,255,255,0.18)',
    badgeColor: '#fff',
    title: 'Documents',
    sub: 'Manage your rental profile',
    desc: 'Upload, verify, and share your ID, income proof, and bank statements securely.',
  },
  {
    path: '/applications',
    bg: null, // gradient
    gradient: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
    icon: '🗺️',
    badge: '3 active apps',
    badgeBg: 'rgba(255,255,255,0.22)',
    badgeColor: '#fff',
    title: 'Applications',
    sub: 'Track your apartment hunt',
    desc: 'Map and list view of every unit you applied to, plus Homey recommendations.',
  },
]

export default function Hub() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0D0F14', display: 'flex', flexDirection: 'column' }}>

      {/* Top strip */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 60,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/vryfid-logo.jpeg" alt="VryfID"
            style={{ width: 30, height: 30, borderRadius: 7, objectFit: 'cover' }} />
          <span style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#fff', fontSize: 17 }}>
            VryfID
          </span>
        </div>
        <button onClick={() => navigate('/settings')} style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, color: 'rgba(255,255,255,0.6)',
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
          padding: '7px 14px', cursor: 'pointer',
        }}>Settings</button>
      </header>

      {/* Hero */}
      <div style={{ padding: '56px 24px 44px', textAlign: 'center', maxWidth: 660, margin: '0 auto', width: '100%' }}>
        {/* Pill badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(0,201,167,0.4)',
          borderRadius: 20, padding: '5px 14px', marginBottom: 28,
        }}>
          <span className="pulse-dot" style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#00C9A7', display: 'inline-block',
          }} />
          <span style={{ color: '#00C9A7', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
            RENTER PLATFORM
          </span>
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(36px, 7vw, 64px)',
          lineHeight: 1.12,
          fontWeight: 900,
          marginBottom: 16,
        }}>
          <span style={{ color: '#fff', display: 'block' }}>Your apartment search,</span>
          <span style={{
            color: '#F97316',
            fontStyle: 'italic',
            display: 'block',
          }}>finally organized.</span>
        </h1>

        <p style={{ color: '#9CA3AF', fontSize: 17, lineHeight: 1.65, maxWidth: 480, margin: '0 auto' }}>
          Everything you need to find, apply for, and move into your next apartment —
          in one place, with your identity verified.
        </p>
      </div>

      {/* Tile grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16,
        padding: '0 24px 64px',
        maxWidth: 1040, margin: '0 auto', width: '100%',
      }}>
        {TILES.map(t => (
          <button
            key={t.path}
            onClick={() => navigate(t.path)}
            style={{
              background: t.gradient || t.bg,
              border: 'none',
              borderRadius: 20, padding: '26px 22px 22px',
              cursor: 'pointer', textAlign: 'left',
              position: 'relative', overflow: 'hidden',
              minHeight: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.015)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)' }}
          >
            {/* Arrow */}
            <span style={{ position: 'absolute', top: 22, right: 22, color: 'rgba(255,255,255,0.5)', fontSize: 20 }}>→</span>

            {/* Icon tile */}
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, marginBottom: 14,
            }}>{t.icon}</div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: t.badgeBg, color: t.badgeColor,
              borderRadius: 20, padding: '3px 10px',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
              marginBottom: 10,
            }}>{t.badge}</div>

            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 22, color: '#fff', fontWeight: 700,
              marginBottom: 4,
            }}>{t.title}</div>

            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
              {t.sub}
            </div>

            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
              {t.desc}
            </div>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '0 24px 28px', color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>
        VryfID Renter Platform · 2026
      </div>
    </div>
  )
}
