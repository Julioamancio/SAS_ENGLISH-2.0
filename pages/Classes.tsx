
import React, { useState, useRef, useMemo } from 'react';
import { db, DEFAULT_STAGES } from '../services/mockDb';
import { ClassGroup, Student } from '../types';
import Button from '../components/Button';
import AddClassModal from '../components/AddClassModal';
import { Plus, ChevronRight, Calendar, User, FileSpreadsheet, Folder, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { importClassesFromExcel } from '../services/classImportService';

const Classes: React.FC = () => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const [classes, setClasses] = useState<ClassGroup[]>(db.classes.getAll());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<{[key: string]: boolean}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  if (user?.role === 'student') {
      return <Navigate to="/grammar-book" replace />;
  }

  const handleAddClass = (name: string, level: string, schedule: string) => {
    const cls: ClassGroup = {
        id: Date.now().toString(),
        name,
        level,
        schedule,
        teacherId: user?.id || 'admin',
        stages: DEFAULT_STAGES
    };
    db.classes.add(cls);
    setClasses(db.classes.getAll());
    setIsModalOpen(false);
    notify('success', 'Turma criada manualmente.');
  };

  // --- LÓGICA DE AGRUPAMENTO ---
  const groupedClasses = useMemo(() => {
      const filtered = classes.filter(cls => 
          cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.level.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const groups: {[key: string]: ClassGroup[]} = { 'Outras Turmas': [] };

      filtered.forEach(cls => {
          const name = cls.name.toLowerCase();
          let groupName = 'Outras Turmas';

          // DETECÇÃO RIGOROSA PARA GARANTIR PASTAS
          // 6º Ano
          if (name.includes('6.1') || name.includes('6,1') || 
              name.includes('6.2') || name.includes('6,2') || 
              name.includes('6.3') || name.includes('6,3')) {
              groupName = 'Turmas 6º Ano';
          }
          // 7º Ano
          else if (name.includes('7.1') || name.includes('7,1') || 
                   name.includes('7.2') || name.includes('7,2') || 
                   name.includes('7.3') || name.includes('7,3')) {
              groupName = 'Turmas 7º Ano';
          }
          // 8º Ano
          else if (name.includes('8.1') || name.includes('8,1') || 
                   name.includes('8.2') || name.includes('8,2') || 
                   name.includes('8.3') || name.includes('8,3')) {
              groupName = 'Turmas 8º Ano';
          }
          // 9º Ano (FORÇADO PARA APARECER NO DROPDOWN)
          else if (name.includes('9.1') || name.includes('9,1') || 
                   name.includes('9.2') || name.includes('9,2') || 
                   name.includes('9.3') || name.includes('9,3')) {
              groupName = 'Turmas 9º Ano';
          }
          // Ensino Médio
          else if (name.includes('1.1') || name.includes('1.2') || name.includes('1.3')) {
              groupName = 'Turmas 1ª Série EM';
          }
          else if (name.includes('2.1') || name.includes('2.2') || name.includes('2.3')) {
              groupName = 'Turmas 2ª Série EM';
          }
          else if (name.includes('3.1') || name.includes('3.2') || name.includes('3.3')) {
              groupName = 'Turmas 3ª Série EM';
          }
          // Fallback CEFR
          else {
              if (cls.level.startsWith('A')) groupName = 'Nível Básico (A1/A2)';
              else if (cls.level.startsWith('B')) groupName = 'Nível Intermediário (B1/B2)';
              else if (cls.level.startsWith('C')) groupName = 'Nível Avançado (C1/C2)';
          }

          if (!groups[groupName]) groups[groupName] = [];
          groups[groupName].push(cls);
      });

      // Sort Alphabetically inside groups
      Object.keys(groups).forEach(key => {
          groups[key].sort((a, b) => a.name.localeCompare(b.name));
      });

      if (groups['Outras Turmas'].length === 0) delete groups['Outras Turmas'];

      // Sort Folders (Logical School Order)
      const order = [
          'Turmas 6º Ano', 'Turmas 7º Ano', 'Turmas 8º Ano', 'Turmas 9º Ano', 
          'Turmas 1ª Série EM', 'Turmas 2ª Série EM', 'Turmas 3ª Série EM',
          'Nível Básico (A1/A2)', 'Nível Intermediário (B1/B2)', 'Nível Avançado (C1/C2)',
          'Outras Turmas'
      ];
      
      const orderedKeys = Object.keys(groups).sort((a, b) => {
          const idxA = order.indexOf(a);
          const idxB = order.indexOf(b);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
          if (idxA !== -1) return -1;
          if (idxB !== -1) return 1;
          return a.localeCompare(b);
      });

      return { groups, orderedKeys, total: filtered.length };
  }, [classes, searchTerm]);

  // Auto-expand logic for search
  useMemo(() => {
      if (searchTerm) {
          const allOpen: any = {};
          groupedClasses.orderedKeys.forEach(k => allOpen[k] = true);
          setExpandedFolders(allOpen);
      }
  }, [searchTerm, groupedClasses.orderedKeys]);

  const toggleFolder = (group: string) => {
      setExpandedFolders(prev => ({...prev, [group]: !prev[group]}));
  };

  const handleBulkImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsImporting(true);
      try {
          const result = await importClassesFromExcel(file, user?.id || 'admin');
          setClasses(db.classes.getAll());
          notify('success', `Importação: ${result.classes} turmas e ${result.students} alunos.`);
          
          // Expand relevant folders after import
          setTimeout(() => {
             setExpandedFolders(prev => {
                 const newState = {...prev};
                 groupedClasses.orderedKeys.forEach(k => newState[k] = true);
                 return newState;
             });
          }, 500);

      } catch (error) {
          console.error(error);
          notify('error', 'Erro ao processar planilha.');
      } finally {
          setIsImporting(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
      }
  };

  return (
    <div className="space-y-8 animate-fade-in pt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Turmas e Alunos</h1>
            <p className="text-gray-500 text-lg">Gerencie o ano letivo e os agrupamentos.</p>
        </div>
        
        <div className="flex space-x-3">
            <input type="file" ref={fileInputRef} onChange={handleBulkImport} accept=".xlsx,.xls" className="hidden" />
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()} isLoading={isImporting}>
                <FileSpreadsheet size={18} className="mr-2" /> Importar Geral
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
                <Plus size={18} className="mr-2" /> Nova Turma
            </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-gray-100 border-transparent focus:bg-white border-2 focus:border-blue-500 rounded-2xl outline-none transition-all text-gray-800 placeholder-gray-400 text-base"
              placeholder="Buscar por professor, nível (ex: 9.1) ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      {/* Folders List */}
      <div className="space-y-6">
        {groupedClasses.orderedKeys.map(groupName => (
            <div key={groupName} className="bg-white rounded-3xl overflow-hidden shadow-soft transition-all duration-300 border border-transparent hover:border-gray-100">
                <button 
                    onClick={() => toggleFolder(groupName)}
                    className={`w-full flex items-center justify-between p-6 transition-colors cursor-pointer select-none ${expandedFolders[groupName] ? 'bg-gray-50/50' : 'hover:bg-gray-50'}`}
                >
                    <div className="flex items-center font-bold text-gray-800 text-lg">
                        <div className={`mr-4 p-2.5 rounded-xl ${groupName.includes('EM') ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
                            <Folder size={24} fill="currentColor" fillOpacity={0.2} />
                        </div>
                        {groupName}
                        <span className="ml-4 text-xs font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                            {groupedClasses.groups[groupName].length} turmas
                        </span>
                    </div>
                    <div className={`bg-gray-100 p-2 rounded-full text-gray-400 transition-transform duration-300 ${expandedFolders[groupName] ? 'rotate-180 bg-gray-200 text-gray-600' : ''}`}>
                        <ChevronDown size={20} />
                    </div>
                </button>

                {expandedFolders[groupName] && (
                    <div className="p-6 md:p-8 bg-white border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in">
                        {groupedClasses.groups[groupName].map(cls => (
                            <Link to={`/classes/${cls.id}`} key={cls.id} className="block group">
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden hover:-translate-y-1">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${cls.level.startsWith('A') ? 'bg-green-400' : cls.level.startsWith('B') ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
                                    <div>
                                        <div className="flex justify-between items-start mb-3 pl-2">
                                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wide ${
                                                cls.level.startsWith('A') ? 'bg-green-50 text-green-700' :
                                                cls.level.startsWith('B') ? 'bg-blue-50 text-blue-700' :
                                                'bg-purple-50 text-purple-700'
                                            }`}>
                                                {cls.level}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-tight pl-2 mb-1 transition-colors" title={cls.name}>
                                            {cls.name}
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-3 text-sm text-gray-500 pt-4 border-t border-gray-50 mt-4 pl-2">
                                        <div className="flex items-center">
                                            <User size={16} className="mr-2 text-gray-300" />
                                            <span className="font-medium text-gray-600">{db.students.getByClass(cls.id).length} Alunos</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar size={16} className="mr-2 text-gray-300" />
                                            <span className="text-gray-500 truncate">{cls.schedule || 'Horário a definir'}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        ))}

        {classes.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Folder size={40} className="text-gray-300" />
                </div>
                <p className="text-lg font-medium text-gray-500">Sua escola está vazia.</p>
                <p className="text-sm mt-2">Comece importando uma planilha ou criando uma turma.</p>
            </div>
        )}
      </div>

      <AddClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddClass} />
    </div>
  );
};

export default Classes;
