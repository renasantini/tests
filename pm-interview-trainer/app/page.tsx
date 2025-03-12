import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BrainCircuit, BarChart3, Clock, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BrainCircuit className="h-6 w-6" />
            <span>PM Interview Trainer</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Registrar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Prepare-se para entrevistas de Product Management com IA
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Treine para suas entrevistas com perguntas personalizadas, feedback em tempo real e análise
                    detalhada das suas respostas.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Começar agora
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Saiba mais
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col items-start gap-2 rounded-lg border p-4 shadow-sm">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-semibold">Perguntas com IA</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Perguntas geradas por IA baseadas em áreas-chave de Product Management.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 rounded-lg border p-4 shadow-sm">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-semibold">Análise de Respostas</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Feedback detalhado sobre suas respostas com sugestões de melhoria.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 rounded-lg border p-4 shadow-sm">
                    <Clock className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-semibold">Modo Simulação</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Entrevistas cronometradas simulando um ambiente real.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 rounded-lg border p-4 shadow-sm">
                    <BarChart3 className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-semibold">Dashboard de Progresso</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Acompanhe sua evolução e identifique áreas de melhoria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 PM Interview Trainer. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Termos
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

