import { ClassGroup, Student, Activity, Grade, Enrollment, Feedback, QuizAttempt, User } from '../types';

// Storage Keys
const KEYS = {
  CLASSES: 'sas_classes',
  STUDENTS: 'sas_students',
  ACTIVITIES: 'sas_activities',
  GRADES: 'sas_grades',
  ENROLLMENTS: 'sas_enrollments',
  FEEDBACKS: 'sas_feedbacks',
  QUIZ_ATTEMPTS: 'sas_quiz_attempts',
  USERS: 'sas_users',
  AUTO_BACKUP: 'sas_auto_backup',
  BACKUP_TIMESTAMP: 'sas_backup_timestamp',
  SYSTEM_LOGO: 'sas_system_logo'
};

// Default Stages configuration
export const DEFAULT_STAGES = [
  { id: 'st_1', name: '1ª Etapa', maxPoints: 30 },
  { id: 'st_2', name: '2ª Etapa', maxPoints: 35 },
  { id: 'st_3', name: '3ª Etapa', maxPoints: 35 },
];

// Helper to safely get data
const get = <T>(key: string): T[] => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    } catch (e) {
        console.error(`Error reading ${key}`, e);
        return [];
    }
};

// Helper to safely set data
const set = (key: string, data: any[]): boolean => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error(`Error saving ${key}. Storage might be full.`, e);
        return false;
    }
};

// Initial Seed Data
const seedData = () => {
  try {
      // 1. Emergency Cleanup: If Logo is corrupt or too big causing crash, remove it
      try {
          const logo = localStorage.getItem(KEYS.SYSTEM_LOGO);
          if (logo && logo.length > 500000) { // Safety limit check
             console.warn("Logo too large, removing to prevent crash");
             localStorage.removeItem(KEYS.SYSTEM_LOGO);
          }
      } catch (e) { /* ignore */ }

      // 2. Ensure Admin Exists
      const existingUsers = get<User>(KEYS.USERS);
      if (!existingUsers.find((u: User) => u.email === 'admin@sas.com')) {
          const adminUser: User = { 
              id: 'admin', 
              name: 'Administrador', 
              email: 'admin@sas.com', 
              role: 'admin',
              password: 'admin123'
          };
          set(KEYS.USERS, [...existingUsers, adminUser]);
      }
      
      // 3. Sync students without login
      const students = get<Student>(KEYS.STUDENTS);
      const users = get<User>(KEYS.USERS);
      let usersChanged = false;

      students.forEach((s: Student) => {
          const exists = users.find((u: User) => u.email.toLowerCase() === s.email.toLowerCase());
          if (!exists) {
              const newUser: User = {
                  id: s.id,
                  name: s.name,
                  email: s.email,
                  role: 'student',
                  password: '123'
              };
              users.push(newUser);
              usersChanged = true;
          }
      });

      if (usersChanged) {
          set(KEYS.USERS, users);
      }

      if (localStorage.getItem(KEYS.CLASSES)) return;

      // 4. Initial Seed if empty
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

      set(KEYS.CLASSES, classes);
      set(KEYS.STUDENTS, []);
      set(KEYS.ENROLLMENTS, []);
      set(KEYS.ACTIVITIES, []);
      set(KEYS.GRADES, []);
      set(KEYS.FEEDBACKS, []);
      set(KEYS.QUIZ_ATTEMPTS, []);
  } catch (e) {
      console.error("Critical Error during DB Init", e);
  }
};

