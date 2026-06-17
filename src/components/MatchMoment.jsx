import { useMemo } from 'react'

function useParticles() {
  return useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2
      const dist  = 80 + (i % 4) * 32
      return {
        tx:    Math.cos(angle) * dist,
        ty:    Math.sin(angle) * dist,
        delay: (i % 8) * 0.065,
        size:  6 + (i % 5) * 2,
        color: ['#00C9A7', '#FBBF24', '#fff', '#7C3AED', '#06B6D4'][i % 5],
      }
    }), [])
}

export default function MatchMoment({ profile, onStartJoint, onKeepDiscovering }) {
  const particles = useParticles()
  const raw  = localStorage.getItem('vryfid_user')
  const user = raw ? JSON.parse(raw) : {}
  const userInitials = user.firstName
    ? (user.firstName[0] + (user.lastName?.[0] || '')).toUpperCase()
    : 'NW'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(13,15,20,0.95)',
      backdropFilter: 'blur(14px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      {/* Particle ring (centered behind the avatars) */}
      <div style={{ position: 'absolute', top: '38%', left: '50%', pointerEvents: 'none', zIndex: 1 }}>
        {particles.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            width:  p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            animation: `vryfid-particle 1.5s ease-out ${p.delay}s both`,
          }} />
        ))}
      </div>

      {/* Overlapping avatars */}
      <div style={{
        position: 'relative', width: 116, height: 84,
        marginBottom: 36, zIndex: 2,
        animation: 'fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.1s both',
      }}>
        {/* Left: user */}
        <div style={{
          position: 'absolute', left: 0, top: 0,
          width: 76, height: 76, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00C9A7 0%, #0D9488 100%)',
          border: '3px solid #00C9A7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 24, fontWeight: 700, color: '#fff',
          boxShadow: '0 0 28px rgba(0,201,167,0.45)',
          zIndex: 1,
        }}>{userInitials}</div>

        {/* Right: match */}
        <div style={{
          position: 'absolute', right: 0, top: 0,
          width: 76, height: 76, borderRadius: '50%',
          background: profile.color,
          border: '3px solid #00C9A7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 24, fontWeight: 700, color: '#fff',
          boxShadow: `0 0 28px ${profile.color}66`,
          zIndex: 2,
        }}>{profile.initials}</div>

        {/* Verified check */}
        <div style={{
          position: 'absolute', right: -2, bottom: -2,
          width: 24, height: 24, borderRadius: '50%',
          background: '#00C9A7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, color: '#0D0F14', fontWeight: 900,
          border: '2px solid #0D0F14',
          boxShadow: '0 2px 10px rgba(0,201,167,0.5)',
          zIndex: 3,
        }}>✓</div>
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: 26, fontWeight: 900,
        color: '#fff', textAlign: 'center',
        lineHeight: 1.25,
        marginBottom: 10, zIndex: 2,
        animation: 'fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.25s both',
      }}>
        You're Co-Renter Compatible 🏠
      </h2>

      <p style={{
        color: '#9CA3AF', fontSize: 14, textAlign: 'center',
        lineHeight: 1.6, marginBottom: 40,
        maxWidth: 300, zIndex: 2,
        animation: 'fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.38s both',
      }}>
        You and <strong style={{ color: '#fff' }}>{profile.name}</strong> both want to co-rent.
        Time to find your place.
      </p>

      {/* Buttons */}
      <div style={{
        width: '100%', maxWidth: 340,
        display: 'flex', flexDirection: 'column', gap: 12,
        zIndex: 2,
        animation: 'fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.5s both',
      }}>
        <button
          onClick={onStartJoint}
          style={{
            background: '#00C9A7', border: 'none',
            color: '#0D0F14', borderRadius: 12,
            padding: '14px 0', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 20px rgba(0,201,167,0.45)',
            transition: 'transform 0.12s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          Start Joint Application
        </button>
        <button
          onClick={onKeepDiscovering}
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(0,201,167,0.35)',
            color: '#00C9A7', borderRadius: 12,
            padding: '14px 0', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,201,167,0.7)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,201,167,0.35)'}
        >
          Keep Discovering
        </button>
      </div>
    </div>
  )
}
