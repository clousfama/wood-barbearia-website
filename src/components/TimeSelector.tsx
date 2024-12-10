import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState, useEffect } from "react"

interface TimeSelectorProps {
  date: Date | undefined;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

export function TimeSelector({ date, selectedTime, setSelectedTime }: TimeSelectorProps) {
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  useEffect(() => {
    if (date) {
      const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
      const selectedDateStr = date.toISOString();
      const bookedForDate = agendamentos
        .filter((ag: any) => ag.data === selectedDateStr)
        .map((ag: any) => ag.horario);
      setBookedTimes(bookedForDate);
    }
  }, [date]);

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">2. Selecione o horário</h2>
      <div className="grid grid-cols-2 gap-2">
        {date &&
          generateTimeSlots(date).map((time) => {
            const isBooked = bookedTimes.includes(time);
            return (
              <Button
                key={time}
                variant={selectedTime === time ? "secondary" : "outline"}
                onClick={() => !isBooked && setSelectedTime(time)}
                disabled={isBooked}
                className={`w-full ${isBooked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
              >
                {time}
                {isBooked && <span className="ml-2 text-xs">(Ocupado)</span>}
              </Button>
            );
          })}
      </div>
      {date && generateTimeSlots(date).length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          Não há horários disponíveis nesta data
        </p>
      )}
    </div>
  )
}