"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, ThumbsUp, ThumbsDown, ArrowRight, ArrowLeft, Lightbulb } from "lucide-react"

export default function TrainingSessionPage() {
  const params = useParams()
  const category = (params.category as string).replace(/-/g, " ")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")

  // Exemplo de perguntas para demonstração
  const questions = [
    {
      id: 1,
      text: "Como você priorizaria recursos em um roadmap de produto com recursos limitados?",
      difficulty: "Intermediário",
      example:
        "Uma boa resposta deve mencionar frameworks de priorização como RICE, MoSCoW, ou Kano Model, explicar como você avalia o impacto vs. esforço, e como você comunica essas decisões aos stakeholders.",
    },
    {
      id: 2,
      text: "Descreva uma situação em que você teve que tomar uma decisão baseada em dados incompletos. Como você procedeu?",
      difficulty: "Avançado",
      example:
        "Uma boa resposta deve abordar como você lida com incertezas, quais heurísticas você usa, como você busca validação rápida e como você comunica os riscos aos stakeholders.",
    },
    {
      id: 3,
      text: "Como você mediria o sucesso de um novo recurso de produto após o lançamento?",
      difficulty: "Intermediário",
      example:
        "Uma boa resposta deve mencionar métricas específicas (como engajamento, retenção, conversão), como você estabelece uma linha de base, como você configura experimentos A/B, e como você itera com base nos resultados.",
    },
  ]

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
      setUserAnswer("")
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFeedback(false)
      setUserAnswer("")
    }
  }

  const handleSubmitAnswer = () => {
    setShowFeedback(true)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight capitalize">{category}</h2>
          <p className="text-muted-foreground">
            Questão {currentQuestion + 1} de {questions.length}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
            Próxima
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pergunta</CardTitle>
            <div className="text-sm font-medium px-2.5 py-0.5 rounded bg-muted">
              {questions[currentQuestion].difficulty}
            </div>
          </div>
          <CardDescription>Responda de forma clara e estruturada, usando exemplos quando possível.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{questions[currentQuestion].text}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sua Resposta</CardTitle>
          <CardDescription>Digite sua resposta ou use o microfone para gravar.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Digite sua resposta aqui..."
              className="min-h-[150px]"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showFeedback}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleRecording}
                className={isRecording ? "text-red-500" : ""}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <p className="text-sm text-muted-foreground">
                {isRecording ? "Gravando..." : "Clique para gravar sua resposta"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setUserAnswer("")} disabled={!userAnswer || showFeedback}>
            Limpar
          </Button>
          <Button onClick={handleSubmitAnswer} disabled={!userAnswer || showFeedback}>
            Enviar Resposta
          </Button>
        </CardFooter>
      </Card>

      {showFeedback && (
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
                  <div className="flex items-start gap-2">
                    <ThumbsUp className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Boa estrutura e clareza na explicação dos conceitos.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ThumbsUp className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Uso adequado de exemplos práticos para ilustrar o ponto.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Áreas de Melhoria</h3>
                  <div className="flex items-start gap-2">
                    <ThumbsDown className="h-5 w-5 text-red-500 mt-0.5" />
                    <p className="text-sm">Poderia aprofundar mais na explicação dos trade-offs envolvidos.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ThumbsDown className="h-5 w-5 text-red-500 mt-0.5" />
                    <p className="text-sm">Faltou mencionar como você comunicaria essas decisões aos stakeholders.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Sugestões</h3>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <p className="text-sm">
                      Considere utilizar o framework RICE (Reach, Impact, Confidence, Effort) para explicar sua
                      abordagem de priorização.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <p className="text-sm">
                      Mencione como você lidaria com feedback conflitante de diferentes stakeholders.
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium">Pontuação: 75/100</p>
                </div>
              </TabsContent>
              <TabsContent value="example">
                <div className="space-y-4">
                  <p className="text-sm">{questions[currentQuestion].example}</p>
                  <p className="text-sm">
                    "Para priorizar recursos em um roadmap com recursos limitados, eu utilizo uma combinação de
                    frameworks quantitativos e qualitativos. Começo com o framework RICE (Reach, Impact, Confidence,
                    Effort) para obter uma pontuação objetiva de cada item. Por exemplo, em meu último produto,
                    utilizamos RICE para priorizar 20 recursos e identificamos que melhorias na experiência de
                    onboarding teriam o maior impacto com esforço relativamente baixo.
                  </p>
                  <p className="text-sm">
                    Além disso, considero o feedback qualitativo dos clientes e alinhamento estratégico. Utilizo o
                    modelo Kano para identificar recursos que são básicos (must-have), de performance ou de
                    encantamento. Isso me ajuda a balancear o roadmap entre melhorias incrementais e inovações.
                  </p>
                  <p className="text-sm">
                    Quando há conflitos entre stakeholders, facilito workshops de priorização onde todos podem ver os
                    trade-offs envolvidos. Comunico as decisões finais com transparência, explicando os critérios
                    utilizados e como cada decisão se alinha aos objetivos estratégicos da empresa e às necessidades dos
                    clientes."
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

