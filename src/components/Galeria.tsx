export const Galeria = () => {
  const imagens = [
    {
      src: "/lovable-uploads/3992e9a7-9d7e-47f6-a3b7-ee7cad4e9b90.png",
      alt: "Interior da Barbearia 1"
    },
    {
      src: "/lovable-uploads/99356d22-cfac-49e8-a243-4902525e1ccf.png",
      alt: "Interior da Barbearia 2"
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Conheça Nosso Espaço
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imagens.map((imagem, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-xl animate-fade-up"
              style={{ height: "400px" }}
            >
              <img
                src={imagem.src}
                alt={imagem.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};