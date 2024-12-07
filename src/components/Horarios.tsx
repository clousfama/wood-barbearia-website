export const Horarios = () => {
  const horarios = [
    { dia: "Segunda-Feira", horario: "Fechado" },
    { dia: "Terça-Feira", horario: "10:00 - 20:00" },
    { dia: "Quarta-Feira", horario: "10:00 - 20:00" },
    { dia: "Quinta-Feira", horario: "10:00 - 20:00" },
    { dia: "Sexta-Feira", horario: "10:00 - 20:00" },
    { dia: "Sábado", horario: "09:00 - 18:00" },
    { dia: "Domingo", horario: "Fechado" },
  ];

  return (
    <section id="horarios" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Horário de Funcionamento
        </h2>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 animate-fade-up">
          {horarios.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <span className="font-medium text-primary">{item.dia}</span>
              <span className="text-secondary font-semibold">{item.horario}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};