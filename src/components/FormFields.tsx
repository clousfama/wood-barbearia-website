import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { servicos } from "@/data/servicos";
import { FormData } from "@/types/agendamento";

interface FormFieldsProps {
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}

export const FormFields = ({ formData, handleChange }: FormFieldsProps) => {
  return (
    <>
      <Input
        placeholder="Nome completo"
        value={formData.nome}
        onChange={handleChange("nome")}
        required
        className="bg-white border-gray-300 text-gray-900 h-14 text-base"
      />
      <Input
        placeholder="WhatsApp com DDD (apenas números)"
        value={formData.whatsapp}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          handleChange("whatsapp")(value);
        }}
        required
        type="tel"
        pattern="[0-9]*"
        maxLength={11}
        className="bg-white border-gray-300 text-gray-900 h-14 text-base"
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange("email")}
        required
        className="bg-white border-gray-300 text-gray-900 h-14 text-base"
      />
      <Select 
        value={formData.servico} 
        onValueChange={handleChange("servico")} 
        required
      >
        <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 h-14">
          <SelectValue placeholder="Selecione o serviço" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {servicos.map((servico) => (
            <SelectItem 
              key={servico.nome} 
              value={servico.nome}
              className="text-gray-900 hover:bg-gray-100 cursor-pointer py-4 text-base"
            >
              {servico.nome} - {servico.preco}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};