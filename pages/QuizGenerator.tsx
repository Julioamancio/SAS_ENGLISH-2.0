import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';
import { Difficulty, QuizQuestion } from '../types';
import Button from '../components/Button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

const QuizGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.INTERMEDIATE);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setShowResults(false);
    setAnswers({});
    setQuestions([]);
    
    try {
      const qs = await generateQuiz(topic, difficulty);
      setQuestions(qs);
    } catch (e) {
      alert("Failed to generate quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (qIndex: number, option: string) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    setShowResults(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Quiz Generator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Present Perfect, Business Vocabulary, Travel"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value={Difficulty.BEGINNER}>Beginner</option>
              <option value={Difficulty.INTERMEDIATE}>Intermediate</option>
              <option value={Difficulty.ADVANCED}>Advanced</option>
            </select>
          </div>
        </div>
        
        <Button onClick={handleGenerate} isLoading={loading} disabled={!topic} className="w-full md:w-auto">
          {loading ? 'Generating...' : 'Generate Quiz'}
        </Button>
      </div>

      {questions.length > 0 && (
        <div className="space-y-6">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.answer;
            const isSelected = !!answers[i];
            
            return (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800"><span className="text-blue-500 mr-2">Q{i+1}.</span>{q.question}</h3>
                  {showResults && (
                     isCorrect 
                     ? <CheckCircle className="text-green-500 flex-shrink-0" /> 
                     : <XCircle className="text-red-500 flex-shrink-0" />
                  )}
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, idx) => {
                    let btnClass = "w-full text-left p-3 rounded-lg border transition-all duration-200 ";
                    
                    if (showResults) {
                       if (opt === q.answer) {
                         btnClass += "bg-green-50 border-green-500 text-green-700 font-medium";
                       } else if (answers[i] === opt) {
                         btnClass += "bg-red-50 border-red-500 text-red-700";
                       } else {
                         btnClass += "border-gray-200 opacity-60";
                       }
                    } else {
                       if (answers[i] === opt) {
                         btnClass += "bg-blue-50 border-blue-500 text-blue-700";
                       } else {
                         btnClass += "border-gray-200 hover:bg-gray-50";
                       }
                    }

                    return (
                      <button 
                        key={idx}
                        onClick={() => handleOptionSelect(i, opt)}
                        disabled={showResults}
                        className={btnClass}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p><strong>Explanation:</strong> {q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {!showResults ? (
            <div className="flex justify-end">
               <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length}>
                 Check Answers
               </Button>
            </div>
          ) : (
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm uppercase tracking-wider font-semibold">Your Score</p>
                <p className="text-4xl font-bold">{Math.round((score / questions.length) * 100)}%</p>
                <p className="text-gray-400 text-sm mt-1">{score} out of {questions.length} correct</p>
              </div>
              <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="secondary">
                 <RefreshCw className="mr-2 h-4 w-4" /> Try New Topic
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;