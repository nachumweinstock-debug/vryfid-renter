import { useState, useMemo } from 'react'
import JointAppModal from '../modals/JointAppModal'
import MatchMoment from '../MatchMoment'

/* ── Profiles with budget ranges for silent financial filtering ── */
const ALL_PROFILES = [
  {
    initials: 'MT', color: '#0D9488',
    name: 'Marcus Thompson', age: 23,
    match: 87, budget: '$1,800 – $2,400', budgetLow: 1800, budgetHigh: 2400,
    move: 'July 1, 2026', hoods: ['Washington Heights', 'Inwood'],
    tags: ['Quiet', 'Gym-goer', 'Clean'],
    bio: 'Looking for a chill roommate who respects the space — I work early mornings.',
    pendingLike: false,
  },
  {
    initials: 'DL', color: '#EA580C',
    name: 'Dani Levine', age: 22,
    match: 74, budget: '$2,000 – $2,800', budgetLow: 2000, budgetHigh: 2800,
    move: 'August 1, 2026', hoods: ['Upper West Side', 'Morningside Heights'],
    tags: ['Social', 'Pet-friendly', 'WFH'],
    bio: 'Remote designer, love hosting small dinners, have a golden retriever named Bagel.',
    pendingLike: false,
  },
  {
    initials: 'JR', color: '#7C3AED',
    name: 'Josh Roth', age: 24,
    match: 68, budget: '$1,600 – $2,200', budgetLow: 1600, budgetHigh: 2200,
    move: 'July 15, 2026', hoods: ['Washington Heights', 'Harlem'],
    tags: ['Night owl', 'Music', 'Chill'],
    bio: 'Producer, keep weird hours but I\'m a great roommate — ask my references.',
    pendingLike: false,
  },
  {
    initials: 'PP', color: '#DB2777',
    name: 'Priya Patel', age: 22,
    match: 91, budget: '$2,200 – $3,000', budgetLow: 2200, budgetHigh: 3000,
    move: 'August 15, 2026', hoods: ['Upper East Side', 'Yorkville'],
    tags: ['Early riser', 'Neat', 'No smoking'],
    bio: 'Pre-med, very clean, usually home by 9. Looking for a quiet, drama-free situation.',
    pendingLike: false,
  },
]

/* ── People who already liked you (shown in the Pending banner) ── */
const PENDING_POOL = [
  {
    initials: 'CR', color: '#059669',
    name: 'Chris Rivera', age: 26,
    match: 82, budget: '$1,900 – $2,600', budgetLow: 1900, budgetHigh: 2600,
    move: 'July 1, 2026', hoods: ['Inwood', 'Washington Heights'],
    tags: ['Clean', 'Early riser', 'Gym-goer'],
    bio: 'Nurse, early shifts, very tidy. Looking for a peaceful situation near the A train.',
    pendingLike: true,
  },
  {
    initials: 'JS', color: '#D97706',
    name: 'Jamie Santos', age: 23,
    match: 88, budget: '$2,000 – $2,800', budgetLow: 2000, budgetHigh: 2800,
    move: 'August 1, 2026', hoods: ['Washington Heights', 'Harlem'],
    tags: ['WFH', 'Social', 'Pet-friendly'],
    bio: 'Graphic designer working remotely. I keep common areas spotless and love a good cook-off.',
    pendingLike: true,
  },
  {
    initials: 'AC', color: '#7C3AED',
    name: 'Alex Chen', age: 25,
    match: 79, budget: '$1,700 – $2,400', budgetLow: 1700, budgetHigh: 2400,
    move: 'July 15, 2026', hoods: ['Morningside Heights', 'Upper West Side'],
    tags: ['Quiet', 'Night owl', 'Music'],
    bio: 'Software engineer, rarely home during the day, super low-drama. Plants everywhere.',
    pendingLike: true,
  },
]

/* ── Financial filter: profiles whose budget overlaps with user's ── */
function useFilteredProfiles() {
  return useMemo(() => {
    const raw = localStorage.getItem('vryfid_user')
    if (!raw) return ALL_PROFILES
    const { budgetMin, budgetMax } = JSON.parse(raw)
    const uMin = parseInt(budgetMin) || 0
    const uMax = parseInt(budgetMax) || 999999
    return ALL_PROFILES.filter(p => p.budgetHigh >= uMin && p.budgetLow <= uMax)
  }, [])
}

