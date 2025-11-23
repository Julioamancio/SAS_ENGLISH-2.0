import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Classes from './pages/Classes';
import ClassDetails from './pages/ClassDetails';
import QuizGenerator from './pages/QuizGenerator';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationToast from './components/NotificationToast';

const ProtectedLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navigation />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto h-screen relative">
        <NotificationToast />
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
        <AuthProvider>
        <HashRouter>
            <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/classes/:id" element={<ClassDetails />} />
                <Route path="/ai-tools" element={<QuizGenerator />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>
        </AuthProvider>
    </NotificationProvider>
  );
};

export default App;