import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { darkMode } = useStore()

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 transition-colors duration-300",
      "dark:from-slate-900 dark:via-slate-800/50 dark:to-purple-900/20"
    )}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-blur rounded-full animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 gradient-blur rounded-full animate-pulse delay-2000" />
      </div>

      <div className="relative flex h-screen">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="container mx-auto p-6 space-y-6"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}