import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

/* ── Building colour ramp (from vryfid-demo) ── */
const BLDG_COLOR = [
  'interpolate', ['linear'],
  ['coalesce', ['get', 'render_height'], ['get', 'height'], 8],
  0,   '#CFE0F4',
  20,  '#A8C8E8',
  60,  '#6B9FD0',
  130, '#3D72B8',
  240, '#2050A0',
  380, '#163880',
  650, '#0C2560',
]

function ensureCSS() {
  if (document.getElementById('vryfid-pin-css')) return
  const s = document.createElement('style')
  s.id = 'vryfid-pin-css'
  s.textContent = `
    @keyframes vryfid-breathe {
      0%,100% { transform:scale(1); opacity:1; }
      50%      { transform:scale(1.1); opacity:0.85; }
    }
    .vryfid-active-pin { animation: vryfid-breathe 2.8s ease-in-out infinite; will-change:transform; }
  `
  document.head.appendChild(s)
}

/* ── Pin factories ── */
function createNavyPin() {
  ensureCSS()
  const el = document.createElement('div')
  el.style.cssText = 'width:44px;height:44px;pointer-events:none;'
  el.innerHTML = `
    <div class="vryfid-active-pin" style="width:44px;height:44px;">
      <svg viewBox="0 0 44 44" width="44" height="44" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <radialGradient id="npg" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stop-color="#3562BE"/>
            <stop offset="100%" stop-color="#0C2560"/>
          </radialGradient>
          <filter id="nglow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b"/>
            <feFlood flood-color="#3D72B8" flood-opacity="0.5" result="c"/>
            <feComposite in="c" in2="b" operator="in" result="glow"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <circle cx="22" cy="22" r="21" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <circle cx="22" cy="22" r="16" fill="white" filter="url(#nglow)"/>
        <circle cx="22" cy="22" r="13" fill="url(#npg)"/>
        <path d="M17 22l3.5 3.5L27 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.9"/>
      </svg>
    </div>`
  return el
}

function createTealPin() {
  const el = document.createElement('div')
  el.style.cssText = 'width:36px;height:36px;cursor:pointer;'
  const inner = document.createElement('div')
  inner.style.cssText = 'width:36px;height:36px;opacity:0.85;transform:scale(0.9);transform-origin:center;transition:opacity 0.2s,transform 0.2s;'
  inner.innerHTML = `
    <svg viewBox="0 0 36 36" width="36" height="36" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs>
        <radialGradient id="tpg" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stop-color="#14B8A6"/>
          <stop offset="100%" stop-color="#0D9488"/>
        </radialGradient>
        <filter id="tshad" x="-70%" y="-70%" width="240%" height="240%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0D9488" flood-opacity="0.3"/>
        </filter>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#tpg)" filter="url(#tshad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <text x="18" y="23" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="13" fill="white">✨</text>
    </svg>`
  el.addEventListener('mouseenter', () => { inner.style.opacity = '1'; inner.style.transform = 'scale(1.12)' })
  el.addEventListener('mouseleave', () => { inner.style.opacity = '0.85'; inner.style.transform = 'scale(0.9)' })
  el.appendChild(inner)
  return el
}

function createAmberPin() {
  const el = document.createElement('div')
  el.style.cssText = 'width:36px;height:36px;cursor:pointer;'
  const inner = document.createElement('div')
  inner.style.cssText = 'width:36px;height:36px;opacity:0.85;transform:scale(0.9);transform-origin:center;transition:opacity 0.2s,transform 0.2s;'
  inner.innerHTML = `
    <svg viewBox="0 0 36 36" width="36" height="36" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs>
        <radialGradient id="apg" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stop-color="#FBBF24"/>
          <stop offset="100%" stop-color="#D97706"/>
        </radialGradient>
        <filter id="ashad" x="-70%" y="-70%" width="240%" height="240%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#D97706" flood-opacity="0.3"/>
        </filter>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#apg)" filter="url(#ashad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <text x="18" y="23" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="11" fill="white">📬</text>
    </svg>`
  el.addEventListener('mouseenter', () => { inner.style.opacity = '1'; inner.style.transform = 'scale(1.12)' })
  el.addEventListener('mouseleave', () => { inner.style.opacity = '0.85'; inner.style.transform = 'scale(0.9)' })
  el.appendChild(inner)
  return el
}

