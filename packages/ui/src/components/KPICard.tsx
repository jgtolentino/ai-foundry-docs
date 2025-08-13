'use client'

import React from 'react'

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
}

export function KPICard({ title, value, change, changeLabel = 'Change', icon }: KPICardProps) {
  const isPositive = change && change > 0
  
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          {icon && (
            <div className="me-3 text-primary">
              {icon}
            </div>
          )}
          <div>
            <div className="subheader">{title}</div>
            <div className="h1 mb-0">{value}</div>
          </div>
        </div>
        {change !== undefined && (
          <div className="d-flex align-items-center">
            <div className="text-muted">{changeLabel}</div>
            <div className="ms-auto">
              <span className={`d-inline-flex align-items-center lh-1 ${isPositive ? 'text-green' : 'text-red'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}