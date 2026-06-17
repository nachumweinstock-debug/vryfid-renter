import { useState } from 'react'
import RenterMap from '../RenterMap'

const APPLIED = [
  { addr: '143 W 143rd St, Washington Heights', landlord: 'Heights Realty Group',            date: 'May 2, 2026',   status: 'Under Review', statusStyle: { bg: 'var(--blue-bg)',  color: 'var(--blue)' },  docs: ['Gov ID', 'Income', 'Bank statements'], note: 'Application looks strong, checking references.' },
  { addr: '507 W 158th St, Washington Heights', landlord: 'Uptown Realty',                   date: 'May 8, 2026',   status: 'Pending',      statusStyle: { bg: '#F3F4F6',         color: 'var(--ink-light)' }, docs: ['Gov ID', 'Income'], note: null },
  { addr: '88 Arden St, Inwood',                landlord: 'Private Landlord (J. Morales)',    date: 'April 28, 2026',status: 'Approved',     statusStyle: { bg: 'var(--green-bg)', color: 'var(--green)' }, docs: ['Gov ID', 'Income', 'Bank statements', 'Credit report'], note: 'Approved. Please sign lease by June 30.' },
]

const RECS = [
  { addr: '620 W 181st St, Washington Heights', why: 'Matches your budget, Vibes score for Washington Heights, and is near your top subway line.' },
  { addr: '42 Nagle Ave, Inwood',               why: 'Quiet building, under your max rent, and 3 blocks from Dyckman St station.' },
]

const REQUESTS = [
  { landlord: 'David Kim',          addr: '340 Riverside Dr, Upper West Side', date: 'June 1, 2026' },
  { landlord: 'Sunrise Properties', addr: '214 W 116th St, Harlem',            date: 'June 3, 2026' },
]

function ExpandCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{item.addr}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-light)', marginTop: 2 }}>{item.landlord}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-light)', marginTop: 3 }}>Submitted {item.date}</div>
        </div>
        <span style={{ background: item.statusStyle.bg, color: item.statusStyle.color, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
          {item.status}
        </span>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-light)', marginBottom: 4 }}>Documents sent</div>
        {item.docs.map(d => (
          <span key={d} style={{ display: 'inline-flex', padding: '3px 10px', background: '#F3F4F6', color: 'var(--ink-light)', borderRadius: 20, fontSize: 12, margin: 2 }}>{d}</span>
        ))}
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: 'none', border: 'none', color: 'var(--navy)', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 4 }}
      >
        Details {open ? '▴' : '▾'}
      </button>

      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-light)', marginBottom: 6 }}>Broker notes</div>
          <div style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 8, padding: 12, fontSize: 13, lineHeight: 1.5, color: item.note ? '#374151' : 'var(--ink-light)' }}>
            {item.note || 'No notes from landlord yet.'}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Applications() {
  const [view, setView] = useState('map')

  return (
    <div>
      {/* Segmented control */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
        <div style={{ display: 'inline-flex', background: '#F3F4F6', borderRadius: 8, padding: 4 }}>
          {['map', 'list'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '8px 26px',
              border: 'none', borderRadius: 6,
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              fontWeight: view === v ? 600 : 500,
              color: view === v ? 'var(--navy)' : 'var(--ink-light)',
              background: view === v ? '#fff' : 'transparent',
              cursor: 'pointer',
              boxShadow: view === v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s',
              textTransform: 'capitalize',
            }}>{v === 'map' ? 'Map view' : 'List view'}</button>
          ))}
        </div>
      </div>

      {view === 'map' && (
        <RenterMap onSwitchToList={() => setView('list')} />
      )}

      {view === 'list' && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px 48px' }}>

          <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 20, color: 'var(--navy)', margin: '24px 0 16px' }}>Applied</div>
          {APPLIED.map(a => <ExpandCard key={a.addr} item={a} />)}

          <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 20, color: 'var(--navy)', margin: '32px 0 16px' }}>Homey recommendations</div>
          {RECS.map(r => (
            <div key={r.addr} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{r.addr}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-light)', marginTop: 5, display: 'flex', gap: 5 }}>
                  <span>✨</span><span>{r.why}</span>
                </div>
              </div>
              <button style={{
                background: 'var(--navy)', color: '#fff',
                border: 'none', borderRadius: 8,
                padding: '7px 14px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', flexShrink: 0,
                fontFamily: 'Inter, sans-serif',
              }}>Start application</button>
            </div>
          ))}

          <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 20, color: 'var(--navy)', margin: '32px 0 16px' }}>Landlord requests</div>
          {REQUESTS.map(r => (
            <div key={r.addr} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{r.landlord}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-light)', marginTop: 2 }}>{r.addr}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-light)', marginTop: 3, marginBottom: 14 }}>Requested {r.date}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Accept</button>
                <button style={{ background: 'transparent', border: '1.5px solid var(--border)', color: '#374151', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
