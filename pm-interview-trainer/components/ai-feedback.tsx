import type { AnswerAnalysis } from "@/lib/ai/answer-analyzer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react"

interface AIFeedbackProps {
  analysis: AnswerAnalysis
  exampleAnswer: string
}

export function AIFeedback({ analysis, exampleAnswer }: AIFeedbackProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback da IA</CardTitle>
        <CardDescription>Análise da sua resposta com pontos fortes e sugestões de melhoria.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="feedback">
          <TabsList>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="example">Exemplo de Resposta</TabsTrigger>
          </TabsList>
          <TabsContent value="feedback" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Pontos Fortes</h3>
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm">{strength}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Áreas de Melhoria</h3>
              {analysis.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ThumbsDown className="h-5 w-5 text-red-500 mt-0.5" />
                  <p className="text-sm">{weakness}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Sugestões</h3>
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-sm font-medium">Pontuação: {analysis.score}/100</p>
            </div>
          </TabsContent>
          <TabsContent value="example">
            <div className="space-y-4">
              <p className="text-sm whitespace-pre-line">{exampleAnswer}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

