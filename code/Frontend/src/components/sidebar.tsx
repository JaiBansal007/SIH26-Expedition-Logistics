import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "../lib/utils"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  MapPin,
  Bell,
  Map,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
  X,
  Truck,
  Settings,
  Route,
  Radio,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAuth } from "../context/AuthContext"
import { fetchRolesByUserId } from "@/data/usermanage/responsibility"

// Define navigation items structure - Mission Control Style
const navItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    path: "/dashboard",
    section: "Operations",
  },
  {
    icon: Route,
    label: "Expedition",
    path: "/trip-dashboard",
    section: "Operations",
  },
  {
    icon: Truck,
    label: "Cargo",
    path: "/live/vehicles",
    section: "Operations",
  },
  {
    icon: MapPin,
    label: "Routes",
    path: "/trail",
    section: "Operations",
  },
  {
    icon: Map,
    label: "Geofence",
    path: "/geofence",
    hasChildren: true,
    section: "Operations",
    children: [
      { label: "Config", path: "/geofence/Config" },
      { label: "Group", path: "/geofence/Group" },
      { label: "Stats", path: "/geofence/Stats" },
    ],
  },
  {
    icon: Bell,
    label: "Alerts",
    path: "/alarm/config",
    section: "Intelligence",
  },
  {
    icon: FileText,
    label: "Analytics",
    path: "/reports/report",
    section: "Intelligence",
  },
  {
    icon: Users,
    label: "Personnel",
    path: "/user-management",
    hasChildren: true,
    section: "System",
    children: [
      { label: "Responsibility", path: "/user-management/responsibility" },
      { label: "User", path: "/user-management/user" },
    ],
  },
  {
    icon: Settings,
    label: "Assets",
    path: "/manage",
    hasChildren: true,
    section: "System",
    children: [
      { label: "Vehicle Master", path: "/manage/vehicles" },
      { label: "Vehicle Groups", path: "/manage/group" },
      { label: "Vendors", path: "/manage/vendor" },
      { label: "Customer Groups", path: "/manage/customer" },
    ],
  },
]

interface LogisticsSidebarProps {
  isOpen: boolean
  closeSidebar: () => void
}

interface AuthUser {
  id: string
  username: string
  name: string
  roles: string
}

