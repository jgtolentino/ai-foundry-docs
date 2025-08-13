'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Calendar,
  Clock,
  Eye,
  Settings,
  Share,
  BookOpen,
  BarChart3,
  Users,
  Package,
  Store,
  TrendingUp,
  Mail,
  Play,
  Pause,
  Edit,
  Trash2,
  Copy
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
  Cell
} from 'recharts'

// Report templates
const reportTemplates = [
  {
    id: 'RPT001',
    name: 'Executive Dashboard',
    category: 'Executive',
    description: 'High-level KPIs and business metrics for executive team',
    frequency: 'Daily',
    format: 'PDF',
    recipients: ['ceo@company.com', 'cfo@company.com'],
    lastGenerated: '2024-01-15 14:30:00',
    status: 'Active',
    size: '2.4 MB',
    pages: 12,
    charts: 8
  },
  {
    id: 'RPT002',
    name: 'Sales Performance Report',
    category: 'Sales',
    description: 'Detailed sales analysis by region, product, and team',
    frequency: 'Weekly',
    format: 'Excel',
    recipients: ['sales@company.com', 'regional-managers@company.com'],
    lastGenerated: '2024-01-15 09:00:00',
    status: 'Active',
    size: '1.8 MB',
    pages: 25,
    charts: 15
  },
  {
    id: 'RPT003',
    name: 'Customer Analytics',
    category: 'Marketing',
    description: 'Customer segmentation, behavior, and lifecycle analysis',
    frequency: 'Monthly',
    format: 'PowerBI',
    recipients: ['marketing@company.com', 'customer-success@company.com'],
    lastGenerated: '2024-01-01 08:00:00',
    status: 'Active',
    size: '3.2 MB',
    pages: 18,
    charts: 12
  },
  {
    id: 'RPT004',
    name: 'Inventory Report',
    category: 'Operations',
    description: 'Stock levels, turnover rates, and reorder recommendations',
    frequency: 'Daily',
    format: 'CSV',
    recipients: ['operations@company.com', 'warehouse@company.com'],
    lastGenerated: '2024-01-15 13:45:00',
    status: 'Warning',
    size: '0.8 MB',
    pages: 5,
    charts: 3
  },
  {
    id: 'RPT005',
    name: 'Financial Summary',
    category: 'Finance',
    description: 'P&L, cash flow, and budget variance analysis',
    frequency: 'Monthly',
    format: 'PDF',
    recipients: ['finance@company.com', 'accounting@company.com'],
    lastGenerated: '2024-01-01 10:30:00',
    status: 'Active',
    size: '1.5 MB',
    pages: 8,
    charts: 6
  },
  {
    id: 'RPT006',
    name: 'Store Performance',
    category: 'Operations',
    description: 'Individual store metrics, comparisons, and trends',
    frequency: 'Weekly',
    format: 'Dashboard',
    recipients: ['store-managers@company.com'],
    lastGenerated: '2024-01-14 16:00:00',
    status: 'Scheduled',
    size: '0.9 MB',
    pages: 15,
    charts: 10
  }
]

// Scheduled reports
const scheduledReports = [
  {
    id: 'SCH001',
    template: 'Executive Dashboard',
    nextRun: '2024-01-16 06:00:00',
    frequency: 'Daily',
    status: 'Active',
    recipients: 3,
    lastSuccess: '2024-01-15 06:00:00'
  },
  {
    id: 'SCH002',
    template: 'Sales Performance Report',
    nextRun: '2024-01-22 09:00:00',
    frequency: 'Weekly',
    status: 'Active',
    recipients: 8,
    lastSuccess: '2024-01-15 09:00:00'
  },
  {
    id: 'SCH003',
    template: 'Customer Analytics',
    nextRun: '2024-02-01 08:00:00',
    frequency: 'Monthly',
    status: 'Paused',
    recipients: 5,
    lastSuccess: '2024-01-01 08:00:00'
  },
  {
    id: 'SCH004',
    template: 'Inventory Report',
    nextRun: '2024-01-16 13:45:00',
    frequency: 'Daily',
    status: 'Error',
    recipients: 4,
    lastSuccess: '2024-01-14 13:45:00'
  }
]

// Report metrics
const reportMetrics = [
  { month: 'Oct', generated: 245, delivered: 238, opened: 189, downloaded: 156 },
  { month: 'Nov', generated: 268, delivered: 261, opened: 205, downloaded: 172 },
  { month: 'Dec', generated: 289, delivered: 285, opened: 228, downloaded: 198 },
  { month: 'Jan', generated: 312, delivered: 306, opened: 251, downloaded: 219 }
]

