"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Play, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SimulationPage() {
  const [duration, setDuration] = useState(30)
  const [difficulty, setDifficulty] = useState("intermediário")
  const [categories, setCategories] = useState<string[]>([])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Simulação de Entrevista</h2>
        <p className="text-muted-foreground">Simule uma entrevista real com perguntas cronometradas e sem dicas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Entrevista Completa</CardTitle>
            <CardDescription>Simulação de uma entrevista completa com múltiplas perguntas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Duração:</span>
              <span className="text-sm">45-60 minutos</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Perguntas:</span>
              <span className="text-sm">8-10 perguntas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dificuldade:</span>
              <span className="text-sm">Variada</span>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configurar Simulação</DialogTitle>
                  <DialogDescription>Personalize sua simulação de entrevista completa</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="difficulty" className="text-right">
                      Dificuldade
                    </Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione a dificuldade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iniciante">Iniciante</SelectItem>
                        <SelectItem value="intermediário">Intermediário</SelectItem>
                        <SelectItem value="avançado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">
                      Duração (min)
                    </Label>
                    <div className="col-span-3 flex items-center gap-4">
                      <Slider
                        id="duration"
                        min={15}
                        max={60}
                        step={5}
                        value={[duration]}
                        onValueChange={(value) => setDuration(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{duration}</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Iniciar Simulação</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entrevista Rápida</CardTitle>
            <CardDescription>Simulação curta focada em perguntas específicas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Duração:</span>
              <span className="text-sm">15-20 minutos</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Perguntas:</span>
              <span className="text-sm">3-5 perguntas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dificuldade:</span>
              <span className="text-sm">Personalizada</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Iniciar
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulação Personalizada</CardTitle>
            <CardDescription>Crie uma simulação com suas próprias configurações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[88px] items-center justify-center">
              <Settings className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Configurar
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium">Histórico de Simulações</h3>
        <Separator className="my-4" />
        <div className="space-y-4">
          {[
            {
              date: "10 de Março, 2025",
              duration: "45 minutos",
              questions: 8,
              score: "72%",
            },
            {
              date: "28 de Fevereiro, 2025",
              duration: "30 minutos",
              questions: 6,
              score: "68%",
            },
            {
              date: "15 de Fevereiro, 2025",
              duration: "60 minutos",
              questions: 10,
              score: "65%",
            },
          ].map((simulation, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="font-medium">{simulation.date}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {simulation.duration} • {simulation.questions} perguntas
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-lg font-bold">{simulation.score}</div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

