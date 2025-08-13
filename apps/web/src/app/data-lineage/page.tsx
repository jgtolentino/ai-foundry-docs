'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  GitBranch, 
  Search, 
  Filter, 
  Download, 
  Database,
  ArrowRight,
  ArrowDown,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Target,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  Settings
} from 'lucide-react'

// Data lineage nodes
const lineageNodes = [
  {
    id: 'src_scout_db',
    name: 'Scout Database',
    type: 'source',
    category: 'database',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:00',
    records: 2450000,
    description: 'Primary transactional database'
  },
  {
    id: 'src_ecommerce',
    name: 'E-commerce API',
    type: 'source',
    category: 'api',
    status: 'active',
    lastUpdate: '2024-01-15 14:25:00',
    records: 580000,
    description: 'External e-commerce integration'
  },
  {
    id: 'src_inventory',
    name: 'Inventory System',
    type: 'source',
    category: 'database',
    status: 'warning',
    lastUpdate: '2024-01-15 13:45:00',
    records: 920000,
    description: 'Legacy inventory management'
  },
  {
    id: 'etl_raw_ingestion',
    name: 'Raw Data Ingestion',
    type: 'transformation',
    category: 'etl',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:00',
    records: 3950000,
    description: 'Initial data collection and validation'
  },
  {
    id: 'etl_data_cleaning',
    name: 'Data Cleaning & Validation',
    type: 'transformation',
    category: 'etl',
    status: 'active',
    lastUpdate: '2024-01-15 14:28:00',
    records: 3850000,
    description: 'Remove duplicates and validate formats'
  },
  {
    id: 'etl_enrichment',
    name: 'Data Enrichment',
    type: 'transformation',
    category: 'etl',
    status: 'active',
    lastUpdate: '2024-01-15 14:26:00',
    records: 3850000,
    description: 'Add calculated fields and business logic'
  },
  {
    id: 'warehouse_bronze',
    name: 'Bronze Layer (Raw)',
    type: 'storage',
    category: 'warehouse',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:00',
    records: 3950000,
    description: 'Raw data storage'
  },
  {
    id: 'warehouse_silver',
    name: 'Silver Layer (Cleaned)',
    type: 'storage',
    category: 'warehouse',
    status: 'active',
    lastUpdate: '2024-01-15 14:28:00',
    records: 3850000,
    description: 'Cleaned and validated data'
  },
  {
    id: 'warehouse_gold',
    name: 'Gold Layer (Business)',
    type: 'storage',
    category: 'warehouse',
    status: 'active',
    lastUpdate: '2024-01-15 14:26:00',
    records: 3200000,
    description: 'Business-ready analytics data'
  },
  {
    id: 'analytics_dashboard',
    name: 'Analytics Dashboard',
    type: 'consumption',
    category: 'visualization',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:00',
    records: 0,
    description: 'Scout analytics platform'
  },
  {
    id: 'ml_models',
    name: 'ML Models',
    type: 'consumption',
    category: 'ml',
    status: 'active',
    lastUpdate: '2024-01-15 14:20:00',
    records: 0,
    description: 'Predictive analytics models'
  },
  {
    id: 'reports_export',
    name: 'Report Exports',
    type: 'consumption',
    category: 'export',
    status: 'active',
    lastUpdate: '2024-01-15 14:15:00',
    records: 0,
    description: 'Automated report generation'
  }
]

// Data flow connections
const lineageEdges = [
  { from: 'src_scout_db', to: 'etl_raw_ingestion', label: 'Bulk Extract', volume: '2.4M records' },
  { from: 'src_ecommerce', to: 'etl_raw_ingestion', label: 'API Sync', volume: '580K records' },
  { from: 'src_inventory', to: 'etl_raw_ingestion', label: 'Delta Load', volume: '920K records' },
  { from: 'etl_raw_ingestion', to: 'warehouse_bronze', label: 'Raw Storage', volume: '3.9M records' },
  { from: 'warehouse_bronze', to: 'etl_data_cleaning', label: 'Processing', volume: '3.9M records' },
  { from: 'etl_data_cleaning', to: 'warehouse_silver', label: 'Cleaned Data', volume: '3.8M records' },
  { from: 'warehouse_silver', to: 'etl_enrichment', label: 'Enhancement', volume: '3.8M records' },
  { from: 'etl_enrichment', to: 'warehouse_gold', label: 'Business Logic', volume: '3.2M records' },
  { from: 'warehouse_gold', to: 'analytics_dashboard', label: 'Live Data', volume: 'Real-time' },
  { from: 'warehouse_gold', to: 'ml_models', label: 'Training Data', volume: 'Batch' },
  { from: 'warehouse_gold', to: 'reports_export', label: 'Scheduled Export', volume: 'Daily' }
]

// Data quality issues
const qualityIssues = [
  {
    nodeId: 'src_inventory',
    type: 'warning',
    message: 'Data freshness: Last update 45 minutes ago',
    impact: 'Medium'
  },
  {
    nodeId: 'etl_data_cleaning',
    type: 'info',
    message: '2.5% records cleaned in last batch',
    impact: 'Low'
  },
  {
    nodeId: 'warehouse_gold',
    type: 'success',
    message: 'All quality checks passed',
    impact: 'None'
  }
]

