import { useState } from "react";
import { Calendar, Users, Mail, Settings, Plus, Filter, Search, GraduationCap, BookOpen, UserPlus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { EventCard } from "./components/EventCard";
import { EventForm } from "./components/EventForm";
import { UserForm } from "./components/UserForm";
import { StudentRegistrationForm } from "./components/StudentRegistrationForm";
import { EmailPanel } from "./components/EmailPanel";
import { mockEvents, mockUsers } from "./data/mockData";
import { Event, User } from "./types";
import { toast } from "sonner@2.0.3";

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [users, setUsers] = useState<User[]>(mockUsers);
  
  // Estados para filtros na página pública
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  
  // Estados para modais e formulários
  const [showEventForm, setShowEventForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showStudentRegistration, setShowStudentRegistration] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [selectedEventDetail, setSelectedEventDetail] = useState<Event | undefined>();

  // Filtros únicos para dropdowns
  const campusOptions = ['all', ...new Set(events.map(e => e.campus))];
  const categoryOptions = ['all', ...new Set(events.map(e => e.category))];
  const audienceOptions = ['all', 'Alunos', 'Professores', 'Comunidade', 'Funcionários'];

  // Filtrar eventos para página pública
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampus = selectedCampus === 'all' || event.campus === selectedCampus;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesAudience = selectedAudience === 'all' || event.targetAudience.includes(selectedAudience);
    const isFuture = new Date(event.date) >= new Date();
    
    return matchesSearch && matchesCampus && matchesCategory && matchesAudience && isFuture;
  });

  // Handlers para eventos
  const handleCreateEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    setEvents(prev => [newEvent, ...prev]);
    setShowEventForm(false);
    setEditingEvent(undefined);
    toast.success('Evento criado com sucesso!');
  };

  const handleUpdateEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    if (!editingEvent) return;
    
    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id 
        ? { ...eventData, id: editingEvent.id, createdAt: editingEvent.createdAt }
        : event
    ));
    setShowEventForm(false);
    setEditingEvent(undefined);
    toast.success('Evento atualizado com sucesso!');
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast.success('Evento removido com sucesso!');
  };

  // Handlers para usuários
  const handleCreateUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [newUser, ...prev]);
    setShowUserForm(false);
    setEditingUser(undefined);
    toast.success('Usuário criado com sucesso!');
  };

  const handleUpdateUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    if (!editingUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === editingUser.id 
        ? { ...userData, id: editingUser.id, createdAt: editingUser.createdAt }
        : user
    ));
    setShowUserForm(false);
    setEditingUser(undefined);
    toast.success('Usuário atualizado com sucesso!');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success('Usuário removido com sucesso!');
  };

  // Handler para cadastro público de alunos
  const handleStudentRegistration = (userData: Omit<User, 'id' | 'createdAt'>) => {
    // Verificar se email já existe
    const emailExists = users.some(user => user.email.toLowerCase() === userData.email.toLowerCase());
    
    if (emailExists) {
      toast.error('Este e-mail já está cadastrado na plataforma!');
      return;
    }

    const newUser: User = {
      ...userData,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    
    setUsers(prev => [newUser, ...prev]);
    setShowStudentRegistration(false);
    toast.success('Cadastro realizado com sucesso! Você receberá notificações sobre eventos.');
  };

  // Estatísticas para dashboard
  const stats = {
    totalEvents: events.length,
    futureEvents: events.filter(e => new Date(e.date) >= new Date()).length,
    totalUsers: users.length,
    students: users.filter(u => u.type === 'aluno').length,
    professors: users.filter(u => u.type === 'professor').length
  };

  if (currentView === 'public') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl">Portal de Eventos</h1>
                  <p className="text-sm text-muted-foreground">Instituto Federal</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => setShowStudentRegistration(true)} variant="outline" size="sm" className="hidden sm:flex">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar-se
                </Button>
                <Button onClick={() => setShowStudentRegistration(true)} variant="outline" size="sm" className="sm:hidden">
                  <UserPlus className="h-4 w-4" />
                </Button>
                <Button onClick={() => setCurrentView('admin')} variant="outline" size="sm" className="hidden sm:flex">
                  <Settings className="h-4 w-4 mr-2" />
                  Área Administrativa
                </Button>
                <Button onClick={() => setCurrentView('admin')} variant="outline" size="sm" className="sm:hidden">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Filtros */}
        <section className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar eventos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Campus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Campus</SelectItem>
                    {campusOptions.slice(1).map(campus => (
                      <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {categoryOptions.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                {audienceOptions.slice(1).map(audience => (
                  <Badge
                    key={audience}
                    variant={selectedAudience === audience ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedAudience(selectedAudience === audience ? 'all' : audience)}
                  >
                    {audience}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Eventos */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="mb-2">Próximos Eventos</h2>
                <p className="text-muted-foreground">
                  {filteredEvents.length} evento(s) encontrado(s)
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground mb-2">
                  Não quer perder nenhum evento?
                </p>
                <Button onClick={() => setShowStudentRegistration(true)} size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastre-se para receber notificações
                </Button>
              </div>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar os filtros para encontrar eventos.
                </p>
                <div className="bg-muted/50 rounded-lg p-6 mt-6">
                  <h4 className="mb-2">🔔 Receba notificações sobre novos eventos</h4>
                  <p className="text-muted-foreground mb-4">
                    Cadastre-se na nossa plataforma e seja o primeiro a saber sobre workshops, palestras e outros eventos da universidade.
                  </p>
                  <Button onClick={() => setShowStudentRegistration(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Cadastrar agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={setSelectedEventDetail}
                />
              ))}
            </div>
          )}
        </main>

        {/* Modal de Detalhes do Evento */}
        <Dialog open={!!selectedEventDetail} onOpenChange={() => setSelectedEventDetail(undefined)}>
          <DialogContent className="max-w-2xl">
            {selectedEventDetail && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedEventDetail.title}</DialogTitle>
                  <DialogDescription>
                    Detalhes completos do evento
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {selectedEventDetail.imageUrl && (
                    <img 
                      src={selectedEventDetail.imageUrl} 
                      alt={selectedEventDetail.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <p>{selectedEventDetail.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Data:</strong> {new Date(selectedEventDetail.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      <strong>Horário:</strong> {selectedEventDetail.time}
                    </div>
                    <div>
                      <strong>Local:</strong> {selectedEventDetail.location}
                    </div>
                    <div>
                      <strong>Campus:</strong> {selectedEventDetail.campus}
                    </div>
                    <div>
                      <strong>Categoria:</strong> {selectedEventDetail.category}
                    </div>
                    <div>
                      <strong>Responsável:</strong> {selectedEventDetail.responsible}
                    </div>
                  </div>
                  <div>
                    <strong>Público-alvo:</strong>
                    <div className="flex gap-2 mt-1">
                      {selectedEventDetail.targetAudience.map(audience => (
                        <Badge key={audience} variant="outline">{audience}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Cadastro de Aluno */}
        <Dialog open={showStudentRegistration} onOpenChange={setShowStudentRegistration}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Cadastro de Aluno</DialogTitle>
              <DialogDescription>
                Cadastre-se para receber notificações sobre eventos da universidade.
              </DialogDescription>
            </DialogHeader>
            <StudentRegistrationForm
              onSubmit={handleStudentRegistration}
              onCancel={() => setShowStudentRegistration(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Vista administrativa
  return (
    <div className="min-h-screen bg-background">
      {/* Header Admin */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground">Gestão de Eventos e Usuários</p>
              </div>
            </div>
            <Button onClick={() => setCurrentView('public')} variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Ver Portal Público
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="emails">E-mails</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total de Eventos</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.totalEvents}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.futureEvents} futuros
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    Alunos e professores
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Alunos</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.students}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Professores</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.professors}</div>
                </CardContent>
              </Card>
            </div>

            {/* Próximos Eventos */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
                <CardDescription>Eventos programados para os próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events
                    .filter(e => new Date(e.date) >= new Date())
                    .slice(0, 5)
                    .map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                          </p>
                        </div>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gerenciamento de Eventos */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2>Gerenciar Eventos</h2>
              <Button onClick={() => setShowEventForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  showActions
                  onEdit={(event) => {
                    setEditingEvent(event);
                    setShowEventForm(true);
                  }}
                  onDelete={handleDeleteEvent}
                />
              ))}
            </div>
          </TabsContent>

          {/* Gerenciamento de Usuários */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2>Gerenciar Usuários</h2>
              <Button onClick={() => setShowUserForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(user => (
                <Card key={user.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <Badge variant={user.type === 'aluno' ? 'default' : 'secondary'}>
                        {user.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Campus:</strong> {user.campus}</p>
                      {user.course && <p><strong>Curso:</strong> {user.course}</p>}
                      {user.area && <p><strong>Área:</strong> {user.area}</p>}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingUser(user);
                          setShowUserForm(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Envio de E-mails */}
          <TabsContent value="emails">
            <div className="mb-6">
              <h2>Envio de E-mails</h2>
              <p className="text-muted-foreground">
                Envie comunicados e divulgue eventos para alunos e professores
              </p>
            </div>
            <EmailPanel events={events} users={users} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modais */}
      <Dialog open={showEventForm} onOpenChange={() => {
        setShowEventForm(false);
        setEditingEvent(undefined);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Editar Evento' : 'Novo Evento'}</DialogTitle>
            <DialogDescription>
              {editingEvent ? 'Edite as informações do evento.' : 'Preencha as informações para criar um novo evento.'}
            </DialogDescription>
          </DialogHeader>
          <EventForm
            event={editingEvent}
            onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
            onCancel={() => {
              setShowEventForm(false);
              setEditingEvent(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showUserForm} onOpenChange={() => {
        setShowUserForm(false);
        setEditingUser(undefined);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Edite as informações do usuário.' : 'Preencha as informações para criar um novo usuário.'}
            </DialogDescription>
          </DialogHeader>
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={() => {
              setShowUserForm(false);
              setEditingUser(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}