
import React, { useState, useEffect } from 'react';
import { Book, ArrowRight, Zap, CheckCircle, HelpCircle, MinusCircle, PlusCircle, Bookmark, LayoutGrid, List, Clock, User, Link, Layers, AlertTriangle, Lightbulb, XCircle, MapPin, Hash, MessageCircle, Split, ArrowUpLeft, Calendar, Type, Check, Music, Star, Smile, RefreshCw, GitMerge, Fingerprint, Shuffle, Percent, Scale, MessageSquare, Anchor, PenTool, Monitor, Quote, AlignLeft, Box, Scissors } from 'lucide-react';
import { GrammarTopic, LevelData } from '../types';

// Importing Data Modules
import { A1_TOPICS } from '../data/grammar/a1';
import { A2_TOPICS } from '../data/grammar/a2';
import { B1_TOPICS } from '../data/grammar/b1';
import { B2_TOPICS } from '../data/grammar/b2';
import { C1_TOPICS } from '../data/grammar/c1';
import { C2_TOPICS } from '../data/grammar/c2';

// --- Icon Mapping Helper ---
const getIcon = (iconName: string, props: any = {}) => {
  const icons: {[key: string]: any} = {
    Book, Zap, Clock, User, Type, MapPin, HelpCircle, Layers, ArrowRight, AlertTriangle, Scale, Shuffle, Split, Lightbulb, Link, List, Star, MessageCircle, GitMerge, ArrowUpLeft, Scissors
  };
  const IconComponent = icons[iconName] || Book;
  return <IconComponent {...props} />;
};

// --- DATA CONTENT AGGREGATOR ---

const GRAMMAR_DATA: LevelData[] = [
  {
    id: 'A1',
    label: 'Beginner',
    color: 'text-green-600',
    bg: 'bg-green-600',
    borderColor: 'border-green-200',
    description: 'The essential foundation: Verbs, Structures, and Fundamental Vocabulary.',
    topics: A1_TOPICS
  },
  {
    id: 'A2',
    label: 'Elementary',
    color: 'text-teal-600',
    bg: 'bg-teal-600',
    borderColor: 'border-teal-200',
    description: 'Past events, Future plans, Modals, and Life Experiences.',
    topics: A2_TOPICS
  },
  {
    id: 'B1',
    label: 'Intermediate',
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    borderColor: 'border-blue-200',
    description: 'Complex Tenses, Passive Voice, Conditionals, and Extended Vocabulary.',
    topics: B1_TOPICS
  },
  {
      id: 'B2',
      label: 'Upper-Int',
      color: 'text-indigo-600',
      bg: 'bg-indigo-600',
      borderColor: 'border-indigo-200',
      description: 'Advanced structures for fluent communication. Complex Tenses, Modals, and Conditionals.',
      topics: B2_TOPICS
  },
  {
      id: 'C1',
      label: 'Advanced',
      color: 'text-purple-600',
      bg: 'bg-purple-600',
      borderColor: 'border-purple-200',
      description: 'Refined grammar for professional and academic use. Precision and nuance.',
      topics: C1_TOPICS
  },
  {
      id: 'C2',
      label: 'Proficiency',
      color: 'text-pink-600',
      bg: 'bg-pink-600',
      borderColor: 'border-pink-200',
      description: 'Near-native command of nuance, style, and rhetorical structures.',
      topics: C2_TOPICS
  }
];

