import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, LogOut, GraduationCap, Settings, Library } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/mockDb';

const Navigation: React.FC = () => {
  const { logout, user } = useAuth();
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
      const savedLogo = db.system.getLogo();
      if(savedLogo) setLogo(savedLogo);
  }, []);

  // Define permissions
  const isStudent = user?.role === 'student';
  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';

  const getNavItems = () => {
    const items = [];

    // 1. Dashboard & Classes (Admin & Teacher Only)
    if (isAdmin || isTeacher) {
        items.push({ to: "/", icon: <LayoutDashboard size={20} />, label: "Painel" });
        items.push({ to: "/classes", icon: <Users size={20} />, label: "Turmas e Alunos" });
    }

    // 2. Learning Tools (Everyone)
    items.push({ to: "/grammar-book", icon: <Library size={20} />, label: "Grammar Book" });
    items.push({ to: "/ai-tools", icon: <BookOpen size={20} />, label: "Ferramentas IA" });

    // 3. Settings (Admin & Teacher Only - Logic handled inside page for specific permissions)
    if (isAdmin || isTeacher) {
        items.push({ to: "/settings", icon: <Settings size={20} />, label: "Configurações" });
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:relative md:w-64 md:h-screen md:flex-col md:border-r md:border-t-0 flex justify-between md:justify-start">
      <div className="hidden md:flex flex-col p-6 border-b border-gray-100 mb-4">
        <div className="flex items-center">
            {logo ? (
                <img src={logo} alt="Logo" className="h-8 max-w-[150px] object-contain mr-2" />
            ) : (
                <div className="w-8 h-8 bg-blue-700 rounded-lg mr-3 flex items-center justify-center text-white font-bold flex-shrink-0">
                    <GraduationCap size={18} />
                </div>
            )}
            {!logo && <span className="text-xl font-bold text-gray-800">SAS English</span>}
        </div>
        <div className="mt-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {user?.role === 'admin' ? 'Administrador' : user?.role === 'teacher' ? 'Professor' : 'Aluno'}
        </div>
      </div>
      
      <div className="flex md:flex-col w-full px-2 md:px-4 py-2 md:py-0 md:space-y-2 flex-1 overflow-x-auto md:overflow-visible">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center md:space-x-3 p-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 whitespace-nowrap
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