'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown,
  AlertTriangle,
  Target,
  Zap,
  BarChart3,
  ShoppingCart,
  Star,
  RefreshCw
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
  TreeMap
} from 'recharts'

// Product categories with performance data
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    revenue: 4250000,
    growth: 18.5,
    margin: 22.3,
    products: 1240,
    topBrand: 'Samsung',
    color: '#3b82f6'
  },
  {
    id: 'clothing',
    name: 'Clothing & Fashion',
    revenue: 3180000,
    growth: -2.1,
    margin: 45.8,
    products: 2850,
    topBrand: 'Nike',
    color: '#10b981'
  },
  {
    id: 'home',
    name: 'Home & Garden',
    revenue: 2950000,
    growth: 12.3,
    margin: 38.2,
    products: 1680,
    topBrand: 'IKEA',
    color: '#f59e0b'
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    revenue: 1840000,
    growth: 25.7,
    margin: 32.1,
    products: 940,
    topBrand: 'Adidas',
    color: '#8b5cf6'
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    revenue: 1650000,
    growth: 15.2,
    margin: 52.4,
    products: 780,
    topBrand: 'L\'Oreal',
    color: '#ef4444'
  }
]

// Brand substitution matrix
const substitutionData = [
  {
    originalBrand: 'Samsung',
    substitute: 'Apple',
    category: 'Electronics',
    substitutionRate: 24.5,
    priceImpact: 15.2,
    reason: 'Premium alternative',
    confidence: 0.89
  },
  {
    originalBrand: 'Nike',
    substitute: 'Adidas',
    category: 'Sports',
    substitutionRate: 18.3,
    priceImpact: -8.5,
    reason: 'Similar performance',
    confidence: 0.92
  },
  {
    originalBrand: 'IKEA',
    substitute: 'West Elm',
    category: 'Home',
    substitutionRate: 12.7,
    priceImpact: 22.8,
    reason: 'Design preference',
    confidence: 0.76
  },
  {
    originalBrand: 'Apple',
    substitute: 'Google',
    category: 'Electronics',
    substitutionRate: 8.9,
    priceImpact: -12.3,
    reason: 'Price sensitivity',
    confidence: 0.84
  },
  {
    originalBrand: 'L\'Oreal',
    substitute: 'Maybelline',
    category: 'Beauty',
    substitutionRate: 16.4,
    priceImpact: -18.7,
    reason: 'Budget choice',
    confidence: 0.91
  }
]

// Product performance data
const productPerformance = [
  { month: 'Jan', electronics: 420000, clothing: 350000, home: 280000, sports: 180000, beauty: 150000 },
  { month: 'Feb', electronics: 445000, clothing: 365000, home: 295000, sports: 195000, beauty: 160000 },
  { month: 'Mar', electronics: 480000, clothing: 320000, home: 310000, sports: 220000, beauty: 175000 },
  { month: 'Apr', electronics: 520000, clothing: 340000, home: 325000, sports: 240000, beauty: 180000 },
  { month: 'May', electronics: 555000, clothing: 358000, home: 340000, sports: 265000, beauty: 190000 },
  { month: 'Jun', electronics: 580000, clothing: 375000, home: 355000, sports: 285000, beauty: 205000 }
]

// Brand loyalty data
const loyaltyData = [
  { brand: 'Apple', loyalty: 87, switching: 13 },
  { brand: 'Samsung', loyalty: 72, switching: 28 },
  { brand: 'Nike', loyalty: 79, switching: 21 },
  { brand: 'Adidas', loyalty: 71, switching: 29 },
  { brand: 'IKEA', loyalty: 65, switching: 35 }
]

// Inventory optimization suggestions
const inventoryOptimization = [
  {
    product: 'iPhone 15 Pro',
    category: 'Electronics',
    currentStock: 45,
    suggestedStock: 72,
    reason: 'High demand, low stock',
    priority: 'High',
    impact: '+₱245K revenue'
  },
  {
    product: 'Nike Air Max',
    category: 'Sports',
    currentStock: 120,
    suggestedStock: 85,
    reason: 'Overstocked, slow moving',
    priority: 'Medium',
    impact: '-₱32K holding cost'
  },
  {
    product: 'Samsung Galaxy S24',
    category: 'Electronics',
    currentStock: 30,
    suggestedStock: 55,
    reason: 'Substitute for iPhone',
    priority: 'High',
    impact: '+₱180K revenue'
  }
]

