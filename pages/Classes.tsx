
import React, { useState, useRef } from 'react';
import { db, DEFAULT_STAGES } from '../services/mockDb';
import { ClassGroup, Student } from '../types';
import Button from '../components/Button';
import { Plus, ChevronRight, Calendar, User, FileSpreadsheet, UploadCloud, AlertCircle } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as XLSX from 'xlsx';
import { useNotification } from '../context/NotificationContext';

// Mapeamento baseado na progressão de níveis (Fundamental -> Médio -> CEFR)
const mapLevelToCEFR = (excelLevel: string | number): string => {
    const lvl = String(excelLevel).trim();
    
    // Fundamental II (6º ao 9º)
    if (lvl.startsWith('6.1')) return 'A1'; // Iniciante
    if (lvl.startsWith('6.2') || lvl.startsWith('6.3')) return 'A2'; 
    if (lvl.startsWith('7.1') || lvl.startsWith('7.2')) return 'A2';
    if (lvl.startsWith('7.3')) return 'B1';
    if (lvl.startsWith('8.1')) return 'A2'; 
    if (lvl.startsWith('8.2') || lvl.startsWith('8.3')) return 'B1';
    if (lvl.startsWith('9.1')) return 'B1'; 
    if (lvl.startsWith('9.2') || lvl.startsWith('9.3')) return 'B2';

    // Ensino Médio (1ª a 3ª Série)
    if (lvl === '1.1' || lvl === '2.1') return 'B1'; 
    if (lvl === '1.2' || lvl === '2.2') return 'B2'; 
    if (lvl === '1.3' || lvl === '2.3') return 'C1'; 
    if (lvl.startsWith('3.')) return 'C1'; // Terceirão avançado

    return 'A1'; // Default fallback
};

