import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Sample data
const departmentEngagement = [
  { department: 'Vendas', engagement: 85 },
  { department: 'TI', engagement: 72 },
  { department: 'RH', engagement: 90 },
  { department: 'Marketing', engagement: 78 },
  { department: 'Financeiro', engagement: 65 }
]

const skillsData = [
  { skill: 'Liderança', current: 6, target: 9 },
  { skill: 'Comunicação', current: 7, target: 8 },
  { skill: 'Técnico', current: 8, target: 9 },
  { skill: 'Gestão', current: 5, target: 8 },
  { skill: 'Inovação', current: 6, target: 9 },
  { skill: 'Análise', current: 7, target: 8 }
]

const roiTrend = [
  { month: 'Jan', roi: 2.1 },
  { month: 'Fev', roi: 2.3 },
  { month: 'Mar', roi: 2.8 },
  { month: 'Abr', roi: 3.2 },
  { month: 'Mai', roi: 3.1 },
  { month: 'Jun', roi: 3.5 }
]

const performanceDistribution = [
  { name: 'Alta Performance', value: 25, color: '#10b981' },
  { name: 'Média Performance', value: 55, color: '#f59e0b' },
  { name: 'Baixa Performance', value: 20, color: '#ef4444' }
]

export function DepartmentEngagementChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Engajamento por Departamento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentEngagement}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar 
                dataKey="engagement" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SkillsRadarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Competências: Atual vs Meta</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} />
              <Radar
                name="Atual"
                dataKey="current"
                stroke="#667eea"
                fill="#667eea"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Meta"
                dataKey="target"
                stroke="#4facfe"
                fill="#4facfe"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ROITrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Evolução do ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value) => [`${value}x`, 'ROI']}
              />
              <Line
                type="monotone"
                dataKey="roi"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#4facfe" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function PerformanceDistributionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Distribuição de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {performanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}