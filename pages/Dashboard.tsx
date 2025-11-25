import React, { useEffect, useState } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, Award, MessageSquare, Calendar, CheckCircle } from 'lucide-react';
import { db } from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import { ClassGroup, Feedback, Grade, Activity } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';

  // --- ADMIN / TEACHER STATE ---
  const [stats, setStats] = useState({
    classes: 0,
    students: 0,
    activities: 0,
    avgScore: 0
  });
  const [chartData, setChartData] = useState<{label: string, value: number, color: string}[]>([]);

  // --- STUDENT STATE ---
  const [studentClass, setStudentClass] = useState<ClassGroup | null>(null);
  const [studentGrades, setStudentGrades] = useState<{stage: string, score: number, total: number}[]>([]);
  const [studentFeedbacks, setStudentFeedbacks] = useState<Feedback[]>([]);
  const [studentAttendance, setStudentAttendance] = useState(100);

  useEffect(() => {
    // COMMON DATA REFRESH
    const classes = db.classes.getAll();
    const students = db.students.getAll();
    
    if (isStudent) {
        // --- STUDENT LOGIC ---
        // 1. Find the class the student is enrolled in
        const enrollments = db.enrollments.getAll();
        const myEnrollment = enrollments.find(e => e.studentId === user?.id && e.active);
        
        if (myEnrollment) {
            const myClass = classes.find(c => c.id === myEnrollment.classId);
            setStudentClass(myClass || null);

            if (myClass) {
                const activities = db.activities.getByClass(myClass.id);
                const allGrades = db.grades.getAll();
                const allFeedbacks = db.feedbacks.getAll();

                // Calculate Grades per Stage
                const gradesByStage = myClass.stages.map(stage => {
                    const stageActs = activities.filter(a => a.stageId === stage.id);
                    const stageActIds = stageActs.map(a => a.id);
                    
                    const myStageGrades = allGrades.filter(g => 
                        g.studentId === user?.id && stageActIds.includes(g.activityId)
                    );
                    
                    const score = myStageGrades.reduce((sum, g) => sum + g.value, 0);
                    const total = stageActs.reduce((sum, a) => sum + a.maxPoints, 0); // Points distributed so far
                    
                    return { stage: stage.name, score, total: stage.maxPoints }; // Use Stage Max Limit
                });
                setStudentGrades(gradesByStage);

                // Get Feedbacks
                const myFeedbacks = allFeedbacks.filter(f => f.studentId === user?.id && f.classId === myClass.id);
                setStudentFeedbacks(myFeedbacks);

                // Avg Attendance from Feedbacks
                if (myFeedbacks.length > 0) {
                    const totalAtt = myFeedbacks.reduce((sum, f) => sum + f.attendance, 0);
                    setStudentAttendance(Math.round(totalAtt / myFeedbacks.length));
                }
            }
        }

    } else {
        // --- ADMIN/TEACHER LOGIC ---
        const allActivities = db.activities.getAll();
        const allGrades = db.grades.getAll();
        
        let totalScore = 0;
        if (allGrades.length > 0) {
            totalScore = allGrades.reduce((sum, g) => sum + g.value, 0);
        }
        const avg = allGrades.length > 0 ? Math.round((totalScore / allGrades.length) * 10) / 10 : 0;

        setStats({
            classes: classes.length,
            students: students.length,
            activities: allActivities.length,
            avgScore: avg
        });

        // Chart Data
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
    }
  }, [user, isStudent]);

  // --- RENDER STUDENT DASHBOARD ---
  if (isStudent) {
      return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Olá, {user?.name}!</h1>
                <p className="text-blue-100 flex items-center">
                    <GraduationCap className="mr-2" size={20} />
                    {studentClass ? `Aluno da turma ${studentClass.name} (${studentClass.level})` : 'Você não está matriculado em nenhuma turma ativa.'}
                </p>
            </div>

            {studentClass && (
                <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Attendance Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Frequência Geral</p>
                            <h3 className={`text-3xl font-bold ${studentAttendance >= 75 ? 'text-green-600' : 'text-red-500'}`}>
                                {studentAttendance}%
                            </h3>
                        </div>
                        <div className={`p-3 rounded-full ${studentAttendance >= 75 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            <Calendar size={24} />
                        </div>
                    </div>

                    {/* Performance Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Situação Atual</p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {studentAttendance >= 75 ? 'Regular' : 'Atenção'}
                            </h3>
                        </div>
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <CheckCircle size={24} />
                        </div>
                    </div>
                    
                    {/* XP Card (Placeholder for now) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Grammar XP</p>
                            <h3 className="text-3xl font-bold text-amber-500">
                                {db.quiz.getUserStats().totalXP}
                            </h3>
                        </div>
                        <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                            <Award size={24} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Grades Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-800 flex items-center">
                                <Award className="mr-2 text-blue-600" size={20} /> Boletim Escolar
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {studentGrades.map((g, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">{g.stage}</span>
                                        <span className="font-bold text-gray-900">{g.score} / {g.total}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className={`h-2.5 rounded-full ${g.score >= g.total * 0.6 ? 'bg-green-500' : 'bg-red-500'}`} 
                                            style={{ width: `${Math.min(100, (g.score / g.total) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-900">Total Acumulado</span>
                                <span className="text-xl font-bold text-blue-700">
                                    {studentGrades.reduce((acc, curr) => acc + curr.score, 0)} / 100
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Feedbacks Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-800 flex items-center">
                                <MessageSquare className="mr-2 text-indigo-600" size={20} /> Feedbacks dos Professores
                            </h3>
                        </div>
                        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {studentFeedbacks.length > 0 ? studentFeedbacks.map((fb, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                                            {studentClass?.stages.find(s => s.id === fb.stageId)?.name}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                            fb.behavior === 'Excelente' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {fb.behavior}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm italic">"{fb.comments || 'Sem comentários adicionais.'}"</p>
                                    <div className="mt-2 pt-2 border-t border-gray-200 flex gap-4 text-xs text-gray-500">
                                        <span>Homework: <strong className="text-gray-700">{fb.homework}</strong></span>
                                        <span>Participação: <strong className="text-gray-700">{fb.participation}</strong></span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-400 text-center italic py-4">Nenhum feedback registrado ainda.</p>
                            )}
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
      );
  }

  // --- RENDER ADMIN / TEACHER DASHBOARD ---
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