const LogisticsSidebar: React.FC<LogisticsSidebarProps> = ({ isOpen, closeSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const isMobile = useIsMobile()
  const location = useLocation()

  const { user } = useAuth() as { user: AuthUser | null }
  const [allowedTabs, setAllowedTabs] = useState<string[]>([])
  const [accessChecked, setAccessChecked] = useState(false)

  useEffect(() => {
    const fetchAccess = async () => {
      if (user && user.id) {
        try {
          const roles = await fetchRolesByUserId(Number(user.id));
          if (roles && roles.length > 0) {
            const tabs = roles[0].tabs_access.map((tab: any) => Object.keys(tab)[0]);
            setAllowedTabs(tabs);
          }
        } catch {
          setAllowedTabs([]);
        } finally {
          setAccessChecked(true);
        }
        setAccessChecked(true);
      }
    };
    fetchAccess();
  }, [user]);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(isOpen)
    }
  }, [isOpen, isMobile])

  useEffect(() => {
    const currentPath = location.pathname
    navItems.forEach((item) => {
      if (item.hasChildren && item.children) {
        const shouldExpand = item.children.some(
          (child) => currentPath === child.path || currentPath.startsWith(child.path + "/"),
        )
        if (shouldExpand && !openMenus.includes(item.label)) {
          setOpenMenus((prev) => [...prev, item.label])
        }
      }
    })
  }, [location.pathname])

  const toggleMenu = (label: string) => {
    if (openMenus.includes(label)) {
      setOpenMenus(openMenus.filter((item) => item !== label))
    } else {
      setOpenMenus([...openMenus, label])
    }
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  const hasActiveChild = (item: any) => {
    if (!item.hasChildren || !item.children) return false
    return item.children.some((child: any) => isActive(child.path))
  }

  if (!user || !accessChecked) {
    return null
  }

  // Filter navItems based on allowedTabs
  const filteredNavItems = navItems
    .map((item) => {
      if (item.label === "Analytics") {
        if (!allowedTabs.includes("report")) return null
        return item
      }
      if (item.label === "Personnel" && item.hasChildren && item.children) {
        const filteredChildren = item.children.filter((child) => {
          if (child.label === "Responsibility") return allowedTabs.includes("user_reponsibility")
          if (child.label === "User") return allowedTabs.includes("user_access")
          return true
        })
        if (filteredChildren.length === 0) return null
        return { ...item, children: filteredChildren }
      }
      if (item.label === "Geofence" && item.hasChildren && item.children) {
        const filteredChildren = item.children.filter((child) => {
          if (child.label === "Config") return allowedTabs.includes("geofence_config")
          if (child.label === "Group") return allowedTabs.includes("geofence_group")
          if (child.label === "Stats") return allowedTabs.includes("geofence_stats")
          return true
        })
        if (filteredChildren.length === 0) return null
        return { ...item, children: filteredChildren }
      }
      if (item.label === "Assets" && item.hasChildren && item.children) {
        const filteredChildren = item.children.filter((child) => {
          if (child.label === "Vehicle Master") return allowedTabs.includes("entities")
          if (child.label === "Vehicle Groups") return allowedTabs.includes("group")
          if (child.label === "Vendors") return allowedTabs.includes("vendors")
          if (child.label === "Customer Groups") return allowedTabs.includes("customer")
          return true
        })
        if (filteredChildren.length === 0) return null
        return { ...item, children: filteredChildren }
      }
      if (item.label === "Overview") return allowedTabs.includes("dashboard") ? item : null
      if (item.label === "Expedition") return allowedTabs.includes("trip_dashboard") ? item : null
      if (item.label === "Cargo") return allowedTabs.includes("list_map") ? item : null
      if (item.label === "Routes") return allowedTabs.includes("trail") ? item : null
      if (item.label === "Alerts") return allowedTabs.includes("alarm") ? item : null
      return item
    })
    .filter(Boolean)

  // Group items by section
  const groupedItems = filteredNavItems.reduce((acc: any, item: any) => {
    const section = item.section || "Other"
    if (!acc[section]) acc[section] = []
    acc[section].push(item)
    return acc
  }, {})

  const sectionOrder = ["Operations", "Intelligence", "System"]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
        isMobile
          ? isOpen
            ? "w-60"
            : "w-0"
          : isExpanded
            ? "w-60"
            : "w-16",
        "bg-bg-raised border-r border-border-default mt-14 shadow-xl"
      )}
      style={{ height: "calc(100vh - 3.5rem)" }}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsExpanded(false)
          const menusToKeep = openMenus.filter((menu) => {
            const menuItem = navItems.find((item) => item.label === menu)
            return menuItem && hasActiveChild(menuItem)
          })
          setOpenMenus(menusToKeep)
        }
      }}
    >
      {/* Mobile close button */}
      {isMobile && isOpen && (
        <button
          className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors"
          onClick={closeSidebar}
        >
          <X size={18} />
        </button>
      )}

      {/* MARG Header */}
      <div className="px-3 py-5 border-b border-border-default">
        <div
          className={cn(
            "transition-all duration-300",
            isExpanded || (isMobile && isOpen) ? "opacity-100" : "opacity-0 h-0"
          )}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-ice-blue/10 border border-ice-blue/30 rounded-md p-2">
              <Radio size={20} className="text-ice-blue" />
            </div>
            <div>
              <h2 className="text-text-primary font-bold text-lg tracking-tight">MARG</h2>
              <p className="text-text-muted text-[11px] uppercase tracking-wider">Mission Control</p>
            </div>
          </div>
        </div>
        {!isExpanded && !isMobile && (
          <div className="flex justify-center">
            <div className="bg-ice-blue/10 border border-ice-blue/30 rounded-md p-1.5">
              <Radio size={16} className="text-ice-blue" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 py-3 overflow-y-auto overflow-x-hidden hide-scrollbar">
        {sectionOrder.map((section) => {
          const items = groupedItems[section]
          if (!items || items.length === 0) return null

          return (
            <div key={section} className="mb-6">
              {(isExpanded || (isMobile && isOpen)) && (
                <div className="px-4 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-disabled">
                    {section}
                  </span>
                </div>
              )}

              <div className="px-2 space-y-1">
                {items.map((item: any, index: number) => {
                  const isItemActive = isActive(item.path) || hasActiveChild(item)

                  return (
                    <div key={index} className="w-full">
                      {item.hasChildren ? (
                        <Collapsible
                          open={(isExpanded || (isMobile && isOpen)) && openMenus.includes(item.label)}
                          onOpenChange={() => {
                            if (isExpanded || (isMobile && isOpen)) {
                              toggleMenu(item.label)
                            }
                          }}
                        >
                          <CollapsibleTrigger asChild>
                            <div
                              className={cn(
                                "flex items-center h-9 px-3 rounded-md transition-all duration-200 cursor-pointer group",
                                isItemActive
                                  ? "bg-ice-blue/10 text-ice-blue"
                                  : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                              )}
                            >
                              <item.icon size={16} className="flex-shrink-0" />
                              <span
                                className={cn(
                                  "ml-3 flex-1 text-[13px] font-medium transition-opacity duration-300",
                                  isExpanded || (isMobile && isOpen) ? "opacity-100" : "opacity-0 w-0"
                                )}
                              >
                                {item.label}
                              </span>
                              {(isExpanded || (isMobile && isOpen)) && (
                                <div className="transition-transform duration-200">
                                  {openMenus.includes(item.label) ? (
                                    <ChevronDown size={14} />
                                  ) : (
                                    <ChevronRight size={14} />
                                  )}
                                </div>
                              )}
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-9 pr-2 mt-1 space-y-1">
                            {item.children?.map((child: any, childIndex: number) => {
                              const isChildActive = isActive(child.path)
                              return (
                                <Link
                                  key={childIndex}
                                  to={child.path}
                                  className={cn(
                                    "flex items-center h-8 px-3 rounded-md text-[12px] transition-all duration-200",
                                    isChildActive
                                      ? "bg-ice-blue/10 text-ice-blue font-medium"
                                      : "text-text-muted hover:bg-bg-elevated hover:text-text-primary"
                                  )}
                                  onClick={() => isMobile && closeSidebar()}
                                >
                                  {child.label}
                                </Link>
                              )
                            })}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center h-9 px-3 rounded-md transition-all duration-200 group",
                            isActive(item.path)
                              ? "bg-ice-blue/10 text-ice-blue"
                              : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                          )}
                          onClick={() => isMobile && closeSidebar()}
                        >
                          <item.icon size={16} className="flex-shrink-0" />
                          <span
                            className={cn(
                              "ml-3 text-[13px] font-medium transition-opacity duration-300",
                              isExpanded || (isMobile && isOpen) ? "opacity-100" : "opacity-0 w-0"
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* System Status Footer */}
      <div className="border-t border-border-default p-3">
        <div
          className={cn(
            "transition-all duration-300",
            isExpanded || (isMobile && isOpen) ? "opacity-100" : "opacity-0 h-0"
          )}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2 bg-bg-panel rounded-md">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-disabled">
                System Status
              </span>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-mission-green mr-2"></div>
                <span className="text-[11px] text-mission-green font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center px-3 py-2 bg-bg-panel rounded-md">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-ice-blue to-mission-blue flex items-center justify-center text-bg-base text-xs font-bold">
                {user.username.substring(0, 2).toUpperCase()}
              </div>
              <div className="ml-2 flex-1 min-w-0">
                <p className="text-text-primary text-[12px] font-medium truncate">{user.name}</p>
                <p className="text-text-muted text-[10px] uppercase tracking-wider truncate">{user.roles}</p>
              </div>
            </div>
          </div>
        </div>
        {!isExpanded && !isMobile && (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-ice-blue to-mission-blue flex items-center justify-center text-bg-base text-xs font-bold">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LogisticsSidebar
