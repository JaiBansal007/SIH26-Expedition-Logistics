import React from "react"
import { Activity, ArrowRight, BarChart3, Bell, Clock, Compass, Package, Route, Satellite, Shield, Snowflake, Truck } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import ill from '../assets/dashboard (4).png'
import polarRoute from '../assets/polar-route.svg'
import Logo from "../components/Logo"
import DayNightToggleButton from "@/components/ui/dark-mode-button"

export default function LandingPage() {
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-full overflow-x-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80">
        <div className="w-full flex h-16 lg:h-20 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            {/* <img src={Logo} alt="Logo" className="w-full h-8" /> */}
            <Logo size="medium" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 xl:gap-12 flex-1 justify-center">
            <motion.a
              href="#features"
              onClick={scrollToSection('features')}
              className="text-sm xl:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#d5233b] dark:hover:text-[#ff6b7d] relative group px-3 py-2 transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Features
              <motion.span
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#d5233b] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
            <motion.a
              href="#benefits"
              onClick={scrollToSection('benefits')}
              className="text-sm xl:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#d5233b] dark:hover:text-[#ff6b7d] relative group px-3 py-2 transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Benefits
              <motion.span
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#d5233b] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
            <motion.a
              href="#how-it-works"
              onClick={scrollToSection('how-it-works')}
              className="text-sm xl:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#d5233b] dark:hover:text-[#ff6b7d] relative group px-3 py-2 transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              How It Works
              <motion.span
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#d5233b] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          </nav>

          <div className="flex items-center gap-2">
            <DayNightToggleButton />
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate('/dashboard')}
                className="px-4 sm:px-6 lg:px-8 py-2 lg:py-2.5 text-sm lg:text-base bg-[#d5233b] hover:bg-red-700 text-white rounded-lg font-medium shadow-sm transition-all duration-200"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden py-12 sm:min-h-[600px] lg:py-20 bg-slate-100 dark:bg-[#061525]">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute left-1/3 top-8 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-cyan-300/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.65)_0_1px,transparent_1px)] [background-size:42px_42px]" />
          </div>
          <div className="w-full px-4 lg:px-6">
            <div className="grid gap-6 lg:gap-12 lg:grid-cols-2 items-center max-w-7xl mx-auto">
              <motion.div
                className="relative z-10 flex flex-col space-y-4 lg:space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-3">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-700/30 bg-cyan-200/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-900 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-200">
                    <Snowflake className="h-3.5 w-3.5" /> MoES · NCPOR / Antarctic operations
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                    Integrated logistics for{" "}
                    <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">polar expeditions</span>
                  </h1>
                  <p className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    POLARIS connects expedition planning, cargo tracking, inventory, personnel movement and emergency
                    response in one operational picture for MoES and NCPOR.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => navigate('/dashboard')}
                      size="lg"
                      className="px-6 py-2.5 text-base bg-cyan-300 hover:bg-cyan-200 text-[#061525] rounded-lg font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                    >
                      Get Started <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToSection('features')}
                    className="px-6 py-2.5 text-base border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white rounded-lg font-medium transition-all duration-200 w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative mx-auto min-h-[390px] w-full max-w-xl overflow-hidden rounded-3xl border border-cyan-200/20 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-950/50 backdrop-blur-sm dark:bg-slate-900/70 bg-white/80 dark:shadow-cyan-950/50 shadow-slate-300">
                  <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Systems nominal</div>
                  <div className="mb-5 flex items-end justify-between pt-10"><div><p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Active mission</p><h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">Maitri → Bharati</h3></div><motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}><Compass className="h-10 w-10 text-cyan-700 dark:text-cyan-300" /></motion.div></div>
                  <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-[#dcecf1] dark:border-white/10 dark:bg-slate-950">
                    <img src={polarRoute} alt="Antarctic route connecting Maitri Station and Bharati Station" className="block h-auto w-full" />
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">{[[Satellite,"Tracked assets","128"],[Package,"Cargo in transit","42"],[Activity,"Team status","96%"]].map(([Icon,label,value]) => { const MetricIcon = Icon as typeof Satellite; return <div key={label as string} className="rounded-xl border border-slate-300 bg-slate-100/80 p-3 dark:border-white/10 dark:bg-white/5"><MetricIcon className="mb-2 h-4 w-4 text-cyan-700 dark:text-cyan-300" /><p className="text-lg font-semibold text-slate-900 dark:text-white">{value}</p><p className="text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400">{label}</p></div> })}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full sm:h-200 py-12 lg:py-16 bg-white dark:bg-gray-900">
          <div className="w-full px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-10 lg:mb-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-4">
                  <Shield className="h-3 w-3 mr-2" />
                  Expedition Operations Platform
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  One mission picture from base camp to field station
                </h2>
                <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Coordinate people, supplies and assets across harsh environments with clear ownership, live status and actionable alerts.
                </p>
              </motion.div>

              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Truck,
                    title: "Expedition Planning",
                    description: "Coordinate missions, routes, staging points and resupply windows from one workspace."
                  },
                  {
                    icon: Route,
                    title: "Cargo & Inventory",
                    description: "Track consignments, stores and equipment from dispatch through field delivery."
                  },
                  {
                    icon: Bell,
                    title: "Emergency Response",
                    description: "Prioritize distress signals, route deviations, delays and safety-zone breaches."
                  },
                  {
                    icon: BarChart3,
                    title: "Personnel Movement",
                    description: "Maintain visibility of teams and movement plans across the expedition network."
                  },
                  {
                    icon: Clock,
                    title: "Field Visibility",
                    description: "See live locations, historical trails and mission progress across remote corridors."
                  },
                  {
                    icon: Shield,
                    title: "Asset Readiness",
                    description: "Monitor vehicles, equipment and stores so every deployment is mission-ready."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center group-hover:bg-[#d5233b] transition-colors duration-300">
                        <feature.icon className="h-6 w-6 text-[#d5233b] dark:text-[#ff6b7d] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="w-full py-12 lg:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="w-full px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8 lg:gap-16 lg:grid-cols-2 items-center">
                <motion.div
                  className="space-y-4 lg:space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                      <BarChart3 className="h-3 w-3 mr-2" />
                      Business Benefits
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      Transform Your Logistics Operations
                    </h2>
                    <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      Our unified platform delivers measurable operational improvements and significant cost savings across your entire logistics network.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Reduced Integration Complexity",
                        description: "Eliminate the need for multiple integrations with different GPS vendors through our unified API."
                      },
                      {
                        title: "Improved Operational Efficiency",
                        description: "Streamline workflows with a single source of truth for all vehicle and logistics data."
                      },
                      {
                        title: "Enhanced Decision Making",
                        description: "Make data-driven decisions with comprehensive analytics and real-time operational insights."
                      },
                      {
                        title: "Significant Cost Reduction",
                        description: "Lower maintenance costs, improved resource allocation, and optimized fleet utilization."
                      }
                    ].map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 6 }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <ArrowRight className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{benefit.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-[4/3] w-full max-w-xl mx-auto overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <img src={ill} alt="Benefits Illustration" className="w-full h-110" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 sm:h-150 lg:py-16 bg-white dark:bg-gray-900">
          <div className="w-full px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-10 lg:mb-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                  <Route className="h-3 w-3 mr-2" />
                  How It Works
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Seamless Integration Process
                </h2>
                <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our platform easily connects with all your existing GPS systems and TMS/FMS solutions through secure, enterprise-grade integrations.
                </p>
              </motion.div>

              <div className="grid gap-6 md:gap-8 md:grid-cols-3 relative">
                {/* Connection Lines */}
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-red-200 via-red-300 to-red-200 dark:from-red-800/50 dark:via-red-700/50 dark:to-red-800/50 transform -translate-x-1/2 -translate-y-1/2" />

                {[
                  {
                    step: "1",
                    title: "Connect GPS Vendors",
                    description: "We integrate with all your existing GPS vendors through our secure, enterprise-grade API connections with real-time data synchronization."
                  },
                  {
                    step: "2",
                    title: "Normalize Data",
                    description: "Our platform standardizes data from all sources into a unified format, ensuring seamless access and consistent reporting across vendors."
                  },
                  {
                    step: "3",
                    title: "Access Unified Platform",
                    description: "Use our intuitive, enterprise-ready dashboard to manage vehicles, track trips, analyze performance, and optimize operations."
                  }
                ].map((step, index) => (
                  <motion.div
                    key={step.step}
                    className="relative flex flex-col items-center text-center space-y-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#d5233b] text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                        {step.step}
                      </div>
                      {index < 2 && (
                        <div className="hidden md:block absolute -right-16 top-1/2 transform -translate-y-1/2">
                          <ArrowRight className="h-6 w-6 text-red-300 dark:text-red-700" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 py-6 lg:py-8 sm:py-12">
        <div className="w-full px-4 lg:px-6">
          <div className="grid gap-6 md:grid-cols-3 items-center mx-auto">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {/* <img src={Logo1} alt="Logo" className="w-10 h-10" /> */}
              <span className="text-lg font-bold text-gray-900 dark:text-white">M-GPS</span>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} M-GPS Platform. All rights reserved.
            </p>

            <div className="flex gap-4 justify-center md:justify-end">
                <span>Need help?</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
