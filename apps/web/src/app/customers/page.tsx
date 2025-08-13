'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart,
  Calendar,
  MapPin,
  Star,
  Target,
  MessageSquare
} from 'lucide-react'
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line
} from 'recharts'

// Customer segments data
const segments = [
  {
    id: 'high-value',
    name: 'High-Value Customers',
    count: 1240,
    revenue: 4200000,
    avgOrderValue: 850,
    frequency: 12.3,
    color: '#10b981',
    description: 'Top 15% of customers by lifetime value'
  },
  {
    id: 'frequent-buyers',
    name: 'Frequent Buyers',
    count: 2180,
    revenue: 2800000,
    avgOrderValue: 320,
    frequency: 8.7,
    color: '#3b82f6',
    description: 'Regular customers with high purchase frequency'
  },
  {
    id: 'at-risk',
    name: 'At-Risk Customers',
    count: 890,
    revenue: 780000,
    avgOrderValue: 280,
    frequency: 2.1,
    color: '#f59e0b',
    description: 'Previously active customers showing decline'
  },
  {
    id: 'new-customers',
    name: 'New Customers',
    count: 1560,
    revenue: 1200000,
    avgOrderValue: 240,
    frequency: 1.2,
    color: '#8b5cf6',
    description: 'Customers acquired in the last 90 days'
  },
  {
    id: 'low-engagement',
    name: 'Low Engagement',
    count: 3420,
    revenue: 980000,
    avgOrderValue: 180,
    frequency: 0.8,
    color: '#ef4444',
    description: 'Customers with minimal purchase activity'
  }
]

// Customer behavior data
const behaviorData = [
  { segment: 'High-Value', satisfaction: 9.2, retention: 94, churn: 6 },
  { segment: 'Frequent', satisfaction: 8.7, retention: 87, churn: 13 },
  { segment: 'At-Risk', satisfaction: 6.8, retention: 45, churn: 55 },
  { segment: 'New', satisfaction: 8.1, retention: 72, churn: 28 },
  { segment: 'Low Engagement', satisfaction: 6.2, retention: 34, churn: 66 }
]

// Customer journey data
const journeyData = [
  { stage: 'Awareness', highValue: 100, frequent: 100, atRisk: 100, new: 100, lowEng: 100 },
  { stage: 'Interest', highValue: 95, frequent: 88, atRisk: 75, new: 85, lowEng: 60 },
  { stage: 'Consideration', highValue: 90, frequent: 78, atRisk: 60, new: 70, lowEng: 35 },
  { stage: 'Purchase', highValue: 85, frequent: 70, atRisk: 45, new: 55, lowEng: 20 },
  { stage: 'Retention', highValue: 80, frequent: 65, atRisk: 25, new: 40, lowEng: 10 }
]

// RFM Analysis data
const rfmData = [
  { recency: 30, frequency: 12, monetary: 2400, segment: 'High-Value', size: 150 },
  { recency: 15, frequency: 8, monetary: 1200, segment: 'Frequent', size: 120 },
  { recency: 60, frequency: 4, monetary: 800, segment: 'At-Risk', size: 80 },
  { recency: 7, frequency: 2, monetary: 400, segment: 'New', size: 60 },
  { recency: 90, frequency: 1, monetary: 200, segment: 'Low Engagement', size: 40 }
]

// Sample customer data
const customerData = [
  {
    id: 'CUST001',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    segment: 'high-value',
    totalSpent: 15640,
    orders: 28,
    lastOrder: '2024-01-10',
    status: 'Active',
    region: 'Metro Manila'
  },
  {
    id: 'CUST002',
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@email.com',
    segment: 'frequent-buyers',
    totalSpent: 8920,
    orders: 15,
    lastOrder: '2024-01-08',
    status: 'Active',
    region: 'Cebu'
  },
  {
    id: 'CUST003',
    name: 'Anna Garcia',
    email: 'anna.garcia@email.com',
    segment: 'at-risk',
    totalSpent: 3450,
    orders: 8,
    lastOrder: '2023-11-20',
    status: 'At Risk',
    region: 'Davao'
  }
]

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444']

