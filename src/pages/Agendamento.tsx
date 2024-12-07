import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { servicos } from "@/data/servicos"

interface FormData {
  nome: string
  whatsapp: string
  email: string
  servico: string
}

const initialFormData: FormData = {
  nome: "",
  whatsapp: "",
  email: "",
  servico: "",
}

const Agendamento = () => {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [confirmedData, setConfirmedData] = useState<{
    nome: string;
    data: string;
    horario: string;
    servico: string;
    preco: string;
  } | null>(null)

  const generateTimeSlots = (selectedDate: Date) => {
    const slots = []
    const dayOfWeek = format(selectedDate, "EEEE", { locale: ptBR })
    
    let startHour = 10 // Padrão para dias úteis
    let endHour = 20
    
    if (dayOfWeek === "sábado") {
      startHour = 9
      endHour = 18
    } else if (["domingo", "segunda-feira"].includes(dayOfWeek)) {
      return [] // Fechado
    }

    let currentTime = startHour * 60
    const endTime = endHour * 60

    while (currentTime < endTime) {
      const hours = Math.floor(currentTime / 60)
      const minutes = currentTime % 60
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
      slots.push(timeString)
      currentTime += 40
    }

    return slots
  }

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const value = typeof e === "string" ? e : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !selectedTime) return

    try {
      setIsSubmitting(true)
      
      // Validar o número do WhatsApp (10 ou 11 dígitos)
      const whatsappRegex = /^[0-9]{10,11}$/
      if (!whatsappRegex.test(formData.whatsapp)) {
        toast({
          title: "Número de WhatsApp inválido",
          description: "Por favor, insira um número válido com DDD (apenas números).",
          variant: "destructive",
        })
        return
      }

      if (Object.values(formData).some((value) => !value)) {
        toast({
          title: "Erro no formulário",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        })
        return
      }

      // Salvar agendamento
      const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
      const servicoSelecionado = servicos.find(s => s.nome === formData.servico)
      const novoAgendamento = {
        id: Date.now().toString(),
        data: date.toISOString(),
        horario: selectedTime,
        cliente: formData.nome,
        servico: formData.servico,
        preco: servicoSelecionado?.preco || 'Preço não disponível',
        whatsapp: formData.whatsapp,
        email: formData.email,
        status: 'pendente'
      }
      agendamentos.push(novoAgendamento)
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos))

      // Salvar dados confirmados antes de limpar o form
      setConfirmedData({
        nome: formData.nome,
        data: date.toLocaleDateString(),
        horario: selectedTime,
        servico: formData.servico,
        preco: servicoSelecionado?.preco || 'Preço não disponível'
      })

      // Mostrar sucesso
      setSuccess(true)
      
      // Limpar form
      setFormData(initialFormData)
      setDate(undefined)
      setSelectedTime(undefined)
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Erro ao agendar",
        description: "Ocorreu um erro ao fazer seu agendamento. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  if (success && confirmedData) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Agendamento Confirmado! 🎉</h2>
            <div className="space-y-2 text-lg text-left mb-6">
              <p><strong>Nome:</strong> {confirmedData.nome}</p>
              <p><strong>Data:</strong> {confirmedData.data}</p>
              <p><strong>Horário:</strong> {confirmedData.horario}</p>
              <p><strong>Serviço:</strong> {confirmedData.servico}</p>
              <p><strong>Preço:</strong> {confirmedData.preco}</p>
            </div>
            <Button 
              onClick={() => {
                setSuccess(false)
                setConfirmedData(null)
              }}
              className="w-full"
            >
              Fazer Novo Agendamento
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <img
              src="/lovable-uploads/a50c34aa-f18d-48d9-ab36-1fb438d7d1fa.png"
              alt="Wood Barbearia"
              className="h-24 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-primary mb-2">Agende seu horário</h1>
            <p className="text-muted-foreground">
              Escolha a data e horário de sua preferência
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">1. Selecione a data</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                disabled={(date) => {
                  const day = format(date, "EEEE", { locale: ptBR })
                  return ["domingo", "segunda-feira"].includes(day) || date < new Date()
                }}
                className="rounded-md border"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">2. Selecione o horário</h2>
              <div className="grid grid-cols-2 gap-2">
                {date &&
                  generateTimeSlots(date).map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "secondary" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="w-full"
                    >
                      {time}
                    </Button>
                  ))}
              </div>
              {date && generateTimeSlots(date).length === 0 && (
                <p className="text-center text-muted-foreground mt-4">
                  Não há horários disponíveis nesta data
                </p>
              )}
            </div>

            {date && selectedTime && (
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">3. Complete seus dados</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Nome completo"
                    value={formData.nome}
                    onChange={handleChange("nome")}
                    required
                    className="bg-white border-gray-300 text-gray-900 h-14 text-base"
                  />
                  <Input
                    placeholder="WhatsApp com DDD (apenas números)"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      handleChange("whatsapp")(value)
                    }}
                    required
                    type="tel"
                    pattern="[0-9]*"
                    maxLength={11}
                    className="bg-white border-gray-300 text-gray-900 h-14 text-base"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    required
                    className="bg-white border-gray-300 text-gray-900 h-14 text-base"
                  />
                  <Select 
                    value={formData.servico} 
                    onValueChange={handleChange("servico")} 
                    required
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 h-14">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {servicos.map((servico) => (
                        <SelectItem 
                          key={servico.nome} 
                          value={servico.nome}
                          className="text-gray-900 hover:bg-gray-100 cursor-pointer py-4 text-base"
                        >
                          {servico.nome} - {servico.preco}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-base font-semibold"
                  >
                    {isSubmitting ? "Confirmando..." : "Confirmar Agendamento"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agendamento