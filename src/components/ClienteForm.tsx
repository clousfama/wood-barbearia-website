import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { servicos } from "@/data/servicos"
import { ClienteFormProps, FormData } from "@/types/agendamento"

const initialFormData: FormData = {
  nome: "",
  whatsapp: "",
  email: "",
  servico: "",
  data: "",
  horario: "",
}

const saveAgendamento = (formData: FormData) => {
  try {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
    const novoAgendamento = {
      id: Date.now().toString(),
      data: formData.data,
      horario: formData.horario,
      cliente: formData.nome,
      servico: formData.servico,
      whatsapp: formData.whatsapp,
      email: formData.email,
      status: 'pendente'
    }
    agendamentos.push(novoAgendamento)
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    return true
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error)
    return false
  }
}

export function ClienteForm({ date, time, onCancel, onSuccess }: ClienteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    data: date.toISOString(),
    horario: time
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const value = typeof e === "string" ? e : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (data: FormData) => {
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

      const saved = saveAgendamento(formData)
      if (!saved) {
        throw new Error('Falha ao salvar agendamento')
      }

      // Mostra dialog de sucesso
      setSuccessDialogOpen(true)
      
      // Limpa o form
      setFormData({
        ...initialFormData,
        data: date.toISOString(),
        horario: time
      })
      
      setIsSubmitting(false)
      
      // Chama callback de sucesso
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Erro ao agendar",
        description: "Ocorreu um erro ao fazer seu agendamento. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }} 
        className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
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
            // Permite apenas números
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
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-base font-semibold"
          >
            {isSubmitting ? "Confirmando..." : "Confirmar Agendamento"}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 border-gray-300 h-14 text-base"
          >
            Cancelar
          </Button>
        </div>
      </form>

      {/* Modal de sucesso */}
      {successDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Agendamento Confirmado! 🎉</h2>
            <div className="space-y-2 text-lg">
              <p><strong>Nome:</strong> {formData.nome}</p>
              <p><strong>Data:</strong> {new Date(formData.data).toLocaleDateString()}</p>
              <p><strong>Horário:</strong> {formData.horario}</p>
              <p><strong>Serviço:</strong> {formData.servico}</p>
            </div>
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={() => setSuccessDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}