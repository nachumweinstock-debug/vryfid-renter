import { useState } from 'react'
import ShareDocsModal from '../modals/ShareDocsModal'

const DOCS = [
  { icon: '🪪', name: 'Government ID',        status: 'verified', file: 'passport_scan.pdf',       date: 'March 3, 2026' },
  { icon: '💼', name: 'Proof of Income',      status: 'uploaded', file: 'paystub_march.pdf',       date: 'April 10, 2026' },
  { icon: '🏦', name: 'Bank Statements',      status: 'uploaded', file: 'chase_statements_q1.pdf', date: 'April 10, 2026' },
  { icon: '📊', name: 'Credit Report',        status: 'missing' },
  { icon: '📎', name: 'Additional Documents', status: 'missing' },
]

const BADGE = {
  verified: { label: 'Verified',  color: '#00C9A7', bg: 'rgba(0,201,167,0.12)' },
  uploaded: { label: 'Uploaded',  color: '#9CA3AF', bg: 'rgba(255,255,255,0.08)' },
  missing:  { label: 'Missing',   color: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' },
}

export default function Documents() {
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px 64px' }}>
      <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 32, color: '#fff' }}>
        My Documents
      </h1>
      <p style={{ color: '#9CA3AF', marginTop: 6, marginBottom: 28, fontSize: 14 }}>
        Upload and manage the documents you share with landlords and brokers.
      </p>

      {/* Progress */}
      <div style={{ background: '#1B2A4A', borderRadius: 14, padding: '18px 20px', marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
          <span>Profile completeness</span>
          <span style={{ color: '#7C3AED' }}>3 of 5 documents</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg, #7C3AED, #8B5CF6)', borderRadius: 4, transition: 'width 0.6s' }} />
        </div>
      </div>

      {/* Doc cards */}
      {DOCS.map(doc => {
        const b = BADGE[doc.status]
        return (
          <div key={doc.name} style={{
            background: '#1B2A4A', borderRadius: 14, padding: '16px 18px',
            marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'rgba(124,58,237,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>{doc.icon}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{doc.name}</div>
              {doc.file
                ? <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{doc.file} · Uploaded {doc.date}</div>
                : <div style={{ fontSize: 12, color: 'rgba(239,68,68,0.7)', marginTop: 2 }}>Not yet uploaded</div>
              }
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ background: b.bg, color: b.color, border: b.border || 'none', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{b.label}</span>
              {doc.file && (
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, padding: '4px', borderRadius: 6, color: '#6B7280', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
                >🗑</button>
              )}
              {!doc.file && (
                <button style={{
                  background: '#7C3AED', border: 'none',
                  color: '#fff', borderRadius: 8,
                  padding: '6px 14px', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}>Upload</button>
              )}
            </div>
          </div>
        )
      })}

      <div style={{ marginTop: 24 }}>
        <button onClick={() => setShareOpen(true)} style={{
          width: '100%', background: '#7C3AED', border: 'none',
          color: '#fff', borderRadius: 12,
          padding: 14, fontSize: 15, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
          transition: 'background 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#6D28D9'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(124,58,237,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#7C3AED'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.35)' }}
        >Share documents with a landlord</button>
      </div>

      {shareOpen && <ShareDocsModal onClose={() => setShareOpen(false)} />}
    </div>
  )
}
