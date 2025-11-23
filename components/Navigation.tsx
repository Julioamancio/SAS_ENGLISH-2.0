import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Painel" },
    { to: "/classes", icon: <Users size={20} />, label: "Turmas e Alunos" },
    { to: "/ai-tools", icon: <BookOpen size={20} />, label: "Ferramentas IA" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:relative md:w-64 md:h-screen md:flex-col md:border-r md:border-t-0 flex justify-between md:justify-start">
      <div className="hidden md:flex flex-col p-6 border-b border-gray-100 mb-4">
        <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-700 rounded-lg mr-3 flex items-center justify-center text-white font-bold">
                <GraduationCap size={18} />
            </div>
            <span className="text-xl font-bold text-gray-800">SAS English</span>
        </div>
        <div className="mt-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {user?.role === 'admin' ? 'Administrador' : 'Professor'}
        </div>
      </div>
      
      <div className="flex md:flex-col w-full px-2 md:px-4 py-2 md:py-0 md:space-y-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center md:space-x-3 p-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 
              ${isActive 
                ? 'text-blue-700 bg-blue-50 font-medium' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`
            }
          >
            {item.icon}
            <span className="text-xs md:text-sm mt-1 md:mt-0">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="hidden md:block p-4 border-t border-gray-100">
        <button 
            onClick={logout}
            className="flex items-center space-x-3 w-full p-2 px-4 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
            <LogOut size={20} />
            <span className="text-sm">Sair</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;