export default function CustomersPage() {
  const [selectedSegment, setSelectedSegment] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('segments')

  const filteredCustomers = customerData.filter(customer => 
    (selectedSegment === 'all' || customer.segment === selectedSegment) &&
    (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customer Analytics</h2>
          <p className="text-muted-foreground">
            Advanced customer segmentation and behavioral insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Segments
          </Button>
          <Button size="sm">
            <Target className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="rfm">RFM Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer List</TabsTrigger>
        </TabsList>

        {/* Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          {/* Segment Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {segments.map((segment) => (
              <Card key={segment.id} className="relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: segment.color }}
                />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{segment.name}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{segment.count.toLocaleString()}</div>
                  <CardDescription className="text-xs">
                    {segment.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-medium">₱{(segment.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Order</span>
                      <span className="font-medium">₱{segment.avgOrderValue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frequency</span>
                      <span className="font-medium">{segment.frequency}/year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Segment Distribution Chart */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Distribution</CardTitle>
                <CardDescription>
                  Customer count by segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={segments}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {segments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [value.toLocaleString(), 'Customers']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Segment</CardTitle>
                <CardDescription>
                  Revenue contribution from each customer segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={segments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: any) => [`₱${(value / 1000000).toFixed(2)}M`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Behavior Tab */}
        <TabsContent value="behavior" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer Satisfaction & Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction & Retention</CardTitle>
                <CardDescription>
                  Customer satisfaction scores and retention rates by segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={behaviorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="satisfaction" fill="#10b981" name="Satisfaction Score" />
                    <Bar dataKey="retention" fill="#3b82f6" name="Retention Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Journey */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Journey Funnel</CardTitle>
                <CardDescription>
                  Conversion rates through the customer journey by segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={journeyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="highValue" stroke="#10b981" name="High-Value" />
                    <Line type="monotone" dataKey="frequent" stroke="#3b82f6" name="Frequent" />
                    <Line type="monotone" dataKey="atRisk" stroke="#f59e0b" name="At-Risk" />
                    <Line type="monotone" dataKey="new" stroke="#8b5cf6" name="New" />
                    <Line type="monotone" dataKey="lowEng" stroke="#ef4444" name="Low Engagement" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Behavioral Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Insights</CardTitle>
              <CardDescription>
                AI-powered insights about customer behavior patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-600">Opportunity</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    High-value customers show 94% retention. Focus on converting frequent buyers to this segment.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-600">Insight</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    At-risk customers have low satisfaction (6.8). Implement retention campaigns immediately.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-600">Recommendation</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    New customers show 72% retention. Optimize onboarding to improve this to 80%+.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RFM Analysis Tab */}
        <TabsContent value="rfm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RFM Analysis</CardTitle>
              <CardDescription>
                Recency, Frequency, and Monetary analysis of customer segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={rfmData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="recency" 
                    name="Recency (days)" 
                    type="number"
                    domain={[0, 100]}
                  />
                  <YAxis 
                    dataKey="frequency" 
                    name="Frequency (purchases)" 
                    type="number"
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value: any, name: string) => [
                      name === 'monetary' ? `₱${value}` : value,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Scatter 
                    name="Customers" 
                    dataKey="monetary" 
                    fill="#3b82f6"
                  >
                    {rfmData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* RFM Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recency</CardTitle>
                <CardDescription>Days since last purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 days</div>
                <p className="text-sm text-muted-foreground">Average across all customers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequency</CardTitle>
                <CardDescription>Average purchases per year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2</div>
                <p className="text-sm text-muted-foreground">Purchases per customer annually</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monetary</CardTitle>
                <CardDescription>Average customer lifetime value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱1,840</div>
                <p className="text-sm text-muted-foreground">Total spent per customer</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer List Tab */}
        <TabsContent value="customers" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>
                Searchable and filterable customer directory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="high-value">High-Value</SelectItem>
                    <SelectItem value="frequent-buyers">Frequent Buyers</SelectItem>
                    <SelectItem value="at-risk">At-Risk</SelectItem>
                    <SelectItem value="new-customers">New Customers</SelectItem>
                    <SelectItem value="low-engagement">Low Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Table */}
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Segment</th>
                      <th className="text-left p-4 font-medium">Total Spent</th>
                      <th className="text-left p-4 font-medium">Orders</th>
                      <th className="text-left p-4 font-medium">Last Order</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => {
                      const segment = segments.find(s => s.id === customer.segment)
                      return (
                        <tr key={customer.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">{customer.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant="secondary" 
                              style={{ backgroundColor: segment?.color + '20', color: segment?.color }}
                            >
                              {segment?.name}
                            </Badge>
                          </td>
                          <td className="p-4 font-medium">₱{customer.totalSpent.toLocaleString()}</td>
                          <td className="p-4">{customer.orders}</td>
                          <td className="p-4">{customer.lastOrder}</td>
                          <td className="p-4">
                            <Badge variant={customer.status === 'Active' ? 'default' : 'destructive'}>
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-muted-foreground">{customer.region}</td>
                        </tr>
                      )
                    })}
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