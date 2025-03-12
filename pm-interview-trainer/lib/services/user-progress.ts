import type { Question, QuestionCategory } from "../ai/question-generator"
import type { AnswerAnalysis } from "../ai/answer-analyzer"

export interface SessionResult {
  id: string
  date: Date
  duration: number
  questions: {
    question: Question
    userAnswer: string
    analysis: AnswerAnalysis
  }[]
  averageScore: number
}

export interface UserProgress {
  userId: string
  sessionsCompleted: number
  questionsAnswered: number
  totalTimeSpent: number
  averageScore: number
  categoryScores: Record<QuestionCategory, number>
  recentSessions: SessionResult[]
}

// Em um app real, isso seria armazenado em um banco de dados
const userProgressMock: Record<string, UserProgress> = {}

export function getUserProgress(userId: string): UserProgress {
  if (!userProgressMock[userId]) {
    userProgressMock[userId] = {
      userId,
      sessionsCompleted: 0,
      questionsAnswered: 0,
      totalTimeSpent: 0,
      averageScore: 0,
      categoryScores: {
        "estratégia de produto": 0,
        "análise de dados": 0,
        "metodologias ágeis": 0,
        priorização: 0,
        liderança: 0,
        comunicação: 0,
      },
      recentSessions: [],
    }
  }
  return userProgressMock[userId]
}

export function saveSessionResult(userId: string, session: SessionResult): void {
  const userProgress = getUserProgress(userId)

  // Atualizar estatísticas do usuário
  userProgress.sessionsCompleted += 1
  userProgress.questionsAnswered += session.questions.length
  userProgress.totalTimeSpent += session.duration

  // Calcular nova pontuação média
  const totalScores = userProgress.averageScore * (userProgress.sessionsCompleted - 1) + session.averageScore
  userProgress.averageScore = totalScores / userProgress.sessionsCompleted

  // Atualizar pontuações por categoria
  const categoryScores: Record<QuestionCategory, { total: number; count: number }> = {
    "estratégia de produto": { total: 0, count: 0 },
    "análise de dados": { total: 0, count: 0 },
    "metodologias ágeis": { total: 0, count: 0 },
    priorização: { total: 0, count: 0 },
    liderança: { total: 0, count: 0 },
    comunicação: { total: 0, count: 0 },
  }

  // Calcular pontuações por categoria para esta sessão
  session.questions.forEach((item) => {
    const category = item.question.category
    categoryScores[category].total += item.analysis.score
    categoryScores[category].count += 1
  })

  // Atualizar pontuações por categoria no progresso do usuário
  Object.entries(categoryScores).forEach(([category, data]) => {
    if (data.count > 0) {
      const categoryScore = data.total / data.count
      const existingScore = userProgress.categoryScores[category as QuestionCategory]

      if (existingScore === 0) {
        userProgress.categoryScores[category as QuestionCategory] = categoryScore
      } else {
        userProgress.categoryScores[category as QuestionCategory] = (existingScore + categoryScore) / 2
      }
    }
  })

  // Adicionar sessão ao histórico
  userProgress.recentSessions.unshift(session)

  // Manter apenas as 10 sessões mais recentes
  if (userProgress.recentSessions.length > 10) {
    userProgress.recentSessions = userProgress.recentSessions.slice(0, 10)
  }
}