export const db = {
  init: seedData,
  
  users: {
    getAll: () => get<User>(KEYS.USERS),
    add: (user: User) => {
        const users = get<User>(KEYS.USERS);
        if(!users.find(u => u.email === user.email)) {
            set(KEYS.USERS, [...users, user]);
        }
    },
    delete: (userId: string) => {
        set(KEYS.USERS, get<User>(KEYS.USERS).filter(u => u.id !== userId));
    },
    find: (email: string) => get<User>(KEYS.USERS).find(u => u.email.toLowerCase() === email.toLowerCase())
  },

  classes: {
    getAll: () => get<ClassGroup>(KEYS.CLASSES),
    add: (cls: ClassGroup) => set(KEYS.CLASSES, [...get(KEYS.CLASSES), cls]),
    update: (cls: ClassGroup) => {
        const others = get<ClassGroup>(KEYS.CLASSES).filter(c => c.id !== cls.id);
        set(KEYS.CLASSES, [...others, cls]);
    },
    getById: (id: string) => get<ClassGroup>(KEYS.CLASSES).find(c => c.id === id),
    delete: (classId: string) => {
        const remainingClasses = get<ClassGroup>(KEYS.CLASSES).filter(c => c.id !== classId);
        set(KEYS.CLASSES, remainingClasses);

        const allEnrollments = get<Enrollment>(KEYS.ENROLLMENTS);
        const classEnrollments = allEnrollments.filter(e => e.classId === classId);
        const studentIdsToDelete = classEnrollments.map(e => e.studentId);
        
        set(KEYS.ENROLLMENTS, allEnrollments.filter(e => e.classId !== classId));

        const remainingStudents = get<Student>(KEYS.STUDENTS).filter(s => !studentIdsToDelete.includes(s.id));
        set(KEYS.STUDENTS, remainingStudents);

        const remainingUsers = get<User>(KEYS.USERS).filter(u => !studentIdsToDelete.includes(u.id));
        set(KEYS.USERS, remainingUsers);

        const remainingActivities = get<Activity>(KEYS.ACTIVITIES).filter(a => a.classId !== classId);
        set(KEYS.ACTIVITIES, remainingActivities);

        const remainingActivityIds = remainingActivities.map(a => a.id);
        const remainingGrades = get<Grade>(KEYS.GRADES).filter(g => remainingActivityIds.includes(g.activityId));
        set(KEYS.GRADES, remainingGrades);

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

  quiz: {
      getAttempts: () => get<QuizAttempt>(KEYS.QUIZ_ATTEMPTS),
      saveAttempt: (attempt: QuizAttempt) => {
          set(KEYS.QUIZ_ATTEMPTS, [...get(KEYS.QUIZ_ATTEMPTS), attempt]);
      },
      getUserStats: () => {
          const attempts = get<QuizAttempt>(KEYS.QUIZ_ATTEMPTS);
          const totalXP = attempts.reduce((sum, a) => sum + a.xpEarned, 0);
          const totalQuizzes = attempts.length;
          
          const level = Math.floor(totalXP / 500) + 1;
          const nextLevelXP = level * 500;
          const progress = totalXP - ((level - 1) * 500);
          
          return { totalXP, level, nextLevelXP, progress, totalQuizzes };
      }
  },

  system: {
      backup: () => {
          try {
              const data = {
                  users: get(KEYS.USERS),
                  classes: get(KEYS.CLASSES),
                  students: get(KEYS.STUDENTS),
                  activities: get(KEYS.ACTIVITIES),
                  grades: get(KEYS.GRADES),
                  enrollments: get(KEYS.ENROLLMENTS),
                  feedbacks: get(KEYS.FEEDBACKS),
                  quizAttempts: get(KEYS.QUIZ_ATTEMPTS),
                  timestamp: new Date().toISOString(),
                  logo: localStorage.getItem(KEYS.SYSTEM_LOGO)
              };
              return JSON.stringify(data);
          } catch(e) {
              return "{}";
          }
      },
      restore: (jsonString: string) => {
          try {
              const data = JSON.parse(jsonString);
              if(!data.classes || !data.students) throw new Error("Backup inválido");
              
              set(KEYS.USERS, data.users || []);
              set(KEYS.CLASSES, data.classes);
              set(KEYS.STUDENTS, data.students);
              set(KEYS.ACTIVITIES, data.activities || []);
              set(KEYS.GRADES, data.grades || []);
              set(KEYS.ENROLLMENTS, data.enrollments || []);
              set(KEYS.FEEDBACKS, data.feedbacks || []);
              set(KEYS.QUIZ_ATTEMPTS, data.quizAttempts || []);
              
              if (data.logo) {
                 try {
                     localStorage.setItem(KEYS.SYSTEM_LOGO, data.logo);
                 } catch(e) {
                     console.warn("Could not restore logo due to size limits");
                 }
              }
              return true;
          } catch (e) {
              return false;
          }
      },
      runAutoBackup: () => {
        try {
            const data = {
                users: get(KEYS.USERS),
                classes: get(KEYS.CLASSES),
                students: get(KEYS.STUDENTS),
                // Exclude logo from auto backup to save space
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(KEYS.AUTO_BACKUP, JSON.stringify(data));
            localStorage.setItem(KEYS.BACKUP_TIMESTAMP, new Date().toISOString());
        } catch(e) {
            console.warn("Auto backup failed (Storage Full)");
        }
      },
      getAutoBackup: () => localStorage.getItem(KEYS.AUTO_BACKUP),
      getLastBackupTime: () => localStorage.getItem(KEYS.BACKUP_TIMESTAMP),
      setLogo: (base64: string): boolean => {
          try {
              localStorage.setItem(KEYS.SYSTEM_LOGO, base64);
              return true;
          } catch(e) {
              return false;
          }
      },
      getLogo: () => {
          try {
              return localStorage.getItem(KEYS.SYSTEM_LOGO);
          } catch(e) { return null; }
      },
      removeLogo: () => localStorage.removeItem(KEYS.SYSTEM_LOGO)
  }
};