function applyBuildingStyles(map) {
  const layers = map.getStyle().layers
  let found = false
  layers.forEach(l => {
    if (l.type === 'fill-extrusion' && l['source-layer'] === 'building') {
      found = true
      try {
        map.setPaintProperty(l.id, 'fill-extrusion-color', BLDG_COLOR)
        map.setPaintProperty(l.id, 'fill-extrusion-opacity', 0.9)
      } catch {}
    }
  })
  if (!found) {
    const sources = map.getStyle().sources
    const srcId = 'openmaptiles' in sources
      ? 'openmaptiles'
      : Object.keys(sources).find(k => sources[k].type === 'vector')
    if (srcId) {
      const beforeId = layers.find(l => l.type === 'symbol')?.id
      try {
        map.addLayer({
          id: 'vryfid-bldg',
          type: 'fill-extrusion',
          source: srcId,
          'source-layer': 'building',
          paint: {
            'fill-extrusion-color': BLDG_COLOR,
            'fill-extrusion-height': ['coalesce', ['get', 'render_height'], ['get', 'height'], 8],
            'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': 0.9,
          },
        }, beforeId)
      } catch {}
    }
  }
  layers.forEach(l => {
    if (l['source-layer'] === 'water' && l.type === 'fill') {
      try { map.setPaintProperty(l.id, 'fill-color', '#B8D6F0') } catch {}
    }
  })
}

/* ── Map data ── */
const APPLIED = [
  { id: 'a1', lat: 40.8228, lng: -73.9519, addr: '143 W 143rd St', neighborhood: 'Washington Heights', status: 'Under Review', statusColor: '#2563EB', statusBg: '#DBEAFE', docs: 'Gov ID · Income · Bank Statements' },
  { id: 'a2', lat: 40.8357, lng: -73.9417, addr: '507 W 158th St', neighborhood: 'Washington Heights', status: 'Pending', statusColor: '#6B7280', statusBg: '#F3F4F6', docs: 'Gov ID · Income' },
  { id: 'a3', lat: 40.8686, lng: -73.9233, addr: '88 Arden St',    neighborhood: 'Inwood',             status: 'Approved',     statusColor: '#16A34A', statusBg: '#DCFCE7', docs: 'Gov ID · Income · Bank Statements · Credit Report' },
]

const RECOMMENDED = [
  { id: 'r1', lat: 40.8560, lng: -73.9336, addr: '620 W 181st St', neighborhood: 'Washington Heights', why: 'Matches your budget, Vibes score, and top subway line.' },
  { id: 'r2', lat: 40.8721, lng: -73.9225, addr: '42 Nagle Ave',   neighborhood: 'Inwood',             why: 'Quiet building, under max rent, 3 blocks from Dyckman.' },
]

const REQUESTS = [
  { id: 'q1', lat: 40.8015, lng: -73.9721, addr: '340 Riverside Dr', neighborhood: 'Upper West Side', landlord: 'David Kim',          date: 'June 1, 2026' },
  { id: 'q2', lat: 40.8034, lng: -73.9519, addr: '214 W 116th St',   neighborhood: 'Harlem',          landlord: 'Sunrise Properties', date: 'June 3, 2026' },
]

