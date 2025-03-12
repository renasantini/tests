"use client"

import { useState, useEffect } from "react"
import type { Question, QuestionCategory, QuestionDifficulty } from "@/lib/ai/question-generator"
import type { AnswerAnalysis } from "@/lib/ai/answer-analyzer"

interface UseTrainingSessionProps {
  category: QuestionCategory
  difficulty: QuestionDifficulty
  count?: number
}

export function useTrainingSession({ category, difficulty, count = 5 }: UseTrainingSessionProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [analyses, setAnalyses] = useState<Record<string, AnswerAnalysis>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category, difficulty, count }),
        })

        if (!response.ok) {
          throw new Error("Erro ao buscar perguntas")
        }

        const data = await response.json()
        setQuestions(data.questions)
      } catch (err) {
        setError("Erro ao carregar perguntas. Por favor, tente novamente.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [category, difficulty, count])

  const currentQuestion = questions[currentQuestionIndex]

  const setAnswer = (answer: string) => {
    if (!currentQuestion) return

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const analyzeAnswer = async () => {
    if (!currentQuestion) return

    const answer = userAnswers[currentQuestion.id]
    if (!answer) return

    try {
      setIsAnalyzing(true)
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
          answer,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao analisar resposta")
      }

      const data = await response.json()
      setAnalyses((prev) => ({
        ...prev,
        [currentQuestion.id]: data.analysis,
      }))
    } catch (err) {
      setError("Erro ao analisar resposta. Por favor, tente novamente.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const getCurrentAnalysis = () => {
    if (!currentQuestion) return null
    return analyses[currentQuestion.id]
  }

  const getCurrentAnswer = () => {
    if (!currentQuestion) return ""
    return userAnswers[currentQuestion.id] || ""
  }

  const hasAnswer = () => {
    if (!currentQuestion) return false
    return !!userAnswers[currentQuestion.id]
  }

  const hasAnalysis = () => {
    if (!currentQuestion) return false
    return !!analyses[currentQuestion.id]
  }

  const getSessionSummary = () => {
    const answeredQuestions = questions.filter((q) => !!userAnswers[q.id])
    const analyzedQuestions = questions.filter((q) => !!analyses[q.id])

    if (analyzedQuestions.length === 0) return null

    const totalScore = analyzedQuestions.reduce((sum, q) => sum + analyses[q.id].score, 0)
    const averageScore = totalScore / analyzedQuestions.length

    return {
      questionsAnswered: answeredQuestions.length,
      questionsAnalyzed: analyzedQuestions.length,
      averageScore,
      strengths: analyzedQuestions.flatMap((q) => analyses[q.id].strengths),
      weaknesses: analyzedQuestions.flatMap((q) => analyses[q.id].weaknesses),
    }
  }

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    setAnswer,
    analyzeAnswer,
    nextQuestion,
    previousQuestion,
    getCurrentAnalysis,
    getCurrentAnswer,
    hasAnswer,
    hasAnalysis,
    getSessionSummary,
    isLoading,
    isAnalyzing,
    error,
  }
}

