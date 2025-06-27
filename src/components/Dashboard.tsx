import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Brain,
  Target
} from 'lucide-react'
import { MetricCard } from './MetricCard'
import { 
  DepartmentEngagementChart,
  SkillsRadarChart,
  ROITrendChart,
  PerformanceDistributionChart
} from './Charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/useStore'
import { formatCurrency, formatPercentage, getPerformanceLabel, getPerformanceBadgeColor } from '@/lib/utils'

export function Dashboard() {
  const { employees, trainingFeedback, aiInsights } = useStore()

  // Calculate metrics
  const totalInvestment = trainingFeedback.reduce((sum, feedback) => sum + feedback.cost, 0)
  const avgNPS = trainingFeedback.length > 0 
    ? trainingFeedback.reduce((sum, feedback) => sum + feedback.nps_score, 0) / trainingFeedback.length 
    : 0
  const completionRate = 85 // Mock data
  const avgROI = 3.2 // Mock data

  const unreadInsights = aiInsights.filter(insight => !insight.is_read)
  const highPriorityInsights = aiInsights.filter(insight => insight.priority === 'high')

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard T&D Inteligente
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Transformando dados em desenvolvimento de pessoas
        </p>
      </motion.div>

      {/* AI Insights Banner */}
      {highPriorityInsights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                  <Brain className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                    Insights da IA Disponíveis
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {highPriorityInsights.length} insight{highPriorityInsights.length > 1 ? 's' : ''} de alta prioridade detectado{highPriorityInsights.length > 1 ? 's' : ''}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                  Ver Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Investimento Total"
          value={formatCurrency(totalInvestment)}
          change={{ value: 12, trend: 'up' }}
          icon={DollarSign}
          description="Últimos 6 meses"
          gradient
        />
        <MetricCard
          title="ROI Médio"
          value={`${avgROI}x`}
          change={{ value: 8, trend: 'up' }}
          icon={TrendingUp}
          description="Retorno sobre investimento"
          gradient
        />
        <MetricCard
          title="Taxa de Conclusão"
          value={formatPercentage(completionRate)}
          change={{ value: 3, trend: 'up' }}
          icon={CheckCircle2}
          description="Treinamentos finalizados"
          gradient
        />
        <MetricCard
          title="NPS Médio"
          value={avgNPS.toFixed(1)}
          change={{ value: 15, trend: 'up' }}
          icon={Target}
          description="Satisfação dos funcionários"
          gradient
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentEngagementChart />
        <SkillsRadarChart />
        <ROITrendChart />
        <PerformanceDistributionChart />
      </div>

      {/* Employees Spotlight */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Funcionários em Destaque</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {employees.slice(0, 3).map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {employee.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {employee.position} • {employee.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  className={getPerformanceBadgeColor(employee.nine_box_performance)}
                  variant="secondary"
                >
                  {getPerformanceLabel(employee.nine_box_performance)}
                </Badge>
                <Button variant="outline" size="sm">
                  Ver Trilha
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Recent AI Insights */}
      {aiInsights.length > 0 && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Insights Recentes da IA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.slice(0, 3).map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"
              >
                <div className={`p-1 rounded-full ${
                  insight.priority === 'high' ? 'bg-red-100 text-red-600' :
                  insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {insight.description}
                  </p>
                </div>
                <Badge variant={
                  insight.priority === 'high' ? 'destructive' :
                  insight.priority === 'medium' ? 'warning' : 'success'
                }>
                  {insight.priority}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}