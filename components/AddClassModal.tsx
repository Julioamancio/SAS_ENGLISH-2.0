
import React, { useState } from 'react';
import Button from './Button';

interface AddClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string, level: string, schedule: string) => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('A1');
    const [schedule, setSchedule] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (name) {
            onAdd(name, level, schedule);
            setName('');
            setLevel('A1');
            setSchedule('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Nova Turma Manual</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600">Nome da Turma</label>
                        <input 
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Ex: Inglês Avançado - C1"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600">Nível</label>
                        <select 
                            className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={level}
                            onChange={e => setLevel(e.target.value)}
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
                        <label className="block text-sm font-medium mb-1 text-gray-600">Horário</label>
                        <input 
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                            value={schedule}
                            onChange={e => setSchedule(e.target.value)}
                            placeholder="Ex: Seg/Qua 19:00"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleSubmit} disabled={!name.trim()}>Criar Turma</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClassModal;
