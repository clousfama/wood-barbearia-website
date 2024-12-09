import { servicos } from "@/data/servicos";

export const Servicos = () => {
  return (
    <section id="servicos" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Nossos Serviços
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico) => (
            <div
              key={servico.nome}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{servico.nome}</h3>
              <p className="text-2xl font-extrabold text-secondary">{servico.preco}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};