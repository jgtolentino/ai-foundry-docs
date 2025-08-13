import { ChartComponent } from './types'

const registry: Record<string, ChartComponent> = {}

export function registerChart(name: string, component: ChartComponent) {
  registry[name] = component
}

export function getChart(name: string): ChartComponent | undefined {
  return registry[name]
}

export function getAllCharts(): Record<string, ChartComponent> {
  return { ...registry }
}