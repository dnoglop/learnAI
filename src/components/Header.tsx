import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, Settings, User, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/store/useStore'
import { formatCurrency } from '@/lib/utils'

export function Header() {
  const { darkMode, toggleDarkMode, employees, trainingFeedback } = useStore()

  // Calculate quick stats
  const totalInvestment = trainingFeedback.reduce((sum, feedback) => sum + feedback.cost, 0)
  const avgNPS = trainingFeedback.length > 0 
    ? trainingFeedback.reduce((sum, feedback) => sum + feedback.nps_score, 0) / trainingFeedback.length 
    : 0
  const completionRate = 85 // Mock data

  const quickStats = [
    { label: 'Investimento', value: formatCurrency(totalInvestment), color: 'text-blue-600 dark:text-blue-400' },
    { label: 'NPS Médio', value: avgNPS.toFixed(1), color: 'text-green-600 dark:text-green-400' },
    { label: 'Conclusão', value: `${completionRate}%`, color: 'text-purple-600 dark:text-purple-400' },
  ]

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Search and Quick Stats */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar funcionários, trilhas..."
              className="pl-10 w-80 bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
            />
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-lg font-semibold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="relative"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Admin User
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                admin@learnai.pro
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}