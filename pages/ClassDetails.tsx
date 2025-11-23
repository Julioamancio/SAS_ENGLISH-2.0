import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/mockDb';
import { ClassGroup, Student, Activity, Grade, Feedback, StageConfig } from '../types';
import Button from '../components/Button';
import { ArrowLeft, Plus, Users, Book, Award, AlertCircle, FileSpreadsheet, Download, MessageSquare, RefreshCw, Settings, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useNotification } from '../context/NotificationContext';

const ClassDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notify } = useNotification();
  
  const [cls, setCls] = useState<ClassGroup | undefined>(db.classes.getById(id || ''));
  const [students, setStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activeTab, setActiveTab] = useState<'activities' | 'students' | 'feedback' | 'settings'>('activities');
  
  // States for Activities
  const [isActivityModalOpen, setActivityModalOpen] = useState(false);
  const [newAct, setNewAct] = useState<{title: string, stageId: string, maxPoints: number}>({title: '', stageId: '', maxPoints: 10});
  const [errorMsg, setErrorMsg] = useState('');
  
  // States for Excel Import
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  // States for Transfer
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [studentToTransfer, setStudentToTransfer] = useState<Student | null>(null);
  const [targetClassId, setTargetClassId] = useState('');
  const [availableClasses, setAvailableClasses] = useState<ClassGroup[]>([]);

  // States for Feedback
  const [selectedFeedbackStageId, setSelectedFeedbackStageId] = useState<string>('');

  // States for Stage Management
  const [newStageName, setNewStageName] = useState('');
  const [newStagePoints, setNewStagePoints] = useState(30);

  const refreshData = () => {
    if(!id) return;
    const currentClass = db.classes.getById(id);
    setCls(currentClass);
    setStudents(db.students.getByClass(id));
    setActivities(db.activities.getByClass(id));
    
    if (currentClass && currentClass.stages.length > 0 && !selectedFeedbackStageId) {
        setSelectedFeedbackStageId(currentClass.stages[0].id);
    }
    
    // Load grades
    const acts = db.activities.getByClass(id);
    let allGrades: Grade[] = [];
    acts.forEach(a => {
        allGrades = [...allGrades, ...db.grades.getByActivity(a.id)];
    });
    setGrades(allGrades);

    // Load feedbacks
    let allFeedbacks: Feedback[] = [];
    if (currentClass) {
        currentClass.stages.forEach(s => {
            allFeedbacks = [...allFeedbacks, ...db.feedbacks.getByClassAndStage(id, s.id)];
        });
    }
    setFeedbacks(allFeedbacks);

    // Load other classes for transfer
    setAvailableClasses(db.classes.getAll().filter(c => c.id !== id));
  };

  useEffect(() => {
    refreshData();
  }, [id]);

  if (!cls) return <div className="p-8 text-center text-gray-500">Turma não encontrada</div>;

  const getStageTotal = (stageId: string) => {
    return activities.filter(a => a.stageId === stageId).reduce((sum, a) => sum + a.maxPoints, 0);
  };

  // --- Handlers for Stages ---
  const handleAddStage = () => {
    if (!newStageName) return;
    const newStage: StageConfig = {
        id: `st_${Date.now()}`,
        name: newStageName,
        maxPoints: newStagePoints
    };
    const updatedClass = { ...cls, stages: [...cls.stages, newStage] };
    db.classes.update(updatedClass);
    setNewStageName('');
    refreshData();
    notify('success', 'Nova etapa adicionada.');
  };

  const handleDeleteStage = (stageId: string) => {
    if (!window.confirm('Tem certeza? Isso apagará todas as atividades e feedbacks vinculados a esta etapa.')) return;
    
    // Clean up DB
    db.activities.deleteByStage(cls.id, stageId);
    db.feedbacks.deleteByStage(cls.id, stageId);
    
    const updatedClass = { ...cls, stages: cls.stages.filter(s => s.id !== stageId) };
    db.classes.update(updatedClass);
    refreshData();
    notify('info', 'Etapa removida.');
  };

  // --- Handlers for Activities ---
  const handleAddActivity = () => {
    setErrorMsg('');
    const targetStage = cls.stages.find(s => s.id === newAct.stageId);
    if (!targetStage) return;

    const currentTotal = getStageTotal(newAct.stageId);
    if (currentTotal + newAct.maxPoints > targetStage.maxPoints) {
        setErrorMsg(`Limite da ${targetStage.name} excedido (${currentTotal + newAct.maxPoints}/${targetStage.maxPoints}).`);
        notify('error', `Limite de pontos excedido para ${targetStage.name}`);
        return;
    }

    db.activities.add({
        id: Date.now().toString(),
        classId: cls.id,
        title: newAct.title,
        stageId: newAct.stageId,
        maxPoints: newAct.maxPoints,
        date: new Date().toISOString().split('T')[0]
    });
    setActivityModalOpen(false);
    refreshData();
    notify('success', 'Atividade criada com sucesso');
  };

  const handleGradeChange = (activityId: string, studentId: string, val: string) => {
    const num = parseFloat(val);
    const activity = activities.find(a => a.id === activityId);
    if (!activity || isNaN(num) || num < 0 || num > activity.maxPoints) return;
    
    db.grades.setGrade(activityId, studentId, num);
    refreshData();
  };

  const getGrade = (activityId: string, studentId: string) => {
    return grades.find(g => g.activityId === activityId && g.studentId === studentId)?.value ?? '';
  };

  // --- Handlers for Import/Export ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    setIsImporting(true);
    try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: any[][] = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        
        let count = 0;
        rows.forEach((row, index) => {
            const name = row[0]; // Assuming Column A is name
            if (!name || typeof name !== 'string') return;
            // Simple check to skip header if it says "Name"
            if (index === 0 && (name.toLowerCase() === 'name' || name.toLowerCase() === 'nome')) return;

            // Generate fake email based on name if not provided
            const studentId = `s_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
            const email = `${name.toLowerCase().replace(/[^a-z]/g, '.')}@sas.student.com`;
            
            const newStudent: Student = {
                id: studentId,
                name: name.trim(),
                email: email,
                enrollmentDate: new Date().toISOString().split('T')[0]
            };
            
            // Avoid duplicates check could be added here
            db.students.add(newStudent);
            db.enrollments.enroll(id, studentId);
            count++;
        });

        refreshData();
        notify('success', `Importados ${count} alunos com sucesso.`);
    } catch (error) {
        console.error(error);
        notify('error', "Falha na importação. Verifique se o arquivo é .xlsx");
    } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleExport = () => {
      const data = students.map(s => {
          const row: any = { Nome: s.name, Email: s.email };
          // Add grades
          activities.forEach(a => {
              const g = grades.find(x => x.activityId === a.id && x.studentId === s.id);
              row[a.title] = g ? g.value : 0;
          });
          // Add stage totals
          cls.stages.forEach(stage => {
              let sum = 0;
              activities.filter(a => a.stageId === stage.id).forEach(a => {
                 const g = grades.find(x => x.activityId === a.id && x.studentId === s.id);
                 if(g) sum += g.value;
              });
              row[`Total ${stage.name}`] = sum;
          });
          return row;
      });

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Dados da Turma");
      XLSX.writeFile(wb, `${cls.name.replace(/ /g, '_')}_Relatorio.xlsx`);
      notify('success', "Relatório baixado com sucesso.");
  };

  // --- Handlers for Transfer ---
  const initiateTransfer = (student: Student) => {
      setStudentToTransfer(student);
      setTransferModalOpen(true);
      setTargetClassId(availableClasses[0]?.id || '');
  };

  const confirmTransfer = () => {
      if (!studentToTransfer || !targetClassId) return;
      db.students.transfer(studentToTransfer.id, id!, targetClassId);
      setTransferModalOpen(false);
      refreshData();
      notify('success', `${studentToTransfer.name} transferido com sucesso.`);
  };

  // --- Handlers for Feedback ---
  const handleFeedbackChange = (studentId: string, field: keyof Feedback, value: any) => {
      // Find existing or create placeholder
      let fb = feedbacks.find(f => f.studentId === studentId && f.stageId === selectedFeedbackStageId);
      if (!fb) {
          fb = {
              id: Date.now().toString(),
              studentId,
              classId: id!,
              stageId: selectedFeedbackStageId,
              attendance: 100,
              behavior: 'Excelente',
              participation: 'Média',
              homework: 'Completo',
              comments: '',
              updatedAt: new Date().toISOString()
          };
      }
      
      const updatedFb = { ...fb, [field]: value, updatedAt: new Date().toISOString() };
      db.feedbacks.save(updatedFb);
      // Local update for UI responsiveness
      const others = feedbacks.filter(f => !(f.studentId === studentId && f.stageId === selectedFeedbackStageId));
      setFeedbacks([...others, updatedFb]);
  };

  const getFeedback = (studentId: string) => {
      return feedbacks.find(f => f.studentId === studentId && f.stageId === selectedFeedbackStageId) || {
        attendance: 100,
        behavior: 'Excelente',
        participation: 'Média',
        homework: 'Completo',
        comments: ''
      };
  };

  return (
    <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
                <Link to="/classes" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={20} /></Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{cls.name}</h1>
                    <p className="text-gray-500 text-sm">{cls.schedule} • {cls.level}</p>
                </div>
            </div>
            <div className="flex space-x-2">
                 <Button variant="outline" onClick={handleExport} size="sm">
                     <Download size={16} className="mr-2" /> Exportar Relatório
                 </Button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {[
                { id: 'activities', label: 'Notas', icon: <Award size={16} /> },
                { id: 'students', label: 'Alunos', icon: <Users size={16} /> },
                { id: 'feedback', label: 'Feedback e Avaliação', icon: <MessageSquare size={16} /> },
                { id: 'settings', label: 'Configurações', icon: <Settings size={16} /> }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${
                        activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <span className="mr-2">{tab.icon}</span> {tab.label}
                </button>
            ))}
        </div>

        {/* --- GRADEBOOK TAB --- */}
        {activeTab === 'activities' && (
            <div className="space-y-8">
                {cls.stages.map(stage => {
                    const stageActs = activities.filter(a => a.stageId === stage.id);
                    const total = getStageTotal(stage.id);
                    const limit = stage.maxPoints;
                    
                    return (
                        <div key={stage.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-800">{stage.name}</h3>
                                    <div className="text-xs mt-1">
                                        Pontos Distribuídos: <span className={`${total > limit ? 'text-red-600 font-bold' : 'text-gray-600'}`}>{total}</span> / {limit}
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => {
                                    setNewAct({...newAct, stageId: stage.id});
                                    setActivityModalOpen(true);
                                }}>
                                    <Plus size={14} className="mr-1" /> Adicionar Atividade
                                </Button>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white text-gray-500 font-medium border-b">
                                        <tr>
                                            <th className="p-4 w-48 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Aluno</th>
                                            {stageActs.map(a => (
                                                <th key={a.id} className="p-4 text-center min-w-[100px]">
                                                    <div className="font-semibold text-gray-900">{a.title}</div>
                                                    <div className="text-xs font-normal">Max: {a.maxPoints}</div>
                                                </th>
                                            ))}
                                            {stageActs.length === 0 && <th className="p-4 italic font-normal text-gray-400">Nenhuma atividade nesta etapa</th>}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {students.map(stu => (
                                            <tr key={stu.id} className="hover:bg-gray-50">
                                                <td className="p-4 font-medium text-gray-900 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                                    {stu.name}
                                                </td>
                                                {stageActs.map(a => (
                                                    <td key={a.id} className="p-2 text-center">
                                                        <input 
                                                            type="number" 
                                                            className="w-16 p-1 text-center border border-gray-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                            value={getGrade(a.id, stu.id)}
                                                            onChange={(e) => handleGradeChange(a.id, stu.id, e.target.value)}
                                                            max={a.maxPoints}
                                                            min={0}
                                                        />
                                                    </td>
                                                ))}
                                                {stageActs.length === 0 && <td></td>}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}

        {/* --- STUDENTS TAB --- */}
        {activeTab === 'students' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="p-4">Nome</th>
                            <th className="p-4 hidden md:table-cell">Email</th>
                            <th className="p-4 hidden md:table-cell">Entrada</th>
                            <th className="p-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {students.map(s => (
                            <tr key={s.id}>
                                <td className="p-4 font-medium text-gray-900">{s.name}</td>
                                <td className="p-4 text-gray-500 hidden md:table-cell">{s.email}</td>
                                <td className="p-4 text-gray-500 hidden md:table-cell">{s.enrollmentDate}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button 
                                        onClick={() => initiateTransfer(s)}
                                        className="text-blue-600 hover:text-blue-800 text-xs font-medium bg-blue-50 px-2 py-1 rounded"
                                    >
                                        Transferir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                             <tr>
                                 <td colSpan={4} className="p-8 text-center text-gray-500">
                                     Nenhum aluno matriculado.
                                 </td>
                             </tr>
                        )}
                    </tbody>
                </table>
                 <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        accept=".xlsx,.xls" 
                        className="hidden" 
                    />
                    
                    <Button variant="outline" className="w-full md:w-auto" onClick={() => fileInputRef.current?.click()} isLoading={isImporting}>
                        <FileSpreadsheet size={16} className="mr-2 text-green-600" /> 
                        {isImporting ? 'Importando...' : 'Importar Excel (Col A)'}
                    </Button>

                    <Button variant="primary" className="w-full md:w-auto" onClick={() => {
                        const name = prompt("Nome do Aluno:");
                        if(name) {
                            const newS = {id: 's_'+Date.now(), name, email: 'manual@sas.com', enrollmentDate: new Date().toISOString().split('T')[0]};
                            db.students.add(newS);
                            db.enrollments.enroll(id!, newS.id);
                            refreshData();
                            notify('success', 'Aluno adicionado manualmente');
                        }
                    }}>
                        <Plus size={16} className="mr-2" /> Matricular Manualmente
                    </Button>
                </div>
            </div>
        )}

        {/* --- FEEDBACK TAB --- */}
        {activeTab === 'feedback' && (
            <div className="space-y-6">
                <div className="flex justify-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 w-fit mx-auto flex-wrap">
                    {cls.stages.map(stage => (
                        <button
                            key={stage.id}
                            onClick={() => setSelectedFeedbackStageId(stage.id)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors mb-2 sm:mb-0 ${
                                selectedFeedbackStageId === stage.id 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {stage.name}
                        </button>
                    ))}
                </div>

                {cls.stages.length === 0 ? (
                    <div className="text-center text-gray-500">Nenhuma etapa configurada. Configure as etapas primeiro.</div>
                ) : (
                <div className="grid gap-6">
                    {students.map(s => {
                        const fb = getFeedback(s.id);
                        return (
                            <div key={s.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-gray-900">{s.name}</h3>
                                    <span className="text-xs text-gray-400">Feedback da {cls.stages.find(st=>st.id === selectedFeedbackStageId)?.name}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Frequência (%)</label>
                                        <input 
                                            type="number" min="0" max="100" 
                                            className="w-full p-2 border rounded-lg text-sm"
                                            value={fb.attendance}
                                            onChange={(e) => handleFeedbackChange(s.id, 'attendance', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Comportamento</label>
                                        <select 
                                            className="w-full p-2 border rounded-lg text-sm bg-white"
                                            value={fb.behavior}
                                            onChange={(e) => handleFeedbackChange(s.id, 'behavior', e.target.value)}
                                        >
                                            <option>Excelente</option>
                                            <option>Bom</option>
                                            <option>Regular</option>
                                            <option>Ruim</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Participação</label>
                                        <select 
                                            className="w-full p-2 border rounded-lg text-sm bg-white"
                                            value={fb.participation}
                                            onChange={(e) => handleFeedbackChange(s.id, 'participation', e.target.value)}
                                        >
                                            <option>Alta</option>
                                            <option>Média</option>
                                            <option>Baixa</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Dever de Casa</label>
                                        <select 
                                            className="w-full p-2 border rounded-lg text-sm bg-white"
                                            value={fb.homework}
                                            onChange={(e) => handleFeedbackChange(s.id, 'homework', e.target.value)}
                                        >
                                            <option>Completo</option>
                                            <option>Parcial</option>
                                            <option>Não Fez</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Observações do Professor</label>
                                    <textarea 
                                        className="w-full p-2 border rounded-lg text-sm h-20 resize-none"
                                        placeholder="Feedback qualitativo sobre o aluno..."
                                        value={fb.comments}
                                        onChange={(e) => handleFeedbackChange(s.id, 'comments', e.target.value)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                )}
            </div>
        )}

        {/* --- SETTINGS TAB (Stage Management) --- */}
        {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-6">Configuração de Etapas de Avaliação</h3>
                
                <div className="space-y-4 mb-8">
                    {cls.stages.map(stage => (
                        <div key={stage.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <span className="font-medium text-gray-900">{stage.name}</span>
                                <span className="ml-3 text-sm text-gray-500">Max Pontos: {stage.maxPoints}</span>
                            </div>
                            <button 
                                onClick={() => handleDeleteStage(stage.id)}
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {cls.stages.length === 0 && <p className="text-gray-400 italic">Nenhuma etapa configurada.</p>}
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Adicionar Nova Etapa</h4>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-xs text-gray-500 mb-1">Nome da Etapa</label>
                            <input 
                                className="w-full border p-2 rounded text-sm" 
                                placeholder="Ex: 4ª Etapa / Recuperação"
                                value={newStageName}
                                onChange={e => setNewStageName(e.target.value)}
                            />
                        </div>
                        <div className="w-32">
                            <label className="block text-xs text-gray-500 mb-1">Max Pontos</label>
                            <input 
                                type="number" 
                                className="w-full border p-2 rounded text-sm" 
                                value={newStagePoints}
                                onChange={e => setNewStagePoints(parseInt(e.target.value))}
                            />
                        </div>
                        <Button onClick={handleAddStage} disabled={!newStageName}>
                            <Plus size={16} className="mr-2" /> Adicionar
                        </Button>
                    </div>
                </div>
            </div>
        )}

        {/* Activity Modal */}
        {isActivityModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Adicionar Atividade</h2>
                    <p className="text-sm text-gray-500 mb-4">Para: {cls.stages.find(s=>s.id===newAct.stageId)?.name}</p>
                    
                    {errorMsg && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start">
                            <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                            {errorMsg}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Título da Atividade</label>
                            <input className="w-full border p-2 rounded" value={newAct.title} onChange={e => setNewAct({...newAct, title: e.target.value})} placeholder="Ex: Teste de Vocabulário" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Pontuação Máxima</label>
                            <input type="number" className="w-full border p-2 rounded" value={newAct.maxPoints} onChange={e => setNewAct({...newAct, maxPoints: parseInt(e.target.value)})} />
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <Button variant="outline" onClick={() => setActivityModalOpen(false)}>Cancelar</Button>
                            <Button onClick={handleAddActivity}>Adicionar</Button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Transfer Modal */}
        {isTransferModalOpen && studentToTransfer && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
                    <h2 className="text-xl font-bold mb-2">Transferir Aluno</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Mover <span className="font-bold text-gray-900">{studentToTransfer.name}</span> para outra turma. 
                        O histórico nesta turma será preservado.
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Turma de Destino</label>
                            {availableClasses.length > 0 ? (
                                <select 
                                    className="w-full border p-2 rounded bg-white"
                                    value={targetClassId}
                                    onChange={(e) => setTargetClassId(e.target.value)}
                                >
                                    {availableClasses.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} ({c.level})</option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-red-500 text-sm">Nenhuma outra turma disponível.</p>
                            )}
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6">
                            <Button variant="outline" onClick={() => setTransferModalOpen(false)}>Cancelar</Button>
                            <Button onClick={confirmTransfer} disabled={availableClasses.length === 0}>
                                <RefreshCw size={16} className="mr-2" /> Confirmar Transferência
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ClassDetails;