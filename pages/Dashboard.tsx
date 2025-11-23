import React, { useEffect, useState } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { db } from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    classes: 0,
    students: 0,
    activities: 0,
    avgScore: 0
  });
  
  const [chartData, setChartData] = useState<{label: string, value: number, color: string}[]>([]);

  // SECURITY CHECK: Students cannot view dashboard
  if (user?.role === 'student') {
      return <Navigate to="/grammar-book" replace />;
  }

  useEffect(() => {
    // Force refresh DB data
    const classes = db.classes.getAll();
    const students = db.students.getAll();
    const allActivities = db.activities.getByClass(classes[0]?.id || ''); 
    
    const allGrades = db.grades.getAll();
    let totalScore = 0;
    if (allGrades.length > 0) {
        totalScore = allGrades.reduce((sum, g) => sum + g.value, 0);
    }
    const avg = allGrades.length > 0 ? Math.round((totalScore / allGrades.length) * 10) / 10 : 0;

    setStats({
      classes: classes.length,
      students: students.length,
      activities: allActivities.length + 5, // Simulated total
      avgScore: avg
    });

    // Prepare Chart Data (Students per Level)
    const levels: Record<string, number> = {};
    classes.forEach(c => {
        levels[c.level] = (levels[c.level] || 0) + db.students.getByClass(c.id).length;
    });

    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-red-500', 'bg-indigo-500'];
    const data = Object.keys(levels).map((lvl, idx) => ({
        label: lvl,
        value: levels[lvl],
        color: colors[idx % colors.length]
    }));
    
    setChartData(data);

  }, []);

  // Find max value for scaling charts
  const maxChartValue = Math.max(...chartData.map(d => d.value), 10);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel do {user?.role === 'admin' ? 'Administrador' : 'Professor'}</h1>
          <p className="text-gray-500 mt-1">Visão geral do desempenho escolar</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Users className="text-blue-600" />, label: "Alunos Ativos", value: stats.students.toString(), color: "bg-blue-50" },
          { icon: <GraduationCap className="text-indigo-600" />, label: "Total Turmas", value: stats.classes.toString(), color: "bg-indigo-50" },
          { icon: <BookOpen className="text-emerald-600" />, label: "Atividades", value: stats.activities.toString(), color: "bg-emerald-50" },
          { icon: <TrendingUp className="text-orange-600" />, label: "Média Notas", value: `${stats.avgScore}`, color: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CSS Only Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
           <h3 className="font-bold text-gray-900 mb-6">Distribuição de Alunos por Nível</h3>
           
           <div className="flex-1 flex items-end space-x-4 md:space-x-8 h-64 border-b border-gray-100 pb-2 px-2">
                {chartData.length > 0 ? chartData.map((d, i) => {
                    const heightPercent = (d.value / maxChartValue) * 100;
                    return (
                        <div key={i} className="flex flex-col items-center flex-1 group relative">
                            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded mb-2">
                                {d.value} Alunos
                            </div>
                            <div 
                                className={`w-full max-w-[60px] rounded-t-lg transition-all duration-500 ${d.color} hover:opacity-80`}
                                style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                            ></div>
                            <span className="mt-3 text-sm font-medium text-gray-600">{d.label}</span>
                        </div>
                    )
                }) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sem dados disponíveis
                    </div>
                )}
           </div>
        </div>

        {/* Recent Enrollments List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Matrículas Recentes</h3>
                <span className="text-xs text-blue-600 font-medium cursor-pointer">Ver Tudo</span>
           </div>
           <div className="space-y-4">
              {db.students.getAll().slice(-4).reverse().map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 text-xs font-bold shadow-sm">
                              {student.name.charAt(0)}
                          </div>
                          <div className="overflow-hidden">
                              <p className="font-medium text-sm text-gray-900 truncate">{student.name}</p>
                              <p className="text-xs text-gray-500 truncate">{student.email}</p>
                          </div>
                      </div>
                  </div>
              ))}
              {db.students.getAll().length === 0 && <p className="text-sm text-gray-400 text-center py-4">Nenhum aluno ainda.</p>}
           </div>
           
           <div className="mt-6 pt-4 border-t border-gray-100">
               <div className="flex items-center justify-between text-sm text-gray-500">
                   <span>Status do Sistema</span>
                   <span className="flex items-center text-green-600 font-medium">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                       Operacional
                   </span>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;