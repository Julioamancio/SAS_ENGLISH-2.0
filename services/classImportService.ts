
import * as XLSX from 'xlsx';
import { db, DEFAULT_STAGES } from './mockDb';
import { ClassGroup, Student } from '../types';
import { mapLevelToCEFR } from '../utils/levelMapping';

export const importClassesFromExcel = async (file: File, teacherId: string): Promise<{ classes: number, students: number }> => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    
    let classesCreated = 0;
    let studentsImported = 0;

    // Chave: "NOME_PROFESSOR|NIVEL" -> Valor: Dados do grupo
    const groups: {[key: string]: { 
        teacher: string, 
        levelOriginal: string, 
        suffixes: Set<string>, 
        students: any[] 
    }} = {};

    // 1. Processar TODAS as abas da planilha
    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        rows.forEach((row, index) => {
            if (index === 0) return; // Pular cabeçalho

            // Colunas: A=Nome, B=Turma(FUND-9A), C=Professor, D=Nivel
            const name = row[0] as string;
            const turmaCode = (row[1] as string) || ''; 
            const teacher = (row[2] as string) || 'Sem Professor';
            const level = String(row[3] || '').trim();

            if (!name) return;

            const groupKey = `${teacher}|${level}`;
            
            if (!groups[groupKey]) {
                groups[groupKey] = {
                    teacher,
                    levelOriginal: level,
                    suffixes: new Set(),
                    students: []
                };
            }

            if (turmaCode) {
                const match = turmaCode.match(/([A-Z])$/i);
                if (match) groups[groupKey].suffixes.add(match[1].toUpperCase());
            }

            groups[groupKey].students.push({
                name,
                email: `${name.toLowerCase().replace(/[^a-z]/g, '.').slice(0, 20)}@sas.student.com`,
                originalClass: turmaCode,
                originalTeacher: teacher,
                originalLevel: level
            });
        });
    });

    // 2. Criar Entidades
    Object.values(groups).forEach(group => {
        if (group.students.length === 0) return;

        const suffixes = Array.from(group.suffixes).sort().join('');
        const className = `${group.teacher} - ${group.levelOriginal} ${suffixes}`.trim();
        const cefrLevel = mapLevelToCEFR(group.levelOriginal);

        const classId = `c_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const newClassGroup: ClassGroup = {
            id: classId,
            name: className,
            level: cefrLevel,
            schedule: 'Horário a definir',
            teacherId: teacherId,
            stages: DEFAULT_STAGES
        };
        db.classes.add(newClassGroup);
        classesCreated++;

        group.students.forEach((stuData: any) => {
            const studentId = `s_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
            
            const newStudent: Student = {
                id: studentId,
                name: stuData.name,
                email: stuData.email,
                enrollmentDate: new Date().toISOString().split('T')[0],
                originalClass: stuData.originalClass,
                originalTeacher: stuData.originalTeacher,
                originalLevel: stuData.originalLevel
            };

            const newUser = {
                id: studentId,
                name: stuData.name,
                email: stuData.email,
                role: 'student' as const,
                password: '123'
            };

            db.students.add(newStudent);
            db.users.add(newUser);
            db.enrollments.enroll(classId, studentId);
            studentsImported++;
        });
    });

    return { classes: classesCreated, students: studentsImported };
};
