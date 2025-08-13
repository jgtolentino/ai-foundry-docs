'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Store, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  MapPin,
  Users,
  DollarSign,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  Navigation,
  BarChart3,
  Target,
  Zap
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

// Store performance data
const storePerformance = [
  {
    id: 'STR001',
    name: 'Manila Capital Hub',
    region: 'Metro Manila',
    revenue: 856780,
    customers: 1842,
    avgTransaction: 465,
    growth: 12.5,
    status: 'Excellent',
    rating: 4.8,
    coordinates: { lat: 14.5995, lng: 120.9842 },
    openHours: '8:00 AM - 10:00 PM',
    staff: 24,
    area: 850,
    footfall: 2400
  },
  {
    id: 'STR002',
    name: 'Cebu Tech Center',
    region: 'Visayas',
    revenue: 742350,
    customers: 1523,
    avgTransaction: 487,
    growth: 8.3,
    status: 'Good',
    rating: 4.6,
    coordinates: { lat: 10.3157, lng: 123.8854 },
    openHours: '9:00 AM - 9:00 PM',
    staff: 18,
    area: 720,
    footfall: 1950
  },
  {
    id: 'STR003',
    name: 'Davao South Plaza',
    region: 'Mindanao',
    revenue: 698420,
    customers: 1387,
    avgTransaction: 503,
    growth: 15.2,
    status: 'Good',
    rating: 4.4,
    coordinates: { lat: 7.0731, lng: 125.6128 },
    openHours: '8:30 AM - 9:30 PM',
    staff: 16,
    area: 650,
    footfall: 1800
  },
  {
    id: 'STR004',
    name: 'Makati Central',
    region: 'Metro Manila',
    revenue: 612890,
    customers: 1156,
    avgTransaction: 530,
    growth: -2.1,
    status: 'Needs Attention',
    rating: 4.1,
    coordinates: { lat: 14.5547, lng: 121.0244 },
    openHours: '10:00 AM - 8:00 PM',
    staff: 20,
    area: 780,
    footfall: 1650
  },
  {
    id: 'STR005',
    name: 'Iloilo Gateway',
    region: 'Visayas',
    revenue: 580240,
    customers: 1089,
    avgTransaction: 532,
    growth: 6.8,
    status: 'Average',
    rating: 4.3,
    coordinates: { lat: 10.7202, lng: 122.5621 },
    openHours: '9:00 AM - 8:00 PM',
    staff: 14,
    area: 600,
    footfall: 1450
  }
]

// Regional performance data
const regionalData = [
  { region: 'Metro Manila', stores: 8, revenue: 6850000, growth: 8.2, avgFootfall: 2100 },
  { region: 'Visayas', stores: 6, revenue: 4200000, growth: 12.5, avgFootfall: 1750 },
  { region: 'Mindanao', stores: 4, revenue: 2800000, growth: 18.3, avgFootfall: 1600 },
  { region: 'Luzon', stores: 7, revenue: 3950000, growth: 5.7, avgFootfall: 1850 }
]

// Hourly traffic patterns
const trafficPatterns = [
  { hour: '8:00', weekday: 120, weekend: 80, holiday: 150 },
  { hour: '9:00', weekday: 180, weekend: 140, holiday: 220 },
  { hour: '10:00', weekday: 250, weekend: 200, holiday: 280 },
  { hour: '11:00', weekday: 320, weekend: 280, holiday: 350 },
  { hour: '12:00', weekday: 480, weekend: 420, holiday: 520 },
  { hour: '13:00', weekday: 520, weekend: 480, holiday: 580 },
  { hour: '14:00', weekday: 580, weekend: 550, holiday: 620 },
  { hour: '15:00', weekday: 620, weekend: 580, holiday: 680 },
  { hour: '16:00', weekday: 580, weekend: 620, holiday: 720 },
  { hour: '17:00', weekday: 680, weekend: 720, holiday: 780 },
  { hour: '18:00', weekday: 720, weekend: 680, holiday: 650 },
  { hour: '19:00', weekday: 520, weekend: 580, holiday: 480 },
  { hour: '20:00', weekday: 380, weekend: 450, holiday: 320 },
  { hour: '21:00', weekday: 220, weekend: 280, holiday: 180 }
]

