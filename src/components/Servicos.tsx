export const Servicos = () => {
  const servicos = [
    { nome: "Corte", preco: "R$ 35,00" },
    { nome: "Barba", preco: "R$ 25,00" },
    { nome: "Pezinho", preco: "R$ 10,00" },
    { nome: "Sombrancelha", preco: "R$ 10,00" },
    { nome: "Corte + Barba", preco: "R$ 55,00" },
    { nome: "Corte + Hidratação", preco: "R$ 75,00" },
    { nome: "Pintura", preco: "R$ 35,00" },
    { nome: "Progressiva", preco: "a partir de R$ 70,00" },
    { nome: "Luzes", preco: "R$ 70,00" },
    { nome: "Platinado", preco: "a partir de R$ 160,00" },
  ];

  return (
    <section id="servicos" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Nossos Serviços
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico) => (
            <div
              key={servico.nome}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">{servico.nome}</h3>
              <p className="text-2xl font-bold text-secondary">{servico.preco}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};