// Impact analysis data
const impactAnalysis = [
  {
    sourceNode: 'src_scout_db',
    impactedNodes: ['warehouse_bronze', 'warehouse_silver', 'warehouse_gold', 'analytics_dashboard'],
    riskLevel: 'High',
    downstreamCount: 4
  },
  {
    sourceNode: 'src_inventory',
    impactedNodes: ['warehouse_bronze', 'warehouse_silver'],
    riskLevel: 'Medium',
    downstreamCount: 2
  },
  {
    sourceNode: 'etl_data_cleaning',
    impactedNodes: ['warehouse_silver', 'warehouse_gold', 'analytics_dashboard'],
    riskLevel: 'High',
    downstreamCount: 3
  }
]

// Processing statistics
const processingStats = [
  { stage: 'Ingestion', duration: '12 min', throughput: '5.2K rps', success: 99.8 },
  { stage: 'Cleaning', duration: '8 min', throughput: '7.8K rps', success: 98.5 },
  { stage: 'Enrichment', duration: '15 min', throughput: '4.1K rps', success: 99.2 },
  { stage: 'Storage', duration: '5 min', throughput: '12.5K rps', success: 99.9 }
]

// Simple visualization component (in real app, use a proper graph library like React Flow)
const LineageVisualization = ({ nodes, edges, selectedNode }: any) => {
  const getNodeColor = (type: string, status: string) => {
    if (status === 'warning') return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    if (status === 'error') return 'bg-red-100 border-red-300 text-red-800'
    
    switch (type) {
      case 'source': return 'bg-blue-100 border-blue-300 text-blue-800'
      case 'transformation': return 'bg-purple-100 border-purple-300 text-purple-800'
      case 'storage': return 'bg-green-100 border-green-300 text-green-800'
      case 'consumption': return 'bg-orange-100 border-orange-300 text-orange-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'database': return <Database className="h-4 w-4" />
      case 'api': return <Zap className="h-4 w-4" />
      case 'etl': return <GitBranch className="h-4 w-4" />
      case 'warehouse': return <Layers className="h-4 w-4" />
      case 'visualization': return <Eye className="h-4 w-4" />
      case 'ml': return <Target className="h-4 w-4" />
      case 'export': return <Download className="h-4 w-4" />
      default: return <Database className="h-4 w-4" />
    }
  }

  return (
    <div className="relative p-8 bg-slate-50 rounded-lg min-h-96 overflow-auto">
      {/* Simplified lineage visualization */}
      <div className="grid grid-cols-4 gap-8">
        {/* Sources */}
        <div className="space-y-4">
          <h4 className="font-semibold text-center">Sources</h4>
          {nodes.filter((n: any) => n.type === 'source').map((node: any) => (
            <div
              key={node.id}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                getNodeColor(node.type, node.status)
              } ${selectedNode === node.id ? 'ring-2 ring-blue-500 scale-105' : ''}`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {getNodeIcon(node.category)}
                <span className="text-sm font-medium">{node.name}</span>
              </div>
              <div className="text-xs opacity-75">{node.records.toLocaleString()} records</div>
            </div>
          ))}
        </div>

        {/* Transformations */}
        <div className="space-y-4">
          <h4 className="font-semibold text-center">Processing</h4>
          {nodes.filter((n: any) => n.type === 'transformation').map((node: any) => (
            <div
              key={node.id}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                getNodeColor(node.type, node.status)
              } ${selectedNode === node.id ? 'ring-2 ring-blue-500 scale-105' : ''}`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {getNodeIcon(node.category)}
                <span className="text-sm font-medium">{node.name}</span>
              </div>
              <div className="text-xs opacity-75">{node.records.toLocaleString()} records</div>
            </div>
          ))}
        </div>

        {/* Storage */}
        <div className="space-y-4">
          <h4 className="font-semibold text-center">Storage</h4>
          {nodes.filter((n: any) => n.type === 'storage').map((node: any) => (
            <div
              key={node.id}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                getNodeColor(node.type, node.status)
              } ${selectedNode === node.id ? 'ring-2 ring-blue-500 scale-105' : ''}`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {getNodeIcon(node.category)}
                <span className="text-sm font-medium">{node.name}</span>
              </div>
              <div className="text-xs opacity-75">{node.records.toLocaleString()} records</div>
            </div>
          ))}
        </div>

        {/* Consumption */}
        <div className="space-y-4">
          <h4 className="font-semibold text-center">Consumption</h4>
          {nodes.filter((n: any) => n.type === 'consumption').map((node: any) => (
            <div
              key={node.id}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                getNodeColor(node.type, node.status)
              } ${selectedNode === node.id ? 'ring-2 ring-blue-500 scale-105' : ''}`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {getNodeIcon(node.category)}
                <span className="text-sm font-medium">{node.name}</span>
              </div>
              <div className="text-xs opacity-75">Active</div>
            </div>
          ))}
        </div>
      </div>

      {/* Flow arrows */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full">
          {/* Simplified arrows between columns */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
            </marker>
          </defs>
          
          {/* Sources to Processing */}
          <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* Processing to Storage */}
          <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* Storage to Consumption */}
          <line x1="75%" y1="50%" x2="95%" y2="50%" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
        </svg>
      </div>
    </div>
  )
}

