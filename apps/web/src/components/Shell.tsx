import { ReactNode } from "react"
import Link from "next/link"
import { 
  BarChart3, 
  Users, 
  Package, 
  Store, 
  Database, 
  GitBranch, 
  FileText,
  Settings,
  Home,
  Menu,
  Bell,
  User
} from "lucide-react"

interface ShellProps {
  children: ReactNode
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Analytics",
    href: "/analytics", 
    icon: BarChart3,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Products", 
    href: "/products",
    icon: Package,
  },
  {
    name: "Stores",
    href: "/stores",
    icon: Store,
  },
  {
    name: "Data Sources",
    href: "/data-sources",
    icon: Database,
  },
  {
    name: "Data Lineage",
    href: "/data-lineage", 
    icon: GitBranch,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top header */}
      <header className="fixed inset-x-0 top-0 h-[var(--header-height)] bg-white border-b border-slate-200 z-30">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="font-bold text-xl text-primary-600">Suqi</div>
            <div className="hidden md:block text-sm text-slate-500">Analytics Platform</div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-light relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="btn-light">
              <User size={18} />
            </button>
            <button className="btn-primary">
              Ask Suqi
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar + content */}
      <div className="flex h-screen pt-[var(--header-height)]">
        <aside className="w-[var(--sidebar-width)] shrink-0 border-r border-slate-200 bg-white">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}