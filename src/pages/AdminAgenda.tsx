import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Agendamento {
  id: string
  data: string
  horario: string
  cliente: string
  servico: string
  whatsapp: string
  email: string
  status: string
  preco: string
}

export default function AdminAgenda() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth")
    if (!isAuth) {
      navigate("/admin-login")
      return
    }

    const loadAgendamentos = () => {
      const stored = localStorage.getItem("agendamentos")
      if (stored) {
        const parsed = JSON.parse(stored)
        const sorted = parsed.sort((a: Agendamento, b: Agendamento) => {
          const dateA = new Date(a.data + "T" + a.horario)
          const dateB = new Date(b.data + "T" + b.horario)
          return dateA.getTime() - dateB.getTime()
        })
        setAgendamentos(sorted)
      }
    }

    loadAgendamentos()
    const interval = setInterval(loadAgendamentos, 30000) // Atualiza a cada 30 segundos
    return () => clearInterval(interval)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    navigate("/admin-login")
  }

  const formatarData = (data: string) => {
    return format(new Date(data), "dd/MM/yyyy", { locale: ptBR })
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid gap-4">
          {agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className="bg-white p-4 rounded-lg shadow space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{agendamento.cliente}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatarData(agendamento.data)} às {agendamento.horario}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{agendamento.servico}</p>
                  <p className="text-sm text-muted-foreground">{agendamento.preco}</p>
                </div>
              </div>
              <div className="text-sm">
                <p>WhatsApp: {agendamento.whatsapp}</p>
                <p>Email: {agendamento.email}</p>
              </div>
            </div>
          ))}

          {agendamentos.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Nenhum agendamento encontrado
            </p>
          )}
        </div>
      </div>
    </div>
  )
}