// Export formats
const exportFormats = [
  { id: 'pdf', name: 'PDF', icon: FileText, description: 'Formatted document with charts' },
  { id: 'excel', name: 'Excel', icon: BarChart3, description: 'Spreadsheet with data tables' },
  { id: 'powerbi', name: 'Power BI', icon: BarChart3, description: 'Interactive dashboard' },
  { id: 'csv', name: 'CSV', icon: FileText, description: 'Raw data export' },
  { id: 'dashboard', name: 'Dashboard', icon: Eye, description: 'Live web dashboard' }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  const filteredReports = reportTemplates.filter(report => 
    (selectedCategory === 'all' || report.category === selectedCategory) &&
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleReportSelect = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    )
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on reports:`, selectedReports)
    // Implement bulk actions
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate, schedule, and manage automated reports across all business functions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Bulk Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
        </TabsList>

        {/* Report Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportTemplates.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{reportTemplates.filter(r => r.status === 'Active').length} active</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Reports</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reportTemplates.filter(r => r.frequency === 'Daily').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Automated daily generation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recipients</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reportTemplates.reduce((total, report) => total + report.recipients.length, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total email recipients
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Size</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.6 MB</div>
                <p className="text-xs text-muted-foreground">
                  Combined report storage
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedReports.length > 0 && (
                <div className="flex items-center space-x-2 mb-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">
                    {selectedReports.length} report(s) selected
                  </span>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('generate')}>
                    Generate
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('schedule')}>
                    Schedule
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredReports.map((report) => (
              <Card key={report.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={() => handleReportSelect(report.id)}
                      />
                      <div>
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <CardDescription>{report.category} • {report.frequency}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={
                      report.status === 'Active' ? 'default' :
                      report.status === 'Warning' ? 'destructive' :
                      report.status === 'Scheduled' ? 'secondary' : 'outline'
                    }>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Format: </span>
                        <span className="font-medium">{report.format}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size: </span>
                        <span className="font-medium">{report.size}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pages: </span>
                        <span className="font-medium">{report.pages}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Charts: </span>
                        <span className="font-medium">{report.charts}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Last generated: {report.lastGenerated}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {report.recipients.length} recipient(s)
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Report Runs</CardTitle>
              <CardDescription>
                Manage automated report generation and distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((schedule) => (
                  <div key={schedule.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          schedule.status === 'Active' ? 'bg-green-100 text-green-600' :
                          schedule.status === 'Paused' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {schedule.status === 'Active' && <Play className="h-4 w-4" />}
                          {schedule.status === 'Paused' && <Pause className="h-4 w-4" />}
                          {schedule.status === 'Error' && <Clock className="h-4 w-4" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{schedule.template}</h4>
                          <p className="text-sm text-muted-foreground">
                            {schedule.frequency} • {schedule.recipients} recipients
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        schedule.status === 'Active' ? 'default' :
                        schedule.status === 'Paused' ? 'secondary' : 'destructive'
                      }>
                        {schedule.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Next Run: </span>
                        <span className="font-medium">{schedule.nextRun}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Success: </span>
                        <span className="font-medium">{schedule.lastSuccess}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Run Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule New Report</CardTitle>
              <CardDescription>
                Set up automated report generation and distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Report Template</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Start Time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="text-sm font-medium">Recipients</label>
                  <Input placeholder="email1@company.com, email2@company.com" />
                </div>
              </div>
              <Button className="w-full mt-4">
                Schedule Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Generation Trends</CardTitle>
                <CardDescription>
                  Monthly report generation and delivery statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reportMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="generated" stroke="#3b82f6" name="Generated" />
                    <Line type="monotone" dataKey="delivered" stroke="#10b981" name="Delivered" />
                    <Line type="monotone" dataKey="opened" stroke="#f59e0b" name="Opened" />
                    <Line type="monotone" dataKey="downloaded" stroke="#8b5cf6" name="Downloaded" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Category Distribution</CardTitle>
                <CardDescription>
                  Usage breakdown by report category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Executive', value: 25 },
                        { name: 'Sales', value: 30 },
                        { name: 'Marketing', value: 20 },
                        { name: 'Operations', value: 15 },
                        { name: 'Finance', value: 10 }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for report system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98.2%</div>
                  <p className="text-sm text-muted-foreground">Delivery Success Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">76.5%</div>
                  <p className="text-sm text-muted-foreground">Open Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">62.3%</div>
                  <p className="text-sm text-muted-foreground">Download Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">4.2 min</div>
                  <p className="text-sm text-muted-foreground">Avg Generation Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Reports</CardTitle>
              <CardDescription>
                Most accessed and downloaded reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.slice(0, 5).map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{Math.floor(Math.random() * 1000) + 500} views</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 500) + 200} downloads
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Builder Tab */}
        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Builder</CardTitle>
              <CardDescription>
                Create custom reports with drag-and-drop interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                {/* Data Sources */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Data Sources</h4>
                  <div className="space-y-2">
                    {['Scout Database', 'E-commerce API', 'Customer Data', 'Sales Data', 'Inventory Data'].map((source) => (
                      <div key={source} className="p-3 border rounded-lg cursor-move hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Database className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">{source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visualizations */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Visualizations</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Bar Chart', icon: BarChart3 },
                      { name: 'Line Chart', icon: TrendingUp },
                      { name: 'Pie Chart', icon: BarChart3 },
                      { name: 'Data Table', icon: FileText },
                      { name: 'KPI Card', icon: BarChart3 }
                    ].map((viz) => (
                      <div key={viz.name} className="p-3 border rounded-lg cursor-move hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <viz.icon className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">{viz.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Report Canvas */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Report Canvas</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-96 bg-gray-50">
                    <div className="text-center text-gray-500">
                      <BookOpen className="h-12 w-12 mx-auto mb-4" />
                      <p>Drag components here to build your report</p>
                      <p className="text-sm mt-2">Start by selecting a data source and visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Configuration</CardTitle>
              <CardDescription>
                Configure export settings for your custom report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Export Formats</h4>
                  <div className="space-y-3">
                    {exportFormats.map((format) => (
                      <div key={format.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox />
                        <format.icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{format.name}</p>
                          <p className="text-sm text-muted-foreground">{format.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Distribution Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Report Title</label>
                      <Input placeholder="Enter report title" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Recipients</label>
                      <Input placeholder="email1@company.com, email2@company.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Schedule</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <Button className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Now
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}