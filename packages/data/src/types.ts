// TypeScript types for Scout schema (keeping existing backend schema)

export interface GoldSalesData {
  week_start: string
  brand_id: string
  brand_name: string
  region: string
  sales: number
  sales_py: number
  sales_change_pct: number
}

export interface GoldCustomerData {
  customer_id: string
  customer_name: string
  segment: string
  lifetime_value: number
  last_purchase_date: string
  purchase_frequency: number
  churn_risk: 'low' | 'medium' | 'high'
}

export interface GoldProductData {
  product_id: string
  product_name: string
  category: string
  subcategory: string
  units_sold: number
  revenue: number
  margin_pct: number
  stock_level: number
}

export interface GoldStoreData {
  store_id: string
  store_name: string
  region: string
  city: string
  revenue_mtd: number
  transactions_mtd: number
  avg_basket_size: number
  peak_hour: number
}

export interface ExecutiveOverviewData {
  revenue_current: number
  revenue_previous: number
  revenue_growth_pct: number
  transactions_current: number
  transactions_previous: number
  active_customers: number
  customer_retention_rate: number
  avg_order_value: number
}