import { type NextRequest, NextResponse } from "next/server"
import { generateQuestions, type QuestionCategory, type QuestionDifficulty } from "@/lib/ai/question-generator"

export async function POST(req: NextRequest) {
  try {
    const { category, difficulty, count } = await req.json()

    if (!category || !difficulty) {
      return NextResponse.json({ error: "Categoria e dificuldade são obrigatórias" }, { status: 400 })
    }

    const questions = await generateQuestions(
      category as QuestionCategory,
      difficulty as QuestionDifficulty,
      count || 5,
    )

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("Erro ao gerar perguntas:", error)
    return NextResponse.json({ error: "Erro ao gerar perguntas" }, { status: 500 })
  }
}

