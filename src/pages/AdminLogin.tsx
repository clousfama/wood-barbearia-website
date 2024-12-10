import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      navigate("/admin-agenda")
    } else {
      toast.error("Senha incorreta!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Área Administrativa</h2>
          <p className="text-muted-foreground mt-2">Digite a senha para acessar</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="h-12"
          />
          <Button type="submit" className="w-full h-12">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}