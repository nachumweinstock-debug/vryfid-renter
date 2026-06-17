import { useState } from 'react'
import RenterMap from '../RenterMap'

const APPLIED = [
  { addr: '143 W 143rd St, Washington Heights', landlord: 'Heights Realty Group',         date: 'May 2, 2026',    status: 'Under Review', sc: '#3B82F6', sb: 'rgba(59,130,246,0.15)', docs: ['Gov ID', 'Income', 'Bank statements'], note: 'Application looks strong, checking references.' },
  { addr: '507 W 158th St, Washington Heights', landlord: 'Uptown Realty',                date: 'May 8, 2026',    status: 'Pending',      sc: '#9CA3AF', sb: 'rgba(156,163,175,0.12)', docs: ['Gov ID', 'Income'], note: null },
  { addr: '88 Arden St, Inwood',                landlord: 'Private Landlord (J. Morales)', date: 'April 28, 2026', status: 'Approved',     sc: '#00C9A7', sb: 'rgba(0,201,167,0.12)', docs: ['Gov ID', 'Income', 'Bank statements', 'Credit report'], note: 'Approved. Please sign lease by June 30.' },
]

const RECS = [
  { addr: '620 W 181st St, Washington Heights', why: 'Matches your budget, Vibes score, and top subway line.' },
  { addr: '42 Nagle Ave, Inwood',               why: 'Quiet building, under max rent, 3 blocks from Dyckman.' },
]

const REQUESTS = [
  { landlord: 'David Kim',          addr: '340 Riverside Dr, Upper West Side', date: 'June 1, 2026' },
  { landlord: 'Sunrise Properties', addr: '214 W 116th St, Harlem',            date: 'June 3, 2026' },
]

function ExpandCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: '#1B2A4A', borderRadius: 14, padding: 20, marginBottom: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{item.addr}</div>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{item.landlord}</div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>Submitted {item.date}</div>
        </div>
        <span style={{ background: item.sb, color: item.sc, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
          {item.status}
        </span>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Docs sent</div>
        {item.docs.map(d => (
          <span key={d} style={{ display: 'inline-flex', padding: '3px 10px', background: 'rgba(255,255,255,0.06)', color: '#9CA3AF', borderRadius: 20, fontSize: 11, margin: 2 }}>{d}</span>
        ))}
      </div>

      <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', color: '#F97316', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif' }}>
        Details {open ? '▴' : '▾'}
      </button>

      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Broker notes</div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: 12, fontSize: 13, lineHeight: 1.5, color: item.note ? '#9CA3AF' : '#6B7280' }}>
            {item.note || 'No notes from landlord yet.'}
          </div>
        </div>
      )}
    </div>
  )
}

const SH = ({ children }) => (
  <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 20, color: '#fff', margin: '28px 0 14px' }}>
    {children}
  </div>
)

export default function Applications() {
  const [view, setView] = useState('map')

  return (
    <div>
      {/* Seg control */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 16px 0' }}>
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 4 }}>
          {[['map','Map view'],['list','List view']].map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '8px 26px',
              border: 'none', borderRadius: 7,
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              fontWeight: view === v ? 700 : 400,
              color: view === v ? '#0D0F14' : 'rgba(255,255,255,0.45)',
              background: view === v ? '#F97316' : 'transparent',
              cursor: 'pointer',
              boxShadow: view === v ? '0 2px 12px rgba(249,115,22,0.35)' : 'none',
              transition: 'all 0.15s',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {view === 'map' && <RenterMap onSwitchToList={() => setView('list')} />}

      {view === 'list' && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px 64px' }}>

          <SH>Applied</SH>
          {APPLIED.map(a => <ExpandCard key={a.addr} item={a} />)}

          <SH>Homey recommendations</SH>
          {RECS.map(r => (
            <div key={r.addr} style={{
              background: '#1B2A4A', borderRadius: 14, padding: 20, marginBottom: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              borderLeft: '3px solid #00C9A7',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{r.addr}</div>
                <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 5, fontStyle: 'italic' }}>✨ {r.why}</div>
              </div>
              <button style={{
                background: '#F97316', border: 'none', color: '#fff',
                borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0,
                boxShadow: '0 2px 10px rgba(249,115,22,0.3)',
              }}>Start application</button>
            </div>
          ))}

          <SH>Landlord requests</SH>
          {REQUESTS.map(r => (
            <div key={r.addr} style={{
              background: '#1B2A4A', borderRadius: 14, padding: 20, marginBottom: 10,
              borderLeft: '3px solid #FBBF24',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{r.landlord}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 2 }}>{r.addr}</div>
              <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 14 }}>Requested {r.date}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ background: '#F97316', border: 'none', color: '#fff', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Accept</button>
                <button style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', color: '#9CA3AF', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