/* ── Profile card ── */
function ProfileCard({ p }) {
  const matchColor = p.match >= 85 ? '#00C9A7' : p.match >= 70 ? '#3B82F6' : '#FBBF24'
  return (
    <div style={{
      background: '#1B2A4A', borderRadius: 20, padding: '28px 22px 24px',
      height: '100%', display: 'flex', flexDirection: 'column',
      boxShadow: '0 12px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
      userSelect: 'none',
    }}>
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

      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>
          {p.name}
        </span>
      </div>
      <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 13, marginBottom: 14 }}>
        {p.age} years old
      </div>

      <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, color: matchColor, marginBottom: 16, textShadow: `0 0 20px ${matchColor}55` }}>
        {p.match}% Vibe Match
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <span style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{p.budget}/mo</span>
        <span style={{ background: 'rgba(255,255,255,0.06)', color: '#9CA3AF', borderRadius: 20, padding: '4px 12px', fontSize: 12 }}>Move-in {p.move}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, marginBottom: 10 }}>
        {p.hoods.map(h => (
          <span key={h} style={{ border: '1px solid rgba(0,201,167,0.4)', color: '#00C9A7', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{h}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, marginBottom: 16 }}>
        {p.tags.map(t => (
          <span key={t} style={{ background: 'rgba(255,255,255,0.07)', color: '#9CA3AF', borderRadius: 20, padding: '3px 10px', fontSize: 11 }}>{t}</span>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
        <p style={{ fontStyle: 'italic', color: '#6B7280', fontSize: 13, textAlign: 'center', lineHeight: 1.55, width: '100%' }}>
          "{p.bio}"
        </p>
      </div>
    </div>
  )
}

/* ── Empty state ── */
function EmptyState({ onRefresh }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 540, gap: 16 }}>
      <div style={{ fontSize: 48, marginBottom: 4 }}>🌀</div>
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 22, color: '#fff' }}>You've seen everyone for now.</div>
      <div style={{ color: '#9CA3AF', fontSize: 14 }}>New matches refresh daily.</div>
      <button onClick={onRefresh} style={{
        marginTop: 8, border: '1.5px solid #00C9A7', background: 'transparent',
        color: '#00C9A7', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
      }}>Refresh matches</button>
    </div>
  )
}