const Classes: React.FC = () => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const [classes, setClasses] = useState<ClassGroup[]>(db.classes.getAll());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', level: 'A1', schedule: '' });
  
  // Bulk Import State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  // SECURITY CHECK
  if (user?.role === 'student') {
      return <Navigate to="/grammar-book" replace />;
  }

  const handleAddClass = () => {
    if(!newClass.name) return;
    const cls: ClassGroup = {
        id: Date.now().toString(),
        name: newClass.name,
        level: newClass.level,
        schedule: newClass.schedule,
        teacherId: user?.id || 'admin',
        stages: DEFAULT_STAGES // Etapas padrão
    };
    db.classes.add(cls);
    setClasses(db.classes.getAll());
    setIsModalOpen(false);
    setNewClass({ name: '', level: 'A1', schedule: '' });
    notify('success', 'Turma criada manualmente.');
  };

  const handleBulkImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsImporting(true);
      
      try {
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data);
          
          let classesCreated = 0;
          let studentsImported = 0;

          // Estrutura para Agrupamento:
          // Chave: "NOME_PROFESSOR|NIVEL" 
          // Valor: { teacher, levelOriginal, suffixes: Set('A', 'B'), students: [] }
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

                  // Colunas esperadas: A=Nome, B=Turma(FUND-9A), C=Professor, D=Nivel
                  const name = row[0] as string;
                  const turmaCode = (row[1] as string) || ''; // ex: FUND-9A
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

                  // Extrair sufixo da turma (ex: de 'FUND-9A' pega 'A')
                  if (turmaCode) {
                      const match = turmaCode.match(/([A-Z])$/i);
                      if (match) groups[groupKey].suffixes.add(match[1].toUpperCase());
                  }

                  groups[groupKey].students.push({
                      name,
                      email: `${name.toLowerCase().replace(/[^a-z]/g, '.').slice(0, 20)}@sas.student.com`, // Gerar email fictício
                      originalClass: turmaCode,
                      originalTeacher: teacher,
                      originalLevel: level
                  });
              });
          });

          // 2. Criar Turmas e Alunos Baseado nos Grupos
          Object.values(groups).forEach(group => {
              if (group.students.length === 0) return;

              // Gerar nome da turma: "RENATA - 9.1 ABC"
              const suffixes = Array.from(group.suffixes).sort().join('');
              const className = `${group.teacher} - ${group.levelOriginal} ${suffixes}`.trim();
              
              // Mapear nível CEFR
              const cefrLevel = mapLevelToCEFR(group.levelOriginal);

              // Criar Turma
              const classId = `c_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
              const newClassGroup: ClassGroup = {
                  id: classId,
                  name: className,
                  level: cefrLevel,
                  schedule: 'Horário a definir', // Campo não vem no excel padrão
                  teacherId: user?.id || 'admin',
                  stages: DEFAULT_STAGES
              };
              db.classes.add(newClassGroup);
              classesCreated++;

              // Criar Alunos e Vínculos
              group.students.forEach((stuData: any) => {
                  const studentId = `s_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
                  
                  // Student Record
                  const newStudent: Student = {
                      id: studentId,
                      name: stuData.name,
                      email: stuData.email,
                      enrollmentDate: new Date().toISOString().split('T')[0],
                      originalClass: stuData.originalClass,
                      originalTeacher: stuData.originalTeacher,
                      originalLevel: stuData.originalLevel
                  };

                  // User Login Record
                  const newUser = {
                      id: studentId,
                      name: stuData.name,
                      email: stuData.email,
                      role: 'student' as const,
                      password: '123' // Senha padrão
                  };

                  db.students.add(newStudent);
                  db.users.add(newUser);
                  db.enrollments.enroll(classId, studentId);
                  studentsImported++;
              });
          });

          setClasses(db.classes.getAll());
          notify('success', `Sucesso! ${classesCreated} turmas criadas e ${studentsImported} alunos importados.`);

      } catch (error) {
          console.error("Bulk Import Error", error);
          notify('error', 'Erro ao processar planilha. Verifique o formato.');
      } finally {
          setIsImporting(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
      }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Turmas</h1>
            <p className="text-gray-500 text-sm">Gerencie suas turmas ou importe em massa via Excel.</p>
        </div>
        
        <div className="flex space-x-2">
            {/* Input oculto para arquivo */}
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleBulkImport}
                accept=".xlsx,.xls"
                className="hidden"
            />
            
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()} isLoading={isImporting}>
                <FileSpreadsheet size={18} className="mr-2" /> 
                {isImporting ? 'Processando...' : 'Importar Planilha Geral'}
            </Button>

            <Button onClick={() => setIsModalOpen(true)}>
                <Plus size={18} className="mr-2" /> Nova Turma Manual
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
            <Link to={`/classes/${cls.id}`} key={cls.id} className="block group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-blue-300">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded mb-2 border ${
                                cls.level.startsWith('A') ? 'bg-green-50 text-green-700 border-green-100' :
                                cls.level.startsWith('B') ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                'bg-purple-50 text-purple-700 border-purple-100'
                            }`}>
                                {cls.level}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 line-clamp-1" title={cls.name}>
                                {cls.name}
                            </h3>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-blue-500" />
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                            <User size={14} className="mr-2" />
                            {db.students.getByClass(cls.id).length} Alunos
                        </div>
                        <div className="flex items-center">
                            <Calendar size={14} className="mr-2" />
                            {cls.schedule || 'Horário a definir'}
                        </div>
                    </div>
                </div>
            </Link>
        ))}
        {classes.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                <p>Nenhuma turma encontrada. Crie uma manualmente ou importe uma planilha.</p>
            </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
                <h2 className="text-xl font-bold mb-4">Nova Turma Manual</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome da Turma</label>
                        <input 
                            className="w-full border p-2 rounded" 
                            value={newClass.name}
                            onChange={e => setNewClass({...newClass, name: e.target.value})}
                            placeholder="Ex: Inglês Avançado - C1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Nível</label>
                        <select 
                            className="w-full border p-2 rounded bg-white"
                            value={newClass.level}
                            onChange={e => setNewClass({...newClass, level: e.target.value})}
                        >
                            <option value="A1">A1 - Iniciante</option>
                            <option value="A2">A2 - Básico</option>
                            <option value="B1">B1 - Intermediário</option>
                            <option value="B2">B2 - Intermediário Avançado</option>
                            <option value="C1">C1 - Avançado</option>
                            <option value="C2">C2 - Proficiente</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Horário</label>
                        <input 
                            className="w-full border p-2 rounded" 
                            value={newClass.schedule}
                            onChange={e => setNewClass({...newClass, schedule: e.target.value})}
                            placeholder="Ex: Seg/Qua 19:00"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleAddClass}>Criar Turma</Button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
