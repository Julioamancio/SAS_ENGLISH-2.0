
export enum Difficulty {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export type QuizMode = 'grammar' | 'reading' | 'enem';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface QuizData {
  topic: string;
  level: Difficulty;
  mode: QuizMode;
  passage?: string; // For reading comprehension
  imageUrl?: string; // For visual ENEM questions (Cartoons, Ads)
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  date: string;
  mode: QuizMode;
  level: Difficulty;
  score: number;
  totalQuestions: number;
  xpEarned: number;
}

// School Management Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  password?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  // Fields for Excel Import Metadata
  originalClass?: string;   // Col B (e.g., FUND-9A)
  originalTeacher?: string; // Col C (e.g., Renata)
  originalLevel?: string;   // Col D (e.g., 9.1)
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

// --- GRAMMAR BOOK TYPES ---

export interface GrammarForm {
  structure: string;
  examples: string[];
}

export interface CommonMistake {
  wrong: string;
  right: string;
  explanation: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  iconName: string; // Changed to string to store icon name instead of component
  summary: string; 
  definition: string;
  deepDive: string[];
  signalWords: string[];
  forms: {
    positive: GrammarForm;
    negative: GrammarForm;
    question: GrammarForm;
  };
  commonMistakes?: CommonMistake[];
  proTip?: string;
}

export interface LevelData {
  id: string;
  label: string;
  color: string;
  bg: string;
  borderColor: string;
  description: string;
  topics: GrammarTopic[];
}
