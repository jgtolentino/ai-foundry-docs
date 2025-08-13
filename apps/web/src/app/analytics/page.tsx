'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Download, Filter, TrendingUp, Users, DollarSign, Package, Store } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts'

// Sample data - in real app this would come from Scout backend APIs
const revenueData = [
  { month: 'Jan', revenue: 1250000, orders: 3420, customers: 1240 },
  { month: 'Feb', revenue: 1380000, orders: 3680, customers: 1350 },
  { month: 'Mar', revenue: 1420000, orders: 3850, customers: 1480 },
  { month: 'Apr', revenue: 1580000, orders: 4120, customers: 1620 },
  { month: 'May', revenue: 1720000, orders: 4380, customers: 1750 },
  { month: 'Jun', revenue: 1850000, orders: 4650, customers: 1880 }
]

const categoryData = [
  { name: 'Electronics', value: 35, revenue: 1850000 },
  { name: 'Clothing', value: 25, revenue: 1320000 },
  { name: 'Home & Garden', value: 20, revenue: 1050000 },
  { name: 'Sports', value: 12, revenue: 630000 },
  { name: 'Books', value: 8, revenue: 420000 }
]

const performanceData = [
  { metric: 'Conversion Rate', value: 3.2, change: 8.5, trend: 'up' },
  { metric: 'Avg Order Value', value: 247, change: 12.3, trend: 'up' },
  { metric: 'Customer Acquisition Cost', value: 45, change: -5.2, trend: 'down' },
  { metric: 'Return Rate', value: 2.8, change: -1.2, trend: 'down' }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

interface FilterState {
  dateRange: string
  region: string
  category: string
  store: string
}

export default function AnalyticsPage() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '6months',
    region: 'all',
    category: 'all',
    store: 'all'
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setIsLoading(true)
    setFilters(prev => ({ ...prev, [key]: value }))
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500)
  }

  const exportData = () => {
    // Simulate data export
    console.log('Exporting analytics data...')
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights across all business metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>
            Customize your analytics view with cascading filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select 
                value={filters.dateRange} 
                onValueChange={(value) => handleFilterChange('dateRange', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select 
                value={filters.region} 
                onValueChange={(value) => handleFilterChange('region', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="metro-manila">Metro Manila</SelectItem>
                  <SelectItem value="visayas">Visayas</SelectItem>
                  <SelectItem value="mindanao">Mindanao</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select 
                value={filters.category} 
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home-garden">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Store</label>
              <Select 
                value={filters.store} 
                onValueChange={(value) => handleFilterChange('store', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="manila-hub">Manila Capital Hub</SelectItem>
                  <SelectItem value="cebu-tech">Cebu Tech</SelectItem>
                  <SelectItem value="davao-south">Davao South</SelectItem>
                  <SelectItem value="makati-central">Makati Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
              value !== 'all' && (
                <Badge key={key} variant="secondary" className="capitalize">
                  {key}: {value}
                </Badge>
              )
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱9.22M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,108</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,320</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.7%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Store Count</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">425</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.5%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Trends */}
        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>
              Monthly revenue, orders, and customer growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any, name: string) => [
                  name === 'revenue' ? `₱${(value / 1000000).toFixed(2)}M` : value.toLocaleString(),
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>
              Revenue distribution by product category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any, name: string) => [
                  `${value}%`,
                  'Share'
                ]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader>
            <CardTitle>Key Performance Metrics</CardTitle>
            <CardDescription>
              Critical business metrics and their trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{metric.metric}</p>
                    <p className="text-2xl font-bold">
                      {metric.metric.includes('Cost') || metric.metric.includes('Value') ? '₱' : ''}
                      {metric.value}
                      {metric.metric.includes('Rate') ? '%' : ''}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${
                      metric.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    <span className="text-sm font-medium">
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Volume Trends */}
        <Card className={isLoading ? 'opacity-50' : ''}>
          <CardHeader>
            <CardTitle>Order Volume & Customer Growth</CardTitle>
            <CardDescription>
              Monthly orders and customer acquisition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#10b981" name="Orders" />
                <Bar dataKey="customers" fill="#8b5cf6" name="New Customers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Real-time Insights
          </CardTitle>
          <CardDescription>
            AI-powered insights based on current data trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600">Opportunity Detected</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Electronics category showing 35% growth. Consider expanding inventory in Manila stores.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600">Trend Alert</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Customer acquisition cost decreased by 5.2%. Current marketing campaigns are highly effective.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-orange-600">Action Needed</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Makati Central store performance declining. Recommend immediate review of operations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}