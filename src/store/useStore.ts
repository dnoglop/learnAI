import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export interface Employee {
  id: string
  company_id: string
  name: string
  email: string
  department: string
  position: string
  hire_date: string
  nine_box_performance: number
  nine_box_potential: number
  career_goals: string | null
  created_at: string
}

export interface TrainingFeedback {
  id: string
  employee_id: string
  training_name: string
  nps_score: number
  feedback_text: string | null
  completion_date: string
  cost: number
  duration_hours: number
  created_at: string
}

export interface LearningPath {
  id: string
  employee_id: string
  title: string
  description: string
  skills_targeted: string[]
  content_modules: any[]
  status: string
  progress_percentage: number
  ai_generated: boolean
  created_at: string
}

export interface AIInsight {
  id: string
  company_id: string
  insight_type: string
  title: string
  description: string
  priority: string
  is_read: boolean
  created_at: string
}

interface AppState {
  // Data
  employees: Employee[]
  trainingFeedback: TrainingFeedback[]
  learningPaths: LearningPath[]
  aiInsights: AIInsight[]
  
  // UI State
  darkMode: boolean
  loading: boolean
  currentCompanyId: string | null
  
  // Actions
  setEmployees: (employees: Employee[]) => void
  setTrainingFeedback: (feedback: TrainingFeedback[]) => void
  setLearningPaths: (paths: LearningPath[]) => void
  setAIInsights: (insights: AIInsight[]) => void
  toggleDarkMode: () => void
  setLoading: (loading: boolean) => void
  setCurrentCompanyId: (id: string) => void
  
  // Async Actions
  fetchEmployees: () => Promise<void>
  fetchTrainingFeedback: () => Promise<void>
  fetchLearningPaths: () => Promise<void>
  fetchAIInsights: () => Promise<void>
  addEmployee: (employee: Omit<Employee, 'id' | 'created_at'>) => Promise<void>
  updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>
  deleteEmployee: (id: string) => Promise<void>
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  employees: [],
  trainingFeedback: [],
  learningPaths: [],
  aiInsights: [],
  darkMode: false,
  loading: false,
  currentCompanyId: 'demo-company-id',
  
  // Sync actions
  setEmployees: (employees) => set({ employees }),
  setTrainingFeedback: (trainingFeedback) => set({ trainingFeedback }),
  setLearningPaths: (learningPaths) => set({ learningPaths }),
  setAIInsights: (aiInsights) => set({ aiInsights }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setLoading: (loading) => set({ loading }),
  setCurrentCompanyId: (currentCompanyId) => set({ currentCompanyId }),
  
  // Async actions
  fetchEmployees: async () => {
    const { currentCompanyId } = get()
    if (!currentCompanyId) return
    
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('company_id', currentCompanyId)
      
      if (error) throw error
      set({ employees: data || [] })
    } catch (error) {
      console.error('Error fetching employees:', error)
      // Set demo data if Supabase is not configured
      set({ 
        employees: [
          {
            id: '1',
            company_id: currentCompanyId,
            name: 'Ana Silva',
            email: 'ana.silva@empresa.com',
            department: 'Vendas',
            position: 'Gerente de Vendas',
            hire_date: '2022-01-15',
            nine_box_performance: 3,
            nine_box_potential: 2,
            career_goals: 'Tornar-se Diretora Comercial',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            company_id: currentCompanyId,
            name: 'Carlos Santos',
            email: 'carlos.santos@empresa.com',
            department: 'TI',
            position: 'Desenvolvedor Senior',
            hire_date: '2021-08-10',
            nine_box_performance: 2,
            nine_box_potential: 3,
            career_goals: 'Liderar equipe de desenvolvimento',
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            company_id: currentCompanyId,
            name: 'Maria Oliveira',
            email: 'maria.oliveira@empresa.com',
            department: 'RH',
            position: 'Analista de RH',
            hire_date: '2023-03-20',
            nine_box_performance: 1,
            nine_box_potential: 2,
            career_goals: 'Especializar-se em desenvolvimento organizacional',
            created_at: new Date().toISOString()
          }
        ]
      })
    } finally {
      set({ loading: false })
    }
  },
  
