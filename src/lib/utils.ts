import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function calculateROI(investmentCost: number, returnValue: number) {
  return ((returnValue - investmentCost) / investmentCost) * 100
}

export function getPerformanceBadgeColor(performance: number) {
  switch (performance) {
    case 1: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 2: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 3: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function getPerformanceLabel(performance: number) {
  switch (performance) {
    case 1: return 'Baixo'
    case 2: return 'Médio'
    case 3: return 'Alto'
    default: return 'N/A'
  }
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}