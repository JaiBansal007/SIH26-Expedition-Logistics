import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useTheme } from "../../context/ThemeContext"

const stations = [
  { name: "Goa Logistics Hub", position: [15.49, 73.83] as [number, number], kind: "Hub" },
  { name: "Cape Town Gateway", position: [-33.92, 18.42] as [number, number], kind: "Port" },
  { name: "Bharati Station", position: [-69.406, 76.188] as [number, number], kind: "Station" },
  { name: "Maitri Station", position: [-70.765, 11.733] as [number, number], kind: "Station" },
  { name: "Himadri Station", position: [79.0, 12.0] as [number, number], kind: "Station" },
]

const vessels = [
  { name: "RV Sagar Nidhi", position: [-52.3, 54.8] as [number, number], status: "In transit" },
  { name: "SNOW-14", position: [-69.25, 75.2] as [number, number], status: "Field traverse" },
]

function markerIcon(color: string, symbol: string) {
  return L.divIcon({
    className: "polar-leaflet-marker",
    html: `<div style="width:30px;height:30px;border-radius:50%;border:2px solid white;background:${color};box-shadow:0 0 18px ${color};display:flex;align-items:center;justify-content:center;color:#06111c;font-size:14px;font-weight:800">${symbol}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

export default function PolarOperationsMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    if (!mapRef.current) return
    const map = L.map(mapRef.current, { zoomControl: false, minZoom: 2 }).setView([-42, 42], 2)
    const normal = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" })
    const satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { attribution: "© Esri" })
    ;(isDarkMode ? satellite : normal).addTo(map)
    L.control.zoom({ position: "bottomright" }).addTo(map)

    const route = L.polyline(stations.map((station) => station.position), { color: "#06b6d4", weight: 3, dashArray: "8 10", opacity: .85 }).addTo(map)
    stations.forEach((station) => L.marker(station.position, { icon: markerIcon(station.kind === "Station" ? "#34d399" : "#67e8f9", station.kind === "Station" ? "⌂" : "✦") }).addTo(map).bindPopup(`<b>${station.name}</b><br>${station.kind}`))
    vessels.forEach((vessel) => L.marker(vessel.position, { icon: markerIcon("#fbbf24", "⚓") }).addTo(map).bindPopup(`<b>${vessel.name}</b><br>${vessel.status}`))
    map.fitBounds(route.getBounds().pad(.18))
    const resize = () => map.invalidateSize()
    window.addEventListener("resize", resize)
    return () => { window.removeEventListener("resize", resize); map.remove() }
  }, [isDarkMode])

  return <div ref={mapRef} className="polar-operations-leaflet h-[360px] w-full overflow-hidden rounded-xl border border-cyan-200/15" />
}
