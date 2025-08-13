'use client'

import React from 'react'

interface Column {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  formatter?: (value: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  title?: string
  actions?: React.ReactNode
}

export function DataTable({ columns, data, title, actions }: DataTableProps) {
  return (
    <div className="card">
      {(title || actions) && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {actions && (
            <div className="card-actions">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-vcenter card-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`text-${column.align || 'left'}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className={`text-${column.align || 'left'}`}>
                    {column.formatter 
                      ? column.formatter(row[column.key])
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}