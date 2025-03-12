"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Brain, Clock, BarChart3, Settings, Lightbulb } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Treinamento",
    href: "/training",
    icon: Lightbulb,
  },
  {
    title: "Simulação",
    href: "/simulation",
    icon: Clock,
  },
  {
    title: "Histórico",
    href: "/history",
    icon: Brain,
  },
  {
    title: "Progresso",
    href: "/progress",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <nav className="grid gap-1 px-2 py-3">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

