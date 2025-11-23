import { ClassGroup, Student, Activity, Grade, Enrollment, Feedback } from '../types';

// Storage Keys
const KEYS = {
  CLASSES: 'sas_classes',
  STUDENTS: 'sas_students',
  ACTIVITIES: 'sas_activities',
  GRADES: 'sas_grades',
  ENROLLMENTS: 'sas_enrollments',
  FEEDBACKS: 'sas_feedbacks',
  AUTO_BACKUP: 'sas_auto_backup',
  BACKUP_TIMESTAMP: 'sas_backup_timestamp'
};

// Default Stages configuration
export const DEFAULT_STAGES = [
  { id: 'st_1', name: '1ª Etapa', maxPoints: 30 },
  { id: 'st_2', name: '2ª Etapa', maxPoints: 35 },
  { id: 'st_3', name: '3ª Etapa', maxPoints: 35 },
];

// Initial Seed Data
const seedData = () => {
  if (localStorage.getItem(KEYS.CLASSES)) return;

  const classes: ClassGroup[] = [
    { 
      id: 'c1', 
      name: 'Inglês 101 - A1', 
      level: 'A1', 
      schedule: 'Seg/Qua 08:00', 
      teacherId: 'admin',
      stages: DEFAULT_STAGES
    },
    { 
      id: 'c2', 
      name: 'Inglês Negócios - B2', 
      level: 'B2', 
      schedule: 'Ter/Qui 19:00', 
      teacherId: 'admin',
      stages: DEFAULT_STAGES
    }
  ];

  const students: Student[] = [
    { id: 's1', name: 'Alice Silva', email: 'alice@exemplo.com', enrollmentDate: '2024-01-15' },
    { id: 's2', name: 'Bruno Souza', email: 'bruno@exemplo.com', enrollmentDate: '2024-01-16' },
    { id: 's3', name: 'Carlos Lima', email: 'carlos@exemplo.com', enrollmentDate: '2024-01-20' },
  ];

  const enrollments: Enrollment[] = [
    { classId: 'c1', studentId: 's1', active: true },
    { classId: 'c1', studentId: 's2', active: true },
    { classId: 'c2', studentId: 's3', active: true },
  ];

  const activities: Activity[] = [
    { id: 'a1', classId: 'c1', title: 'Quiz Introdutório', stageId: 'st_1', maxPoints: 10, date: '2024-02-01' },
    { id: 'a2', classId: 'c1', title: 'Prova Parcial', stageId: 'st_1', maxPoints: 20, date: '2024-03-01' },
  ];

  const grades: Grade[] = [
    { activityId: 'a1', studentId: 's1', value: 9 },
    { activityId: 'a1', studentId: 's2', value: 8 },
  ];

  localStorage.setItem(KEYS.CLASSES, JSON.stringify(classes));
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  localStorage.setItem(KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(activities));
  localStorage.setItem(KEYS.GRADES, JSON.stringify(grades));
  localStorage.setItem(KEYS.FEEDBACKS, JSON.stringify([]));
};

// Helper to get/set
const get = <T>(key: string): T[] => JSON.parse(localStorage.getItem(key) || '[]');
const set = (key: string, data: any[]) => localStorage.setItem(key, JSON.stringify(data));

