import React, { useState, useEffect, useRef } from 'react';
import { db } from '../services/mockDb';
import { User } from '../types';
import Button from '../components/Button';
import { Download, Upload, Database, Clock, RefreshCw, AlertTriangle, Users, Plus, Trash2, Eye, EyeOff, ShieldCheck, GraduationCap, User as UserIcon, Lock, Image, X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const SystemSettings: React.FC = () => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const [activeTab, setActiveTab] = useState<'users' | 'backup' | 'branding'>('users');
  
  // Backup State
  const [lastBackupTime, setLastBackupTime] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // User Management State
  const [users, setUsers] = useState<User[]>([]);
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  
  // New Teacher Form
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', password: '' });

  // Branding State
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);

  // SECURITY CHECK
  if (user?.role === 'student') {
      return <Navigate to="/grammar-book" replace />;
  }

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const ts = db.system.getLastBackupTime();
    if(ts) setLastBackupTime(new Date(ts).toLocaleString());
    setUsers(db.users.getAll());
    setCurrentLogo(db.system.getLogo());
  }, []);

  const refreshUsers = () => {
      setUsers(db.users.getAll());
  };

  // --- LOGO HANDLERS ---
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 500 * 1024) { // 500KB Safety Limit
          notify('error', 'Imagem muito grande. Use uma imagem menor que 500KB.');
          return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
          const base64 = reader.result as string;
          const success = db.system.setLogo(base64);
          
          if (success) {
              setCurrentLogo(base64);
              notify('success', 'Logo atualizada com sucesso!');
              // Only reload if safe
              setTimeout(() => window.location.reload(), 1500);
          } else {
              notify('error', 'Espaço de armazenamento cheio! Tente limpar dados ou usar uma imagem menor.');
          }
      };
      reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
      if(window.confirm('Deseja remover a logo personalizada?')) {
          db.system.removeLogo();
          setCurrentLogo(null);
          notify('info', 'Logo removida.');
          setTimeout(() => window.location.reload(), 1000);
      }
  };

  // --- BACKUP HANDLERS ---

  const handleDownloadBackup = () => {
    const json = db.system.backup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `SAS_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    notify('success', 'Backup baixado com sucesso!');
  };

  const handleDownloadAutoBackup = () => {
      const json = db.system.getAutoBackup();
      if(!json) {
          notify('error', 'Nenhum backup automático encontrado.');
          return;
      }
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `SAS_AutoBackup_Latest.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      notify('success', 'Backup automático baixado.');
  };

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if(!window.confirm("ATENÇÃO: Restaurar um backup substituirá TODOS os dados atuais. Deseja continuar?")) {
        if(fileInputRef.current) fileInputRef.current.value = '';
        return;
    }

    try {
        const text = await file.text();
        const success = db.system.restore(text);
        if(success) {
            notify('success', 'Sistema restaurado com sucesso! A página será recarregada.');
            setTimeout(() => window.location.reload(), 2000);
        } else {
            notify('error', 'Arquivo de backup inválido ou corrompido.');
        }
    } catch (err) {
        notify('error', 'Erro ao ler arquivo.');
    }
  };

  // --- USER HANDLERS ---

  const handleCreateTeacher = () => {
      if (!isAdmin) return;

      if(!newTeacher.name || !newTeacher.email || !newTeacher.password) {
          notify('error', 'Preencha todos os campos.');
          return;
      }
      
      const existing = users.find(u => u.email === newTeacher.email);
      if(existing) {
          notify('error', 'Email já cadastrado.');
          return;
      }

      const teacherUser: User = {
          id: `t_${Date.now()}`,
          name: newTeacher.name,
          email: newTeacher.email,
          role: 'teacher',
          password: newTeacher.password
      };

      db.users.add(teacherUser);
      notify('success', 'Professor cadastrado com sucesso.');
      setNewTeacher({ name: '', email: '', password: '' });
      refreshUsers();
  };

  const handleDeleteUser = (userId: string) => {
      if (!isAdmin) return;
      if(userId === 'admin') {
          notify('error', 'Não é possível remover o Administrador principal.');
          return;
      }
      if(window.confirm('Tem certeza que deseja remover este usuário?')) {
          db.users.delete(userId);
          refreshUsers();
          notify('info', 'Usuário removido.');
      }
  };

  const togglePassword = (userId: string) => {
      if (!isAdmin) return;
      setShowPasswords(prev => ({...prev, [userId]: !prev[userId]}));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Painel de Configurações</h1>
            <p className="text-gray-500 mt-1">Gerencie usuários, acessos e segurança dos dados.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 font-medium text-sm flex items-center transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                <Users size={18} className="mr-2" /> Gestão de Usuários
            </button>
            <button 
                onClick={() => setActiveTab('backup')}
                className={`px-6 py-3 font-medium text-sm flex items-center transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'backup' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                <Database size={18} className="mr-2" /> Backup & Restauração
            </button>
            {isAdmin && (
            <button 
                onClick={() => setActiveTab('branding')}
                className={`px-6 py-3 font-medium text-sm flex items-center transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'branding' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                <Image size={18} className="mr-2" /> Personalização (Logo)
            </button>
            )}
        </div>

        {/* --- USERS TAB --- */}
        {activeTab === 'users' && (
            <div className="space-y-8">
                
                {isAdmin && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Plus size={20} className="mr-2 text-blue-600" /> Cadastrar Novo Professor
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                <input 
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                    placeholder="Ex: Prof. João da Silva"
                                    value={newTeacher.name}
                                    onChange={e => setNewTeacher({...newTeacher, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email de Acesso</label>
                                <input 
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                    placeholder="joao@sas.com"
                                    value={newTeacher.email}
                                    onChange={e => setNewTeacher({...newTeacher, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Senha Inicial</label>
                                <div className="relative">
                                    <input 
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                        placeholder="******"
                                        type="text"
                                        value={newTeacher.password}
                                        onChange={e => setNewTeacher({...newTeacher, password: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={handleCreateTeacher}>
                                Cadastrar Professor
                            </Button>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-lg font-bold text-gray-900">Todos os Usuários</h2>
                        <p className="text-sm text-gray-500">
                            {isAdmin 
                             ? 'Visualizar e gerenciar credenciais de todos os usuários.' 
                             : 'Lista de usuários cadastrados no sistema.'}
                        </p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="p-4">Tipo</th>
                                    <th className="p-4">Nome</th>
                                    <th className="p-4">Email (Login)</th>
                                    <th className="p-4">Senha</th>
                                    {isAdmin && <th className="p-4 text-right">Ações</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            {u.role === 'admin' && <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold"><ShieldCheck size={12} className="mr-1"/> Admin</span>}
                                            {u.role === 'teacher' && <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold"><GraduationCap size={12} className="mr-1"/> Prof.</span>}
                                            {u.role === 'student' && <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"><UserIcon size={12} className="mr-1"/> Aluno</span>}
                                        </td>
                                        <td className="p-4 font-medium text-gray-900">{u.name}</td>
                                        <td className="p-4 text-gray-600">{u.email}</td>
                                        <td className="p-4">
                                            {isAdmin ? (
                                                <div className="flex items-center space-x-2">
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono">
                                                        {showPasswords[u.id] ? u.password : '••••••'}
                                                    </code>
                                                    <button 
                                                        onClick={() => togglePassword(u.id)}
                                                        className="bg-transparent text-gray-700 hover:text-gray-900 p-1 rounded transition-colors"
                                                        title={showPasswords[u.id] ? "Ocultar" : "Ver"}
                                                    >
                                                        {showPasswords[u.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-gray-400">
                                                    <Lock size={14} className="mr-2" />
                                                    <span>******</span>
                                                </div>
                                            )}
                                        </td>
                                        {isAdmin && (
                                            <td className="p-4 text-right">
                                                {u.role !== 'admin' && (
                                                    <button 
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Remover Usuário"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* --- BRANDING TAB (LOGO) --- */}
        {activeTab === 'branding' && isAdmin && (
            <div className="space-y-6 animate-fade-in">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <Image className="mr-2 text-blue-600" /> Logo da Instituição
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Faça upload de uma imagem para substituir o ícone padrão no login e na barra lateral.
                        <br/>Recomendado: Arquivo PNG com fundo transparente (Max 500KB).
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-1/3 flex flex-col items-center p-6 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                            <span className="text-xs font-bold text-gray-400 mb-4 uppercase">Pré-visualização Atual</span>
                            {currentLogo ? (
                                <img src={currentLogo} alt="Logo Atual" className="max-h-32 object-contain" />
                            ) : (
                                <div className="w-24 h-24 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                                    <GraduationCap size={48} />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <input 
                                type="file" 
                                ref={logoInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoUpload}
                            />
                            
                            <Button onClick={() => logoInputRef.current?.click()} className="w-full">
                                <Upload size={18} className="mr-2" /> Escolher Nova Imagem
                            </Button>

                            {currentLogo && (
                                <Button variant="outline" onClick={handleRemoveLogo} className="w-full text-red-600 hover:bg-red-50 border-red-200">
                                    <X size={18} className="mr-2" /> Remover Logo e Restaurar Padrão
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- BACKUP TAB --- */}
        {activeTab === 'backup' && (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <Database className="mr-2 text-blue-600" /> Status do Backup
                    </h2>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <Clock size={18} className="text-blue-500" />
                        <span>Backup Automático: <span className="font-semibold">{lastBackupTime || 'Ainda não executado'}</span> (Executa a cada 5 min)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Export Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">Exportar Dados</h2>
                            <p className="text-sm text-gray-500 mb-6">Baixe uma cópia completa de todas as turmas, alunos, notas e configurações para segurança.</p>
                            
                            <div className="space-y-3">
                                <Button onClick={handleDownloadBackup} className="w-full justify-between group">
                                    <span>Baixar Backup Atual</span>
                                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                                </Button>
                                
                                <Button variant="outline" onClick={handleDownloadAutoBackup} className="w-full justify-between group" disabled={!lastBackupTime}>
                                    <span>Baixar Último Automático</span>
                                    <RefreshCw size={18} className="group-hover:rotate-180 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Import Section - RESTRICTED TO ADMIN */}
                    {isAdmin && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">Restaurar Dados</h2>
                            <p className="text-sm text-gray-500 mb-6">Carregue um arquivo de backup (.json) para restaurar o sistema. Cuidado: Isso apagará os dados atuais.</p>
                            
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <div className="flex items-center">
                                    <AlertTriangle className="text-red-500 mr-2" size={20} />
                                    <p className="text-xs text-red-700 font-bold uppercase">Zona de Perigo</p>
                                </div>
                                <p className="text-xs text-red-600 mt-1">
                                    A restauração sobrescreve o banco de dados atual imediatamente.
                                </p>
                            </div>

                            <input 
                                type="file" 
                                ref={fileInputRef}
                                accept=".json"
                                onChange={handleRestore}
                                className="hidden"
                            />
                            
                            <Button variant="danger" onClick={() => fileInputRef.current?.click()} className="w-full justify-between">
                                <span>Carregar Arquivo de Backup</span>
                                <Upload size={18} />
                            </Button>
                        </div>
                    </div>
                    )}
                    
                    {!isAdmin && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400">
                             <p className="text-sm flex items-center"><Lock size={16} className="mr-2" /> Restauração restrita ao Administrador</p>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default SystemSettings;