// Store performance radar data
const radarData = [
  { metric: 'Revenue', manilaHub: 95, cebuTech: 85, davaoSouth: 80, makatiCentral: 70, iloiloGateway: 65 },
  { metric: 'Customer Satisfaction', manilaHub: 96, cebuTech: 92, davaoSouth: 88, makatiCentral: 82, iloiloGateway: 86 },
  { metric: 'Foot Traffic', manilaHub: 100, cebuTech: 81, davaoSouth: 75, makatiCentral: 69, iloiloGateway: 60 },
  { metric: 'Conversion Rate', manilaHub: 90, cebuTech: 88, davaoSouth: 92, makatiCentral: 75, iloiloGateway: 80 },
  { metric: 'Staff Efficiency', manilaHub: 85, cebuTech: 90, davaoSouth: 88, makatiCentral: 78, iloiloGateway: 85 },
  { metric: 'Inventory Turnover', manilaHub: 92, cebuTech: 86, davaoSouth: 90, makatiCentral: 72, iloiloGateway: 78 }
]

// Category performance by store
const categoryByStore = [
  { store: 'Manila Hub', electronics: 380000, clothing: 240000, home: 180000, sports: 120000 },
  { store: 'Cebu Tech', electronics: 320000, clothing: 200000, home: 150000, sports: 100000 },
  { store: 'Davao South', electronics: 280000, clothing: 180000, home: 140000, sports: 95000 },
  { store: 'Makati Central', electronics: 250000, clothing: 160000, home: 120000, sports: 80000 },
  { store: 'Iloilo Gateway', electronics: 220000, clothing: 150000, home: 110000, sports: 75000 }
]