/* ── Swipe stack ── */
function SwipeStack({ profiles, onConnect, onMatchMoment }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(null)

  const current = profiles[idx]
  const next    = profiles[idx + 1]

  function swipe(direction) {
    if (dir || !current) return
    if (direction === 'right') {
      if (current.pendingLike) {
        onMatchMoment(current)
      } else {
        onConnect(current)
      }
    }
    setDir(direction)
    setTimeout(() => { setIdx(i => i + 1); setDir(null) }, 320)
  }

  if (idx >= profiles.length) return <EmptyState onRefresh={() => setIdx(0)} />

  return (
    <div>
      <div style={{ position: 'relative', maxWidth: 360, height: 540, margin: '0 auto' }}>
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

        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          transform:
            dir === 'left'  ? 'translateX(-120%) rotate(-10deg)' :
            dir === 'right' ? 'translateX(120%)  rotate(10deg)'  : 'none',
          opacity: dir ? 0 : 1,
          transition: dir ? 'transform 0.32s ease-out, opacity 0.28s ease-out' : 'none',
        }}>
          <ProfileCard p={current} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 36, marginTop: 28 }}>
        <button onClick={() => swipe('left')} style={{
          width: 58, height: 58, borderRadius: '50%',
          border: '2px solid #EF4444', background: 'transparent',
          color: '#EF4444', fontSize: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.12s ease, background 0.15s',
          boxShadow: '0 4px 16px rgba(239,68,68,0.2)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = '' }}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1.08)'}
        >✕</button>

        <button onClick={() => swipe('right')} style={{
          width: 58, height: 58, borderRadius: '50%',
          border: 'none', background: '#00C9A7',
          color: '#fff', fontSize: 22, cursor: 'pointer',
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

      <div style={{ display: 'flex', justifyContent: 'center', gap: 80, marginTop: 10 }}>
        <span style={{ color: '#EF4444', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>PASS</span>
        <span style={{ color: '#00C9A7', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>CONNECT</span>
      </div>
    </div>
  )
}

/* ── Pending matches banner ── */
function PendingBanner({ pending, onReveal, revealed, onConnect }) {
  if (pending.length === 0) return null

  if (!revealed) {
    return (
      <button onClick={onReveal} style={{
        width: '100%', background: '#1B2A4A',
        border: '1px solid rgba(0,201,167,0.2)',
        borderRadius: 14, padding: '14px 18px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: 'pointer', textAlign: 'left',
        boxShadow: '0 4px 20px rgba(0,201,167,0.1)',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,201,167,0.45)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,201,167,0.2)'}
      >
        {/* Blurred avatar stack */}
        <div style={{ position: 'relative', width: 72, height: 40, flexShrink: 0 }}>
          {pending.slice(0, 3).map((p, i) => (
            <div key={p.name} style={{
              position: 'absolute', left: i * 20, top: 0,
              width: 40, height: 40, borderRadius: '50%',
              background: p.color,
              border: '2px solid #1B2A4A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
              filter: 'blur(2.5px)',
              zIndex: i,
            }}>{p.initials}</div>
          ))}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
            {pending.length} {pending.length === 1 ? 'person wants' : 'people want'} to co-rent with you
          </div>
          <div style={{ fontSize: 12, color: '#9CA3AF' }}>Tap to see who</div>
        </div>

        <div style={{
          background: '#00C9A7', color: '#0D0F14',
          borderRadius: 20, padding: '3px 10px',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>{pending.length}</div>

        <span style={{ color: '#9CA3AF', fontSize: 18 }}>›</span>
      </button>
    )
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 18, color: '#fff' }}>
          They connected with you
        </div>
        <span style={{
          background: 'rgba(0,201,167,0.15)', color: '#00C9A7',
          borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700,
        }}>{pending.length} pending</span>
      </div>

      {pending.map(p => (
        <div key={p.name} style={{
          background: '#1B2A4A', borderRadius: 14, padding: '16px 18px', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: p.color, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16, flexShrink: 0,
            border: '2px solid rgba(0,201,167,0.4)',
          }}>{p.initials}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: '#00C9A7', fontWeight: 600, marginBottom: 2 }}>
              They connected with you
            </div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
              {p.match}% match · {p.tags[0]}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button onClick={() => onConnect(p, 'pass')} style={{
              border: '1.5px solid rgba(255,255,255,0.12)', background: 'transparent',
              color: '#9CA3AF', borderRadius: 8, padding: '7px 12px',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>Pass</button>
            <button onClick={() => onConnect(p, 'back')} style={{
              background: '#00C9A7', border: 'none',
              color: '#0D0F14', borderRadius: 8, padding: '7px 12px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 2px 10px rgba(0,201,167,0.35)',
            }}>Connect Back</button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Match card ── */
function MatchCard({ p, onCoApply }) {
  return (
    <div style={{
      background: '#1B2A4A', borderRadius: 14, padding: '16px 18px', marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%', background: p.color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, flexShrink: 0,
      }}>{p.initials}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{p.tags[0]} · {p.tags[1]}</div>
      </div>

      <div style={{ color: '#00C9A7', fontWeight: 700, fontSize: 14, flexShrink: 0, marginRight: 12 }}>
        {p.match}%
      </div>

      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button style={{
          border: '1.5px solid #00C9A7', background: 'transparent', color: '#00C9A7',
          borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        }}>View profile</button>
        <button onClick={() => onCoApply(p)} style={{
          background: '#00C9A7', border: 'none', color: '#0D0F14',
          borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        }}>Co-apply</button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   Main component
═══════════════════════════════════════ */
export default function RoommateFinder() {
  const profiles   = useFilteredProfiles()
  const [tab,           setTab]           = useState('discover')
  const [matches,       setMatches]       = useState([ALL_PROFILES[0]]) // Marcus pre-matched
  const [pending,       setPending]       = useState(PENDING_POOL)
  const [pendingShown,  setPendingShown]  = useState(false)
  const [matchProfile,  setMatchProfile]  = useState(null) // triggers MatchMoment
  const [jointProfile,  setJointProfile]  = useState(null) // triggers JointAppModal

  /* Add to My Matches (no dupe) */
  function addMatch(p) {
    setMatches(m => m.find(x => x.name === p.name) ? m : [...m, p])
  }

  /* Discover swipe right → just add to matches (no instant match moment) */
  function handleConnect(p) { addMatch(p) }

  /* Swipe right on a pendingLike profile → show match moment */
  function handleMatchMoment(p) {
    setMatchProfile(p)
    setPending(prev => prev.filter(x => x.name !== p.name))
  }

  /* Pending banner action */
  function handlePendingAction(p, action) {
    setPending(prev => prev.filter(x => x.name !== p.name))
    if (action === 'back') {
      setMatchProfile(p)
    }
  }

  /* Match moment resolved */
  function handleMatchConfirm(p) {
    addMatch(p)
    setMatchProfile(null)
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
        {[['discover','Discover'], ['matches',`My Matches (${matches.length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: '10px 20px', fontSize: 14,
            fontWeight: tab === key ? 600 : 400,
            color: tab === key ? '#fff' : 'rgba(255,255,255,0.4)',
            background: 'none', border: 'none',
            borderBottom: `2px solid ${tab === key ? '#00C9A7' : 'transparent'}`,
            marginBottom: -1, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'discover' && (
        <>
          {/* Pending matches banner — above the card stack */}
          <PendingBanner
            pending={pending}
            onReveal={() => setPendingShown(true)}
            revealed={pendingShown}
            onConnect={handlePendingAction}
          />

          <SwipeStack
            profiles={profiles}
            onConnect={handleConnect}
            onMatchMoment={handleMatchMoment}
          />
        </>
      )}

      {tab === 'matches' && (
        <div>
          {matches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
              No matches yet — start swiping!
            </div>
          ) : (
            matches.map(p => (
              <MatchCard key={p.name} p={p} onCoApply={setJointProfile} />
            ))
          )}
        </div>
      )}

      {/* Joint application modal */}
      {jointProfile && (
        <JointAppModal profile={jointProfile} onClose={() => setJointProfile(null)} />
      )}

      {/* Match Moment full-screen overlay */}
      {matchProfile && (
        <MatchMoment
          profile={matchProfile}
          onStartJoint={() => {
            handleMatchConfirm(matchProfile)
            setJointProfile(matchProfile)
          }}
          onKeepDiscovering={() => handleMatchConfirm(matchProfile)}
        />
      )}
    </div>
  )
}
