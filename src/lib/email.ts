// Email service using a mock implementation for demo
// In production, you would use Resend or similar service

export interface EmailTemplate {
  to: string
  subject: string
  html: string
}

export async function sendLearningPath(employeeEmail: string, learningPath: any) {
  try {
    // Mock email sending - in production use Resend
    const emailTemplate: EmailTemplate = {
      to: employeeEmail,
      subject: `Nova Trilha de Aprendizado: ${learningPath.title}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">LearnAI Pro</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Sua nova trilha está pronta!</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">${learningPath.title}</h2>
            <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">${learningPath.description}</p>
            
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 30px 0;">
              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px;">Módulos da Trilha:</h3>
              ${learningPath.modules.map((module: any, index: number) => `
                <div style="border-left: 3px solid #667eea; padding-left: 15px; margin: 20px 0;">
                  <h4 style="color: #1f2937; margin: 0 0 8px 0; font-size: 16px;">${index + 1}. ${module.title}</h4>
                  <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">${module.description}</p>
                  <span style="background: #e5e7eb; color: #374151; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                    ${module.duration} • ${module.type}
                  </span>
                </div>
              `).join('')}
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                Acessar Trilha Completa
              </a>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 15px; margin: 30px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>Duração estimada:</strong> ${learningPath.estimatedDuration} • 
                <strong>Nível:</strong> ${learningPath.difficulty}
              </p>
            </div>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              Esta trilha foi gerada especialmente para você pela nossa IA.<br>
              Acesse o <strong>LearnAI Pro</strong> para acompanhar seu progresso.
            </p>
          </div>
        </div>
      `
    }
    
    // Simulate API call
    console.log('Sending email:', emailTemplate)
    
    // In production, use:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send(emailTemplate)
    
    return { success: true, message: 'Email enviado com sucesso!' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Erro ao enviar email' }
  }
}

export async function sendBulkLearningPaths(emails: { employeeEmail: string, learningPath: any }[]) {
  const results = await Promise.all(
    emails.map(({ employeeEmail, learningPath }) => 
      sendLearningPath(employeeEmail, learningPath)
    )
  )
  
  return results
}