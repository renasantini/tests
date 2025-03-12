import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Treinamento</h2>
        <p className="text-muted-foreground">Pratique com perguntas de entrevista e receba feedback detalhado.</p>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="difficulty">Dificuldade</TabsTrigger>
          <TabsTrigger value="custom">Personalizado</TabsTrigger>
        </TabsList>
        <TabsContent value="categories" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Estratégia de Produto",
                description: "Visão, roadmap, posicionamento e diferenciação",
                questions: 24,
              },
              {
                title: "Análise de Dados",
                description: "Métricas, KPIs, experimentação e tomada de decisão",
                questions: 18,
              },
              {
                title: "Metodologias Ágeis",
                description: "Scrum, Kanban, sprints e gerenciamento de backlog",
                questions: 15,
              },
              {
                title: "Priorização",
                description: "Frameworks, trade-offs e alocação de recursos",
                questions: 20,
              },
              {
                title: "Liderança",
                description: "Colaboração, influência e gerenciamento de stakeholders",
                questions: 16,
              },
              {
                title: "Comunicação",
                description: "Apresentações, storytelling e documentação",
                questions: 12,
              },
            ].map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{category.questions} perguntas disponíveis</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/training/${category.title.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
                    <Button className="w-full">Iniciar</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="difficulty" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Iniciante",
                description: "Perguntas básicas para quem está começando",
                questions: 30,
              },
              {
                title: "Intermediário",
                description: "Perguntas para quem já tem alguma experiência",
                questions: 45,
              },
              {
                title: "Avançado",
                description: "Perguntas desafiadoras para profissionais experientes",
                questions: 30,
              },
            ].map((level, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{level.title}</CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{level.questions} perguntas disponíveis</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/training/difficulty/${level.title.toLowerCase()}`} className="w-full">
                    <Button className="w-full">Iniciar</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="custom" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Treinamento Personalizado</CardTitle>
              <CardDescription>Crie uma sessão de treinamento com base nas suas preferências</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selecione categorias, nível de dificuldade e número de perguntas para criar uma sessão personalizada.
              </p>
              <Button>Criar Sessão Personalizada</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

