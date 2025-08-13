// SQL query templates (targeting scout.* schema)
// IMPORTANT: All queries must target scout.gold_* or scout.platinum_* views

export const queries = {
  // Executive Overview
  getExecutiveMetrics: `
    SELECT 
      revenue_current,
      revenue_previous,
      revenue_growth_pct,
      transactions_current,
      transactions_previous,
      active_customers,
      customer_retention_rate,
      avg_order_value
    FROM scout.gold_executive_overview
    WHERE period = 'current_month'
  `,

  // Sales Analytics
  getWeeklySales: `
    SELECT 
      week_start,
      brand_id,
      brand_name,
      region,
      sales,
      sales_py,
      sales_change_pct
    FROM scout.gold_sales_by_week
    WHERE week_start >= current_date - interval '12 weeks'
    ORDER BY week_start DESC, sales DESC
  `,

  // Customer Analytics
  getCustomerSegments: `
    SELECT 
      segment,
      count(*) as customer_count,
      avg(lifetime_value) as avg_ltv,
      avg(purchase_frequency) as avg_frequency
    FROM scout.gold_customers
    GROUP BY segment
    ORDER BY customer_count DESC
  `,

  // Product Performance
  getTopProducts: `
    SELECT 
      product_id,
      product_name,
      category,
      units_sold,
      revenue,
      margin_pct
    FROM scout.gold_products
    ORDER BY revenue DESC
    LIMIT 20
  `,

  // Store Performance
  getStoreMetrics: `
    SELECT 
      store_id,
      store_name,
      region,
      revenue_mtd,
      transactions_mtd,
      avg_basket_size
    FROM scout.gold_stores
    ORDER BY revenue_mtd DESC
  `,
}

// Query executor with RLS
export async function executeQuery(
  supabase: any,
  queryName: keyof typeof queries,
  params?: Record<string, any>
) {
  const query = queries[queryName]
  
  // In production, this would handle parameter substitution
  const { data, error } = await supabase.rpc('execute_gold_query', {
    query_text: query,
    query_params: params || {}
  })

  if (error) throw error
  return data
}