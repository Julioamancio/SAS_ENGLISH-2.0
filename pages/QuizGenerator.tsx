import React, { useState, useEffect } from 'react';
import { generateQuiz } from '../services/geminiService';
import { Difficulty, QuizQuestion, QuizMode, QuizData, QuizAttempt } from '../types';
import { db } from '../services/mockDb';
import Button from '../components/Button';
import { CheckCircle, XCircle, RefreshCw, Trophy, BookOpen, Brain, Zap, ArrowRight, GraduationCap, ChevronDown, ChevronRight, FileText, Image as ImageIcon, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// --- DATA STRUCTURE FOR TOPICS ---

const GRAMMAR_TOPICS = {
  [Difficulty.A1]: [
    "Verb To Be (Am/Is/Are)", "Personal Pronouns", "Articles (A/An/The)", "Plurals", 
    "Possessives", "Basic Adjectives", "Present Simple", "Present Continuous", 
    "Modal Can/Can't", "Imperative", "Wh-Questions", "Prepositions of Place", "There is/are"
  ],
  [Difficulty.A2]: [
    "Past Simple", "Present Perfect (Experience)", "Future with Will", "Future with Going to",
    "Modals: Must/Mustn't/Have to", "Comparatives & Superlatives", "Adverbs of Frequency",
    "Basic Connectors (and, but, so)", "Too / Enough", "Countable/Uncountable"
  ],
  [Difficulty.B1]: [
    "Present Perfect (Full Usage)", "Past Continuous", "Past Perfect", "Used to",
    "Passive Voice (Intro)", "First Conditional", "Zero Conditional", "Gerund vs Infinitive",
    "Relative Clauses (Defining)", "Reported Speech (Basic)", "Phrasal Verbs (Common)"
  ],
  [Difficulty.B2]: [
    "Past Perfect Continuous", "Second Conditional", "Third Conditional", "Mixed Conditionals",
    "Modals of Deduction (Must/Might/Can't)", "Passive Voice (Advanced)", "Non-defining Relative Clauses",
    "Cleft Sentences", "Wish / If only"
  ],
  [Difficulty.C1]: [
    "Inversion (Never have I...)", "Fronting", "Reduced Relative Clauses", "Nominalization",
    "Passive Reporting Structures", "Past Modals of Deduction (Should have...)", "Complex Collocations"
  ],
  [Difficulty.C2]: [
    "The Subjunctive", "Ellipsis & Substitution", "Complex Inversion", "Literary Structures",
    "Nuanced Tense Manipulation", "Academic Register"
  ]
};

const ENEM_TOPICS = {
  "Gêneros Visuais & Humor": [
    "Tirinha / Charge (Cartoon)", "Cartum", "Propaganda / Publicidade", "Infográfico / Tabela", "HQ / Comics"
  ],
  "Jornalismo & Ciência": [
    "Artigo de Divulgação Científica", "Reportagem / Notícia", "Artigo de Opinião", "Manchetes (Headlines)"
  ],
  "Literatura & Artes": [
    "Poema / Canção (Lyrics)", "Crônica", "Texto Biográfico", "Resenha Crítica"
  ],
  "Humanidades": [
    "Texto Filosófico/Sociológico", "Documento Histórico", "Manifesto"
  ]
};

const QuizGenerator: React.FC = () => {
  // Config State
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.B1);
  const [mode, setMode] = useState<QuizMode>('grammar');
  const [selectedTopic, setSelectedTopic] = useState('');
  
  // UI State for Selection
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Game State
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Player Stats
  const [playerStats, setPlayerStats] = useState(db.quiz.getUserStats());
  const [earnedXP, setEarnedXP] = useState(0);

  useEffect(() => {
    // Refresh stats on mount
    setPlayerStats(db.quiz.getUserStats());
  }, []);

  const handleGenerate = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    setQuizData(null);
    setAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setEarnedXP(0);
    
    try {
      const data = await generateQuiz(selectedTopic, difficulty, mode);
      setQuizData(data);
    } catch (e) {
      alert("Falha ao gerar quiz. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleNext = () => {
      if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
      } else {
          handleSubmit();
      }
  };

  const handleSubmit = () => {
    if (!quizData) return;
    
    let correctCount = 0;
    quizData.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correctCount++;
    });

    // Calculate XP
    let xp = correctCount * 10;
    if (correctCount === quizData.questions.length && quizData.questions.length > 0) {
        xp += 50;
    }

    const attempt: QuizAttempt = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mode: quizData.mode,
        level: quizData.level,
        score: correctCount,
        totalQuestions: quizData.questions.length,
        xpEarned: xp
    };

    db.quiz.saveAttempt(attempt);
    setPlayerStats(db.quiz.getUserStats()); // Update UI immediately
    setEarnedXP(xp);
    setIsSubmitted(true);
  };

  // --- RENDER HELPERS ---

  // 1. Stats Bar
  const renderStatsBar = () => (
      <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-xl p-4 text-white shadow-lg mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg">
                 <Trophy className="text-yellow-400" size={24} />
              </div>
              <div>
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Nível {playerStats.level}</p>
                  <p className="font-bold text-lg">{playerStats.totalXP < 500 ? 'Iniciante' : 'Veterano'}</p>
              </div>
          </div>
          
          <div className="flex-1 mx-8 hidden md:block">
              <div className="flex justify-between text-xs mb-1 text-blue-200">
                  <span>Progresso</span>
                  <span>{playerStats.progress} / 500 XP</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2.5">
                  <div 
                    className="bg-yellow-400 h-2.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${(playerStats.progress / 500) * 100}%` }}
                  ></div>
              </div>
          </div>

          <div className="text-right">
              <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Total XP</p>
              <p className="font-bold text-2xl text-yellow-400">{playerStats.totalXP}</p>
          </div>
      </div>
  );

  // 2. Configuration Screen
  if (!quizData && !loading) {
      return (
          <div className="max-w-5xl mx-auto animate-fade-in">
              {renderStatsBar()}
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT: Config Panel */}
                  <div className="lg:col-span-4 space-y-6">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                              <Zap className="text-yellow-500 mr-2" /> Configuração
                          </h2>

                          {/* Level Selector */}
                          <div className="mb-6">
                              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nível CEFR</label>
                              <div className="grid grid-cols-3 gap-2">
                                  {Object.values(Difficulty).map((lvl) => (
                                      <button
                                          key={lvl}
                                          onClick={() => { setDifficulty(lvl); setSelectedTopic(''); }}
                                          className={`py-2 rounded-lg font-bold text-sm transition-all ${
                                              difficulty === lvl 
                                              ? 'bg-blue-600 text-white shadow-md' 
                                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                          }`}
                                      >
                                          {lvl}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          {/* Mode Selector */}
                          <div className="mb-6">
                              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Modo de Treino</label>
                              <div className="space-y-2">
                                  <button
                                      onClick={() => { setMode('grammar'); setSelectedTopic(''); }}
                                      className={`w-full p-3 rounded-xl border flex items-center transition-all ${
                                          mode === 'grammar' 
                                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' 
                                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                      }`}
                                  >
                                      <Brain size={18} className="mr-3" /> Gramática & Regras
                                  </button>
                                  <button
                                      onClick={() => { setMode('enem'); setSelectedTopic(''); }}
                                      className={`w-full p-3 rounded-xl border flex items-center transition-all ${
                                          mode === 'enem' 
                                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold' 
                                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                      }`}
                                  >
                                      <GraduationCap size={18} className="mr-3" /> Preparatório ENEM
                                  </button>
                                  <button
                                      onClick={() => { setMode('reading'); setSelectedTopic(''); }}
                                      className={`w-full p-3 rounded-xl border flex items-center transition-all ${
                                          mode === 'reading' 
                                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' 
                                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                      }`}
                                  >
                                      <BookOpen size={18} className="mr-3" /> Interpretação
                                  </button>
                              </div>
                          </div>
                      </div>
                      
                      <Button 
                        onClick={handleGenerate} 
                        disabled={!selectedTopic} 
                        className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                      >
                          Iniciar Quiz <ArrowRight className="ml-2" />
                      </Button>
                  </div>

                  {/* RIGHT: Topic Selection */}
                  <div className="lg:col-span-8">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                          <h2 className="text-xl font-bold text-gray-900 mb-2">
                              {mode === 'grammar' ? `Tópicos de Gramática - ${difficulty}` : mode === 'enem' ? 'Gêneros Textuais ENEM' : 'Selecione um Tema'}
                          </h2>
                          <p className="text-gray-500 text-sm mb-6">Selecione o assunto específico para a IA gerar seu exercício.</p>
                          
                          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                              
                              {mode === 'grammar' && GRAMMAR_TOPICS[difficulty]?.map((topic, i) => (
                                  <button
                                      key={i}
                                      onClick={() => setSelectedTopic(topic)}
                                      className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${
                                          selectedTopic === topic
                                          ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                                          : 'border-gray-100 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
                                      }`}
                                  >
                                      <span className="font-medium">{topic}</span>
                                      {selectedTopic === topic && <CheckCircle size={18} />}
                                  </button>
                              ))}

                              {mode === 'enem' && Object.entries(ENEM_TOPICS).map(([category, topics]) => (
                                  <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
                                      <button 
                                        onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 font-bold text-gray-800"
                                      >
                                          <span>{category}</span>
                                          {expandedCategory === category ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                      </button>
                                      
                                      {expandedCategory === category && (
                                          <div className="p-2 space-y-1 bg-white">
                                              {topics.map(topic => (
                                                  <button
                                                      key={topic}
                                                      onClick={() => setSelectedTopic(topic)}
                                                      className={`w-full text-left p-3 rounded-lg text-sm transition-all flex justify-between items-center ${
                                                          selectedTopic === topic
                                                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                                                          : 'text-gray-600 hover:bg-gray-50'
                                                      }`}
                                                  >
                                                      {topic}
                                                      {selectedTopic === topic && <CheckCircle size={16} />}
                                                  </button>
                                              ))}
                                          </div>
                                      )}
                                  </div>
                              ))}

                              {mode === 'reading' && (
                                  <div className="p-8 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                      <FileText size={48} className="mx-auto mb-4 opacity-20" />
                                      <p className="mb-4">Para interpretação, digite um tema livre:</p>
                                      <input 
                                        type="text" 
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Ex: Technology, Travel, History..."
                                        value={selectedTopic}
                                        onChange={(e) => setSelectedTopic(e.target.value)}
                                      />
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // 3. Loading Screen
  if (loading) {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
              <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <Zap className="absolute inset-0 m-auto text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Criando Desafio {mode === 'enem' ? 'ENEM' : ''}...</h3>
              <p className="text-gray-500 mt-2 text-center max-w-md">
                 {mode === 'enem' && ['Tirinha', 'Charge', 'Cartum', 'Propaganda', 'Infográfico'].some(t => selectedTopic.includes(t)) 
                    ? "Desenhando a imagem e formulando questões..."
                    : `IA gerando conteúdo sobre: "${selectedTopic}"`
                 }
              </p>
          </div>
      );
  }

  // 4. Results Screen
  if (isSubmitted && quizData) {
      const correctCount = quizData.questions.filter((q, i) => answers[i] === q.answer).length;
      const percentage = Math.round((correctCount / quizData.questions.length) * 100);
      
      return (
          <div className="max-w-3xl mx-auto animate-fade-in py-8">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center mb-8">
                  <div className={`p-10 ${percentage >= 70 ? 'bg-green-600' : 'bg-blue-600'} text-white relative overflow-hidden`}>
                      <div className="relative z-10">
                        <Trophy size={64} className="mx-auto mb-4 text-yellow-300 animate-bounce" />
                        <h2 className="text-4xl font-extrabold mb-2">
                            {percentage === 100 ? 'Perfeito!' : percentage >= 70 ? 'Ótimo Trabalho!' : 'Bom Esforço!'}
                        </h2>
                        <p className="text-white/80 text-lg">Você acertou {correctCount} de {quizData.questions.length} questões</p>
                      </div>
                  </div>
                  
                  <div className="p-8">
                      <Button onClick={() => setQuizData(null)} className="w-full py-3" size="lg">
                          <RefreshCw className="mr-2" /> Jogar Novamente
                      </Button>
                  </div>
              </div>

              {/* Review Section */}
              <div className="space-y-4">
                  <h3 className="font-bold text-gray-700 ml-2">Revisão das Respostas</h3>
                  {quizData.questions.map((q, i) => {
                      const isCorrect = answers[i] === q.answer;
                      return (
                          <div key={i} className={`bg-white p-6 rounded-xl border-l-4 shadow-sm ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                              <p className="font-medium text-gray-900 mb-3">{i+1}. {q.question}</p>
                              <div className="flex items-center text-sm">
                                  {isCorrect ? (
                                      <span className="flex items-center text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full">
                                          <CheckCircle size={16} className="mr-2" /> Sua resposta: {answers[i]}
                                      </span>
                                  ) : (
                                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                                          <span className="flex items-center text-red-700 font-bold bg-red-50 px-3 py-1 rounded-full">
                                              <XCircle size={16} className="mr-2" /> Sua resposta: {answers[i]}
                                          </span>
                                          <span className="hidden md:block text-gray-400">→</span>
                                          <span className="flex items-center text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full">
                                              Correto: {q.answer}
                                          </span>
                                      </div>
                                  )}
                              </div>
                              <div className="mt-3 text-sm text-gray-500 italic border-t pt-2">
                                  Explicação: {q.explanation}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      );
  }

  // 5. Active Game Screen
  const currentQ = quizData?.questions[currentQuestionIndex];
  
  if (!currentQ) return null;

  const hasReadingContent = (quizData?.mode === 'reading' || quizData?.mode === 'enem') && (quizData.passage || quizData.imageUrl);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6 animate-fade-in pb-4">
       
       {/* LEFT COLUMN: Context (Reading Passage / Visuals) */}
       {hasReadingContent && (
           <div className="md:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full">
               <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                   <h3 className="font-bold text-gray-800 flex items-center">
                       {quizData.imageUrl ? <ImageIcon size={20} className="mr-2 text-indigo-600" /> : <BookOpen size={20} className="mr-2 text-blue-600" />}
                       {quizData.mode === 'enem' ? (quizData.imageUrl ? 'Imagem de Referência' : 'Texto Base') : 'Reading Passage'}
                   </h3>
                   <span className="text-xs font-bold bg-white text-gray-600 px-2 py-1 rounded border border-gray-200">{difficulty}</span>
               </div>
               <div className="p-6 overflow-y-auto leading-loose text-lg text-gray-800 font-serif flex-1">
                   {quizData.imageUrl ? (
                       <div className="flex flex-col items-center justify-center h-full">
                           <img 
                            src={quizData.imageUrl} 
                            alt="Generated visual context" 
                            className="max-w-full h-auto rounded-lg shadow-md border border-gray-100 object-contain max-h-[500px]"
                           />
                           <p className="text-xs text-gray-400 mt-2 italic">Imagem gerada por IA para fins educacionais</p>
                       </div>
                   ) : (
                       <ReactMarkdown>{quizData.passage || ''}</ReactMarkdown>
                   )}
               </div>
           </div>
       )}

       {/* RIGHT COLUMN: Question Area */}
       <div className={`flex-1 flex flex-col ${hasReadingContent ? 'md:w-1/2' : 'max-w-3xl mx-auto w-full'}`}>
           
           {/* Enhanced Question Card */}
           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex-1 flex flex-col overflow-hidden relative">
               
               {/* 1. Header with Progress */}
               <div className="bg-gray-50 p-6 border-b border-gray-100">
                   <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                           {quizData?.mode === 'enem' ? 'ENEM CHALLENGE' : 'QUIZ MODE'}
                       </span>
                       <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs border border-blue-100">
                           {difficulty}
                       </span>
                   </div>
                   
                   <div className="flex justify-between items-end mb-3">
                        <h2 className="text-3xl font-black text-gray-900 leading-none">
                            <span className="text-gray-300 mr-2 text-xl font-medium">Questão</span> 
                            {String(currentQuestionIndex + 1).padStart(2, '0')}
                        </h2>
                        <span className="text-sm font-medium text-gray-400 mb-1">
                            de {String(quizData?.questions.length).padStart(2, '0')}
                        </span>
                   </div>

                   {/* Modern Progress Bar */}
                   <div className="flex space-x-1.5 h-1.5">
                       {quizData?.questions.map((_, idx) => (
                           <div 
                            key={idx} 
                            className={`flex-1 rounded-full transition-all duration-500 ${
                                idx === currentQuestionIndex ? 'bg-blue-600' : 
                                idx < currentQuestionIndex ? 'bg-green-400' : 'bg-gray-200'
                            }`} 
                           />
                       ))}
                   </div>
               </div>

               {/* 2. Question Text */}
               <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                   <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-snug">
                       {currentQ.question}
                   </h3>

                   {/* 3. Options List */}
                   <div className="space-y-3">
                       {currentQ.options.map((option, idx) => {
                           const isSelected = answers[currentQuestionIndex] === option;
                           const letter = String.fromCharCode(65 + idx); // A, B, C...
                           
                           return (
                               <button
                                   key={idx}
                                   onClick={() => handleOptionSelect(option)}
                                   className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center group relative pl-16
                                     ${isSelected 
                                       ? 'border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.01]' 
                                       : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm hover:bg-gray-50'
                                     }`}
                               >
                                   {/* Letter Badge */}
                                   <div className={`absolute left-4 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg transition-colors
                                       ${isSelected 
                                          ? 'bg-blue-600 text-white shadow-sm' 
                                          : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                       }`}>
                                       {isSelected ? <Check size={18} /> : letter}
                                   </div>

                                   <span className={`font-medium text-lg ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                                       {option}
                                   </span>
                               </button>
                           );
                       })}
                   </div>
               </div>

               {/* 4. Footer Actions */}
               <div className="p-6 bg-white border-t border-gray-50 flex justify-end">
                   <Button 
                    onClick={handleNext} 
                    disabled={!answers[currentQuestionIndex]}
                    size="lg"
                    className={`w-full md:w-auto px-10 py-4 text-lg font-bold shadow-lg transition-all ${
                        !answers[currentQuestionIndex] ? 'opacity-50' : 'hover:-translate-y-1 hover:shadow-xl'
                    }`}
                   >
                       {currentQuestionIndex < (quizData?.questions.length || 0) - 1 ? (
                           <>Próxima <ArrowRight className="ml-2" /></>
                       ) : (
                           <>Finalizar <Trophy className="ml-2" /></>
                       )}
                   </Button>
               </div>

           </div>
       </div>
    </div>
  );
};

export default QuizGenerator;