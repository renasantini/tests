import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Seu Progresso</h2>
        <p className="text-muted-foreground">Acompanhe sua evolução e identifique áreas de melhoria.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pontuação Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% desde o mês passado</p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[78%] bg-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sessões Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8 desde o mês passado</p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[60%] bg-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tempo Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12h 45m</div>
                <p className="text-xs text-muted-foreground">+3h 20m desde o mês passado</p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[45%] bg-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Perguntas Respondidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">+32 desde o mês passado</p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[70%] bg-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Evolução da Pontuação</CardTitle>
                <CardDescription>Sua pontuação média ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Gráfico de Linha
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Áreas de Conhecimento</CardTitle>
                <CardDescription>Seu desempenho nas diferentes áreas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Estratégia de Produto", score: 85 },
                    { name: "Análise de Dados", score: 72 },
                    { name: "Metodologias Ágeis", score: 78 },
                    { name: "Priorização", score: 80 },
                    { name: "Liderança", score: 75 },
                    { name: "Comunicação", score: 82 },
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-medium">{skill.score}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${skill.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="skills" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Habilidades Detalhadas</CardTitle>
              <CardDescription>Análise detalhada das suas habilidades em Product Management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Gráfico de Radar Detalhado
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Sessões</CardTitle>
              <CardDescription>Detalhes de todas as suas sessões de treinamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Tabela de Histórico
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

