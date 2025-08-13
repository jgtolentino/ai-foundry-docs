'use client'

import React from 'react'
import { Navigation } from './Navigation'

interface SuqiShellProps {
  children: React.ReactNode
}

export function SuqiShell({ children }: SuqiShellProps) {
  return (
    <div className="page">
      <Navigation />
      <div className="page-wrapper">
        {children}
      </div>
    </div>
  )
}