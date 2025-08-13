"use client"
import Link from "next/link"
import { Shell } from "@/components/Shell"
import { 
  BarChart3, 
  Users, 
  Package, 
  Store, 
  Database, 
  GitBranch, 
  FileText,
  ArrowRight,
  TrendingUp,
  Eye,
  Activity
} from "lucide-react"

const dashboardPages = [
  {
    title: "Analytics",
    description: "Comprehensive business analytics with advanced filtering",
    href: "/analytics",
    icon: BarChart3,
    color: "bg-primary-500"
  },
  {
    title: "Customers",
    description: "Customer segmentation and behavior analysis",
    href: "/customers",
    icon: Users,
    color: "bg-green-500"
  },
  {
    title: "Products",
    description: "Product intelligence with brand substitution analysis",
    href: "/products",
    icon: Package,
    color: "bg-purple-500"
  },
  {
    title: "Stores",
    description: "Store performance with KPIs and heatmaps",
    href: "/stores",
    icon: Store,
    color: "bg-orange-500"
  },
  {
    title: "Data Sources",
    description: "Data source management and monitoring",
    href: "/data-sources",
    icon: Database,
    color: "bg-cyan-500"
  },
  {
    title: "Data Lineage",
    description: "Data flow visualization and impact analysis",
    href: "/data-lineage",
    icon: GitBranch,
    color: "bg-pink-500"
  },
  {
    title: "Reports",
    description: "Automated reporting with export capabilities",
    href: "/reports",
    icon: FileText,
    color: "bg-indigo-500"
  }
]

export default function HomePage() {
  return (
    <Shell>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome to Suqi Analytics
        </h1>
        <p className="text-slate-600">
          Your comprehensive business intelligence platform with advanced analytics and insights.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="kpi">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Total Revenue</div>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </div>
          <div className="kpi-value">₱17.8M</div>
          <div className="kpi-trend">
            <span className="badge-green">+8.2%</span> from last month
          </div>
        </div>

        <div className="kpi">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Active Customers</div>
            <Users className="h-4 w-4 text-slate-400" />
          </div>
          <div className="kpi-value">9,320</div>
          <div className="kpi-trend">
            <span className="badge-green">+12.5%</span> from last month
          </div>
        </div>

        <div className="kpi">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Products</div>
            <Package className="h-4 w-4 text-slate-400" />
          </div>
          <div className="kpi-value">8,490</div>
          <div className="kpi-trend">Across 5 categories</div>
        </div>

        <div className="kpi">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Store Locations</div>
            <Store className="h-4 w-4 text-slate-400" />
          </div>
          <div className="kpi-value">25</div>
          <div className="kpi-trend">
            <span className="badge-green">+2</span> new this quarter
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>
        <div className="card-body">
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">
              <Eye size={16} />
              View Analytics
            </button>
            <button className="btn-outline">
              <FileText size={16} />
              Generate Report
            </button>
            <button className="btn-light">
              <Activity size={16} />
              Data Health Check
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Analytics Dashboards</h2>
          <p className="text-sm text-slate-600 mt-1">Explore different aspects of your business data</p>
        </div>
        <div className="card-body">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboardPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-4 border border-slate-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${page.color} flex-shrink-0`}>
                    <page.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}