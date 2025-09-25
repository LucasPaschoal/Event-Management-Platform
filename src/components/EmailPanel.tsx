import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Send, Users, Mail } from "lucide-react";
import { Event, User } from "../types";
import { toast } from "sonner@2.0.3";

interface EmailPanelProps {
  events: Event[];
  users: User[];
}

export function EmailPanel({ events, users }: EmailPanelProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedUserType, setSelectedUserType] = useState<string>('all');
  const [customRecipients, setCustomRecipients] = useState<string[]>([]);

  const campusOptions = ['all', ...new Set(users.map(u => u.campus))];
  const courseOptions = ['all', ...new Set(users.filter(u => u.course).map(u => u.course!))];

  // Filtrar usuários baseado nas seleções
  const getFilteredUsers = () => {
    return users.filter(user => {
      if (selectedCampus !== 'all' && user.campus !== selectedCampus) return false;
      if (selectedUserType !== 'all' && user.type !== selectedUserType) return false;
      if (selectedCourse !== 'all' && user.course !== selectedCourse) return false;
      return true;
    });
  };

  const filteredUsers = getFilteredUsers();

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSubject(`Convite: ${event.title}`);
      setMessage(`Olá!

Você está convidado(a) para o evento "${event.title}".

📅 Data: ${new Date(event.date).toLocaleDateString('pt-BR')}
🕐 Horário: ${event.time}
📍 Local: ${event.location}

${event.description}

Responsável: ${event.responsible}

Não perca essa oportunidade!

Atenciosamente,
Equipe de Eventos`);
    }
  };

  const handleSendEmail = () => {
    const recipients = customRecipients.length > 0 ? customRecipients : filteredUsers.map(u => u.email);
    
    if (recipients.length === 0) {
      toast.error('Nenhum destinatário selecionado');
      return;
    }

    if (!subject.trim() || !message.trim()) {
      toast.error('Assunto e mensagem são obrigatórios');
      return;
    }

    // Simular envio de email
    setTimeout(() => {
      toast.success(`Email enviado com sucesso para ${recipients.length} destinatário(s)!`);
      
      // Resetar formulário
      setSelectedEvent('');
      setSubject('');
      setMessage('');
      setCustomRecipients([]);
    }, 1000);
  };

  const handleRecipientToggle = (email: string, checked: boolean) => {
    setCustomRecipients(prev => 
      checked 
        ? [...prev, email]
        : prev.filter(e => e !== email)
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seleção de Evento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Configurar Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Evento (opcional)</Label>
              <Select value={selectedEvent} onValueChange={handleEventSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um evento para divulgar" />
                </SelectTrigger>
                <SelectContent>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title} - {new Date(event.date).toLocaleDateString('pt-BR')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subject">Assunto</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Digite o assunto do email"
              />
            </div>

            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                placeholder="Digite a mensagem do email"
              />
            </div>
          </CardContent>
        </Card>

        {/* Seleção de Destinatários */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Destinatários
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Selecione os filtros para definir os destinatários
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCampus('all');
                  setSelectedCourse('all');
                  setSelectedUserType('all');
                }}
              >
                Limpar Filtros
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Campus</Label>
                <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Campus</SelectItem>
                    {campusOptions.slice(1).map(campus => (
                      <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tipo de Usuário</Label>
                <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="aluno">Apenas Alunos</SelectItem>
                    <SelectItem value="professor">Apenas Professores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Curso</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Cursos</SelectItem>
                    {courseOptions.slice(1).length > 0 ? (
                      courseOptions.slice(1).map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>Nenhum curso cadastrado</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <Label>Usuários Selecionados</Label>
                <Badge variant="secondary">
                  {customRecipients.length || filteredUsers.length} destinatário(s)
                </Badge>
              </div>
              
              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredUsers.map(user => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={user.id}
                      checked={customRecipients.length === 0 || customRecipients.includes(user.email)}
                      onCheckedChange={(checked) => handleRecipientToggle(user.email, checked as boolean)}
                    />
                    <Label htmlFor={user.id} className="flex-1 text-sm">
                      {user.name} ({user.email})
                      <Badge variant="outline" className="ml-2">
                        {user.course || user.area || (user.type === 'aluno' ? 'Aluno' : 'Professor')}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Envio */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Enviar para {customRecipients.length || filteredUsers.length} destinatário(s)
              </p>
              <p className="text-sm text-muted-foreground">
                Assunto: {subject || 'Sem assunto'}
              </p>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  size="lg"
                  disabled={!subject.trim() || !message.trim() || (customRecipients.length === 0 && filteredUsers.length === 0)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
              </AlertDialogTrigger>
              
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Envio</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja enviar este email para {customRecipients.length || filteredUsers.length} destinatário(s)?
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSendEmail}>
                    Confirmar Envio
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}