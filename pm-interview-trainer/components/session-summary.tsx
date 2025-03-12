"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, BarChart3, Save } from "lucide-react"
import Link from "next/link"

interface SessionSummaryProps {
  questionsAnswered: number
  questionsAnalyzed: number
  averageScore: number
  strengths: string[]
  weaknesses: string[]
  onSave?: () => void
}

export function SessionSummary({
  questionsAnswered,
  questionsAnalyzed,
  averageScore,
  strengths,
  weaknesses,
  onSave,
}: SessionSummaryProps) {
  // Remover duplicatas e limitar a 5 itens
  const uniqueStrengths = [...new Set(strengths)].slice(0, 5)
  const uniqueWeaknesses = [...new Set(weaknesses)].slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo da Sessão</CardTitle>
        <CardDescription>Análise do seu desempenho nesta sessão de treinamento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
            <span className="text-sm font-medium text-muted-foreground">Perguntas Respondidas</span>
            <span className="text-3xl font-bold">{questionsAnswered}</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
            <span className="text-sm font-medium text-muted-foreground">Perguntas Analisadas</span>
            <span className="text-3xl font-bold">{questionsAnalyzed}</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
            <span className="text-sm font-medium text-muted-foreground">Pontuação Média</span>
            <span className="text-3xl font-bold">{Math.round(averageScore)}%</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">Principais Pontos Fortes</h3>
            </div>
            <ul className="space-y-2">
              {uniqueStrengths.map((strength, index) => (
                <li key={index} className="text-sm">
                  • {strength}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-5 w-5 text-red-500" />
              <h3 className="font-medium">Principais Áreas de Melhoria</h3>
            </div>
            <ul className="space-y-2">
              {uniqueWeaknesses.map((weakness, index) => (
                <li key={index} className="text-sm">
                  • {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          {onSave && (
            <Button onClick={onSave}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Sessão
            </Button>
          )}
          <Link href="/progress">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Ver Progresso
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