// Store health metrics
const healthMetrics = [
  { metric: 'Operational Efficiency', value: 87, target: 90, status: 'good' },
  { metric: 'Customer Satisfaction', value: 4.5, target: 4.7, status: 'warning' },
  { metric: 'Revenue per Sq Ft', value: 892, target: 950, status: 'good' },
  { metric: 'Staff Productivity', value: 76, target: 80, status: 'warning' },
  { metric: 'Inventory Accuracy', value: 94, target: 98, status: 'good' },
  { metric: 'Energy Efficiency', value: 82, target: 85, status: 'good' }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

// Mock heatmap data (in real app this would be geographic coordinates)
const HeatmapVisualization = () => {
  return (
    <div className="relative h-64 bg-slate-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-slate-500">
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Interactive Store Heatmap</p>
          <p className="text-xs">Performance intensity by location</p>
        </div>
      </div>
      
      {/* Simulated heatmap points */}
      <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-green-500 rounded-full opacity-70 animate-pulse" title="Manila Capital Hub - High Performance" />
      <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-blue-500 rounded-full opacity-60 animate-pulse" title="Cebu Tech Center - Good Performance" />
      <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-yellow-500 rounded-full opacity-50 animate-pulse" title="Davao South Plaza - Average Performance" />
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full opacity-40 animate-pulse" title="Makati Central - Needs Attention" />
      <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-purple-500 rounded-full opacity-50 animate-pulse" title="Iloilo Gateway - Average Performance" />
    </div>
  )
}

export default function StoresPage() {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const filteredStores = storePerformance.filter(store => 
    (selectedRegion === 'all' || store.region === selectedRegion) &&
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Store Performance</h2>
          <p className="text-muted-foreground">
            Real-time analytics and insights across all store locations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Target className="mr-2 h-4 w-4" />
            Optimize Performance
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Patterns</TabsTrigger>
          <TabsTrigger value="heatmap">Location Heatmap</TabsTrigger>
          <TabsTrigger value="stores">Store Directory</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2</span> new this quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
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
                <CardTitle className="text-sm font-medium">Avg Daily Traffic</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,890</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2-4 PM</div>
                <p className="text-xs text-muted-foreground">
                  Average across all stores
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Regional Performance */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
                <CardDescription>
                  Revenue and growth by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: any) => [`₱${(value / 1000000).toFixed(2)}M`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Health Overview</CardTitle>
                <CardDescription>
                  Key operational metrics across all stores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{metric.metric}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">{metric.value}</span>
                          <span className="text-sm text-muted-foreground">/ {metric.target}</span>
                        </div>
                      </div>
                      <div className={`p-2 rounded-full ${
                        metric.status === 'good' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {metric.status === 'good' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Stores */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Stores</CardTitle>
              <CardDescription>
                Leading stores by revenue and growth metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storePerformance.slice(0, 3).map((store, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{store.name}</h4>
                        <p className="text-sm text-muted-foreground">{store.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₱{(store.revenue / 1000).toFixed(0)}K</div>
                      <div className={`text-sm flex items-center ${
                        store.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {store.growth > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {store.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Store Performance Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-dimensional Performance Analysis</CardTitle>
              <CardDescription>
                Comprehensive performance comparison across key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={18} domain={[0, 100]} />
                  <Radar name="Manila Hub" dataKey="manilaHub" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                  <Radar name="Cebu Tech" dataKey="cebuTech" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                  <Radar name="Davao South" dataKey="davaoSouth" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Performance by Store */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance by Store</CardTitle>
              <CardDescription>
                Revenue breakdown by product category across stores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryByStore}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="store" />
                  <YAxis tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value: any) => [`₱${(value / 1000).toFixed(0)}K`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="electronics" stackId="a" fill="#3b82f6" name="Electronics" />
                  <Bar dataKey="clothing" stackId="a" fill="#10b981" name="Clothing" />
                  <Bar dataKey="home" stackId="a" fill="#f59e0b" name="Home & Garden" />
                  <Bar dataKey="sports" stackId="a" fill="#8b5cf6" name="Sports" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Performance Insights
              </CardTitle>
              <CardDescription>
                AI-powered recommendations for store optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-600">Top Performer</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Manila Capital Hub leads with 12.5% growth. Apply their customer service model to other locations.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold text-orange-600">Needs Attention</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Makati Central showing -2.1% decline. Immediate intervention needed - consider location factors.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-600">Opportunity</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mindanao region showing 18.3% growth. Consider expanding presence in this market.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traffic Patterns Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Traffic Patterns</CardTitle>
              <CardDescription>
                Customer footfall throughout the day by day type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trafficPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="weekday" stroke="#3b82f6" name="Weekdays" strokeWidth={2} />
                  <Line type="monotone" dataKey="weekend" stroke="#10b981" name="Weekends" strokeWidth={2} />
                  <Line type="monotone" dataKey="holiday" stroke="#f59e0b" name="Holidays" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Traffic Insights */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Peak Traffic Analysis</CardTitle>
                <CardDescription>
                  Optimal staffing and inventory insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Peak Hours</p>
                      <p className="text-sm text-muted-foreground">Highest customer traffic</p>
                    </div>
                    <span className="text-lg font-bold text-blue-600">2:00 - 5:00 PM</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Off-Peak Hours</p>
                      <p className="text-sm text-muted-foreground">Maintenance and restocking time</p>
                    </div>
                    <span className="text-lg font-bold text-green-600">8:00 - 10:00 AM</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Weekend Boost</p>
                      <p className="text-sm text-muted-foreground">Weekend vs weekday increase</p>
                    </div>
                    <span className="text-lg font-bold text-orange-600">+23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Distribution</CardTitle>
                <CardDescription>
                  Customer visit patterns by day type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Weekdays', value: 45, fill: '#3b82f6' },
                        { name: 'Weekends', value: 35, fill: '#10b981' },
                        { name: 'Holidays', value: 20, fill: '#f59e0b' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip formatter={(value: any) => [`${value}%`, 'Traffic Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Staffing Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Smart Staffing Recommendations</CardTitle>
              <CardDescription>
                AI-optimized staffing based on traffic patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8-12 PM</div>
                  <p className="text-sm text-muted-foreground">Morning Shift</p>
                  <p className="font-medium">3-4 staff</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">12-5 PM</div>
                  <p className="text-sm text-muted-foreground">Peak Shift</p>
                  <p className="font-medium">6-8 staff</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">5-8 PM</div>
                  <p className="text-sm text-muted-foreground">Evening Shift</p>
                  <p className="font-medium">4-5 staff</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8-10 PM</div>
                  <p className="text-sm text-muted-foreground">Closing Shift</p>
                  <p className="font-medium">2-3 staff</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Heatmap Tab */}
        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Performance Heatmap</CardTitle>
              <CardDescription>
                Geographic visualization of store performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapVisualization />
            </CardContent>
          </Card>

          {/* Location Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Location Performance Index</CardTitle>
                <CardDescription>
                  Performance scoring by geographic factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {storePerformance.map((store, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className={`w-3 h-3 rounded-full ${
                            store.status === 'Excellent' ? 'bg-green-500' :
                            store.status === 'Good' ? 'bg-blue-500' :
                            store.status === 'Average' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        />
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <p className="text-sm text-muted-foreground">{store.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          store.status === 'Excellent' ? 'default' :
                          store.status === 'Good' ? 'secondary' :
                          store.status === 'Average' ? 'outline' : 'destructive'
                        }>
                          {store.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Score: {(store.rating * 20).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Penetration Analysis</CardTitle>
                <CardDescription>
                  Regional market coverage and opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalData.map((region, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{region.region}</h4>
                        <Badge variant="outline">{region.stores} stores</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Revenue: </span>
                          <span className="font-medium">₱{(region.revenue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Growth: </span>
                          <span className={`font-medium ${
                            region.growth > 10 ? 'text-green-600' : region.growth > 5 ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            +{region.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Store Directory Tab */}
        <TabsContent value="stores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Directory</CardTitle>
              <CardDescription>
                Comprehensive store database with detailed metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search stores..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Metro Manila">Metro Manila</SelectItem>
                    <SelectItem value="Visayas">Visayas</SelectItem>
                    <SelectItem value="Mindanao">Mindanao</SelectItem>
                    <SelectItem value="Luzon">Luzon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Store Table */}
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium">Store</th>
                      <th className="text-left p-4 font-medium">Region</th>
                      <th className="text-left p-4 font-medium">Revenue</th>
                      <th className="text-left p-4 font-medium">Customers</th>
                      <th className="text-left p-4 font-medium">Avg Transaction</th>
                      <th className="text-left p-4 font-medium">Growth</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStores.map((store) => (
                      <tr key={store.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{store.name}</div>
                            <div className="text-sm text-muted-foreground">{store.openHours}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            {store.region}
                          </div>
                        </td>
                        <td className="p-4 font-medium">₱{(store.revenue / 1000).toFixed(0)}K</td>
                        <td className="p-4">{store.customers.toLocaleString()}</td>
                        <td className="p-4">₱{store.avgTransaction}</td>
                        <td className="p-4">
                          <div className={`flex items-center ${
                            store.growth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {store.growth > 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {store.growth}%
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={
                            store.status === 'Excellent' ? 'default' :
                            store.status === 'Good' ? 'secondary' :
                            store.status === 'Average' ? 'outline' : 'destructive'
                          }>
                            {store.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Activity className="h-4 w-4 text-yellow-400 mr-1" />
                            {store.rating}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}