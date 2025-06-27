import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'your-api-key')

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function analyzeSkillGaps(employeeData: any, feedbackData: any[]) {
  try {
    const prompt = `
    Analise os dados do funcionário e identifique gaps de competências baseado em performance e feedback:
    
    Dados do funcionário: ${JSON.stringify(employeeData)}
    Feedback de treinamentos: ${JSON.stringify(feedbackData)}
    
    Retorne APENAS um JSON válido no seguinte formato:
    {
      "skillGaps": ["comunicação", "liderança", "excel avançado"],
      "recommendations": ["Curso de comunicação assertiva", "Workshop de liderança situacional"],
      "priority": "high",
      "reasoning": "Baseado na baixa performance e feedback negativo sobre comunicação..."
    }
    `
    
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid JSON response from AI')
  } catch (error) {
    console.error('Error analyzing skill gaps:', error)
    return {
      skillGaps: ["Comunicação", "Gestão de tempo"],
      recommendations: ["Curso de comunicação empresarial", "Workshop de produtividade"],
      priority: "medium",
      reasoning: "Análise baseada em dados padrão (API indisponível)"
    }
  }
}

export async function generateLearningPath(skillGaps: string[], careerGoals: string, employeeData: any) {
  try {
    const prompt = `
    Crie uma trilha de microlearning personalizada para desenvolvimento profissional:
    
    Gaps identificados: ${skillGaps.join(', ')}
    Objetivos de carreira: ${careerGoals}
    Cargo atual: ${employeeData.position}
    Departamento: ${employeeData.department}
    
    Retorne APENAS um JSON válido no seguinte formato:
    {
      "title": "Trilha de Desenvolvimento em Liderança",
      "description": "Programa focado em desenvolver competências de liderança...",
      "modules": [
        {
          "title": "Fundamentos de Liderança",
          "description": "Conceitos básicos e estilos de liderança",
          "duration": "30 min",
          "type": "video",
          "content": "Introdução aos princípios de liderança eficaz..."
        },
        {
          "title": "Comunicação Assertiva",
          "description": "Técnicas de comunicação para líderes",
          "duration": "25 min",
          "type": "article",
          "content": "Artigo sobre comunicação assertiva no ambiente corporativo..."
        }
      ],
      "estimatedDuration": "2 semanas",
      "difficulty": "intermediário"
    }
    `
    
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid JSON response from AI')
  } catch (error) {
    console.error('Error generating learning path:', error)
    return {
      title: `Trilha de Desenvolvimento - ${employeeData.name}`,
      description: "Programa personalizado de desenvolvimento profissional",
      modules: [
        {
          title: "Comunicação Eficaz",
          description: "Desenvolva suas habilidades de comunicação",
          duration: "30 min",
          type: "video",
          content: "Módulo focado em técnicas de comunicação assertiva"
        },
        {
          title: "Gestão de Tempo",
          description: "Otimize sua produtividade",
          duration: "25 min",
          type: "article",
          content: "Estratégias para uma melhor gestão do tempo"
        }
      ],
      estimatedDuration: "1 semana",
      difficulty: "iniciante"
    }
  }
}

export async function generateInsights(companyData: any) {
  try {
    const prompt = `
    Analise os dados da empresa e gere insights acionáveis para RH:
    
    Dados da empresa: ${JSON.stringify(companyData)}
    
    Retorne APENAS um array JSON válido no seguinte formato:
    [
      {
        "type": "recommendation",
        "title": "Foco em Treinamento de Liderança",
        "description": "60% dos funcionários mostram baixo potencial de liderança...",
        "priority": "high",
        "actionable": true
      },
      {
        "type": "alert",
        "title": "Alta Rotatividade no Departamento X",
        "description": "Departamento X apresenta 40% de rotatividade...",
        "priority": "medium",
        "actionable": true
      }
    ]
    `
    
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Invalid JSON response from AI')
  } catch (error) {
    console.error('Error generating insights:', error)
    return [
      {
        type: "recommendation",
        title: "Investimento em Treinamentos",
        description: "Considere aumentar o investimento em programas de desenvolvimento",
        priority: "medium",
        actionable: true
      },
      {
        type: "alert",
        title: "Baixo Engajamento",
        description: "Alguns funcionários mostram baixo engajamento nos treinamentos",
        priority: "high",
        actionable: true
      }
    ]
  }
}