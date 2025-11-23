import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { db } from '../services/mockDb';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    db.init(); // Initialize mock DB
    const stored = localStorage.getItem('sas_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, pass: string) => {
    // 1. Tenta encontrar no banco de dados (Alunos, Professores, Admin)
    const dbUser = db.users.find(email);
    
    if (dbUser) {
        // Verifica a senha (em produção usaria hash/bcrypt)
        if (dbUser.password === pass) {
            setUser(dbUser);
            localStorage.setItem('sas_user', JSON.stringify(dbUser));
            return true;
        }
    }

    // 2. Fallback para Admin Hardcoded (caso o seed não tenha rodado)
    if (email === 'admin@sas.com' && pass === 'admin123') {
      const u: User = { id: 'admin', name: 'Administrador', email, role: 'admin' };
      setUser(u);
      localStorage.setItem('sas_user', JSON.stringify(u));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sas_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);