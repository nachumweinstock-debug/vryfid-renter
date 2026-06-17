import { useState } from 'react'
import JointAppModal from '../modals/JointAppModal'

const PROFILES = [
  {
    initials: 'MT', color: '#0D9488',
    name: 'Marcus Thompson', age: 23,
    match: 87, budget: '$1,800 – $2,400', move: 'July 1, 2026',
    hoods: ['Washington Heights', 'Inwood'],
    tags: ['Quiet', 'Gym-goer', 'Clean'],
    bio: 'Looking for a chill roommate who respects the space — I work early mornings.',
  },
  {
    initials: 'DL', color: '#EA580C',
    name: 'Dani Levine', age: 22,
    match: 74, budget: '$2,000 – $2,800', move: 'August 1, 2026',
    hoods: ['Upper West Side', 'Morningside Heights'],
    tags: ['Social', 'Pet-friendly', 'WFH'],
    bio: 'Remote designer, love hosting small dinners, have a golden retriever named Bagel.',
  },
  {
    initials: 'JR', color: '#7C3AED',
    name: 'Josh Roth', age: 24,
    match: 68, budget: '$1,600 – $2,200', move: 'July 15, 2026',
    hoods: ['Washington Heights', 'Harlem'],
    tags: ['Night owl', 'Music', 'Chill'],
    bio: 'Producer, keep weird hours but I\'m a great roommate — ask my references.',
  },
  {
    initials: 'PP', color: '#DB2777',
    name: 'Priya Patel', age: 22,
    match: 91, budget: '$2,200 – $3,000', move: 'August 15, 2026',
    hoods: ['Upper East Side', 'Yorkville'],
    tags: ['Early riser', 'Neat', 'No smoking'],
    bio: 'Pre-med, very clean, usually home by 9. Looking for a quiet, drama-free situation.',
  },
]

const INITIAL_MATCHES = [PROFILES[0]] // Marcus is already a match

function ProfileCard({ p }) {
  const matchColor = p.match >= 85 ? '#00C9A7' : p.match >= 70 ? '#3B82F6' : '#FBBF24'
  return (
    <div style={{
      background: '#1B2A4A',
      borderRadius: 20,
      padding: '28px 22px 24px',
      height: '100%',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 12px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
      userSelect: 'none',
    }}>
      {/* Avatar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <div style={{
          width: 84, height: 84, borderRadius: '50%',
          background: p.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, fontWeight: 700, color: '#fff',
          boxShadow: `0 4px 20px ${p.color}55`,
          border: '3px solid rgba(255,255,255,0.12)',
        }}>{p.initials}</div>
      </div>

      {/* Name + age */}
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>
          {p.name}
        </span>
      </div>
      <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 13, marginBottom: 14 }}>
        {p.age} years old
      </div>

      {/* Vibe Match */}
      <div style={{
        textAlign: 'center',
        fontSize: 22, fontWeight: 700,
        color: matchColor,
        marginBottom: 16,
        textShadow: `0 0 20px ${matchColor}55`,
      }}>
        {p.match}% Vibe Match
      </div>

      {/* Budget + move-in */}
      <div style={{
        display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
        marginBottom: 14,
      }}>
        <span style={{
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', borderRadius: 20,
          padding: '4px 12px', fontSize: 12, fontWeight: 600,
        }}>{p.budget}/mo</span>
        <span style={{
          background: 'rgba(255,255,255,0.06)',
          color: '#9CA3AF', borderRadius: 20,
          padding: '4px 12px', fontSize: 12,
        }}>Move-in {p.move}</span>
      </div>

      {/* Neighborhoods */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, marginBottom: 10 }}>
        {p.hoods.map(h => (
          <span key={h} style={{
            border: '1px solid rgba(0,201,167,0.4)',
            color: '#00C9A7', borderRadius: 20,
            padding: '3px 10px', fontSize: 11, fontWeight: 600,
          }}>{h}</span>
        ))}
      </div>

      {/* Lifestyle tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, marginBottom: 16 }}>
        {p.tags.map(t => (
          <span key={t} style={{
            background: 'rgba(255,255,255,0.07)',
            color: '#9CA3AF', borderRadius: 20,
            padding: '3px 10px', fontSize: 11,
          }}>{t}</span>
        ))}
      </div>

      {/* Bio */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
        <p style={{
          fontStyle: 'italic', color: '#6B7280',
          fontSize: 13, textAlign: 'center',
          lineHeight: 1.55, width: '100%',
        }}>
          "{p.bio}"
        </p>
      </div>
    </div>
  )
}

function EmptyState({ onRefresh }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: 540, gap: 16,
    }}>
      <div style={{ fontSize: 48, marginBottom: 4 }}>🌀</div>
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 22, color: '#fff' }}>
        You've seen everyone for now.
      </div>
      <div style={{ color: '#9CA3AF', fontSize: 14 }}>New matches refresh daily.</div>
      <button onClick={onRefresh} style={{
        marginTop: 8,
        border: '1.5px solid #00C9A7', background: 'transparent',
        color: '#00C9A7', borderRadius: 10,
        padding: '10px 24px', fontSize: 14, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
      }}>Refresh matches</button>
    </div>
  )
}

