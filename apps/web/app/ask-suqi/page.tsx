'use client'

import { useState } from 'react'
import { IconSend, IconSparkles } from '@tabler/icons-react'

const quickInsights = [
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

export default function AskSuqiPage() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: "Hi! I'm Ask Suqi, your AI analytics assistant. I can help you explore your data using natural language. What would you like to know?"
    }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: question }])
    setQuestion('')

    // Simulate response (in production, this would call the edge function)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I'll analyze that for you. Based on the data from scout.gold_* tables, here's what I found about "${question}"...`
      }])
    }, 1000)
  }

  const handleQuickInsight = (insight: typeof quickInsights[0]) => {
    setQuestion(insight.question)
  }

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">
                  Ask Suqi
                </h2>
                <div className="text-muted mt-1">Natural language analytics powered by AI</div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row">
              <div className="col-lg-8">
                <div className="card" style={{ height: '600px' }}>
                  <div className="card-body d-flex flex-column">
                    <div className="flex-fill overflow-auto mb-3" style={{ maxHeight: '450px' }}>
                      {messages.map((message, index) => (
                        <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-end' : ''}`}>
                          <div className={`d-inline-block p-3 rounded ${
                            message.role === 'user' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100'
                          }`} style={{ maxWidth: '80%' }}>
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ask me anything about your data..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        <IconSend size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <IconSparkles size={20} className="me-2" />
                      Quick Insights
                    </h3>
                  </div>
                  <div className="list-group list-group-flush">
                    {quickInsights.map((insight) => (
                      <a
                        key={insight.id}
                        href="#"
                        className="list-group-item list-group-item-action"
                        onClick={(e) => {
                          e.preventDefault()
                          handleQuickInsight(insight)
                        }}
                      >
                        <div className="fw-medium">{insight.title}</div>
                        <div className="text-muted small">{insight.question}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}