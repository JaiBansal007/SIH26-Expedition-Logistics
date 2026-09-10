import { motion } from "framer-motion"
import TripDashboard from "@/components/dashboard/trip/dashboard"

export default function TripDashboardPage() {
  return (
    <div className="min-h-screen bg-[#071521] text-slate-100">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <TripDashboard />
      </motion.div>
    </div>
  )
}
