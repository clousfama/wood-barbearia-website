export const Avaliacoes = () => {
  const avaliacoes = [
    {
      nome: "Davi Queiroz",
      foto: "/lovable-uploads/0d749ae7-9b3f-42b8-a7c6-ac70399ab5b8.png",
      nota: 5,
      data: "04/05/24",
      comentario: "Excelente atendimento e profissionais qualificados!"
    },
    {
      nome: "Lucas Silva",
      foto: "/lovable-uploads/3338070b-c9b2-434f-8537-243f2c0ee6bf.png",
      nota: 5,
      data: "02/05/24",
      comentario: "O ambiente é super acolhedor e o trabalho é impecável. Sempre saio satisfeito!"
    },
    {
      nome: "Pedro Santos",
      foto: "/lovable-uploads/3992e9a7-9d7e-47f6-a3b7-ee7cad4e9b90.png",
      nota: 5,
      data: "01/05/24",
      comentario: "Profissional muito atencioso e dedicado. O corte ficou exatamente como eu queria!"
    },
    {
      nome: "João Oliveira",
      foto: "/lovable-uploads/99356d22-cfac-49e8-a243-4902525e1ccf.png",
      nota: 5,
      data: "30/04/24",
      comentario: "Ótimo ambiente, música boa e um atendimento de primeira. Recomendo!"
    }
  ];

  return (
    <section id="avaliacoes" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Avaliações dos Clientes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avaliacoes.map((avaliacao, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg animate-fade-up"
            >
              <div className="flex items-center mb-4">
                <img
                  src={avaliacao.foto}
                  alt={avaliacao.nome}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-primary">{avaliacao.nome}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < avaliacao.nota ? "text-secondary" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-sm text-gray-500">{avaliacao.data}</span>
              </div>
              <p className="text-gray-600">{avaliacao.comentario}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 text-center text-white">
        <p className="text-lg">Rua Pinto Alves, 596 - Vila Santa Cecília</p>
        <p className="text-lg">Lagoa Santa/MG - CEP: 33230-222</p>
        <p className="text-lg mt-2">Telefone: (31) 99298-4248</p>
      </div>
    </section>
  );
};