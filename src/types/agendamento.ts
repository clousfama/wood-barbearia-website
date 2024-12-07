export interface Servico {
  nome: string
  preco: string
}

export interface ClienteFormProps {
  date: Date
  time: string
  onCancel: () => void
  onSuccess: () => void
}

export interface FormData {
  nome: string
  whatsapp: string
  email: string
  servico: string
}