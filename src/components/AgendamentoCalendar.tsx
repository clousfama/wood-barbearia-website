import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface AgendamentoCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function AgendamentoCalendar({ date, setDate }: AgendamentoCalendarProps) {
  return (
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
  )
}