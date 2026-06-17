import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

/* ── Blue glass building color ramp (from VryfID demo) ── */
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
            'fill-extrusion-base':   ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': 0.9,
          },
        }, beforeId)
      } catch {}
    }
  }
}

function ensurePinCSS() {
  if (document.getElementById('rm-pin-css')) return
  const s = document.createElement('style')
  s.id = 'rm-pin-css'
  s.textContent = `
    .rm-pin {
      border-radius: 50%;
      border: 2.5px solid rgba(255,255,255,0.85);
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .rm-pin:hover { transform: scale(1.18); }
    @keyframes rm-breathe {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(1.12); }
    }
    .rm-pin-pulse { animation: rm-breathe 2.6s ease-in-out infinite; }
  `
  document.head.appendChild(s)
}

const PINS = [
  /* Applied */
  { addr: '143 W 143rd St', hood: 'Washington Heights', status: 'Under Review', type: 'applied', color: '#F97316', lat: 40.8259, lng: -73.9437 },
  { addr: '507 W 158th St', hood: 'Washington Heights', status: 'Pending',      type: 'applied', color: '#F97316', lat: 40.8362, lng: -73.9415 },
  { addr: '88 Arden St',    hood: 'Inwood',             status: 'Approved',     type: 'applied', color: '#00C9A7', lat: 40.8688, lng: -73.9208 },
  /* Recommendations */
  { addr: '620 W 181st St', hood: 'Washington Heights', status: 'Recommended',  type: 'rec',     color: '#00C9A7', lat: 40.8492, lng: -73.9338 },
  { addr: '42 Nagle Ave',   hood: 'Inwood',             status: 'Recommended',  type: 'rec',     color: '#00C9A7', lat: 40.8671, lng: -73.9237 },
  /* Landlord requests */
  { addr: '340 Riverside Dr', hood: 'Upper West Side',  status: 'Request',      type: 'req',     color: '#FBBF24', lat: 40.8036, lng: -73.9706 },
  { addr: '214 W 116th St',   hood: 'Harlem',           status: 'Request',      type: 'req',     color: '#FBBF24', lat: 40.8024, lng: -73.9533 },
]

const TYPE_META = {
  applied: { bg: 'rgba(249,115,22,0.18)',  tc: '#F97316' },
  rec:     { bg: 'rgba(0,201,167,0.18)',   tc: '#00C9A7' },
  req:     { bg: 'rgba(251,191,36,0.18)',  tc: '#FBBF24' },
}

export default function RenterMap({ onSwitchToList }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)
  const markersRef   = useRef([])

  useEffect(() => {
    window.__vryfidSwitchList = onSwitchToList
    return () => { delete window.__vryfidSwitchList }
  }, [onSwitchToList])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    ensurePinCSS()

    const map = new maplibregl.Map({
      container:        containerRef.current,
      style:            'https://tiles.openfreemap.org/styles/liberty',
      center:           [-73.937, 40.848],
      zoom:             12.8,
      pitch:            45,
      bearing:          0,
      antialias:        true,
      attributionControl: false,
    })
    mapRef.current = map

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left')
    map.addControl(new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true }), 'top-right')

    map.on('load', () => {
      applyBuildingStyles(map)

      PINS.forEach((p, i) => {
        const el = document.createElement('div')
        el.className = `rm-pin${i === 0 ? ' rm-pin-pulse' : ''}`
        el.style.cssText = `
          width:${i === 0 ? 36 : 28}px;
          height:${i === 0 ? 36 : 28}px;
          background:${p.color};
          box-shadow:0 4px 16px ${p.color}66;
        `

        const { bg, tc } = TYPE_META[p.type]

        const popup = new maplibregl.Popup({
          offset: 20,
          closeButton: true,
          maxWidth: '260px',
        }).setHTML(`
          <div style="padding:14px 16px;font-family:Inter,sans-serif;">
            <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;">${p.addr}</div>
            <div style="font-size:12px;color:#9CA3AF;margin-bottom:10px;">${p.hood}</div>
            <span style="display:inline-block;padding:3px 10px;border-radius:20px;
              background:${bg};color:${tc};font-size:11px;font-weight:700;">${p.status}</span>
            <div style="margin-top:12px;">
              <button onclick="window.__vryfidSwitchList && window.__vryfidSwitchList()"
                style="background:${tc};border:none;color:#0D0F14;
                border-radius:8px;padding:8px 16px;
                font-family:Inter,sans-serif;font-size:13px;font-weight:700;
                cursor:pointer;width:100%;">
                View in list →
              </button>
            </div>
          </div>
        `)

        /* Fly to on click, then popup opens via default toggle behavior */
        el.addEventListener('click', () => {
          map.flyTo({
            center:    [p.lng, p.lat],
            zoom:      15.5,
            pitch:     50,
            bearing:   -8,
            duration:  1600,
            essential: true,
          })
        })

        const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat([p.lng, p.lat])
          .setPopup(popup)
          .addTo(map)

        markersRef.current.push(marker)
      })
    })

    return () => {
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div style={{ position: 'relative', margin: '14px 16px 0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.5)' }}>
      <div ref={containerRef} style={{ height: 460 }} />

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14, zIndex: 10,
        background: 'rgba(13,15,20,0.82)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: '10px 14px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {[['#F97316','Applied'],['#00C9A7','Recommended / Approved'],['#FBBF24','Landlord requests']].map(([c,l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* 3D badge */}
      <div style={{
        position: 'absolute', top: 14, left: 14, zIndex: 10,
        background: 'rgba(13,15,20,0.82)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20, padding: '4px 12px',
        fontSize: 11, fontWeight: 700, color: '#9CA3AF',
        letterSpacing: '0.06em', pointerEvents: 'none',
      }}>3D VIEW</div>
    </div>
  )
}
