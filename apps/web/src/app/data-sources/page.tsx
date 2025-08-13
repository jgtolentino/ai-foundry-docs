'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Settings,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  BarChart3,
  FileText,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff
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
  AreaChart,
  Area
} from 'recharts'

// Data source configurations
const dataSources = [
  {
    id: 'DS001',
    name: 'Scout Database',
    type: 'PostgreSQL',
    status: 'Connected',
    lastSync: '2024-01-15 14:30:00',
    records: 2450000,
    size: '15.2 GB',
    tables: 42,
    health: 98,
    latency: 12,
    description: 'Primary transactional database for all scout operations',
    connection: 'postgresql://scout:***@db.scout.internal:5432/scout_prod',
    schema: 'scout.*'
  },
  {
    id: 'DS002',
    name: 'Supabase Analytics',
    type: 'Supabase',
    status: 'Connected',
    lastSync: '2024-01-15 14:25:00',
    records: 1850000,
    size: '8.7 GB',
    tables: 28,
    health: 95,
    latency: 24,
    description: 'Real-time analytics and user data warehouse',
    connection: 'https://cxzllzyxwpyptfretryc.supabase.co',
    schema: 'public.*'
  },
  {
    id: 'DS003',
    name: 'E-commerce API',
    type: 'REST API',
    status: 'Connected',
    lastSync: '2024-01-15 14:20:00',
    records: 580000,
    size: '2.1 GB',
    tables: 8,
    health: 89,
    latency: 156,
    description: 'External e-commerce platform integration',
    connection: 'https://api.ecommerce.partner.com/v2',
    schema: 'orders, products, customers'
  },
  {
    id: 'DS004',
    name: 'Inventory System',
    type: 'MySQL',
    status: 'Warning',
    lastSync: '2024-01-15 13:45:00',
    records: 920000,
    size: '4.3 GB',
    tables: 15,
    health: 76,
    latency: 89,
    description: 'Legacy inventory management system',
    connection: 'mysql://inventory:***@legacy.internal:3306/inventory',
    schema: 'inventory.*'
  },
  {
    id: 'DS005',
    name: 'Customer Service',
    type: 'MongoDB',
    status: 'Error',
    lastSync: '2024-01-15 12:15:00',
    records: 340000,
    size: '1.8 GB',
    tables: 5,
    health: 45,
    latency: 245,
    description: 'Customer support tickets and interactions',
    connection: 'mongodb://support:***@support.internal:27017/support',
    schema: 'tickets, interactions, feedback'
  },
  {
    id: 'DS006',
    name: 'Financial Reports',
    type: 'Excel/CSV',
    status: 'Connected',
    lastSync: '2024-01-15 14:00:00',
    records: 125000,
    size: '0.5 GB',
    tables: 12,
    health: 92,
    latency: 34,
    description: 'Monthly financial reports and accounting data',
    connection: '/mnt/finance/reports/*.xlsx',
    schema: 'financial_reports'
  }
]

// Sync history data
const syncHistory = [
  { timestamp: '14:30', scout: 100, supabase: 95, ecommerce: 88, inventory: 76, customerService: 45, financial: 92 },
  { timestamp: '14:25', scout: 98, supabase: 97, ecommerce: 90, inventory: 78, customerService: 48, financial: 94 },
  { timestamp: '14:20', scout: 97, supabase: 96, ecommerce: 85, inventory: 75, customerService: 52, financial: 90 },
  { timestamp: '14:15', scout: 99, supabase: 94, ecommerce: 87, inventory: 80, customerService: 50, financial: 91 },
  { timestamp: '14:10', scout: 100, supabase: 98, ecommerce: 89, inventory: 82, customerService: 55, financial: 93 },
  { timestamp: '14:05', scout: 98, supabase: 95, ecommerce: 91, inventory: 79, customerService: 49, financial: 89 }
]

// Data quality metrics
const qualityMetrics = [
  { metric: 'Completeness', score: 94, target: 95, trend: 'up' },
  { metric: 'Accuracy', score: 97, target: 98, trend: 'stable' },
  { metric: 'Consistency', score: 89, target: 92, trend: 'down' },
  { metric: 'Timeliness', score: 91, target: 90, trend: 'up' },
  { metric: 'Validity', score: 96, target: 95, trend: 'up' },
  { metric: 'Uniqueness', score: 92, target: 94, trend: 'stable' }
]

// Usage statistics
const usageStats = [
  { hour: '00:00', queries: 45, dataTransfer: 120 },
  { hour: '04:00', queries: 23, dataTransfer: 89 },
  { hour: '08:00', queries: 189, dataTransfer: 456 },
  { hour: '12:00', queries: 342, dataTransfer: 789 },
  { hour: '16:00', queries: 298, dataTransfer: 654 },
  { hour: '20:00', queries: 156, dataTransfer: 234 }
]

