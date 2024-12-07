import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin-agenda');
        } else {
            setError('Senha incorreta');
            toast({
                title: "Erro no login",
                description: "Senha incorreta. Tente novamente.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center">Acesso Administrativo</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Senha de administrador"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