// Sample product data
const productData = [
  {
    id: 'PROD001',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Electronics',
    price: 54999,
    cost: 42000,
    margin: 23.6,
    inventory: 45,
    sales: 890,
    rating: 4.8,
    substitutes: ['Samsung Galaxy S24', 'Google Pixel 8']
  },
  {
    id: 'PROD002',
    name: 'Air Jordan 1',
    brand: 'Nike',
    category: 'Sports',
    price: 8999,
    cost: 5400,
    margin: 40.0,
    inventory: 180,
    sales: 650,
    rating: 4.6,
    substitutes: ['Adidas Stan Smith', 'Converse Chuck Taylor']
  },
  {
    id: 'PROD003',
    name: 'MALM Bed Frame',
    brand: 'IKEA',
    category: 'Home',
    price: 12999,
    cost: 8000,
    margin: 38.5,
    inventory: 25,
    sales: 320,
    rating: 4.3,
    substitutes: ['West Elm Platform Bed', 'CB2 Simple Frame']
  }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const filteredProducts = productData.filter(product => 
    (selectedCategory === 'all' || product.category.toLowerCase().includes(selectedCategory)) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Product Intelligence</h2>
          <p className="text-muted-foreground">
            Advanced product analytics with brand substitution insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Optimize Inventory
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="substitution">Brand Substitution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="products">Product List</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Category Performance Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className="relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: category.color }}
                />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">₱{(category.revenue / 1000000).toFixed(1)}M</div>
                  <CardDescription className="text-xs">
                    {category.products} products • Top brand: {category.topBrand}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Growth</span>
                      <span className={`font-medium flex items-center ${
                        category.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {category.growth > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {category.growth}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Margin</span>
                      <span className="font-medium">{category.margin}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue Trends by Category */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Revenue Trends</CardTitle>
                <CardDescription>
                  Monthly revenue performance by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value: any) => [`₱${(value / 1000).toFixed(0)}K`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="electronics" stroke="#3b82f6" name="Electronics" />
                    <Line type="monotone" dataKey="clothing" stroke="#10b981" name="Clothing" />
                    <Line type="monotone" dataKey="home" stroke="#f59e0b" name="Home" />
                    <Line type="monotone" dataKey="sports" stroke="#8b5cf6" name="Sports" />
                    <Line type="monotone" dataKey="beauty" stroke="#ef4444" name="Beauty" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Share Distribution</CardTitle>
                <CardDescription>
                  Revenue share by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`₱${(value / 1000000).toFixed(2)}M`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Smart recommendations based on product performance data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-600">Growth Opportunity</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sports category showing 25.7% growth. Consider expanding inventory and marketing budget.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold text-orange-600">Attention Needed</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Clothing category declining (-2.1%). Review pricing strategy and product mix.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-600">Optimization</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Beauty products have highest margin (52.4%). Focus on cross-selling opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brand Substitution Tab */}
        <TabsContent value="substitution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Substitution Matrix</CardTitle>
              <CardDescription>
                Analysis of customer brand switching patterns and substitution opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {substitutionData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-semibold">{item.originalBrand} → {item.substitute}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <Badge variant="secondary">{item.reason}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Confidence</div>
                        <div className="font-semibold">{(item.confidence * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Substitution Rate: </span>
                        <span className="font-medium">{item.substitutionRate}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price Impact: </span>
                        <span className={`font-medium ${
                          item.priceImpact > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.priceImpact > 0 ? '+' : ''}{item.priceImpact}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Brand Loyalty Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Brand Loyalty vs Switching</CardTitle>
                <CardDescription>
                  Customer loyalty rates for top brands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={loyaltyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brand" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="loyalty" fill="#10b981" name="Loyalty %" />
                    <Bar dataKey="switching" fill="#ef4444" name="Switching %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Substitution Impact Analysis</CardTitle>
                <CardDescription>
                  Price impact vs substitution rate correlation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={substitutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="substitutionRate" 
                      name="Substitution Rate" 
                      unit="%" 
                    />
                    <YAxis 
                      dataKey="priceImpact" 
                      name="Price Impact" 
                      unit="%" 
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value: any, name: string) => [
                        `${value}%`,
                        name.replace(/([A-Z])/g, ' $1').toLowerCase()
                      ]}
                    />
                    <Scatter 
                      name="Brand Pairs" 
                      dataKey="confidence" 
                      fill="#3b82f6"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Substitution Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Substitution Recommendations</CardTitle>
              <CardDescription>
                Strategic recommendations based on substitution analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Cross-Sell Opportunity</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Customers buying Samsung often consider Apple (+15.2% price tolerance)
                  </p>
                  <p className="text-xs font-medium">Recommended Action: Bundle promotion for premium upgrades</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Inventory Strategy</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Nike-Adidas substitution rate of 18.3% suggests flexible stocking
                  </p>
                  <p className="text-xs font-medium">Recommended Action: Dynamic inventory allocation</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-2">Price Positioning</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    L'Oreal to Maybelline switching driven by price (-18.7% impact)
                  </p>
                  <p className="text-xs font-medium">Recommended Action: Mid-tier brand introduction</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-orange-600 mb-2">Market Gap</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    IKEA customers seeking premium alternatives (West Elm +22.8%)
                  </p>
                  <p className="text-xs font-medium">Recommended Action: Premium home brand partnership</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,490</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Seller</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">iPhone 15</div>
                <p className="text-xs text-muted-foreground">
                  890 units sold this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱15.2M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">-3.2%</span> optimized
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Performance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance Matrix</CardTitle>
              <CardDescription>
                Revenue vs margin analysis by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={categories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="revenue" 
                    name="Revenue" 
                    tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`}
                  />
                  <YAxis 
                    dataKey="margin" 
                    name="Margin %" 
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      name === 'revenue' ? `₱${(value / 1000000).toFixed(2)}M` : `${value}%`,
                      name === 'revenue' ? 'Revenue' : 'Margin'
                    ]}
                  />
                  <Scatter 
                    name="Categories" 
                    dataKey="growth" 
                    fill="#3b82f6"
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Optimization Recommendations</CardTitle>
              <CardDescription>
                AI-powered suggestions for inventory management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryOptimization.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{item.product}</h4>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge variant={
                        item.priority === 'High' ? 'destructive' : 
                        item.priority === 'Medium' ? 'default' : 'secondary'
                      }>
                        {item.priority} Priority
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                      <div>
                        <span className="text-muted-foreground">Current: </span>
                        <span className="font-medium">{item.currentStock} units</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Suggested: </span>
                        <span className="font-medium">{item.suggestedStock} units</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact: </span>
                        <span className="font-medium text-green-600">{item.impact}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stock Levels Overview */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stock Levels by Category</CardTitle>
                <CardDescription>Current inventory distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="products" fill="#3b82f6" name="Products in Stock" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Turnover</CardTitle>
                <CardDescription>Monthly inventory rotation rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.slice(0, 5).map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">
                          {(Math.random() * 3 + 2).toFixed(1)}x
                        </span>
                        <span className="text-muted-foreground ml-1">turnover</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Product List Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Database</CardTitle>
              <CardDescription>
                Comprehensive product catalog with performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
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
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Table */}
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium">Product</th>
                      <th className="text-left p-4 font-medium">Category</th>
                      <th className="text-left p-4 font-medium">Price</th>
                      <th className="text-left p-4 font-medium">Margin</th>
                      <th className="text-left p-4 font-medium">Inventory</th>
                      <th className="text-left p-4 font-medium">Sales</th>
                      <th className="text-left p-4 font-medium">Rating</th>
                      <th className="text-left p-4 font-medium">Substitutes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.brand}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary">{product.category}</Badge>
                        </td>
                        <td className="p-4 font-medium">₱{product.price.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`font-medium ${
                            product.margin > 35 ? 'text-green-600' : 
                            product.margin > 20 ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            {product.margin}%
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={product.inventory < 50 ? 'text-red-600' : 'text-green-600'}>
                            {product.inventory}
                          </span>
                        </td>
                        <td className="p-4">{product.sales}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {product.rating}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {product.substitutes.slice(0, 2).map((sub, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {sub}
                              </Badge>
                            ))}
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