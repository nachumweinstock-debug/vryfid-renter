import { useState } from 'react'
import ShareDocsModal from '../modals/ShareDocsModal'

const DOCS = [
  { icon: '🪪', name: 'Government ID',       status: 'verified', file: 'passport_scan.pdf',         date: 'March 3, 2026' },
  { icon: '💼', name: 'Proof of Income',     status: 'uploaded', file: 'paystub_march.pdf',         date: 'April 10, 2026' },
  { icon: '🏦', name: 'Bank Statements',     status: 'uploaded', file: 'chase_statements_q1.pdf',   date: 'April 10, 2026' },
  { icon: '📊', name: 'Credit Report',       status: 'missing' },
  { icon: '📎', name: 'Additional Documents',status: 'missing' },
]

const STATUS_BADGE = {
  verified: { label: 'Verified',  bg: 'var(--blue-bg)',  color: 'var(--blue)' },
  uploaded: { label: 'Uploaded',  bg: 'var(--green-bg)', color: 'var(--green)' },
  missing:  { label: 'Missing',   bg: 'var(--red-bg)',   color: 'var(--red)',  border: '1px solid #FECACA' },
}

export default function Documents() {
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px 48px' }}>
      <h1 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 26, color: 'var(--navy)' }}>
        My Documents
      </h1>
      <p style={{ color: 'var(--ink-light)', marginTop: 4, marginBottom: 24, fontSize: 14 }}>
        Upload and manage the documents you share with landlords and brokers.
      </p>

      {/* Progress */}
      <div style={{
        background: '#fff', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 20, marginBottom: 24,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
          <span>Profile completeness</span>
          <span style={{ color: 'var(--navy)' }}>3 of 5 documents</span>
        </div>
        <div style={{ height: 10, background: '#E5E7EB', borderRadius: 5, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg, var(--navy), var(--navy-mid))', borderRadius: 5, transition: 'width 0.6s' }} />
        </div>
      </div>

      {/* Document cards */}
      {DOCS.map(doc => {
        const badge = STATUS_BADGE[doc.status]
        return (
          <div key={doc.name} style={{
            background: '#fff', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '16px 20px',
            marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: 'var(--info, #E8F0FE)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>{doc.icon}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{doc.name}</div>
              {doc.file
                ? <div style={{ fontSize: 12, color: 'var(--ink-light)', marginTop: 2 }}>{doc.file} &nbsp;·&nbsp; Uploaded {doc.date}</div>
                : <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 2 }}>Not yet uploaded</div>
              }
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{
                background: badge.bg, color: badge.color,
                border: badge.border || 'none',
                padding: '3px 10px', borderRadius: 20,
                fontSize: 12, fontWeight: 700,
              }}>{badge.label}</span>

              {doc.file && (
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 16, padding: '4px 6px', borderRadius: 6,
                  color: 'var(--ink-light)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-bg)'; e.currentTarget.style.color = 'var(--red)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--ink-light)' }}
                >🗑</button>
              )}

              {!doc.file && (
                <button style={{
                  border: '1.5px solid var(--navy)', color: 'var(--navy)',
                  background: 'transparent', borderRadius: 8,
                  padding: '7px 14px', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}>Upload</button>
              )}
            </div>
          </div>
        )
      })}

      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => setShareOpen(true)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, var(--navy), var(--navy-deep))',
            color: '#fff', border: 'none', borderRadius: 10,
            padding: 14, fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: 'var(--shadow-navy)',
          }}
        >Share documents with a landlord</button>
      </div>

      {shareOpen && <ShareDocsModal onClose={() => setShareOpen(false)} />}
    </div>
  )
}
