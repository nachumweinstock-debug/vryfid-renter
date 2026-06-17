import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const APPLIED = [
  { lat: 40.8228, lng: -73.9519, addr: '143 W 143rd St', hood: 'Washington Heights', status: 'Under Review', statusColor: '#3B82F6', docs: 'Gov ID · Income · Bank Statements' },
  { lat: 40.8357, lng: -73.9417, addr: '507 W 158th St', hood: 'Washington Heights', status: 'Pending',      statusColor: '#9CA3AF', docs: 'Gov ID · Income' },
  { lat: 40.8686, lng: -73.9233, addr: '88 Arden St',    hood: 'Inwood',             status: 'Approved',     statusColor: '#00C9A7', docs: 'Gov ID · Income · Bank Statements · Credit Report' },
]

const RECOMMENDED = [
  { lat: 40.8560, lng: -73.9336, addr: '620 W 181st St', hood: 'Washington Heights' },
  { lat: 40.8721, lng: -73.9225, addr: '42 Nagle Ave',   hood: 'Inwood' },
]

const REQUESTS = [
  { lat: 40.8015, lng: -73.9721, addr: '340 Riverside Dr', hood: 'Upper West Side', landlord: 'David Kim',          date: 'June 1, 2026' },
  { lat: 40.8034, lng: -73.9519, addr: '214 W 116th St',   hood: 'Harlem',          landlord: 'Sunrise Properties', date: 'June 3, 2026' },
]

function popupBtn(label, color) {
  return `<button onclick="window.__vryfidSwitchList()" style="
    display:block;width:100%;margin-top:10px;
    background:${color};color:#fff;border:none;
    padding:8px 0;border-radius:8px;
    font-size:12px;font-weight:700;cursor:pointer;
    font-family:Inter,sans-serif;
  ">${label}</button>`
}

export default function RenterMap({ onSwitchToList }) {
  const ref = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    window.__vryfidSwitchList = onSwitchToList
    return () => { delete window.__vryfidSwitchList }
  }, [onSwitchToList])

  useEffect(() => {
    if (!ref.current || mapRef.current) return

    const map = L.map(ref.current, { zoomControl: false }).setView([40.8448, -73.9396], 13)
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const circleOpts = (color) => ({
      radius: 10,
      fillColor: color,
      color: 'rgba(255,255,255,0.8)',
      weight: 2,
      fillOpacity: 1,
    })

    /* Applied — orange */
    APPLIED.forEach(p => {
      L.circleMarker([p.lat, p.lng], circleOpts('#F97316'))
        .addTo(map)
        .bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:200px;">
            <div style="font-weight:700;font-size:14px;margin-bottom:3px;">${p.addr}</div>
            <div style="font-size:12px;color:#9CA3AF;margin-bottom:8px;">${p.hood}</div>
            <span style="background:rgba(255,255,255,0.1);color:${p.statusColor};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">${p.status}</span>
            <div style="font-size:12px;color:#9CA3AF;margin-top:8px;margin-bottom:2px;">Docs: ${p.docs}</div>
            ${popupBtn('View details →', '#F97316')}
          </div>`)
    })

    /* Recommended — teal */
    RECOMMENDED.forEach(p => {
      L.circleMarker([p.lat, p.lng], circleOpts('#00C9A7'))
        .addTo(map)
        .bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:190px;">
            <div style="font-weight:700;font-size:14px;margin-bottom:3px;">${p.addr}</div>
            <div style="font-size:12px;color:#9CA3AF;margin-bottom:8px;">${p.hood}</div>
            <span style="background:rgba(0,201,167,0.15);color:#00C9A7;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">✨ Homey Recommended</span>
            ${popupBtn('View details →', '#00C9A7')}
          </div>`)
    })

    /* Landlord requests — amber */
    REQUESTS.forEach(p => {
      L.circleMarker([p.lat, p.lng], circleOpts('#FBBF24'))
        .addTo(map)
        .bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:200px;">
            <div style="font-weight:700;font-size:14px;margin-bottom:3px;">${p.addr}</div>
            <div style="font-size:12px;color:#9CA3AF;margin-bottom:8px;">${p.hood}</div>
            <span style="background:rgba(251,191,36,0.15);color:#FBBF24;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">📬 Landlord Request</span>
            <div style="font-size:12px;color:#9CA3AF;margin-top:8px;">${p.landlord} · ${p.date}</div>
            ${popupBtn('View details →', '#F97316')}
          </div>`)
    })

    /* Legend */
    const LegendControl = L.Control.extend({
      onAdd() {
        const div = L.DomUtil.create('div')
        div.style.cssText = 'background:#1B2A4A;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px 14px;font-family:Inter,sans-serif;font-size:12px;color:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.4);'
        div.innerHTML = `
          <div style="font-weight:700;font-size:11px;color:#9CA3AF;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Legend</div>
          ${[['#F97316','Applied'],['#00C9A7','Homey recommended'],['#FBBF24','Landlord request']].map(([c,l]) =>
            `<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
              <div style="width:11px;height:11px;border-radius:50%;background:${c};flex-shrink:0;border:2px solid rgba(255,255,255,0.5);"></div>
              <span>${l}</span>
            </div>`).join('')}
        `
        return div
      },
    })
    new LegendControl({ position: 'bottomleft' }).addTo(map)

    return () => { map.remove(); mapRef.current = null }
  }, [])

  return (
    <div ref={ref} style={{ width: '100%', height: 'calc(100vh - 120px)', minHeight: 480 }} />
  )
}
