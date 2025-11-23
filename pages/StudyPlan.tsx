import React, { useState } from 'react';
import { createStudyPlan } from '../services/geminiService';
import { Difficulty, StudyPlan as IStudyPlan } from '../types';
import Button from '../components/Button';
import { Calendar, Target, Clock, Book } from 'lucide-react';

const StudyPlan: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState<Difficulty>(Difficulty.INTERMEDIATE);
  const [days, setDays] = useState(3);
  const [plan, setPlan] = useState<IStudyPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const result = await createStudyPlan(goal, level, days);
      setPlan(result);
    } catch (e) {
      alert("Could not create plan. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {!plan ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
               <Calendar size={32} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900">Create Your Study Plan</h2>
             <p className="text-gray-500 mt-2">Tell us your goals, and SAS AI will build a schedule for you.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What is your main goal?</label>
              <textarea 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Prepare for a job interview, Learn travel vocabulary, Master past tenses..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Level</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value as Difficulty)}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white"
                >
                  <option value={Difficulty.BEGINNER}>Beginner</option>
                  <option value={Difficulty.INTERMEDIATE}>Intermediate</option>
                  <option value={Difficulty.ADVANCED}>Advanced</option>
                </select>
               </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                <select 
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white"
                >
                  <option value={3}>3 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={7}>7 Days</option>
                </select>
               </div>
            </div>

            <Button onClick={handleCreate} isLoading={loading} disabled={!goal} className="w-full py-3 text-lg">
               Generate My Plan
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                 <span className="flex items-center"><Target size={16} className="mr-1"/> {level}</span>
                 <span className="flex items-center"><Clock size={16} className="mr-1"/> {days} Days</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => setPlan(null)}>Create New</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {plan.schedule.map((day, idx) => (
               <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                  <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                     <h3 className="font-bold text-gray-800">{day.day}</h3>
                     <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{day.focus}</span>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-3">
                      {day.activities.map((act, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <Book className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlan;