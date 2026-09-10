import type React from "react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import PolarOperationsMap from "../../components/dashboard/PolarOperationsMap"
import {
  Activity,
  AlertTriangle,
  Anchor,
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  CalendarDays,
  CircleAlert,
  CloudSnow,
  Compass,
  Fuel,
  Gauge,
  HeartPulse,
  MapPin,
  Package,
  Plane,
  Radio,
  ShieldCheck,
  Snowflake,
  Truck,
  Users,
  Wind,
  X,
} from "lucide-react"

type Tone = "cyan" | "green" | "orange" | "red" | "blue"

const shipments = [
  { id: "POL-46-124", cargo: "Fuel & generator spares", route: "Goa → Cape Town → Bharati", mode: "RV Sagar Nidhi", status: "In transit", progress: 72, eta: "18 Feb · 14:00" },
  { id: "POL-46-119", cargo: "Ice core laboratory kit", route: "New Delhi → Cape Town", mode: "IL-76 aircraft", status: "Customs hold", progress: 48, eta: "21 Feb · 09:30" },
  { id: "POL-46-115", cargo: "Medical resupply", route: "Goa → Maitri Station", mode: "Air drop", status: "Delivered", progress: 100, eta: "Completed" },
]

const stations = [
  { name: "Bharati", region: "Antarctica", state: "Operational", people: 28, color: "cyan" as Tone, x: "67%", y: "74%" },
  { name: "Maitri", region: "Antarctica", state: "Operational", people: 15, color: "green" as Tone, x: "78%", y: "63%" },
  { name: "Himadri", region: "Arctic", state: "Weather watch", people: 9, color: "orange" as Tone, x: "60%", y: "25%" },
]

const inventory = [
  { label: "Fuel reserves", value: 81, note: "12 day buffer", icon: Fuel, tone: "orange" as Tone },
  { label: "Medical supplies", value: 62, note: "Reorder in 4 days", icon: HeartPulse, tone: "red" as Tone },
  { label: "Food & water", value: 88, note: "Mission ready", icon: Package, tone: "cyan" as Tone },
  { label: "Safety equipment", value: 96, note: "All stations covered", icon: ShieldCheck, tone: "green" as Tone },
]

const activities = [
  { time: "09:42", label: "RV Sagar Nidhi crossed 60°S", meta: "AIS position received · Southern Ocean", tone: "cyan" as Tone },
  { time: "09:18", label: "Medical supplies below threshold", meta: "Maitri Station · replenishment recommended", tone: "orange" as Tone },
  { time: "08:54", label: "SNOW-14 completed inspection", meta: "Bharati Station · next service in 180 h", tone: "green" as Tone },
  { time: "08:31", label: "Emergency beacon acknowledged", meta: "Field team Alpha · communications restored", tone: "red" as Tone },
]

const overviewStats: Array<{ value: string; label: string; detail: string; icon: React.ElementType; color: Tone }> = [
  { value: "03", label: "Active expeditions", detail: "+1 this season", icon: Compass, color: "cyan" },
  { value: "47", label: "Personnel in field", detail: "12 movements today", icon: Users, color: "blue" },
  { value: "126 t", label: "Cargo in transit", detail: "4 shipments active", icon: Package, color: "orange" },
  { value: "94%", label: "Assets operational", detail: "2 maintenance due", icon: Gauge, color: "green" },
  { value: "87%", label: "Inventory health", detail: "6 low-stock items", icon: Boxes, color: "blue" },
  { value: "04", label: "Open alerts", detail: "1 critical response", icon: CircleAlert, color: "red" },
]

function tone(toneName: Tone) {
  return {
    cyan: "text-cyan-300 bg-cyan-300/10 border-cyan-300/20",
    green: "text-emerald-300 bg-emerald-300/10 border-emerald-300/20",
    orange: "text-orange-300 bg-orange-300/10 border-orange-300/20",
    red: "text-red-300 bg-red-300/10 border-red-300/20",
    blue: "text-sky-300 bg-sky-300/10 border-sky-300/20",
  }[toneName]
}

function StatusDot({ tone: toneName }: { tone: Tone }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${tone(toneName).split(" ")[0].replace("text-", "bg-")}`} />
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const [mapFilter, setMapFilter] = useState("All assets")
  const [alertOpen, setAlertOpen] = useState(true)
  const selectedFilter = useMemo(() => mapFilter === "All assets" ? stations : stations.filter((station) => station.name === mapFilter), [mapFilter])

  return (
    <main className={`polar-dashboard min-h-full ${isDarkMode ? "text-slate-100" : "polar-dashboard-light text-slate-900"}`}>
      <div className="polar-grid" />
      <div className="relative z-10 mx-auto max-w-[1800px] space-y-5 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 xl:flex-row xl:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300"><Snowflake size={14} /> National polar operations center</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Indian Antarctic Expedition <span className="text-cyan-300">46</span></h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-400"><MapPin size={15} className="text-cyan-300" /> Bharati Research Station <span className="text-slate-700">·</span> East Antarctica</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-200"><StatusDot tone="green" /> Mission operational</div>
            <button onClick={() => navigate("/trip-dashboard")} className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-200"><Compass size={16} /> Expedition brief <ArrowRight size={15} /></button>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <div className="polar-panel polar-hero p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row"><div><div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Mission progress</div><div className="mt-2 flex items-baseline gap-3"><span className="text-5xl font-semibold tracking-tight text-white">68%</span><span className="text-sm text-emerald-300">+8% this week</span></div><div className="mt-4 h-2 max-w-xl rounded-full bg-slate-800"><div className="h-2 w-[68%] rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.45)]" /></div></div><div className="grid grid-cols-2 gap-x-8 gap-y-3 text-right text-xs text-slate-400"><div><div className="text-[10px] uppercase tracking-wider text-slate-600">Deployment window</div><div className="mt-1 text-sm text-white">08 Jan – 28 Mar 2026</div></div><div><div className="text-[10px] uppercase tracking-wider text-slate-600">Command status</div><div className="mt-1 flex items-center justify-end gap-2 text-emerald-300"><StatusDot tone="green" /> Stable</div></div></div></div>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-4"><MiniMetric label="Personnel" value="47" detail="12 in transit" icon={Users} /><MiniMetric label="Assets" value="32 / 34" detail="operational" icon={Truck} /><MiniMetric label="Cargo" value="126 t" detail="72% delivered" icon={Package} /><MiniMetric label="Stations" value="05 / 05" detail="comms online" icon={Radio} /></div>
          </div>
          <div className="polar-panel p-5 sm:p-6"><div className="flex items-start justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Environmental watch</div><h2 className="mt-2 text-xl font-semibold text-white">Bharati station</h2></div><CloudSnow className="text-cyan-300" size={25} /></div><div className="mt-5 flex items-end justify-between"><div><div className="text-4xl font-semibold text-white">−28°C</div><div className="mt-2 flex items-center gap-2 text-xs text-orange-200"><AlertTriangle size={14} /> Severe weather window</div></div><div className="space-y-2 text-right text-xs text-slate-400"><div className="flex items-center justify-end gap-2"><Wind size={14} className="text-cyan-300" /> 42 km/h wind</div><div className="flex items-center justify-end gap-2"><Gauge size={14} className="text-cyan-300" /> 0.6 km visibility</div><div className="flex items-center justify-end gap-2"><Snowflake size={14} className="text-cyan-300" /> Stable sea ice</div></div></div><div className="mt-5 flex h-10 items-end gap-1.5">{[38, 52, 44, 68, 55, 76, 62, 84, 73, 92, 76, 60].map((height, index) => <div key={index} className={`flex-1 rounded-t-sm ${index > 8 ? "bg-orange-300" : "bg-cyan-300/60"}`} style={{ height: `${height}%` }} />)}</div><div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>Now</span><span>+12h</span><span>+24h</span></div></div>
        </section>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{overviewStats.map(({ value, label, detail, icon: Icon, color }) => <div key={label} className="polar-panel p-4"><div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg border ${tone(color)}`}><Icon size={17} /></div><div className="text-2xl font-semibold text-white">{value}</div><div className="mt-1 text-xs font-medium text-slate-300">{label}</div><div className="mt-2 text-[10px] text-slate-500">{detail}</div></div>)}</section>

        <section className="polar-panel overflow-hidden p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Live geospatial picture</div><h2 className="mt-1 text-xl font-semibold text-white">Polar operations map</h2></div><button onClick={() => navigate("/live/vehicles")} className="rounded-md border border-cyan-300/20 px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-300/10">Open tracking</button></div>
          <PolarOperationsMap />
        </section>

        <section className="hidden grid gap-5 xl:grid-cols-[1.45fr_1fr]">
          <div className="polar-panel overflow-hidden p-5 sm:p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Live geospatial picture</div><h2 className="mt-1 text-xl font-semibold text-white">Polar operations map</h2></div><div className="flex items-center gap-2"><select value={mapFilter} onChange={(event) => setMapFilter(event.target.value)} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-300 outline-none"><option>All assets</option>{stations.map((station) => <option key={station.name}>{station.name}</option>)}</select><button onClick={() => navigate("/live/vehicles")} className="rounded-md border border-cyan-300/20 px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-300/10">Open tracking</button></div></div><div className="polar-map relative mt-5 h-[330px] overflow-hidden rounded-xl border border-cyan-200/10"><div className="absolute inset-0 polar-map-lines" /><div className="absolute left-[12%] top-[27%] text-[10px] text-slate-500">INDIA</div><div className="absolute left-[39%] top-[47%] text-[10px] text-slate-500">SOUTHERN OCEAN</div><div className="absolute left-[70%] top-[86%] text-[10px] text-slate-500">ANTARCTICA</div><svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 330" fill="none" preserveAspectRatio="none"><path d="M125 105 C258 114 379 174 548 272" stroke="#67e8f9" strokeDasharray="5 8" strokeWidth="2" opacity=".75" /><path d="M548 272 C605 240 658 224 710 164" stroke="#fb923c" strokeDasharray="4 8" strokeWidth="2" opacity=".7" /><path d="M548 272 C585 278 636 290 684 294" stroke="#67e8f9" strokeDasharray="5 8" strokeWidth="2" opacity=".55" /></svg>{selectedFilter.map((station) => <div key={station.name} className="absolute" style={{ left: station.x, top: station.y }}><div className={`h-3 w-3 rounded-full border-2 border-slate-950 ${station.color === "orange" ? "bg-orange-300" : station.color === "green" ? "bg-emerald-300" : "bg-cyan-300"} shadow-[0_0_16px_currentColor]`} /><div className="mt-1 whitespace-nowrap rounded bg-slate-950/85 px-2 py-1 text-[10px] text-slate-300">{station.name} · {station.people} personnel</div></div>)}<div className="absolute bottom-3 left-3 flex gap-3 rounded-md border border-white/10 bg-slate-950/75 px-3 py-2 text-[10px] text-slate-400"><span className="flex items-center gap-1.5"><Anchor size={12} className="text-orange-300" /> Vessel</span><span className="flex items-center gap-1.5"><Plane size={12} className="text-cyan-300" /> Aircraft</span><span className="flex items-center gap-1.5"><MapPin size={12} className="text-emerald-300" /> Station</span></div></div></div>
          <div className="polar-panel p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Decision queue</div><h2 className="mt-1 text-xl font-semibold text-white">Priority response</h2></div><button onClick={() => setAlertOpen(!alertOpen)} className="rounded-md p-2 text-slate-500 hover:bg-white/5 hover:text-white">{alertOpen ? <X size={17} /> : <CircleAlert size={17} />}</button></div>{alertOpen && <div className="mt-5 rounded-lg border border-red-300/20 bg-red-400/[.08] p-4"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300"><CircleAlert size={14} /> P1 · active incident</div><h3 className="mt-3 text-base font-semibold text-white">Medical emergency near Bharati Station</h3><p className="mt-2 text-xs leading-5 text-slate-400">Field team Alpha reported an injury during traverse operations. Response team has acknowledged the beacon.</p><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-slate-600">Elapsed</div><div className="mt-1 text-white">41 minutes</div></div><div><div className="text-slate-600">Comms link</div><div className="mt-1 text-emerald-300">Connected</div></div></div><button onClick={() => navigate("/alarm/Config")} className="mt-4 w-full rounded-md bg-red-400 px-3 py-2.5 text-xs font-semibold text-slate-950 hover:bg-red-300">Open response console</button></div>}<div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-lg border border-white/10 bg-white/[.03] p-3"><div className="text-lg font-semibold text-white">02</div><div className="mt-1 text-[10px] text-slate-500">Open incidents</div></div><div className="rounded-lg border border-white/10 bg-white/[.03] p-3"><div className="text-lg font-semibold text-emerald-300">100%</div><div className="mt-1 text-[10px] text-slate-500">Station comms online</div></div></div></div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <div className="polar-panel p-5 sm:p-6"><div className="mb-5 flex items-end justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Supply chain control</div><h2 className="mt-1 text-xl font-semibold text-white">Live cargo tracking</h2></div><button onClick={() => navigate("/reports/report")} className="text-xs text-cyan-300 hover:text-cyan-200">Shipment register <ArrowRight className="inline" size={14} /></button></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-500"><tr>{["Cargo ID", "Payload", "Route", "Mode", "Status", "Progress", "ETA"].map((heading) => <th key={heading} className="pb-3 pr-4 font-medium">{heading}</th>)}</tr></thead><tbody className="divide-y divide-white/5">{shipments.map((shipment) => <tr key={shipment.id} className="text-slate-300"><td className="py-4 pr-4 font-semibold text-white">{shipment.id}</td><td className="py-4 pr-4">{shipment.cargo}</td><td className="py-4 pr-4 text-slate-400">{shipment.route}</td><td className="py-4 pr-4">{shipment.mode}</td><td className="py-4 pr-4"><span className={`rounded border px-2 py-1 text-[10px] ${shipment.status === "Delivered" ? tone("green") : shipment.status === "Customs hold" ? tone("orange") : tone("cyan")}`}>{shipment.status}</span></td><td className="py-4 pr-4"><div className="flex items-center gap-2"><div className="h-1.5 w-14 rounded-full bg-slate-800"><div className="h-1.5 rounded-full bg-cyan-300" style={{ width: `${shipment.progress}%` }} /></div><span>{shipment.progress}%</span></div></td><td className="py-4 text-slate-400">{shipment.eta}</td></tr>)}</tbody></table></div></div>
          <div className="polar-panel p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Field feed</div><h2 className="mt-1 text-xl font-semibold text-white">Latest activity</h2></div><Activity size={19} className="text-cyan-300" /></div><div className="mt-5 space-y-4">{activities.map((item) => <div key={`${item.time}-${item.label}`} className="flex gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"><span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${tone(item.tone).split(" ")[0].replace("text-", "bg-")}`} /><div className="min-w-0"><div className="flex items-baseline justify-between gap-3"><p className="text-sm font-medium text-slate-200">{item.label}</p><span className="shrink-0 text-[10px] text-slate-600">{item.time}</span></div><p className="mt-1 text-[11px] text-slate-500">{item.meta}</p></div></div>)}</div></div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="polar-panel p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Supply resilience</div><h2 className="mt-1 text-xl font-semibold text-white">Inventory health</h2></div><button onClick={() => navigate("/manage/vehicles")} className="text-xs text-cyan-300">Open inventory <ArrowRight className="inline" size={14} /></button></div><div className="mt-5 space-y-4">{inventory.map((item) => { const Icon = item.icon; return <div key={item.label}><div className="mb-2 flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-slate-300"><Icon size={14} className="text-cyan-300" />{item.label}</span><span className={item.value < 70 ? "text-orange-300" : "text-slate-400"}>{item.value}%</span></div><div className="h-2 rounded-full bg-slate-800"><div className={`h-2 rounded-full ${item.value < 70 ? "bg-orange-300" : "bg-cyan-300"}`} style={{ width: `${item.value}%` }} /></div><div className="mt-1 text-[10px] text-slate-600">{item.note}</div></div> })}</div></div>
          <div className="polar-panel p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Predictive operations</div><h2 className="mt-1 text-xl font-semibold text-white">AI mission brief</h2></div><BrainCircuit className="text-cyan-300" size={22} /></div><div className="mt-5 space-y-3"><Insight icon={Fuel} title="Fuel reserve risk" detail="Bharati may cross the resupply threshold in 12 days based on current consumption." tone="orange" /><Insight icon={CloudSnow} title="Weather-aware ETA" detail="POL-46-124 has a 34% delay probability in the next southern ocean window." tone="cyan" /><Insight icon={Package} title="Food supply projection" detail="Current food and water rations at Maitri will reach critical levels in 45 days. Suggest initiating resupply planning." tone="red" /><Insight icon={HeartPulse} title="Medical kit expiry" detail="Trauma kit B at Himadri expires in 2 weeks. Automated replacement order drafted." tone="orange" /><Insight icon={Truck} title="Preventive maintenance" detail="SNOW-14 is due for inspection in 180 operating hours. No mission impact yet." tone="green" /></div><button onClick={() => navigate("/reports/report")} className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-300/15">Review recommendations <ArrowRight size={14} /></button></div>
        </section>

        <section className="polar-panel grid gap-4 p-5 sm:grid-cols-4 sm:p-6"><QuickLink icon={CalendarDays} label="Movement schedule" value="12 planned today" onClick={() => navigate("/trip-dashboard")} /><QuickLink icon={BarChart3} label="Mission analytics" value="91% delivery efficiency" onClick={() => navigate("/reports/report")} /><QuickLink icon={Anchor} label="Asset readiness" value="2 maintenance due" onClick={() => navigate("/manage/vehicles")} /><QuickLink icon={ShieldCheck} label="System health" value="All station links online" onClick={() => navigate("/alarm/Config")} /></section>
      </div>
    </main>
  )
}

function MiniMetric({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: React.ElementType }) {
  return <div className="flex items-center gap-2.5"><Icon size={16} className="text-cyan-300" /><div><div className="text-sm font-semibold text-white">{value}</div><div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div><div className="text-[10px] text-slate-600">{detail}</div></div></div>
}

function Insight({ icon: Icon, title, detail, tone: toneName }: { icon: React.ElementType; title: string; detail: string; tone: Tone }) {
  return <div className="flex gap-3 rounded-lg border border-white/10 bg-white/[.025] p-3"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${tone(toneName)}`}><Icon size={15} /></div><div><div className="text-xs font-semibold text-white">{title}</div><p className="mt-1 text-[11px] leading-5 text-slate-500">{detail}</p></div></div>
}

function QuickLink({ icon: Icon, label, value, onClick }: { icon: React.ElementType; label: string; value: string; onClick: () => void }) {
  return <button onClick={onClick} className="flex items-center gap-3 text-left transition hover:bg-white/[.03] sm:px-3"><div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-300/15 bg-cyan-300/10 text-cyan-300"><Icon size={16} /></div><div><div className="text-xs font-medium text-slate-300">{label}</div><div className="mt-1 text-[11px] text-slate-500">{value}</div></div><ArrowRight size={14} className="ml-auto text-slate-600" /></button>
}

export default Dashboard