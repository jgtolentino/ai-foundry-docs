import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Users, 
  Package, 
  Store, 
  Database, 
  GitBranch, 
  FileText,
  ArrowRight 
} from "lucide-react"

const dashboardPages = [
  {
    title: "Analytics",
    description: "Comprehensive business analytics with advanced filtering",
    href: "/analytics",
    icon: BarChart3,
    color: "bg-blue-500"
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
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Suqi Analytics Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced analytics platform for Scout Dashboard with comprehensive business intelligence, 
          customer segmentation, and data visualization capabilities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱17.8M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,320</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,490</div>
            <p className="text-xs text-muted-foreground">
              Across 5 categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Store Locations</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> new this quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Navigation */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Explore Analytics Dashboards</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardPages.map((page) => (
            <Card key={page.href} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <Link href={page.href}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${page.color}`}>
                      <page.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {page.title}
                      </CardTitle>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {page.description}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Comprehensive business intelligence with real-time data visualization and interactive dashboards.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Intelligence</h3>
            <p className="text-muted-foreground">
              Advanced customer segmentation, behavioral analysis, and RFM modeling for targeted insights.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Automated Reporting</h3>
            <p className="text-muted-foreground">
              Scheduled report generation with multiple export formats and automated distribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}