export interface Servico {
  nome: string;
  preco: string;
}

export interface ClienteFormProps {
  date: Date;
  time: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export interface FormData {
  nome: string;
  whatsapp: string;
  email: string;
  servico: string;
  data: string;
  horario: string;
}

export interface Agendamento {
  id: string;
  data: string;
  horario: string;
  cliente: string;
  servico: string;
  whatsapp: string;
  email: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
  preco?: string; // Added the preco property as optional
}