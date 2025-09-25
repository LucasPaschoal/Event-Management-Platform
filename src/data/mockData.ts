import { Event, User } from "../types";

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Inovação em Inteligência Artificial na Educação',
    description: 'Palestra sobre como a IA está transformando o ensino superior e as oportunidades para estudantes e professores.',
    date: '2025-01-15',
    time: '14:00',
    location: 'Auditório Central',
    locationType: 'presencial',
    targetAudience: ['Alunos', 'Professores'],
    category: 'Palestra',
    responsible: 'Prof. Dr. Ana Silva',
    imageUrl: 'https://images.unsplash.com/photo-1758270704587-43339a801396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWN0dXJlJTIwaGFsbCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NTg2NjYwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    campus: 'Bom Jesus do Itabapoana',
    createdAt: '2025-01-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Workshop: Desenvolvimento Web Moderno',
    description: 'Aprenda React, TypeScript e as melhores práticas do desenvolvimento frontend. Vagas limitadas!',
    date: '2025-01-20',
    time: '09:00',
    location: 'Laboratório de Informática A',
    locationType: 'presencial',
    targetAudience: ['Alunos'],
    category: 'Workshop',
    responsible: 'Prof. João Santos',
    imageUrl: 'https://images.unsplash.com/photo-1661333886128-98466117d88b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzU4NjY2MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    campus: 'Cambuci',
    createdAt: '2025-01-02T14:30:00Z'
  },
  {
    id: '3',
    title: 'Seminário: Sustentabilidade e Meio Ambiente',
    description: 'Discussão sobre práticas sustentáveis no campus e projetos de extensão voltados ao meio ambiente.',
    date: '2025-01-25',
    time: '16:00',
    location: 'https://meet.google.com/abc-defg-hij',
    locationType: 'online',
    targetAudience: ['Alunos', 'Professores', 'Comunidade'],
    category: 'Seminário',
    responsible: 'Profa. Dra. Maria Oliveira',
    imageUrl: 'https://images.unsplash.com/photo-1680226425348-cedaf70ec06d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4NjAwNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    campus: 'Todos os Campus',
    createdAt: '2025-01-03T08:15:00Z'
  },
  {
    id: '4',
    title: 'Mesa Redonda: Mercado de Trabalho em TI',
    description: 'Profissionais experientes compartilham suas experiências e dicas para ingressar no mercado de tecnologia.',
    date: '2025-02-05',
    time: '19:00',
    location: 'Sala de Conferências - Itaperuna',
    locationType: 'hibrido',
    targetAudience: ['Alunos'],
    category: 'Mesa Redonda',
    responsible: 'Coordenação de Estágios',
    campus: 'Itaperuna',
    createdAt: '2025-01-04T16:45:00Z'
  },
  {
    id: '5',
    title: 'Aula Especial: História da Arte Brasileira',
    description: 'Exploração das principais correntes artísticas do Brasil, desde o período colonial até a arte contemporânea.',
    date: '2025-02-10',
    time: '10:00',
    location: 'Museu de Arte do Campus',
    locationType: 'presencial',
    targetAudience: ['Alunos', 'Comunidade'],
    category: 'Aula Especial',
    responsible: 'Prof. Carlos Mendes',
    campus: 'Bom Jesus do Itabapoana',
    createdAt: '2025-01-05T12:20:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@universidade.edu.br',
    campus: 'Bom Jesus do Itabapoana',
    course: 'Sistemas de Informação',
    type: 'aluno',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@universidade.edu.br',
    campus: 'Cambuci',
    area: 'Engenharias',
    type: 'professor',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@universidade.edu.br',
    campus: 'Itaperuna',
    course: 'Administração',
    type: 'aluno',
    createdAt: '2024-03-10T00:00:00Z'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@universidade.edu.br',
    campus: 'Bom Jesus do Itabapoana',
    area: 'Química',
    type: 'professor',
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '5',
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@universidade.edu.br',
    campus: 'Cambuci',
    course: 'Engenharia Mecânica',
    type: 'aluno',
    createdAt: '2024-04-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'Carla Rodrigues',
    email: 'carla.rodrigues@universidade.edu.br',
    campus: 'Santo Antônio de Pádua',
    course: 'Eletrotécnica',
    type: 'aluno',
    createdAt: '2024-02-20T00:00:00Z'
  },
  {
    id: '7',
    name: 'Prof. Roberto Lima',
    email: 'roberto.lima@universidade.edu.br',
    campus: 'Itaperuna',
    area: 'Automação e Mecânica',
    type: 'professor',
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '8',
    name: 'Isabella Martins',
    email: 'isabella.martins@universidade.edu.br',
    campus: 'Bom Jesus do Itabapoana',
    course: 'Química',
    type: 'aluno',
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '9',
    name: 'Carlos Eduardo',
    email: 'carlos.eduardo@universidade.edu.br',
    campus: 'Cambuci',
    course: 'Informática',
    type: 'aluno',
    createdAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '10',
    name: 'Fernanda Souza',
    email: 'fernanda.souza@universidade.edu.br',
    campus: 'Itaperuna',
    course: 'Mecânica',
    type: 'aluno',
    createdAt: '2024-04-01T00:00:00Z'
  },
  {
    id: '11',
    name: 'Rafael Dias',
    email: 'rafael.dias@universidade.edu.br',
    campus: 'Santo Antônio de Pádua',
    course: 'Automação Industrial',
    type: 'aluno',
    createdAt: '2024-04-10T00:00:00Z'
  },
  {
    id: '12',
    name: 'Profa. Júlia Pereira',
    email: 'julia.pereira@universidade.edu.br',
    campus: 'Bom Jesus do Itabapoana',
    area: 'Licenciatura',
    type: 'professor',
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '13',
    name: 'Amanda Silva',
    email: 'amanda.silva@universidade.edu.br',
    campus: 'Cambuci',
    course: 'Licenciatura em Química',
    type: 'aluno',
    createdAt: '2024-02-28T00:00:00Z'
  },
  {
    id: '14',
    name: 'Prof. Marcos Andrade',
    email: 'marcos.andrade@universidade.edu.br',
    campus: 'Santo Antônio de Pádua',
    area: 'Informática',
    type: 'professor',
    createdAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '15',
    name: 'Beatriz Santos',
    email: 'beatriz.santos@universidade.edu.br',
    campus: 'Itaperuna',
    course: 'Eletrotécnica',
    type: 'aluno',
    createdAt: '2024-04-15T00:00:00Z'
  }
];