import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import { User, ChevronDown, Menu, LogOut, Radio } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "../context/AuthContext"
import DayNightToggleButton from './ui/dark-mode-button';

interface NavbarProps {
  toggleSidebar: () => void
}

function Navbar({ toggleSidebar }: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Generate page title from current path - Mission Control Style
  const pageTitle = useMemo(() => {
    const path = location.pathname
    if (path === "/") return "Home"

    const pathSegments = path.split("/").filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1] || ""

    return (
      lastSegment
        .replace(/-|_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Overview"
    )
  }, [location])

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return null
  }

  return (
    <nav className="fixed top-0 w-full bg-bg-raised border-b border-border-default z-40 shadow-lg">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side - Logo and sidebar toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className={cn(
              "p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all duration-200",
              "md:hidden",
            )}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-ice-blue/10 border border-ice-blue/30 rounded-md p-1.5">
                <Radio size={18} className="text-ice-blue" />
              </div>
              <div className="hidden sm:block">
                <span className="text-text-primary font-bold text-sm tracking-tight">POLARIS</span>
                <span className="text-text-muted text-[10px] uppercase tracking-wider ml-2">NCPOR Mission Control</span>
              </div>
            </div>

            <div className="h-6 w-px bg-border-default hidden md:block"></div>

            <div className="hidden md:flex items-center">
              <span className="text-text-primary font-semibold text-lg tracking-tight">{pageTitle}</span>
            </div>
          </div>
        </div>

        {/* Right side - System indicators and user */}
        <div className="flex items-center space-x-3">
          {/* System Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-bg-panel border border-border-default rounded-md">
            <div className="w-1.5 h-1.5 rounded-full bg-mission-green animate-pulse-slow"></div>
            <span className="text-[11px] font-medium text-mission-green uppercase tracking-wider">Operational</span>
          </div>

          {/* Theme Toggle */}
          <DayNightToggleButton className="text-text-secondary hover:text-text-primary" />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none group">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-bg-elevated transition-all duration-200">
                <div className="relative">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-ice-blue to-mission-blue flex items-center justify-center text-bg-base text-xs font-bold shadow-md ring-1 ring-border-default transition-all duration-200 group-hover:ring-2 group-hover:ring-ice-blue">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  {user.active && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-mission-green rounded-full border border-bg-raised"></div>
                  )}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-[13px] font-medium text-text-primary truncate max-w-24">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">
                    {user.roles}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-text-muted transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-text-primary hidden sm:block" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-72 mt-2 mr-2 bg-bg-panel border border-border-default rounded-lg shadow-2xl overflow-hidden">
              {/* Profile Header */}
              <div className="relative p-4 border-b border-border-default">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-ice-blue to-mission-blue flex items-center justify-center text-bg-base text-base font-bold shadow-lg ring-2 ring-border-default">
                      {user.username.substring(0, 2).toUpperCase()}
                    </div>
                    {user.active && (
                      <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-mission-green rounded-full border-2 border-bg-panel"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary mb-0.5 truncate">
                      {user.name}
                    </h3>
                    <p className="text-[11px] text-text-muted truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider",
                        user.active
                          ? "bg-mission-green/10 text-mission-green border border-mission-green/20"
                          : "bg-mission-red/10 text-mission-red border border-mission-red/20"
                      )}>
                        <div className={cn(
                          "w-1 h-1 rounded-full mr-1.5",
                          user.active ? "bg-mission-green" : "bg-mission-red"
                        )}></div>
                        {user.active ? "Active" : "Inactive"}
                      </div>
                      <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-mission-blue/10 text-mission-blue border border-mission-blue/20">
                        {user.roles}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <DropdownMenuItem
                  className="group cursor-pointer rounded-md p-3 hover:bg-bg-elevated transition-all duration-200 border border-transparent hover:border-border-default"
                  onClick={handleProfileClick}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-md bg-bg-elevated flex items-center justify-center mr-3 group-hover:bg-mission-blue/10 transition-colors duration-200">
                      <User className="h-4 w-4 text-text-secondary group-hover:text-mission-blue" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary text-[13px]">View Profile</span>
                      <span className="text-[11px] text-text-muted">Manage account settings</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="mx-2 bg-border-default" />

              {/* Sign Out */}
              <div className="p-2">
                <DropdownMenuItem
                  className="group cursor-pointer rounded-md p-3 text-mission-red hover:bg-mission-red/10 transition-all duration-200 border border-transparent hover:border-mission-red/20"
                  onClick={handleLogout}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-md bg-mission-red/10 flex items-center justify-center mr-3 group-hover:bg-mission-red/20 transition-colors duration-200">
                      <LogOut className="h-4 w-4 text-mission-red" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[13px]">Sign Out</span>
                      <span className="text-[11px] opacity-80">End session</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
