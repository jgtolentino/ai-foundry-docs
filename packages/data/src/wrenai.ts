// WrenAI integration for natural language to SQL

export interface WrenAIRequest {
  question: string
  context?: {
    userId?: string
    filters?: Record<string, any>
    allowedSchemas?: string[]
  }
}

export interface WrenAIResponse {
  sql: string
  explanation?: string
  confidence: number
  data?: any[]
}

export class WrenAIClient {
  private endpoint: string

  constructor(endpoint: string = '/api/wrenai') {
    this.endpoint = endpoint
  }

  async askQuestion(request: WrenAIRequest): Promise<WrenAIResponse> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        // Ensure we only query scout.gold_* tables
        context: {
          ...request.context,
          allowedSchemas: ['scout.gold_', 'scout.platinum_']
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`WrenAI error: ${response.statusText}`)
    }

    return response.json()
  }

  // Preset questions for Ask Suqi
  getQuickInsights() {
    return [
      {
        id: 'weekly-revenue',
        title: 'Weekly Revenue Summary',
        question: 'What is the revenue trend for the last 4 weeks by region?'
      },
      {
        id: 'product-performance',
        title: 'Product Performance',
        question: 'Which products are performing best this month?'
      },
      {
        id: 'growth-opportunities',
        title: 'Growth Opportunities',
        question: 'What are the top growth opportunities based on current trends?'
      },
      {
        id: 'customer-segments',
        title: 'Customer Segmentation',
        question: 'How are our customer segments performing?'
      }
    ]
  }
}