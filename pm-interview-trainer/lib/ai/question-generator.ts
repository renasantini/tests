import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type QuestionDifficulty = "iniciante" | "intermediário" | "avançado"
export type QuestionCategory =
  | "estratégia de produto"
  | "análise de dados"
  | "metodologias ágeis"
  | "priorização"
  | "liderança"
  | "comunicação"

export interface Question {
  id: string
  text: string
  category: QuestionCategory
  difficulty: QuestionDifficulty
  exampleAnswer: string
}

export async function generateQuestions(
  category: QuestionCategory,
  difficulty: QuestionDifficulty,
  count = 5,
): Promise<Question[]> {
  const prompt = `
    Gere ${count} perguntas de entrevista para Product Managers na categoria "${category}" com nível de dificuldade "${difficulty}".
    
    Para cada pergunta, forneça:
    1. O texto da pergunta
    2. Um exemplo de resposta ideal que demonstre o que um bom candidato deveria mencionar
    
    Retorne apenas um array JSON com objetos contendo:
    - id: um identificador único (string)
    - text: o texto da pergunta (string)
    - category: a categoria da pergunta (string)
    - difficulty: o nível de dificuldade (string)
    - exampleAnswer: um exemplo de resposta ideal (string)
  `

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
  })

  try {
    return JSON.parse(text) as Question[]
  } catch (error) {
    console.error("Erro ao analisar a resposta da IA:", error)
    return []
  }
}

