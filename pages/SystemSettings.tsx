import React, { useState, useEffect, useRef } from 'react';
import { db } from '../services/mockDb';
import Button from '../components/Button';
import { Download, Upload, Database, Clock, RefreshCw, AlertTriangle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const SystemSettings: React.FC = () => {
  const { notify } = useNotification();
  const [lastBackupTime, setLastBackupTime] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check auto backup timestamp
    const ts = db.system.getLastBackupTime();
    if(ts) {
        setLastBackupTime(new Date(ts).toLocaleString());
    }
  }, []);

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

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
            <p className="text-gray-500 mt-1">Gerencie backups e restauração de dados.</p>
        </div>

        {/* Backup Status */}
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

            {/* Import Section */}
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
        </div>
    </div>
  );
};

export default SystemSettings;