export default function DataLineagePage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('lineage')
  const [filterType, setFilterType] = useState('all')

  const filteredNodes = lineageNodes.filter(node => 
    (filterType === 'all' || node.type === filterType) &&
    node.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedNodeData = selectedNode ? lineageNodes.find(n => n.id === selectedNode) : null

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Lineage</h2>
          <p className="text-muted-foreground">
            Visualize and track data flows across your entire analytics pipeline
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Diagram
          </Button>
          <Button size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh Lineage
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lineage">Data Flow</TabsTrigger>
          <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
          <TabsTrigger value="quality">Quality Tracking</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Data Flow Tab */}
        <TabsContent value="lineage" className="space-y-6">
          {/* Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search nodes..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="source">Sources</SelectItem>
                    <SelectItem value="transformation">Transformations</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                    <SelectItem value="consumption">Consumption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lineage Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Data Flow Diagram</CardTitle>
              <CardDescription>
                Interactive data lineage showing sources, transformations, and destinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineageVisualization 
                nodes={filteredNodes} 
                edges={lineageEdges}
                selectedNode={selectedNode}
              />
            </CardContent>
          </Card>

          {/* Node Details */}
          {selectedNodeData && (
            <Card>
              <CardHeader>
                <CardTitle>Node Details: {selectedNodeData.name}</CardTitle>
                <CardDescription>
                  Detailed information about the selected data lineage node
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge variant="outline">{selectedNodeData.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{selectedNodeData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={selectedNodeData.status === 'active' ? 'default' : 'destructive'}>
                          {selectedNodeData.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Records:</span>
                        <span>{selectedNodeData.records.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Operational Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Update:</span>
                        <span>{selectedNodeData.lastUpdate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Description:</span>
                        <span className="text-right max-w-48">{selectedNodeData.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                  <span className="text-sm">Sources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
                  <span className="text-sm">Transformations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-sm">Storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                  <span className="text-sm">Consumption</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Impact Analysis Tab */}
        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impact Analysis</CardTitle>
              <CardDescription>
                Understand how changes to data sources affect downstream systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactAnalysis.map((analysis, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Database className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {lineageNodes.find(n => n.id === analysis.sourceNode)?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {analysis.downstreamCount} downstream dependencies
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        analysis.riskLevel === 'High' ? 'destructive' :
                        analysis.riskLevel === 'Medium' ? 'default' : 'secondary'
                      }>
                        {analysis.riskLevel} Risk
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Impacted Systems:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.impactedNodes.map((nodeId) => {
                          const node = lineageNodes.find(n => n.id === nodeId)
                          return (
                            <Badge key={nodeId} variant="outline" className="text-xs">
                              {node?.name}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Impact Simulator</CardTitle>
              <CardDescription>
                Simulate the impact of changes before implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Select Source Node</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a data source" />
                      </SelectTrigger>
                      <SelectContent>
                        {lineageNodes.filter(n => n.type === 'source').map(node => (
                          <SelectItem key={node.id} value={node.id}>
                            {node.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Change Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Type of change" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="schema">Schema Change</SelectItem>
                        <SelectItem value="volume">Volume Increase</SelectItem>
                        <SelectItem value="downtime">Planned Downtime</SelectItem>
                        <SelectItem value="performance">Performance Degradation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  Run Impact Simulation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality Tracking Tab */}
        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Issues</CardTitle>
              <CardDescription>
                Track data quality issues across the lineage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityIssues.map((issue, index) => {
                  const node = lineageNodes.find(n => n.id === issue.nodeId)
                  return (
                    <div key={index} className={`p-4 border rounded-lg ${
                      issue.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                      issue.type === 'error' ? 'border-red-200 bg-red-50' :
                      'border-green-200 bg-green-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {issue.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                          {issue.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                          {issue.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {issue.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                          <h4 className="font-semibold">{node?.name}</h4>
                        </div>
                        <Badge variant="outline">
                          {issue.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.message}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics Tracking</CardTitle>
              <CardDescription>
                Monitor data quality metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                  <p className="text-sm text-muted-foreground">Data Completeness</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">97.2%</div>
                  <p className="text-sm text-muted-foreground">Data Accuracy</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">94.8%</div>
                  <p className="text-sm text-muted-foreground">Data Consistency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Processing Performance</CardTitle>
              <CardDescription>
                Monitor performance metrics across data pipeline stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{stat.stage}</h4>
                        <p className="text-sm text-muted-foreground">
                          Duration: {stat.duration} • Throughput: {stat.throughput}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{stat.success}%</div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Health</CardTitle>
              <CardDescription>
                Overall health and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Pipeline Health</span>
                    <span className="text-lg font-bold text-green-600">94.8%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '94.8%' }} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Processing Time</span>
                    <span className="text-lg font-bold">40 min</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    End-to-end pipeline execution time
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}