import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { Question } from "./question-generator"

export interface AnswerAnalysis {
  score: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  detailedFeedback: string
}

export async function analyzeAnswer(question: Question, userAnswer: string): Promise<AnswerAnalysis> {
  const prompt = `
    Analise a resposta de um candidato a uma entrevista para Product Manager.
    
    Pergunta: "${question.text}"
    
    Resposta do candidato: "${userAnswer}"
    
    Exemplo de resposta ideal: "${question.exampleAnswer}"
    
    Avalie a resposta do candidato considerando:
    1. Clareza e estrutura
    2. Profundidade e conhecimento técnico
    3. Uso de exemplos práticos
    4. Alinhamento com as melhores práticas de Product Management
    
    Forneça:
    1. Uma pontuação de 0 a 100
    2. 2-3 pontos fortes da resposta
    3. 2-3 áreas de melhoria
    4. 2-3 sugestões específicas para melhorar a resposta
    5. Um feedback detalhado (2-3 parágrafos)
    
    Retorne apenas um objeto JSON com:
    - score: a pontuação (número)
    - strengths: array de pontos fortes (array de strings)
    - weaknesses: array de áreas de melhoria (array de strings)
    - suggestions: array de sugestões (array de strings)
    - detailedFeedback: o feedback detalhado (string)
  `

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
  })

  try {
    return JSON.parse(text) as AnswerAnalysis
  } catch (error) {
    console.error("Erro ao analisar a resposta da IA:", error)
    return {
      score: 0,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      detailedFeedback: "Erro ao analisar a resposta.",
    }
  }
}