/* ── Component ── */
export default function RenterMap({ onSwitchToList }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-73.9396, 40.8448],
      zoom: 12.8,
      pitch: 42,
      bearing: -8,
      antialias: true,
      attributionControl: false,
    })
    mapRef.current = map

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left')
    map.addControl(new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true }), 'bottom-right')

    map.on('load', () => {
      applyBuildingStyles(map)

      /* Applied pins */
      APPLIED.forEach(p => {
        const el = createNavyPin()
        new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat([p.lng, p.lat])
          .setPopup(new maplibregl.Popup({ offset: 18, closeButton: false, maxWidth: '260px', className: 'vryfid-popup' })
            .setHTML(`
              <div style="font-family:Inter,sans-serif;padding:4px 2px;">
                <div style="font-weight:700;font-size:14px;color:#1B3A6B;margin-bottom:2px;">${p.addr}</div>
                <div style="font-size:12px;color:#6B7280;margin-bottom:8px;">${p.neighborhood}</div>
                <div style="display:inline-flex;align-items:center;background:${p.statusBg};color:${p.statusColor};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:8px;">${p.status}</div>
                <div style="font-size:12px;color:#6B7280;margin-bottom:10px;"><strong style="color:#374151;">Docs:</strong> ${p.docs}</div>
                <button onclick="window.__switchToList()" style="width:100%;background:linear-gradient(135deg,#1B3A6B,#0C2560);color:#fff;border:none;padding:8px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">View details →</button>
              </div>`))
          .addTo(map)
      })

      /* Recommended pins */
      RECOMMENDED.forEach(p => {
        const el = createTealPin()
        new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat([p.lng, p.lat])
          .setPopup(new maplibregl.Popup({ offset: 18, closeButton: false, maxWidth: '240px' })
            .setHTML(`
              <div style="font-family:Inter,sans-serif;padding:4px 2px;">
                <div style="font-weight:700;font-size:14px;color:#1B3A6B;margin-bottom:2px;">${p.addr}</div>
                <div style="font-size:12px;color:#6B7280;margin-bottom:8px;">${p.neighborhood}</div>
                <div style="display:inline-flex;align-items:center;background:#CCFBF1;color:#0D9488;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:8px;">✨ Homey Recommended</div>
                <div style="font-size:12px;color:#6B7280;margin-bottom:10px;">${p.why}</div>
                <button onclick="window.__switchToList()" style="width:100%;background:linear-gradient(135deg,#0D9488,#06B6D4);color:#fff;border:none;padding:8px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">View details →</button>
              </div>`))
          .addTo(map)
      })

      /* Landlord request pins */
      REQUESTS.forEach(p => {
        const el = createAmberPin()
        new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat([p.lng, p.lat])
          .setPopup(new maplibregl.Popup({ offset: 18, closeButton: false, maxWidth: '240px' })
            .setHTML(`
              <div style="font-family:Inter,sans-serif;padding:4px 2px;">
                <div style="font-weight:700;font-size:14px;color:#1B3A6B;margin-bottom:2px;">${p.addr}</div>
                <div style="font-size:12px;color:#6B7280;margin-bottom:8px;">${p.neighborhood}</div>
                <div style="display:inline-flex;align-items:center;background:#FEF3C7;color:#D97706;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:8px;">📬 Landlord Request</div>
                <div style="font-size:12px;color:#374151;margin-bottom:10px;"><strong>${p.landlord}</strong> · ${p.date}</div>
                <button onclick="window.__switchToList()" style="width:100%;background:linear-gradient(135deg,#D97706,#F59E0B);color:#fff;border:none;padding:8px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">View details →</button>
              </div>`))
          .addTo(map)
      })
    })

    return () => {
      delete window.__switchToList
      map.remove()
      mapRef.current = null
    }
  }, [])

  /* Expose switch callback to popup buttons */
  useEffect(() => {
    window.__switchToList = onSwitchToList
    return () => { delete window.__switchToList }
  }, [onSwitchToList])

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 120px)', minHeight: 480 }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 105% at 50% 40%, transparent 50%, rgba(12,37,96,0.08) 100%)',
        zIndex: 2,
      }} />

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 48, left: 16,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.8)',
        borderRadius: 12, padding: '12px 14px',
        fontSize: 12, fontFamily: 'Inter, sans-serif',
        boxShadow: '0 4px 16px rgba(12,60,56,0.1)',
        zIndex: 10,
      }}>
        <div style={{ fontWeight: 700, color: '#1B3A6B', marginBottom: 8, fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Map legend</div>
        {[
          { color: 'linear-gradient(135deg,#3562BE,#0C2560)', label: 'Applied' },
          { color: 'linear-gradient(135deg,#14B8A6,#0D9488)', label: 'Homey recommended' },
          { color: 'linear-gradient(135deg,#FBBF24,#D97706)', label: 'Landlord request' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{
              width: 12, height: 12, borderRadius: '50%',
              background: color,
              border: '2px solid #fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
              flexShrink: 0,
            }} />
            <span style={{ color: '#374151' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
