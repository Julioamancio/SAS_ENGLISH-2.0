import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
      {notifications.map(n => (
        <div 
            key={n.id} 
            className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 min-w-[300px] animate-slide-in bg-white
                ${n.type === 'success' ? 'border-green-500' : 
                  n.type === 'error' ? 'border-red-500' : 'border-blue-500'}`}
        >
            <div className={`mr-3 ${
                n.type === 'success' ? 'text-green-500' : 
                n.type === 'error' ? 'text-red-500' : 'text-blue-500'
            }`}>
                {n.type === 'success' && <CheckCircle size={20} />}
                {n.type === 'error' && <AlertCircle size={20} />}
                {n.type === 'info' && <Info size={20} />}
            </div>
            <p className="flex-1 text-sm font-medium text-gray-800">{n.message}</p>
            <button 
                onClick={() => removeNotification(n.id)}
                className="ml-4 text-gray-400 hover:text-gray-600"
            >
                <X size={16} />
            </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;