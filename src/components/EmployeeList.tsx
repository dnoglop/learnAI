import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Mail,
  Calendar,
  Building,
  MoreHorizontal,
  Edit,
  Trash2,
  Send
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useStore } from '@/store/useStore'
import { getPerformanceLabel, getPerformanceBadgeColor, formatDate } from '@/lib/utils'
import { generateLearningPath, analyzeSkillGaps } from '@/lib/gemini'
import { sendLearningPath } from '@/lib/email'

export function EmployeeList() {
  const { employees, trainingFeedback } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterPerformance, setFilterPerformance] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [generatingPath, setGeneratingPath] = useState(false)

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment
    const matchesPerformance = filterPerformance === 'all' || employee.nine_box_performance.toString() === filterPerformance

    return matchesSearch && matchesDepartment && matchesPerformance
  })

  // Get unique departments
  const departments = [...new Set(employees.map(emp => emp.department))]

  const handleGenerateLearningPath = async (employee: any) => {
    setGeneratingPath(true)
    try {
      // Get employee's training feedback
      const employeeFeedback = trainingFeedback.filter(fb => fb.employee_id === employee.id)
      
      // Analyze skill gaps using AI
      const skillAnalysis = await analyzeSkillGaps(employee, employeeFeedback)
      
      // Generate learning path
      const learningPath = await generateLearningPath(
        skillAnalysis.skillGaps,
        employee.career_goals || '',
        employee
      )

      // Send email
      const emailResult = await sendLearningPath(employee.email, learningPath)
      
      if (emailResult.success) {
        alert('Trilha gerada e enviada com sucesso!')
      } else {
        alert('Trilha gerada, mas houve erro no envio do email')
      }
    } catch (error) {
      console.error('Error generating learning path:', error)
      alert('Erro ao gerar trilha de aprendizado')
    } finally {
      setGeneratingPath(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
            Funcionários
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie sua equipe e crie trilhas personalizadas
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Funcionário
        </Button>
      </div>

      {/* Filters */}
      <Card className="glass-effect">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome, email ou departamento..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Departamentos</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPerformance} onValueChange={setFilterPerformance}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Performances</SelectItem>
                <SelectItem value="1">Baixa</SelectItem>
                <SelectItem value="2">Média</SelectItem>
                <SelectItem value="3">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-effect hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {employee.position}
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Building className="h-4 w-4" />
                  <span>{employee.department}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{employee.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Desde {formatDate(new Date(employee.hire_date))}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getPerformanceBadgeColor(employee.nine_box_performance)} variant="secondary">
                      Performance: {getPerformanceLabel(employee.nine_box_performance)}
                    </Badge>
                  </div>
                  <Badge variant="outline">
                    Potencial: {getPerformanceLabel(employee.nine_box_potential)}
                  </Badge>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  
                  <Button 
                    variant="gradient" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleGenerateLearningPath(employee)}
                    disabled={generatingPath}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    {generatingPath ? 'Gerando...' : 'Trilha IA'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="glass-effect">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Nenhum funcionário encontrado
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Ajuste os filtros ou adicione novos funcionários
            </p>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Funcionário
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Employee Detail Dialog */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Funcionário</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nome</label>
                  <Input value={selectedEmployee.name} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <Input value={selectedEmployee.email} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Departamento</label>
                  <Input value={selectedEmployee.department} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cargo</label>
                  <Input value={selectedEmployee.position} readOnly />
                </div>
              </div>
              
              {selectedEmployee.career_goals && (
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Objetivos de Carreira</label>
                  <div className="mt-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedEmployee.career_goals}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Funcionário
                </Button>
                <Button 
                  variant="gradient" 
                  className="flex-1"
                  onClick={() => handleGenerateLearningPath(selectedEmployee)}
                  disabled={generatingPath}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {generatingPath ? 'Gerando Trilha...' : 'Gerar Nova Trilha'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}