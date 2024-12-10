import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { FormData, ClienteFormProps } from "@/types/agendamento"
import { FormFields } from "./FormFields"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const value = typeof e === "string" ? e : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      
      const whatsappRegex = /^[0-9]{10,11}$/
      if (!whatsappRegex.test(formData.whatsapp)) {
        toast.error("Número de WhatsApp inválido. Por favor, insira um número válido com DDD (apenas números).")
        return
      }

      if (Object.values(formData).some((value) => !value)) {
        toast.error("Por favor, preencha todos os campos.")
        return
      }

      const saved = saveAgendamento(formData)
      if (!saved) {
        throw new Error('Falha ao salvar agendamento')
      }

      setShowConfirmation(true)
      onSuccess()

    } catch (error) {
      console.error('Erro ao fazer agendamento:', error)
      toast.error("Ocorreu um erro ao fazer seu agendamento. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatarData = (data: string) => {
    return format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  return (
    <>
      <form 
        onSubmit={onSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        <FormFields formData={formData} handleChange={handleChange} />
        
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

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agendamento Confirmado!</DialogTitle>
            <DialogDescription className="space-y-4 pt-4 text-base">
              <p className="font-medium text-gray-900">
                Prezado(a) {formData.nome},
              </p>
              <p>
                Seu agendamento foi confirmado com sucesso:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Serviço:</span> {formData.servico}</p>
                <p><span className="font-medium">Data:</span> {formatarData(formData.data)}</p>
                <p><span className="font-medium">Horário:</span> {formData.horario}</p>
                <p><span className="font-medium">WhatsApp:</span> {formData.whatsapp}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Você receberá uma confirmação por WhatsApp em breve.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-primary hover:bg-primary/90"
            >
              Voltar para a página inicial
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}