import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "Arquivo de áudio não fornecido" }, { status: 400 })
    }

    // Em um app real, você usaria a API de transcrição do OpenAI
    // Aqui estamos simulando com uma resposta de texto
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt:
        "Simule uma transcrição de áudio de uma resposta de entrevista para Product Manager sobre priorização de recursos.",
    })

    return NextResponse.json({ transcription: text })
  } catch (error) {
    console.error("Erro ao transcrever áudio:", error)
    return NextResponse.json({ error: "Erro ao transcrever áudio" }, { status: 500 })
  }
}

