export enum Difficulty {
  BEGINNER = 'Iniciante',
  INTERMEDIATE = 'Intermediário',
  ADVANCED = 'Avançado'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

// School Management Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
}

export interface StageConfig {
  id: string;
  name: string;
  maxPoints: number;
}

export interface ClassGroup {
  id: string;
  name: string;
  level: string; // e.g. A1, B2
  schedule: string; // e.g. Seg/Qua 19:00
  teacherId: string;
  stages: StageConfig[]; // Configuração dinâmica das etapas
}

export interface Activity {
  id: string;
  classId: string;
  title: string;
  stageId: string; // ID da etapa dinâmica
  maxPoints: number;
  date: string;
}

export interface Grade {
  activityId: string;
  studentId: string;
  value: number;
}

export interface Enrollment {
  classId: string;
  studentId: string;
  active: boolean;
  endDate?: string;
}

// 5-Field Feedback System
export interface Feedback {
  id: string;
  studentId: string;
  classId: string;
  stageId: string; // ID da etapa dinâmica
  attendance: number; // 0-100
  behavior: 'Excelente' | 'Bom' | 'Regular' | 'Ruim';
  participation: 'Alta' | 'Média' | 'Baixa';
  homework: 'Completo' | 'Parcial' | 'Não Fez';
  comments: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// AI Feature Types

export interface GrammarAnalysis {
  correctedText: string;
  errors: {
    original: string;
    correction: string;
    rule: string;
  }[];
  feedback: string;
}

export interface StudyPlan {
  title: string;
  schedule: {
    day: string;
    focus: string;
    activities: string[];
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  grammarAnalysis?: GrammarAnalysis;
}