const GrammarBook: React.FC = () => {
  const [selectedLevelId, setSelectedLevelId] = useState('A1');
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  
  // Progress State
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    try {
        const saved = localStorage.getItem('sas_grammar_progress');
        return new Set(saved ? JSON.parse(saved) : []);
    } catch (e) {
        return new Set();
    }
  });

  // Effect to mark as completed when viewed
  useEffect(() => {
    if (selectedTopic && !completedTopics.has(selectedTopic.id)) {
        const newSet = new Set(completedTopics);
        newSet.add(selectedTopic.id);
        setCompletedTopics(newSet);
        localStorage.setItem('sas_grammar_progress', JSON.stringify(Array.from(newSet)));
    }
  }, [selectedTopic, completedTopics]);

  const currentLevel = GRAMMAR_DATA.find(l => l.id === selectedLevelId) || GRAMMAR_DATA[0];

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 animate-fade-in pb-20 md:pb-0">
      {/* Sidebar / Level Selector */}
      <div className="md:w-64 flex-shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 custom-scrollbar">
        <h2 className="hidden md:flex text-xl font-bold text-gray-900 mb-4 px-2 items-center">
            <Book className="mr-2 text-blue-600" /> Grammar
        </h2>
        {GRAMMAR_DATA.map(level => (
          <button
            key={level.id}
            onClick={() => { setSelectedLevelId(level.id); setSelectedTopic(null); }}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 whitespace-nowrap border
              ${selectedLevelId === level.id 
                ? `${level.bg} text-white border-transparent shadow-md transform scale-105` 
                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
              }`}
          >
            <span className={`w-8 h-8 rounded-md flex items-center justify-center font-bold mr-3 text-sm 
               ${selectedLevelId === level.id ? 'bg-white/20 text-white' : `${level.bg} text-white`}`}>
              {level.id}
            </span>
            <div className="text-left">
                <span className="block font-bold text-sm leading-tight">{level.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {!selectedTopic ? (
          // Topic List View
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className={`mb-6 p-6 md:p-8 rounded-2xl text-white shadow-lg ${currentLevel.bg} relative overflow-hidden`}>
               <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                        {currentLevel.id} <span className="mx-3 opacity-50">|</span> {currentLevel.label}
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl">{currentLevel.description}</p>
               </div>
               <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                    <Bookmark size={200} />
               </div>
            </div>

            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
                <LayoutGrid className="mr-2" size={20} /> Available Topics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentLevel.topics.map(topic => (
                <button 
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 text-left flex flex-col h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${currentLevel.bg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  
                  {completedTopics.has(topic.id) && (
                      <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-sm z-10" title="Completed">
                          <CheckCircle size={16} className="text-green-500 fill-green-100" />
                      </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-lg ${currentLevel.bg} bg-opacity-10 text-${currentLevel.color.split('-')[1]}-600`}>
                        {getIcon(topic.iconName, { className: currentLevel.color, size: 20 })}
                     </div>
                     <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${currentLevel.bg} bg-opacity-10 ${currentLevel.color}`}>
                        {topic.summary}
                     </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{topic.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{topic.definition}</p>
                  
                  <div className="flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                     Start Lesson <ArrowRight size={16} className="ml-1" />
                  </div>
                </button>
              ))}
              {currentLevel.topics.length === 0 && (
                  <div className="col-span-full py-10 text-center text-gray-400 italic">
                      More topics coming soon for this level.
                  </div>
              )}
            </div>
          </div>
        ) : (
          // Detail View
          <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden animate-slide-in h-full">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
               <div className="flex items-center">
                  <button 
                    onClick={() => setSelectedTopic(null)}
                    className="mr-3 p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-blue-600 border border-transparent hover:border-gray-200"
                  >
                    <ArrowRight className="transform rotate-180" size={24} />
                  </button>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${currentLevel.bg}`}>
                            {currentLevel.id}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grammar Point</span>
                        {completedTopics.has(selectedTopic.id) && (
                            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                <Check size={12} className="mr-1" /> Completed
                            </span>
                        )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-none">{selectedTopic.title}</h2>
                  </div>
               </div>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
               
               {/* 1. Definition & Deep Dive */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <section className="lg:col-span-2 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 relative overflow-hidden">
                      <h3 className="flex items-center text-sm font-bold text-blue-600 uppercase tracking-wide mb-3 relative z-10">
                         <Book className="w-4 h-4 mr-2" /> Concept & Rules
                      </h3>
                      <p className="text-gray-900 text-lg font-bold mb-4 relative z-10">
                         {selectedTopic.definition}
                      </p>
                      {selectedTopic.deepDive && (
                        <ul className="space-y-2 relative z-10">
                            {selectedTopic.deepDive.map((point, i) => (
                                <li key={i} className="flex items-start text-gray-700 leading-relaxed">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                      )}
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                          {getIcon(selectedTopic.iconName, { size: 120 })}
                      </div>
                   </section>

                   <section className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 relative overflow-hidden">
                      <h3 className="flex items-center text-sm font-bold text-amber-600 uppercase tracking-wide mb-3 relative z-10">
                         <Zap className="w-4 h-4 mr-2" /> Signal Words
                      </h3>
                      <p className="text-xs text-amber-800/70 mb-3">Often used with:</p>
                      <div className="flex flex-wrap gap-2 relative z-10">
                         {selectedTopic.signalWords && selectedTopic.signalWords.length > 0 ? selectedTopic.signalWords.map((word, i) => (
                             <span key={i} className="px-3 py-1 bg-white border border-amber-200 text-amber-800 rounded-lg text-sm font-bold shadow-sm">
                                 {word}
                             </span>
                         )) : <span className="text-gray-400 italic text-sm">Context dependent</span>}
                      </div>
                   </section>
               </div>

               {/* 2. Common Mistakes (If Available) */}
               {selectedTopic.commonMistakes && selectedTopic.commonMistakes.length > 0 && (
                   <div className="bg-red-50 rounded-xl border border-red-100 p-6">
                       <h3 className="flex items-center text-sm font-bold text-red-600 uppercase tracking-wide mb-4">
                           <AlertTriangle className="w-4 h-4 mr-2" /> Common Mistakes
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {selectedTopic.commonMistakes.map((mistake, i) => (
                               <div key={i} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                                   <div className="flex items-center text-red-500 line-through text-sm mb-1">
                                       <XCircle size={14} className="mr-2" /> {mistake.wrong}
                                   </div>
                                   <div className="flex items-center text-green-600 font-bold text-base mb-2">
                                       <CheckCircle size={16} className="mr-2" /> {mistake.right}
                                   </div>
                                   <p className="text-xs text-gray-500 italic border-t pt-2 mt-2">
                                       Tip: {mistake.explanation}
                                   </p>
                               </div>
                           ))}
                       </div>
                   </div>
               )}

               {/* 3. FORMS BREAKDOWN */}
               <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-2 flex items-center">
                    <List className="mr-2" /> Structure & Examples
                  </h3>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Affirmative */}
                    <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden group hover:border-green-300 transition-colors">
                        <div className="bg-green-50 px-6 py-3 border-b border-green-100 flex items-center justify-between">
                            <div className="flex items-center">
                                <PlusCircle className="text-green-600 mr-2" size={20} />
                                <span className="font-bold text-green-800">Affirmative</span>
                            </div>
                            <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono border border-green-200">
                                {selectedTopic.forms.positive.structure}
                            </code>
                        </div>
                        <div className="p-6">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedTopic.forms.positive.examples.map((ex, i) => (
                                    <li key={i} className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                        {ex}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Negative */}
                    <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden group hover:border-red-300 transition-colors">
                        <div className="bg-red-50 px-6 py-3 border-b border-red-100 flex items-center justify-between">
                            <div className="flex items-center">
                                <MinusCircle className="text-red-600 mr-2" size={20} />
                                <span className="font-bold text-red-800">Negative</span>
                            </div>
                            <code className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono border border-red-200">
                                {selectedTopic.forms.negative.structure}
                            </code>
                        </div>
                        <div className="p-6">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedTopic.forms.negative.examples.map((ex, i) => (
                                    <li key={i} className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                                        <XCircle className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                                        {ex}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Interrogative */}
                    <div className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden group hover:border-indigo-300 transition-colors">
                        <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex items-center justify-between">
                            <div className="flex items-center">
                                <HelpCircle className="text-indigo-600 mr-2" size={20} />
                                <span className="font-bold text-indigo-800">Interrogative</span>
                            </div>
                            <code className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-mono border border-indigo-200">
                                {selectedTopic.forms.question.structure}
                            </code>
                        </div>
                        <div className="p-6">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedTopic.forms.question.examples.map((ex, i) => (
                                    <li key={i} className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                                        <HelpCircle className="w-4 h-4 text-indigo-500 mr-3 flex-shrink-0" />
                                        {ex}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                  </div>
               </div>

               {/* Pro Tip Section */}
               {selectedTopic.proTip && (
                   <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 flex items-start text-white shadow-lg mt-8 border border-gray-700">
                       <Lightbulb className="text-yellow-400 w-8 h-8 mr-4 flex-shrink-0 mt-1 animate-pulse" />
                       <div>
                          <h4 className="font-bold text-yellow-400 text-lg mb-2">Teacher's Pro Tip</h4>
                          <p className="text-gray-200 leading-relaxed font-medium">{selectedTopic.proTip}</p>
                       </div>
                   </div>
               )}

               <div className="h-10"></div> {/* Spacer */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarBook;
