import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          created_at: string
          subscription_tier: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          created_at?: string
          subscription_tier?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          created_at?: string
          subscription_tier?: string
        }
      }
      employees: {
        Row: {
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
        Insert: {
          id?: string
          company_id: string
          name: string
          email: string
          department: string
          position: string
          hire_date: string
          nine_box_performance: number
          nine_box_potential: number
          career_goals?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          email?: string
          department?: string
          position?: string
          hire_date?: string
          nine_box_performance?: number
          nine_box_potential?: number
          career_goals?: string | null
          created_at?: string
        }
      }
      training_feedback: {
        Row: {
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
        Insert: {
          id?: string
          employee_id: string
          training_name: string
          nps_score: number
          feedback_text?: string | null
          completion_date: string
          cost: number
          duration_hours: number
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          training_name?: string
          nps_score?: number
          feedback_text?: string | null
          completion_date?: string
          cost?: number
          duration_hours?: number
          created_at?: string
        }
      }
      learning_paths: {
        Row: {
          id: string
          employee_id: string
          title: string
          description: string
          skills_targeted: any
          content_modules: any
          status: string
          progress_percentage: number
          ai_generated: boolean
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          title: string
          description: string
          skills_targeted: any
          content_modules: any
          status?: string
          progress_percentage?: number
          ai_generated?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          title?: string
          description?: string
          skills_targeted?: any
          content_modules?: any
          status?: string
          progress_percentage?: number
          ai_generated?: boolean
          created_at?: string
        }
      }
      ai_insights: {
        Row: {
          id: string
          company_id: string
          insight_type: string
          title: string
          description: string
          priority: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          insight_type: string
          title: string
          description: string
          priority: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          insight_type?: string
          title?: string
          description?: string
          priority?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}