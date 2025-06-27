# LearnAI Pro - SaaS de T&D Inteligente

Um SaaS completo de Treinamento e Desenvolvimento que utiliza Inteligência Artificial para personalizar trilhas de aprendizado baseadas em dados de performance (9-Box) e feedback de treinamentos.

## 🚀 Funcionalidades

### Core Features
- **Dashboard Inteligente**: Métricas de ROI, NPS e insights da IA em tempo real
- **Sistema de Upload**: Processamento de dados (9-Box e feedback de treinamentos)
- **Geração de Trilhas com IA**: Trilhas personalizadas usando Google Gemini AI
- **Sistema de Email**: Envio automático de trilhas e notificações
- **Gestão de Funcionários**: CRUD completo com filtros e visualizações
- **Análise de Gaps**: Identificação automática de lacunas de competências
- **Interface Responsiva**: Design mobile-first com dark mode
- **Autenticação Segura**: Gestão multi-tenant com Supabase

### Design Elements
- Sistema de cores moderno com gradientes
- Animações suaves com Framer Motion
- Componentes Shadcn/ui customizados
- Gráficos interativos com Recharts
- Dark mode com transições suaves
- Micro-interações e estados de hover

## 🛠️ Stack Tecnológica

### Frontend
- **React 18+** com TypeScript
- **Tailwind CSS** + Shadcn/ui
- **Zustand** para gerenciamento de estado
- **Recharts** para visualização de dados
- **Framer Motion** para animações
- **React Dropzone** para upload de arquivos

### Backend & Database
- **Supabase** (PostgreSQL + Auth + Storage)
- **Google Gemini AI** para análise e geração de conteúdo
- **Papa Parse** para processamento de CSV
- **Resend** para envio de emails

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd learnai-pro
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Preencha as variáveis no arquivo `.env`:
- Configure seu projeto Supabase
- Adicione sua chave do Google Gemini AI
- Configure o Resend para emails

5. Execute o projeto:
```bash
npm run dev
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### companies
- Informações das empresas clientes
- Tier de assinatura e configurações

#### employees
- Dados dos funcionários
- Matriz 9-Box (performance x potencial)
- Objetivos de carreira

#### training_feedback
- Feedback dos treinamentos
- NPS, custos e duração
- Histórico de participação

#### learning_paths
- Trilhas de aprendizado personalizadas
- Módulos e progresso
- Status de conclusão

#### ai_insights
- Insights gerados pela IA
- Recomendações e alertas
- Priorização automática

## 🤖 Integração com IA

### Google Gemini AI
- **Análise de Gaps**: Identifica lacunas de competências
- **Geração de Trilhas**: Cria conteúdo personalizado
- **Insights Automáticos**: Gera recomendações acionáveis

### Funcionalidades da IA
```typescript
// Análise de competências
const skillGaps = await analyzeSkillGaps(employeeData, feedbackData)

// Geração de trilhas
const learningPath = await generateLearningPath(skillGaps, careerGoals)

// Insights da empresa
const insights = await generateInsights(companyData)
```

## 📧 Sistema de Email

### Templates Personalizados
- Design responsivo com gradientes
- Módulos de trilha detalhados
- CTAs para engajamento
- Tracking de abertura

### Envio em Massa
```typescript
// Envio individual
await sendLearningPath(employeeEmail, learningPath)

// Envio em massa
await sendBulkLearningPaths(emailList)
```

## 📱 Responsividade

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Componentes Mobile-First
- Navigation drawer para mobile
- Cards empilhados em telas pequenas
- Tabelas com scroll horizontal
- Touch targets adequados (44px+)

## 🎨 Sistema de Design

### Cores
```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #4facfe;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### Tipografia
- **Headings**: Poppins (700, 600, 500)
- **Body**: Inter (400, 500)
- **Display**: Gradientes para títulos principais

## 🚀 Deploy

### Variáveis de Ambiente Necessárias
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

### Build para Produção
```bash
npm run build
npm run preview
```

## 📊 Métricas e Analytics

### KPIs Principais
- Investimento total em T&D
- ROI médio dos treinamentos
- Taxa de conclusão
- NPS médio dos funcionários

### Visualizações
- Engajamento por departamento
- Mapa de competências (atual vs meta)
- Evolução do ROI ao longo do tempo
- Distribuição de performance

## 🔒 Segurança

### Autenticação
- Supabase Auth com email/senha
- Row Level Security (RLS)
- Gestão de sessões segura

### Dados
- Criptografia de dados sensíveis
- Backup automático
- Logs de auditoria
- Compliance LGPD

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o produto:
- Email: suporte@learnai.pro
- Documentação: [docs.learnai.pro](https://docs.learnai.pro)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**LearnAI Pro** - Transformando dados de RH em desenvolvimento de pessoas através da Inteligência Artificial.