  fetchTrainingFeedback: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('training_feedback')
        .select('*')
      
      if (error) throw error
      set({ trainingFeedback: data || [] })
    } catch (error) {
      console.error('Error fetching training feedback:', error)
      // Set demo data
      set({
        trainingFeedback: [
          {
            id: '1',
            employee_id: '1',
            training_name: 'Liderança Eficaz',
            nps_score: 8,
            feedback_text: 'Excelente conteúdo sobre gestão de equipes',
            completion_date: '2024-01-15',
            cost: 500,
            duration_hours: 16,
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            employee_id: '2',
            training_name: 'React Avançado',
            nps_score: 9,
            feedback_text: 'Muito técnico e prático',
            completion_date: '2024-02-10',
            cost: 800,
            duration_hours: 24,
            created_at: new Date().toISOString()
          }
        ]
      })
    } finally {
      set({ loading: false })
    }
  },
  
  fetchLearningPaths: async () => {
    const { currentCompanyId } = get()
    if (!currentCompanyId) return
    
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
      
      if (error) throw error
      set({ learningPaths: data || [] })
    } catch (error) {
      console.error('Error fetching learning paths:', error)
      // Set demo data
      set({
        learningPaths: [
          {
            id: '1',
            employee_id: '1',
            title: 'Trilha de Liderança Avançada',
            description: 'Programa completo para desenvolvimento de liderança',
            skills_targeted: ['Liderança', 'Comunicação', 'Gestão de Conflitos'],
            content_modules: [
              {
                title: 'Fundamentos de Liderança',
                description: 'Conceitos básicos e estilos',
                duration: '30 min',
                type: 'video'
              }
            ],
            status: 'active',
            progress_percentage: 45,
            ai_generated: true,
            created_at: new Date().toISOString()
          }
        ]
      })
    } finally {
      set({ loading: false })
    }
  },
  
  fetchAIInsights: async () => {
    const { currentCompanyId } = get()
    if (!currentCompanyId) return
    
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('company_id', currentCompanyId)
      
      if (error) throw error
      set({ aiInsights: data || [] })
    } catch (error) {
      console.error('Error fetching AI insights:', error)
      // Set demo data
      set({
        aiInsights: [
          {
            id: '1',
            company_id: currentCompanyId,
            insight_type: 'recommendation',
            title: 'Foco em Desenvolvimento de Liderança',
            description: '60% dos funcionários de alta performance mostram potencial de liderança não desenvolvido',
            priority: 'high',
            is_read: false,
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            company_id: currentCompanyId,
            insight_type: 'alert',
            title: 'Baixo Engajamento em TI',
            description: 'Departamento de TI apresenta NPS médio de 6.2, abaixo da média da empresa',
            priority: 'medium',
            is_read: false,
            created_at: new Date().toISOString()
          }
        ]
      })
    } finally {
      set({ loading: false })
    }
  },
  
  addEmployee: async (employeeData) => {
    const { currentCompanyId } = get()
    if (!currentCompanyId) return
    
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert({ ...employeeData, company_id: currentCompanyId })
        .select()
      
      if (error) throw error
      
      const { employees } = get()
      set({ employees: [...employees, ...(data || [])] })
    } catch (error) {
      console.error('Error adding employee:', error)
    }
  },
  
  updateEmployee: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id)
      
      if (error) throw error
      
      const { employees } = get()
      set({
        employees: employees.map(emp => 
          emp.id === id ? { ...emp, ...updates } : emp
        )
      })
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  },
  
  deleteEmployee: async (id) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      const { employees } = get()
      set({ employees: employees.filter(emp => emp.id !== id) })
    } catch (error) {
      console.error('Error deleting employee:', error)
    }
  }
}))