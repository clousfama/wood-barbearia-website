import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Phone, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isAuthenticated, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"

interface Agendamento {
  id: string
  data: string
  horario: string
  cliente: string
  servico: string
  preco: string
  whatsapp: string
  email: string
  status: string
}

const AdminAgenda = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin-login');
      return;
    }

    const loadAgendamentos = () => {
      try {
        const storedAgendamentos = localStorage.getItem('agendamentos');
        console.log('Dados brutos do localStorage:', storedAgendamentos); // Debug
        if (storedAgendamentos) {
          const parsedAgendamentos = JSON.parse(storedAgendamentos);
          console.log('Agendamentos carregados:', parsedAgendamentos); // Debug
          setAgendamentos(parsedAgendamentos);
        }
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      }
    };

    loadAgendamentos();
    const interval = setInterval(loadAgendamentos, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const formatarData = (dataString: string) => {
    try {
      return format(parseISO(dataString), "dd 'de' MMMM", { locale: ptBR });
    } catch (error) {
      console.error('Erro ao formatar data:', dataString, error);
      return 'Data inválida';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Agenda de Agendamentos</h1>
              <p className="text-muted-foreground">
                Total de agendamentos: {agendamentos.length}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          {agendamentos.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Nenhum agendamento encontrado.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {agendamentos
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                .map((agendamento) => (
                  <Card key={agendamento.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>
                          {formatarData(agendamento.data)} - {agendamento.horario}
                        </span>
                        <a 
                          href={`https://wa.me/${agendamento.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700"
                        >
                          <Phone className="h-5 w-5" />
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="font-semibold">Cliente:</p>
                            <p>{agendamento.cliente}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Serviço:</p>
                            <p>{agendamento.servico}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="font-semibold">WhatsApp:</p>
                            <p>{agendamento.whatsapp}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Email:</p>
                            <p>{agendamento.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="font-semibold">Serviço:</p>
                            <p>{agendamento.servico}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Valor:</p>
                            <p className="text-green-600 font-medium">{agendamento.preco}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAgenda;