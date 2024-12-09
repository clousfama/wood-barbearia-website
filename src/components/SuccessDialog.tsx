import { Button } from "@/components/ui/button";
import { FormData } from "@/types/agendamento";

interface SuccessDialogProps {
  formData: FormData;
  onClose: () => void;
}

export const SuccessDialog = ({ formData, onClose }: SuccessDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Agendamento Confirmado! 🎉</h2>
        <div className="space-y-2 text-lg">
          <p><strong>Nome:</strong> {formData.nome}</p>
          <p><strong>Data:</strong> {new Date(formData.data).toLocaleDateString()}</p>
          <p><strong>Horário:</strong> {formData.horario}</p>
          <p><strong>Serviço:</strong> {formData.servico}</p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};