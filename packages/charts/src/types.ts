import { ReactNode } from 'react'

export interface ChartData {
  data: any[]
  title?: string
  description?: string
}

export type ChartComponent = (props: ChartData) => ReactNode