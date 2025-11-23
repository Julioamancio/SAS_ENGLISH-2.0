import React, { useState } from 'react';
import { db, DEFAULT_STAGES } from '../services/mockDb';
import { ClassGroup } from '../types';
import Button from '../components/Button';
import { Plus, ChevronRight, Calendar, User } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Classes: React.FC = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<ClassGroup[]>(db.classes.getAll());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', level: 'A1', schedule: '' });

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
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Turmas</h1>
        <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} className="mr-2" /> Nova Turma
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
            <Link to={`/classes/${cls.id}`} key={cls.id} className="block group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-blue-300">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded mb-2">
                                {cls.level}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{cls.name}</h3>
                        </div>
                        <ChevronRight className="text-gray-400 group-hover:text-blue-500" />
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Calendar size={14} className="mr-2" />
                            {cls.schedule}
                        </div>
                        <div className="flex items-center">
                            <User size={14} className="mr-2" />
                            {db.students.getByClass(cls.id).length} Alunos
                        </div>
                    </div>
                </div>
            </Link>
        ))}
        {classes.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-400">
                Nenhuma turma cadastrada. Clique em "Nova Turma" para começar.
            </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4">Criar Nova Turma</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome da Turma</label>
                        <input className="w-full border p-2 rounded" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} placeholder="Ex: Inglês Intensivo" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Nível (CEFR)</label>
                        <select className="w-full border p-2 rounded bg-white" value={newClass.level} onChange={e => setNewClass({...newClass, level: e.target.value})}>
                            <option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Horário</label>
                        <input className="w-full border p-2 rounded" value={newClass.schedule} onChange={e => setNewClass({...newClass, schedule: e.target.value})} placeholder="Ex: Seg/Qua 10:00" />
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleAddClass}>Criar</Button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Classes;