// Data pipeline status
const pipelineStatus = [
  { name: 'ETL Scout → Analytics', status: 'Running', progress: 85, eta: '5 min' },
  { name: 'Real-time Sync', status: 'Running', progress: 100, eta: 'Continuous' },
  { name: 'Daily Aggregation', status: 'Scheduled', progress: 0, eta: '2 hours' },
  { name: 'Financial Import', status: 'Running', progress: 65, eta: '12 min' },
  { name: 'Cleanup & Archive', status: 'Paused', progress: 0, eta: 'Manual' }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']

export default function DataSourcesPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('sources')

  const filteredSources = dataSources.filter(source => 
    (selectedType === 'all' || source.type.toLowerCase().includes(selectedType.toLowerCase())) &&
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'text-green-600 bg-green-100'
      case 'Warning': return 'text-yellow-600 bg-yellow-100'
      case 'Error': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected': return <CheckCircle className="h-4 w-4" />
      case 'Warning': return <AlertCircle className="h-4 w-4" />
      case 'Error': return <WifiOff className="h-4 w-4" />
      default: return <Wifi className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Sources</h2>
          <p className="text-muted-foreground">
            Manage and monitor all data connections and pipelines
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        {/* Data Sources Tab */}
        <TabsContent value="sources" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">5 connected</span> • 1 error
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.26M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.3%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Volume</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.6 GB</div>
                <p className="text-xs text-muted-foreground">
                  Across all data sources
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">84%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-yellow-600">-3%</span> needs attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search data sources..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="supabase">Supabase</SelectItem>
                    <SelectItem value="api">REST API</SelectItem>
                    <SelectItem value="file">Files</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data Sources Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredSources.map((source) => (
              <Card key={source.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        source.type === 'PostgreSQL' ? 'bg-blue-100 text-blue-600' :
                        source.type === 'MySQL' ? 'bg-orange-100 text-orange-600' :
                        source.type === 'MongoDB' ? 'bg-green-100 text-green-600' :
                        source.type === 'Supabase' ? 'bg-emerald-100 text-emerald-600' :
                        source.type === 'REST API' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Database className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <CardDescription>{source.type}</CardDescription>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}>
                      {getStatusIcon(source.status)}
                      <span>{source.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Records: </span>
                        <span className="font-medium">{source.records.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size: </span>
                        <span className="font-medium">{source.size}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tables: </span>
                        <span className="font-medium">{source.tables}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Latency: </span>
                        <span className="font-medium">{source.latency}ms</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">Health:</div>
                        <div className="flex items-center space-x-1">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                source.health >= 90 ? 'bg-green-500' :
                                source.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${source.health}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{source.health}%</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last sync: {source.lastSync}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pipelines Tab */}
        <TabsContent value="pipelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Pipeline Status</CardTitle>
              <CardDescription>
                Real-time status of data processing pipelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineStatus.map((pipeline, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{pipeline.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={
                            pipeline.status === 'Running' ? 'default' :
                            pipeline.status === 'Scheduled' ? 'secondary' :
                            pipeline.status === 'Paused' ? 'outline' : 'destructive'
                          }>
                            {pipeline.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            ETA: {pipeline.eta}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{pipeline.progress}%</div>
                      </div>
                    </div>
                    
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          pipeline.status === 'Running' ? 'bg-blue-500' :
                          pipeline.status === 'Scheduled' ? 'bg-gray-400' :
                          pipeline.status === 'Paused' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${pipeline.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Performance</CardTitle>
              <CardDescription>
                Historical sync success rates by data source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={syncHistory.reverse()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="scout" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Scout DB" />
                  <Area type="monotone" dataKey="supabase" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Supabase" />
                  <Area type="monotone" dataKey="ecommerce" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="E-commerce" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Quality Tab */}
        <TabsContent value="quality" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Data Quality Metrics</CardTitle>
                <CardDescription>
                  Overall data quality scores across all dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{metric.metric}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">{metric.score}%</span>
                          <span className="text-sm text-muted-foreground">/ {metric.target}%</span>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        metric.trend === 'up' ? 'text-green-600' :
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                        {metric.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                        {metric.trend === 'stable' && <Activity className="h-4 w-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Score Distribution</CardTitle>
                <CardDescription>
                  Data quality breakdown by source
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataSources.filter(s => s.status !== 'Error')}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="health" fill="#3b82f6" name="Health Score %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Quality Issues</CardTitle>
              <CardDescription>
                Identified data quality problems requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg border-red-200 bg-red-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">Critical Issue</h4>
                  </div>
                  <p className="text-sm text-red-700">
                    Customer Service MongoDB has 55% health score. Connection timeout and missing data detected.
                  </p>
                  <Button size="sm" className="mt-2" variant="destructive">
                    Investigate Now
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg border-yellow-200 bg-yellow-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">Warning</h4>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Inventory System showing data inconsistency. Some records have outdated timestamps.
                  </p>
                  <Button size="sm" className="mt-2" variant="outline">
                    Schedule Cleanup
                  </Button>
                </div>

                <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Recommendation</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Consider implementing data validation rules for E-commerce API to improve consistency score.
                  </p>
                  <Button size="sm" className="mt-2" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Analytics Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Query Volume</CardTitle>
                <CardDescription>
                  Number of queries processed throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} name="Queries" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Transfer</CardTitle>
                <CardDescription>
                  Data volume transferred by hour (MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="dataTransfer" fill="#10b981" name="Data Transfer (MB)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Source Usage Distribution</CardTitle>
              <CardDescription>
                Query distribution across data sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataSources.map(source => ({
                      name: source.name,
                      value: Math.floor(Math.random() * 100) + 50
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dataSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Load</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67%</div>
                <p className="text-xs text-muted-foreground">
                  Average CPU utilization
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">
                  RAM utilization
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">234 MB/s</div>
                <p className="text-xs text-muted-foreground">
                  Current throughput
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Monitoring</CardTitle>
              <CardDescription>
                Live system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        source.status === 'Connected' ? 'bg-green-500 animate-pulse' :
                        source.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-muted-foreground">{source.latency}ms latency</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{source.health}% health</div>
                      <div className="text-xs text-muted-foreground">
                        Last: {source.lastSync.split(' ')[1]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>
                Configure monitoring alerts and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Health Score Threshold</label>
                    <Select defaultValue="70">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50%</SelectItem>
                        <SelectItem value="60">60%</SelectItem>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Latency Threshold (ms)</label>
                    <Select defaultValue="200">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100ms</SelectItem>
                        <SelectItem value="200">200ms</SelectItem>
                        <SelectItem value="500">500ms</SelectItem>
                        <SelectItem value="1000">1000ms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  Update Alert Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}