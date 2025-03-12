import { type NextRequest, NextResponse } from "next/server"
import { analyzeAnswer } from "@/lib/ai/answer-analyzer"

export async function POST(req: NextRequest) {
  try {
    const { question, answer } = await req.json()

    if (!question || !answer) {
      return NextResponse.json({ error: "Pergunta e resposta são obrigatórias" }, { status: 400 })
    }

    const analysis = await analyzeAnswer(question, answer)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Erro ao analisar resposta:", error)
    return NextResponse.json({ error: "Erro ao analisar resposta" }, { status: 500 })
  }
}

