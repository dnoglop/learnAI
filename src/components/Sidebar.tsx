import React from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Upload, 
  BarChart3, 
  Brain,
  Target,
  Settings,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Sidebar({ activeTab = 'dashboard', onTabChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral'
    },
    {
      id: 'employees',
      label: 'Funcionários',
      icon: Users,
      description: 'Gestão de pessoas'
    },
    {
      id: 'learning-paths',
      label: 'Trilhas',
      icon: BookOpen,
      description: 'Aprendizado'
    },
    {
      id: 'upload',
      label: 'Upload',
      icon: Upload,
      description: 'Importar dados'
    },
    {
      id: 'analytics',
      label: 'Análises',
      icon: BarChart3,
      description: 'Métricas e ROI'
    },
    {
      id: 'ai-insights',
      label: 'IA Insights',
      icon: Brain,
      description: 'Inteligência artificial'
    }
  ]

  const bottomItems = [
    {
      id: 'goals',
      label: 'Metas',
      icon: Target,
      description: 'Objetivos'
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      description: 'Preferências'
    },
    {
      id: 'help',
      label: 'Ajuda',
      icon: HelpCircle,
      description: 'Suporte'
    }
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LearnAI Pro
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              T&D Inteligente
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start space-x-3 h-auto py-3 px-3",
                  isActive && "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-800/50"
                )}
                onClick={() => onTabChange?.(item.id)}
              >
                <Icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                )} />
                <div className="text-left">
                  <div className={cn(
                    "font-medium text-sm",
                    isActive ? "text-blue-900 dark:text-blue-100" : "text-slate-700 dark:text-slate-300"
                  )}>
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.description}
                  </div>
                </div>
              </Button>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-2">
        {bottomItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start space-x-3 h-auto py-2 px-3"
              onClick={() => onTabChange?.(item.id)}
            >
              <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </motion.aside>
  )
}