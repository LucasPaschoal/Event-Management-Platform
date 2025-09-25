import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { User } from "../types";

interface StudentRegistrationFormProps {
  onSubmit: (userData: Omit<User, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function StudentRegistrationForm({ onSubmit, onCancel }: StudentRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    campus: '',
    course: ''
  });

  const campusOptions = ['Bom Jesus do Itabapoana', 'Cambuci', 'Itaperuna', 'Santo Antônio de Pádua'];
  const courseOptions = [
    'Administração', 'Eletrotécnica', 'Informática', 'Química', 'Mecânica', 
    'Automação Industrial', 'Sistemas de Informação', 'Engenharia Mecânica', 'Licenciatura em Química'
  ];

  const validateEmail = (email: string) => {
    // Verifica se é um email institucional
    const institutionalDomains = ['universidade.edu.br', 'ufx.edu.br', '@edu.br'];
    return institutionalDomains.some(domain => email.toLowerCase().includes(domain));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      alert('Por favor, utilize um e-mail institucional da universidade.');
      return;
    }
    
    const userData = {
      name: formData.name,
      email: formData.email,
      campus: formData.campus,
      course: formData.course,
      type: 'aluno' as const
    };
    
    onSubmit(userData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail Institucional</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="seu.email@universidade.edu.br"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use seu e-mail institucional da universidade
            </p>
          </div>

          <div>
            <Label htmlFor="campus">Campus</Label>
            <Select value={formData.campus} onValueChange={(value) => setFormData(prev => ({ ...prev, campus: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu campus" />
              </SelectTrigger>
              <SelectContent>
                {campusOptions.map(campus => (
                  <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="course">Curso</Label>
            <Select value={formData.course} onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu curso" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Criar Cadastro
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}