function SwipeStack({ onConnect }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(null)

  const current = PROFILES[idx]
  const next    = PROFILES[idx + 1]

  function swipe(direction) {
    if (dir) return
    if (direction === 'right' && current) onConnect(current)
    setDir(direction)
    setTimeout(() => {
      setIdx(i => i + 1)
      setDir(null)
    }, 320)
  }

  if (idx >= PROFILES.length) {
    return <EmptyState onRefresh={() => setIdx(0)} />
  }

  return (
    <div>
      {/* Stack */}
      <div style={{
        position: 'relative',
        maxWidth: 360, height: 540,
        margin: '0 auto',
      }}>
        {/* Back card (next) */}
        {next && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            transform: dir ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(10px)',
            transformOrigin: 'top center',
            transition: dir ? 'transform 0.32s ease-out' : 'none',
            pointerEvents: 'none',
          }}>
            <ProfileCard p={next} />
          </div>
        )}

        {/* Front card (current) — exit on swipe */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          transform:
            dir === 'left'  ? 'translateX(-120%) rotate(-10deg)' :
            dir === 'right' ? 'translateX(120%)  rotate(10deg)'  :
            'none',
          opacity: dir ? 0 : 1,
          transition: dir
            ? 'transform 0.32s ease-out, opacity 0.28s ease-out'
            : 'none',
        }}>
          <ProfileCard p={current} />
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 36, marginTop: 28 }}>
        {/* Pass */}
        <button
          onClick={() => swipe('left')}
          style={{
            width: 58, height: 58, borderRadius: '50%',
            border: '2px solid #EF4444', background: 'transparent',
            color: '#EF4444', fontSize: 22,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.12s ease, background 0.15s',
            boxShadow: '0 4px 16px rgba(239,68,68,0.2)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.transform = 'scale(1.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = '' }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1.08)'}
        >✕</button>

        {/* Connect / Heart */}
        <button
          onClick={() => swipe('right')}
          style={{
            width: 58, height: 58, borderRadius: '50%',
            border: 'none', background: '#00C9A7',
            color: '#fff', fontSize: 22,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.12s ease, box-shadow 0.15s',
            boxShadow: '0 4px 20px rgba(0,201,167,0.4)',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,201,167,0.6)'; e.currentTarget.style.transform = 'scale(1.08)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,201,167,0.4)'; e.currentTarget.style.transform = '' }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1.08)'}
        >♥</button>
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 80, marginTop: 10 }}>
        <span style={{ color: '#EF4444', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>PASS</span>
        <span style={{ color: '#00C9A7', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>CONNECT</span>
      </div>
    </div>
  )
}

function MatchCard({ p, onCoApply }) {
  return (
    <div style={{
      background: '#1B2A4A',
      borderRadius: 14, padding: '16px 18px',
      marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: p.color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, flexShrink: 0,
      }}>{p.initials}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
          {p.tags[0]} · {p.tags[1]}
        </div>
      </div>

      <div style={{ color: '#00C9A7', fontWeight: 700, fontSize: 14, flexShrink: 0, marginRight: 12 }}>
        {p.match}%
      </div>

      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button style={{
          border: '1.5px solid #00C9A7', background: 'transparent',
          color: '#00C9A7', borderRadius: 8,
          padding: '6px 12px', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        }}>View profile</button>
        <button
          onClick={() => onCoApply(p)}
          style={{
            background: '#00C9A7', border: 'none',
            color: '#0D0F14', borderRadius: 8,
            padding: '6px 12px', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}
        >Co-apply</button>
      </div>
    </div>
  )
}

export default function RoommateFinder() {
  const [tab, setTab] = useState('discover')
  const [matches, setMatches] = useState(INITIAL_MATCHES)
  const [modalProfile, setModalProfile] = useState(null)

  function handleConnect(p) {
    setMatches(m => m.find(x => x.name === p.name) ? m : [...m, p])
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px 64px' }}>

      <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 32, color: '#fff', marginBottom: 6 }}>
        Roommate Finder
      </h1>
      <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 24 }}>
        Swipe to connect, match on vibes, co-apply together.
      </p>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 28 }}>
        {[['discover', 'Discover'], ['matches', `My Matches (${matches.length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: '10px 20px', fontSize: 14,
            fontWeight: tab === key ? 600 : 400,
            color: tab === key ? '#fff' : 'rgba(255,255,255,0.4)',
            background: 'none', border: 'none',
            borderBottom: `2px solid ${tab === key ? '#00C9A7' : 'transparent'}`,
            marginBottom: -1, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'discover' && (
        <SwipeStack onConnect={handleConnect} />
      )}

      {tab === 'matches' && (
        <div>
          {matches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
              No matches yet — start swiping!
            </div>
          ) : (
            matches.map(p => (
              <MatchCard key={p.name} p={p} onCoApply={setModalProfile} />
            ))
          )}
        </div>
      )}

      {modalProfile && (
        <JointAppModal profile={modalProfile} onClose={() => setModalProfile(null)} />
      )}
    </div>
  )
}
