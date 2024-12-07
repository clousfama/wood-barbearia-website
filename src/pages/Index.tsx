import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Servicos } from "@/components/Servicos";
import { Galeria } from "@/components/Galeria";
import { Horarios } from "@/components/Horarios";
import { Avaliacoes } from "@/components/Avaliacoes";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Servicos />
      <Galeria />
      <Horarios />
      <Avaliacoes />
    </div>
  );
};

export default Index;