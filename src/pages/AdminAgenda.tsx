import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format, parseISO, isSameMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Phone, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isAuthenticated, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { servicos } from "@/data/servicos"
import { Agendamento } from "@/types/agendamento"

const AdminAgenda = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin-login');
      return;
    }

    const loadAgendamentos = () => {
      try {
        const storedAgendamentos = localStorage.getItem('agendamentos');
        if (storedAgendamentos) {
          const parsedAgendamentos = JSON.parse(storedAgendamentos);
          const agendamentosComPreco = parsedAgendamentos.map((ag: Agendamento) => {
            const servicoEncontrado = servicos.find(s => s.nome === ag.servico);
            return {
              ...ag,
              preco: servicoEncontrado?.preco || 'Não definido'
            };
          });
          setAgendamentos(agendamentosComPreco);
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

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const filteredAgendamentos = agendamentos.filter(agendamento => {
    const agendamentoDate = parseISO(agendamento.data);
    return isSameMonth(agendamentoDate, currentDate);
  });

  const currentMonthYear = format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Agenda de Agendamentos</h1>
              <p className="text-muted-foreground">
                Total de agendamentos no mês: {filteredAgendamentos.length}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-xl font-semibold capitalize">
                  {currentMonthYear}
                </CardTitle>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredAgendamentos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum agendamento encontrado para este mês.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Contato</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAgendamentos
                        .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                        .map((agendamento) => (
                          <TableRow key={agendamento.id}>
                            <TableCell>{formatarData(agendamento.data)}</TableCell>
                            <TableCell>{agendamento.horario}</TableCell>
                            <TableCell>{agendamento.cliente}</TableCell>
                            <TableCell>{agendamento.servico}</TableCell>
                            <TableCell className="text-green-600 font-medium">
                              {agendamento.preco}
                            </TableCell>
                            <TableCell>
                              <a
                                href={`https://wa.me/${agendamento.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-green-600 hover:text-green-700"
                              >
                                <Phone className="h-4 w-4 mr-1" />
                                WhatsApp
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAgenda;