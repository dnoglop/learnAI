import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down' | 'neutral'
  }
  icon: LucideIcon
  description?: string
  className?: string
  gradient?: boolean
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  className,
  gradient = false
}: MetricCardProps) {
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400'
      case 'down': return 'text-red-600 dark:text-red-400'
      case 'neutral': return 'text-slate-500 dark:text-slate-400'
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'neutral': return '→'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "relative overflow-hidden transition-all duration-200 hover:shadow-lg",
        gradient && "bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50",
        className
      )}>
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
        )}
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </CardTitle>
          <div className={cn(
            "p-2 rounded-lg",
            gradient 
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          )}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {value}
              </div>
              {description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {description}
                </p>
              )}
            </div>
            
            {change && (
              <div className={cn(
                "text-xs font-medium flex items-center space-x-1",
                getTrendColor(change.trend)
              )}>
                <span>{getTrendIcon(change.trend)}</span>
                <span>{Math.abs(change.value)}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}