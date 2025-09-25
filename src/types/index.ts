export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: 'presencial' | 'online' | 'hibrido';
  targetAudience: string[];
  category: string;
  responsible: string;
  imageUrl?: string;
  campus: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  campus: string;
  course?: string; // para alunos
  area?: string; // para professores
  type: 'aluno' | 'professor';
  createdAt: string;
}

export interface EmailCampaign {
  id: string;
  eventId?: string;
  subject: string;
  message: string;
  recipients: string[];
  sentAt: string;
  status: 'enviado' | 'erro';
}