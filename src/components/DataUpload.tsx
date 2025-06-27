import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse'
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Users,
  MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface UploadedData {
  employees?: any[]
  feedback?: any[]
}

export function DataUpload() {
  const [uploadedData, setUploadedData] = useState<UploadedData>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  const processJSON = useCallback((file: File, type: 'employees' | 'feedback') => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string)
          
          // Handle both single object and array of objects
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData]
          
          let mappedData
          if (type === 'employees') {
            mappedData = dataArray.map((row: any, index) => ({
              id: `temp-${index}`,
              name: row['Nome'] || row['name'] || row['Name'],
              email: row['Email'] || row['email'],
              department: row['Departamento'] || row['department'] || row['Department'],
              position: row['Cargo'] || row['position'] || row['Position'],
              hire_date: row['Data de admissão'] || row['hire_date'] || row['Hire Date'],
              nine_box_performance: parseInt(row['Performance (1-3)'] || row['performance'] || '2'),
              nine_box_potential: parseInt(row['Potencial (1-3)'] || row['potential'] || '2'),
              career_goals: row['Objetivos de carreira'] || row['career_goals'] || row['Career Goals'] || null
            }))
          } else {
            mappedData = dataArray.map((row: any, index) => ({
              id: `temp-feedback-${index}`,
              employee_name: row['Funcionário'] || row['employee'] || row['Employee'],
              training_name: row['Treinamento'] || row['training'] || row['Training'],
              nps_score: parseInt(row['NPS'] || row['nps'] || '7'),
              feedback_text: row['Feedback'] || row['feedback'] || null,
              completion_date: row['Data'] || row['date'] || row['Date'],
              cost: parseFloat(row['Custo'] || row['cost'] || '0'),
              duration_hours: parseFloat(row['Duração'] || row['duration'] || '8')
            }))
          }

          resolve(mappedData)
        } catch (error) {
          reject(new Error('Erro ao processar arquivo JSON: formato inválido'))
        }
      }
      reader.onerror = () => reject(new Error('Erro ao ler arquivo JSON'))
      reader.readAsText(file)
    })
  }, [])

  const processCSV = useCallback((file: File, type: 'employees' | 'feedback') => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`Erro ao processar CSV: ${results.errors[0].message}`))
            return
          }

          // Validate and map data based on type
          try {
            let mappedData
            if (type === 'employees') {
              mappedData = results.data.map((row: any, index) => ({
                id: `temp-${index}`,
                name: row['Nome'] || row['name'] || row['Name'],
                email: row['Email'] || row['email'],
                department: row['Departamento'] || row['department'] || row['Department'],
                position: row['Cargo'] || row['position'] || row['Position'],
                hire_date: row['Data Admissão'] || row['hire_date'] || row['Hire Date'],
                nine_box_performance: parseInt(row['Performance'] || row['performance'] || '2'),
                nine_box_potential: parseInt(row['Potencial'] || row['potential'] || '2'),
                career_goals: row['Objetivos'] || row['career_goals'] || row['Career Goals'] || null
              }))
            } else {
              mappedData = results.data.map((row: any, index) => ({
                id: `temp-feedback-${index}`,
                employee_name: row['Funcionário'] || row['employee'] || row['Employee'],
                training_name: row['Treinamento'] || row['training'] || row['Training'],
                nps_score: parseInt(row['NPS'] || row['nps'] || '7'),
                feedback_text: row['Feedback'] || row['feedback'] || null,
                completion_date: row['Data'] || row['date'] || row['Date'],
                cost: parseFloat(row['Custo'] || row['cost'] || '0'),
                duration_hours: parseFloat(row['Duração'] || row['duration'] || '8')
              }))
            }

            resolve(mappedData)
          } catch (error) {
            reject(new Error('Erro ao mapear dados do CSV'))
          }
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true)
    setUploadStatus('processing')
    setUploadProgress(0)

    try {
      const newData: UploadedData = { ...uploadedData }

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i]
        const fileName = file.name.toLowerCase()
        const fileExtension = fileName.split('.').pop()
        
        // Determine file type based on name
        let fileType: 'employees' | 'feedback'
        if (fileName.includes('funcionario') || fileName.includes('employee')) {
          fileType = 'employees'
        } else if (fileName.includes('feedback') || fileName.includes('treinamento')) {
          fileType = 'feedback'
        } else {
          // Ask user or default to employees
          fileType = 'employees'
        }

        let data
        if (fileExtension === 'json') {
          data = await processJSON(file, fileType)
        } else {
          data = await processCSV(file, fileType)
        }
        
        newData[fileType] = data as any[]
        
        setUploadProgress(((i + 1) / acceptedFiles.length) * 100)
      }

      setUploadedData(newData)
      setUploadStatus('success')
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
    } finally {
      setIsProcessing(false)
    }
  }, [uploadedData, processCSV, processJSON])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json']
    },
    multiple: true
  })

  const downloadTemplate = (type: 'employees' | 'feedback', format: 'csv' | 'json') => {
    if (format === 'csv') {
      const templates = {
        employees: [
          ['Nome', 'Email', 'Departamento', 'Cargo', 'Data Admissão', 'Performance', 'Potencial', 'Objetivos'],
          ['João Silva', 'joao@empresa.com', 'Vendas', 'Gerente', '2022-01-15', '3', '2', 'Tornar-se Diretor'],
          ['Maria Santos', 'maria@empresa.com', 'TI', 'Desenvolvedora', '2021-08-10', '2', '3', 'Liderar equipe técnica']
        ],
        feedback: [
          ['Funcionário', 'Treinamento', 'NPS', 'Feedback', 'Data', 'Custo', 'Duração'],
          ['João Silva', 'Liderança Eficaz', '8', 'Excelente conteúdo', '2024-01-15', '500', '16'],
          ['Maria Santos', 'React Avançado', '9', 'Muito técnico', '2024-02-10', '800', '24']
        ]
      }

      const csv = Papa.unparse(templates[type])
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `template_${type}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } else {
      const templates = {
        employees: [
          {
            "Nome": "João da Silva",
            "Email": "joao.silva@exemplo.com",
            "Departamento": "Vendas",
            "Cargo": "Executivo de Contas",
            "Data de admissão": "2022-05-20",
            "Performance (1-3)": 3,
            "Potencial (1-3)": 2,
            "Objetivos de carreira": "Tornar-se gerente de vendas"
          },
          {
            "Nome": "Maria Santos",
            "Email": "maria.santos@exemplo.com",
            "Departamento": "TI",
            "Cargo": "Desenvolvedora Senior",
            "Data de admissão": "2021-08-10",
            "Performance (1-3)": 2,
            "Potencial (1-3)": 3,
            "Objetivos de carreira": "Liderar equipe de desenvolvimento"
          }
        ],
        feedback: [
          {
            "Funcionário": "João da Silva",
            "Treinamento": "Liderança Eficaz",
            "NPS": 8,
            "Feedback": "Excelente conteúdo sobre gestão de equipes",
            "Data": "2024-01-15",
            "Custo": 500,
            "Duração": 16
          },
          {
            "Funcionário": "Maria Santos",
            "Treinamento": "React Avançado",
            "NPS": 9,
            "Feedback": "Muito técnico e prático",
            "Data": "2024-02-10",
            "Custo": 800,
            "Duração": 24
          }
        ]
      }

      const json = JSON.stringify(templates[type], null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `template_${type}.json`
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
          Upload de Dados
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Importe dados de funcionários e feedback de treinamentos (CSV, Excel ou JSON)
        </p>
      </div>

      {/* Templates */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Dados de Funcionários
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Nome, email, departamento, 9-Box, etc.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('employees', 'csv')}
                  className="flex-1"
                  size="sm"
                >
                  <Download className="h-3 w-3 mr-1" />
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('employees', 'json')}
                  className="flex-1"
                  size="sm"
                >
                  <Download className="h-3 w-3 mr-1" />
                  JSON
                </Button>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Feedback de Treinamentos
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  NPS, feedback, custos, duração, etc.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('feedback', 'csv')}
                  className="flex-1"
                  size="sm"
                >
                  <Download className="h-3 w-3 mr-1" />
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('feedback', 'json')}
                  className="flex-1"
                  size="sm"
                >
                  <Download className="h-3 w-3 mr-1" />
                  JSON
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="glass-effect">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
              ${isDragActive 
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
              }
            `}
          >
            <input {...getInputProps()} />
            
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isDragActive ? 1.05 : 1 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Suporte para CSV, XLS, XLSX e JSON • Múltiplos arquivos aceitos
                </p>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Processando arquivos... {uploadProgress.toFixed(0)}%
                  </p>
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Upload concluído com sucesso!</span>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span>Erro no upload. Verifique o formato dos arquivos.</span>
                </div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Data */}
      {(uploadedData.employees || uploadedData.feedback) && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Preview dos Dados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="employees" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employees" disabled={!uploadedData.employees}>
                  Funcionários {uploadedData.employees && (
                    <Badge variant="secondary" className="ml-2">
                      {uploadedData.employees.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="feedback" disabled={!uploadedData.feedback}>
                  Feedback {uploadedData.feedback && (
                    <Badge variant="secondary" className="ml-2">
                      {uploadedData.feedback.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employees" className="space-y-4">
                {uploadedData.employees && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left p-2">Nome</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Departamento</th>
                          <th className="text-left p-2">Performance</th>
                          <th className="text-left p-2">Potencial</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedData.employees.slice(0, 5).map((employee, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="p-2">{employee.name}</td>
                            <td className="p-2">{employee.email}</td>
                            <td className="p-2">{employee.department}</td>
                            <td className="p-2">{employee.nine_box_performance}</td>
                            <td className="p-2">{employee.nine_box_potential}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {uploadedData.employees.length > 5 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        ... e mais {uploadedData.employees.length - 5} registros
                      </p>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="feedback" className="space-y-4">
                {uploadedData.feedback && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left p-2">Funcionário</th>
                          <th className="text-left p-2">Treinamento</th>
                          <th className="text-left p-2">NPS</th>
                          <th className="text-left p-2">Custo</th>
                          <th className="text-left p-2">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedData.feedback.slice(0, 5).map((feedback, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="p-2">{feedback.employee_name}</td>
                            <td className="p-2">{feedback.training_name}</td>
                            <td className="p-2">{feedback.nps_score}</td>
                            <td className="p-2">R$ {feedback.cost}</td>
                            <td className="p-2">{feedback.completion_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {uploadedData.feedback.length > 5 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        ... e mais {uploadedData.feedback.length - 5} registros
                      </p>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline">
                Cancelar
              </Button>
              <Button variant="gradient">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirmar Importação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}