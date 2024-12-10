import { useState } from "react"
import { ClienteForm } from "@/components/ClienteForm"
import { AgendamentoCalendar } from "@/components/AgendamentoCalendar"
import { TimeSelector } from "@/components/TimeSelector"

const Agendamento = () => {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [showForm, setShowForm] = useState(false)

  const handleCancel = () => {
    setShowForm(false)
    setSelectedTime(undefined)
  }

  const handleSuccess = () => {
    setShowForm(false)
    setDate(undefined)
    setSelectedTime(undefined)
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
            <AgendamentoCalendar date={date} setDate={setDate} />
            <TimeSelector 
              date={date} 
              selectedTime={selectedTime} 
              setSelectedTime={(time) => {
                setSelectedTime(time)
                setShowForm(true)
              }} 
            />
          </div>

          {showForm && date && selectedTime && (
            <div className="mt-8">
              <ClienteForm
                date={date}
                time={selectedTime}
                onCancel={handleCancel}
                onSuccess={handleSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Agendamento