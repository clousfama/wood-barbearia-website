import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-primary z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/lovable-uploads/3338070b-c9b2-434f-8537-243f2c0ee6bf.png" alt="Wood Barbearia" className="h-12" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-white hover:text-secondary transition-colors">Início</a>
            <a href="#servicos" className="text-white hover:text-secondary transition-colors">Serviços</a>
            <a href="#galeria" className="text-white hover:text-secondary transition-colors">Galeria</a>
            <a href="#horarios" className="text-white hover:text-secondary transition-colors">Horários</a>
            <a href="#avaliacoes" className="text-white hover:text-secondary transition-colors">Avaliações</a>
            <button 
              onClick={() => navigate("/agendamento")}
              className="bg-secondary text-primary px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              Agendar
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-down">
            <a href="#inicio" className="block text-white py-2 hover:text-secondary transition-colors">Início</a>
            <a href="#servicos" className="block text-white py-2 hover:text-secondary transition-colors">Serviços</a>
            <a href="#galeria" className="block text-white py-2 hover:text-secondary transition-colors">Galeria</a>
            <a href="#horarios" className="block text-white py-2 hover:text-secondary transition-colors">Horários</a>
            <a href="#avaliacoes" className="block text-white py-2 hover:text-secondary transition-colors">Avaliações</a>
            <button 
              onClick={() => navigate("/agendamento")}
              className="w-full bg-secondary text-primary px-6 py-2 rounded-md hover:bg-opacity-90 transition-all mt-2"
            >
              Agendar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};