export const db = {
  init: seedData,
  
  classes: {
    getAll: () => get<ClassGroup>(KEYS.CLASSES),
    add: (cls: ClassGroup) => set(KEYS.CLASSES, [...get(KEYS.CLASSES), cls]),
    update: (cls: ClassGroup) => {
        const others = get<ClassGroup>(KEYS.CLASSES).filter(c => c.id !== cls.id);
        set(KEYS.CLASSES, [...others, cls]);
    },
    getById: (id: string) => get<ClassGroup>(KEYS.CLASSES).find(c => c.id === id),
    delete: (classId: string) => {
        // 1. Delete Class
        const remainingClasses = get<ClassGroup>(KEYS.CLASSES).filter(c => c.id !== classId);
        set(KEYS.CLASSES, remainingClasses);

        // 2. Identify Enrollments to delete
        const allEnrollments = get<Enrollment>(KEYS.ENROLLMENTS);
        const classEnrollments = allEnrollments.filter(e => e.classId === classId);
        const studentIdsToDelete = classEnrollments.map(e => e.studentId);
        
        // Remove enrollments for this class
        set(KEYS.ENROLLMENTS, allEnrollments.filter(e => e.classId !== classId));

        // 3. Delete Students (As requested: "todos os alunos também serão deletados")
        // Note: In a real system, we might check if they are in other classes first.
        // Here we assume if they are in this class, they go.
        const remainingStudents = get<Student>(KEYS.STUDENTS).filter(s => !studentIdsToDelete.includes(s.id));
        set(KEYS.STUDENTS, remainingStudents);

        // 4. Delete Activities
        const remainingActivities = get<Activity>(KEYS.ACTIVITIES).filter(a => a.classId !== classId);
        set(KEYS.ACTIVITIES, remainingActivities);

        // 5. Delete Grades (Linked to deleted activities)
        // Since we don't have easy Join, we just filter grades where activityId no longer exists in remainingActivities
        const remainingActivityIds = remainingActivities.map(a => a.id);
        const remainingGrades = get<Grade>(KEYS.GRADES).filter(g => remainingActivityIds.includes(g.activityId));
        set(KEYS.GRADES, remainingGrades);

        // 6. Delete Feedbacks
        const remainingFeedbacks = get<Feedback>(KEYS.FEEDBACKS).filter(f => f.classId !== classId);
        set(KEYS.FEEDBACKS, remainingFeedbacks);
    }
  },

  students: {
    getAll: () => get<Student>(KEYS.STUDENTS),
    add: (stu: Student) => set(KEYS.STUDENTS, [...get(KEYS.STUDENTS), stu]),
    getByClass: (classId: string) => {
      const enrollments = get<Enrollment>(KEYS.ENROLLMENTS).filter(e => e.classId === classId && e.active);
      const allStudents = get<Student>(KEYS.STUDENTS);
      return allStudents.filter(s => enrollments.some(e => e.studentId === s.id));
    },
    transfer: (studentId: string, fromClassId: string, toClassId: string) => {
        const enrollments = get<Enrollment>(KEYS.ENROLLMENTS);
        const updated = enrollments.map(e => {
            if (e.studentId === studentId && e.classId === fromClassId && e.active) {
                return { ...e, active: false, endDate: new Date().toISOString() };
            }
            return e;
        });
        // Add new enrollment
        updated.push({ classId: toClassId, studentId, active: true });
        set(KEYS.ENROLLMENTS, updated);
    }
  },

  activities: {
    getByClass: (classId: string) => get<Activity>(KEYS.ACTIVITIES).filter(a => a.classId === classId),
    add: (act: Activity) => set(KEYS.ACTIVITIES, [...get(KEYS.ACTIVITIES), act]),
    delete: (id: string) => set(KEYS.ACTIVITIES, get<Activity>(KEYS.ACTIVITIES).filter(a => a.id !== id)),
    deleteByStage: (classId: string, stageId: string) => {
        const kept = get<Activity>(KEYS.ACTIVITIES).filter(a => !(a.classId === classId && a.stageId === stageId));
        set(KEYS.ACTIVITIES, kept);
    }
  },

  grades: {
    getAll: () => get<Grade>(KEYS.GRADES),
    getByActivity: (activityId: string) => get<Grade>(KEYS.GRADES).filter(g => g.activityId === activityId),
    setGrade: (activityId: string, studentId: string, value: number) => {
      const all = get<Grade>(KEYS.GRADES).filter(g => !(g.activityId === activityId && g.studentId === studentId));
      all.push({ activityId, studentId, value });
      set(KEYS.GRADES, all);
    },
    deleteByActivity: (activityId: string) => {
        set(KEYS.GRADES, get<Grade>(KEYS.GRADES).filter(g => g.activityId !== activityId));
    }
  },

  feedbacks: {
    getByClassAndStage: (classId: string, stageId: string) => 
        get<Feedback>(KEYS.FEEDBACKS).filter(f => f.classId === classId && f.stageId === stageId),
    save: (feedback: Feedback) => {
        const all = get<Feedback>(KEYS.FEEDBACKS).filter(f => !(f.studentId === feedback.studentId && f.classId === feedback.classId && f.stageId === feedback.stageId));
        all.push(feedback);
        set(KEYS.FEEDBACKS, all);
    },
    deleteByStage: (classId: string, stageId: string) => {
        const kept = get<Feedback>(KEYS.FEEDBACKS).filter(f => !(f.classId === classId && f.stageId === stageId));
        set(KEYS.FEEDBACKS, kept);
    }
  },

  enrollments: {
    enroll: (classId: string, studentId: string) => {
        const all = get<Enrollment>(KEYS.ENROLLMENTS);
        if(!all.find(e => e.classId === classId && e.studentId === studentId && e.active)) {
            set(KEYS.ENROLLMENTS, [...all, {classId, studentId, active: true}]);
        }
    }
  },

  system: {
      // Export all data
      backup: () => {
          const data = {
              classes: get(KEYS.CLASSES),
              students: get(KEYS.STUDENTS),
              activities: get(KEYS.ACTIVITIES),
              grades: get(KEYS.GRADES),
              enrollments: get(KEYS.ENROLLMENTS),
              feedbacks: get(KEYS.FEEDBACKS),
              timestamp: new Date().toISOString()
          };
          return JSON.stringify(data);
      },
      // Restore data from JSON string
      restore: (jsonString: string) => {
          try {
              const data = JSON.parse(jsonString);
              if(!data.classes || !data.students) throw new Error("Arquivo de backup inválido");
              
              set(KEYS.CLASSES, data.classes);
              set(KEYS.STUDENTS, data.students);
              set(KEYS.ACTIVITIES, data.activities || []);
              set(KEYS.GRADES, data.grades || []);
              set(KEYS.ENROLLMENTS, data.enrollments || []);
              set(KEYS.FEEDBACKS, data.feedbacks || []);
              return true;
          } catch (e) {
              console.error(e);
              return false;
          }
      },
      // Auto Backup Internal
      runAutoBackup: () => {
          const data = {
            classes: get(KEYS.CLASSES),
            students: get(KEYS.STUDENTS),
            activities: get(KEYS.ACTIVITIES),
            grades: get(KEYS.GRADES),
            enrollments: get(KEYS.ENROLLMENTS),
            feedbacks: get(KEYS.FEEDBACKS),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(KEYS.AUTO_BACKUP, JSON.stringify(data));
        localStorage.setItem(KEYS.BACKUP_TIMESTAMP, new Date().toISOString());
      },
      getAutoBackup: () => {
          return localStorage.getItem(KEYS.AUTO_BACKUP);
      },
      getLastBackupTime: () => {
          return localStorage.getItem(KEYS.BACKUP_TIMESTAMP);
      }
  }
};