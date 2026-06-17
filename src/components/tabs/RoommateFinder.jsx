import { useState } from 'react'
import JointAppModal from '../modals/JointAppModal'

const PROFILES = [
  { initials: 'MT', color: '#0D9488', name: 'Marcus Thompson', budget: '$1,800 – $2,400/mo', move: 'July 1, 2026',     hoods: ['Washington Heights', 'Inwood'],              lifestyle: ['Quiet', 'Gym-goer', 'Clean'] },
  { initials: 'DL', color: '#EA580C', name: 'Dani Levine',     budget: '$2,000 – $2,800/mo', move: 'August 1, 2026',  hoods: ['Upper West Side', 'Morningside Heights'],    lifestyle: ['Social', 'Pet-friendly', 'WFH'] },
  { initials: 'JR', color: '#7C3AED', name: 'Josh Roth',       budget: '$1,600 – $2,200/mo', move: 'July 15, 2026',   hoods: ['Washington Heights', 'Harlem'],               lifestyle: ['Night owl', 'Music', 'Chill'] },
  { initials: 'PP', color: '#DB2777', name: 'Priya Patel',     budget: '$2,200 – $3,000/mo', move: 'August 15, 2026', hoods: ['Upper East Side', 'Yorkville'],               lifestyle: ['Early riser', 'Neat', 'No smoking'] },
]

function RenterCard({ p, showMatchBadge, onJointApp }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: 20, marginBottom: 14,
      display: 'flex', alignItems: 'flex-start', gap: 14,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: p.color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, flexShrink: 0,
      }}>{p.initials}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 3 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</span>
          {showMatchBadge && (
            <span style={{ background: 'var(--green-bg)', color: 'var(--green)', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              Matched
            </span>
          )}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-light)', marginBottom: 8 }}>
          {p.budget} &nbsp;·&nbsp; Move-in {p.move}
        </div>
        <div>
          {p.hoods.map(h => (
            <span key={h} style={{ display: 'inline-flex', padding: '3px 10px', border: '1px solid var(--navy)', color: 'var(--navy)', borderRadius: 20, fontSize: 12, margin: 2 }}>{h}</span>
          ))}
          {p.lifestyle.map(l => (
            <span key={l} style={{ display: 'inline-flex', padding: '3px 10px', background: '#F3F4F6', color: 'var(--ink-light)', borderRadius: 20, fontSize: 12, margin: 2 }}>{l}</span>
          ))}
        </div>
      </div>

      {!showMatchBadge && (
        <button style={{
          background: 'var(--navy)', color: '#fff',
          border: 'none', borderRadius: 8,
          padding: '7px 14px', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', flexShrink: 0,
          fontFamily: 'Inter, sans-serif',
        }}>Connect</button>
      )}
    </div>
  )
}

export default function RoommateFinder() {
  const [tab, setTab] = useState('browse')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px 48px' }}>
      <h1 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 26, color: 'var(--navy)', marginBottom: 20 }}>
        Roommate Finder
      </h1>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 24 }}>
        {['browse', 'matches'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 20px', fontSize: 14, fontWeight: tab === t ? 600 : 500,
            color: tab === t ? 'var(--navy)' : 'var(--ink-light)',
            background: 'none', border: 'none',
            borderBottom: `2px solid ${tab === t ? 'var(--navy)' : 'transparent'}`,
            marginBottom: -1, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'capitalize',
          }}>
            {t === 'browse' ? 'Browse' : 'My Matches'}
          </button>
        ))}
      </div>

      {tab === 'browse' && (
        <div>
          {PROFILES.map(p => <RenterCard key={p.name} p={p} />)}
        </div>
      )}

      {tab === 'matches' && (
        <div>
          <RenterCard p={PROFILES[0]} showMatchBadge />
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                width: '100%', background: 'linear-gradient(135deg, var(--navy), var(--navy-deep))',
                color: '#fff', border: 'none', borderRadius: 10,
                padding: '14px', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                boxShadow: 'var(--shadow-navy)',
              }}
            >
              Start joint application with Marcus →
            </button>
          </div>
        </div>
      )}

      {modalOpen && <JointAppModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
