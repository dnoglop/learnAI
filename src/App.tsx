import React, { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { EmployeeList } from './components/EmployeeList'
import { DataUpload } from './components/DataUpload'
import { useStore } from './store/useStore'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { fetchEmployees, fetchTrainingFeedback, fetchLearningPaths, fetchAIInsights } = useStore()

  useEffect(() => {
    // Load initial data
    fetchEmployees()
    fetchTrainingFeedback()
    fetchLearningPaths()
    fetchAIInsights()
  }, [fetchEmployees, fetchTrainingFeedback, fetchLearningPaths, fetchAIInsights])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'employees':
        return <EmployeeList />
      case 'upload':
        return <DataUpload />
      case 'learning-paths':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              Trilhas de Aprendizado
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Em desenvolvimento - Visualização e gestão de trilhas personalizadas
            </p>
          </div>
        )
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              Análises Avançadas
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Em desenvolvimento - Relatórios detalhados e métricas de ROI
            </p>
          </div>
        )
      case 'ai-insights':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              Insights da IA
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Em desenvolvimento - Recomendações inteligentes e alertas automáticos
            </p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout>
      <div className="flex h-screen">
        {/* Sidebar with navigation */}
        <div className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-700/50">
          {/* This will be handled by the Layout component */}
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {/* Pass activeTab and onTabChange to Layout via a custom hook or context */}
          {renderContent()}
        </div>
      </div>
    </Layout>
  )
}

export default App