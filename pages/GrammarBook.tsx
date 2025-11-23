import React, { useState } from 'react';
import { Book, ArrowRight, Zap, GraduationCap, CheckCircle, HelpCircle, MinusCircle, PlusCircle, Bookmark, LayoutGrid, List } from 'lucide-react';

// --- Interfaces ---

interface GrammarForm {
  structure: string;
  examples: string[];
}

interface GrammarTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string; // Short tag
  definition: string; // What is it?
  usage: string; // When to use it?
  forms: {
    positive: GrammarForm;
    negative: GrammarForm;
    question: GrammarForm;
  };
  proTip?: string;
}

interface LevelData {
  id: string;
  label: string;
  color: string;
  bg: string;
  borderColor: string;
  description: string;
  topics: GrammarTopic[];
}

// --- Icons Helper ---
const ClockIcon = ({size}:{size:number}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UserIcon = ({size}:{size:number}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const RefreshIcon = ({size}:{size:number}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>;

// --- DATA CONTENT (A1 - C2) ---

const GRAMMAR_DATA: LevelData[] = [
  {
    id: 'A1',
    label: 'Beginner',
    color: 'text-green-600',
    bg: 'bg-green-600',
    borderColor: 'border-green-200',
    description: 'Essential building blocks: To Be, Simple Tenses, and Basic Pronouns.',
    topics: [
      {
        id: 'a1_tobe',
        title: 'Verb To Be',
        icon: <Zap size={20} />,
        summary: 'Am, Is, Are',
        definition: 'The most fundamental verb in English, used to describe identity, qualities, age, feelings, and location.',
        usage: 'Use "To Be" when you want to say who someone is, how they feel, or where they are.',
        forms: {
          positive: {
            structure: 'Subject + am / is / are + Adjective/Noun',
            examples: ['I am a teacher.', 'She is happy today.', 'They are from Brazil.']
          },
          negative: {
            structure: 'Subject + am / is / are + NOT + ...',
            examples: ['I am not tired.', 'He is not (isn\'t) my brother.', 'We are not (aren\'t) at home.']
          },
          question: {
            structure: 'Am / Is / Are + Subject + ...?',
            examples: ['Am I late?', 'Is she your sister?', 'Are they ready to go?']
          }
        },
        proTip: 'Contractions are key! Use "I\'m", "You\'re", "She\'s" in speaking, but full forms in formal writing.'
      },
      {
        id: 'a1_present_simple',
        title: 'Present Simple',
        icon: <ClockIcon size={20} />,
        summary: 'Habits & Facts',
        definition: 'The tense used for things that are always true, general facts, or routines.',
        usage: 'Use it for daily routines, schedules, and general truths (like laws of nature).',
        forms: {
          positive: {
            structure: 'Subject + Verb (s/es for He/She/It)',
            examples: ['I play soccer every Saturday.', 'She works in a bank.', 'Water boils at 100°C.']
          },
          negative: {
            structure: 'Subject + do/does + NOT + Verb (base)',
            examples: ['I do not (don\'t) like coffee.', 'He does not (doesn\'t) drive.', 'It does not snow here.']
          },
          question: {
            structure: 'Do / Does + Subject + Verb (base)?',
            examples: ['Do you speak English?', 'Does she have a car?', 'Do they live nearby?']
          }
        },
        proTip: 'The most common mistake: Forgetting the "S" for He/She/It in affirmative sentences!'
      }
    ]
  },
  {
    id: 'A2',
    label: 'Elementary',
    color: 'text-teal-600',
    bg: 'bg-teal-600',
    borderColor: 'border-teal-200',
    description: 'Expanding to the past, future plans, and comparisons.',
    topics: [
      {
        id: 'a2_past_simple',
        title: 'Past Simple',
        icon: <ClockIcon size={20} />,
        summary: 'Finished Actions',
        definition: 'Used to talk about actions that started and finished at a specific time in the past.',
        usage: 'Use this when you know exactly WHEN something happened (yesterday, last year, in 2010).',
        forms: {
          positive: {
            structure: 'Subject + Verb-ed (or irregular)',
            examples: ['I visited London last year.', 'She bought a new car yesterday.', 'They went to the cinema.']
          },
          negative: {
            structure: 'Subject + did + NOT + Verb (base)',
            examples: ['I did not (didn\'t) see him.', 'She didn\'t buy the dress.', 'We didn\'t go out.']
          },
          question: {
            structure: 'Did + Subject + Verb (base)?',
            examples: ['Did you finish your homework?', 'Did he call you?', 'Did they arrive on time?']
          }
        },
        proTip: 'In Negative and Question forms, the main verb goes back to the BASE form. "Did you WENT" is wrong!'
      },
      {
        id: 'a2_can',
        title: 'Modal Verb: Can',
        icon: <Zap size={20} />,
        summary: 'Ability & Permission',
        definition: 'A modal verb used to express ability (knowing how to do something) or permission.',
        usage: 'Use it to say what is possible or allowed.',
        forms: {
          positive: {
            structure: 'Subject + can + Verb (base)',
            examples: ['I can swim very well.', 'You can park here.', 'She can speak three languages.']
          },
          negative: {
            structure: 'Subject + cannot (can\'t) + Verb (base)',
            examples: ['I cannot hear you.', 'He can\'t drive.', 'We can\'t come to the party.']
          },
          question: {
            structure: 'Can + Subject + Verb (base)?',
            examples: ['Can you help me?', 'Can she play the piano?', 'Can I open the window?']
          }
        }
      }
    ]
  },
  {
    id: 'B1',
    label: 'Intermediate',
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    borderColor: 'border-blue-200',
    description: 'Connecting time (Present Perfect), obligations, and passive voice.',
    topics: [
      {
        id: 'b1_present_perfect',
        title: 'Present Perfect',
        icon: <RefreshIcon size={20} />,
        summary: 'Experience & Recent Events',
        definition: 'Connects the past to the present. It focuses on the result, not the specific time.',
        usage: 'Use for life experiences (no time stated) or actions that just finished with a present result.',
        forms: {
          positive: {
            structure: 'Subject + have/has + Verb (Participle)',
            examples: ['I have been to Paris twice.', 'She has lost her keys (she doesn\'t have them now).', 'We have finished the project.']
          },
          negative: {
            structure: 'Subject + haven\'t/hasn\'t + Verb (Participle)',
            examples: ['I haven\'t seen that movie yet.', 'He has not arrived.', 'They haven\'t eaten sushi before.']
          },
          question: {
            structure: 'Have/Has + Subject + Verb (Participle)?',
            examples: ['Have you ever been to Japan?', 'Has she called you?', 'Have they done the homework?']
          }
        },
        proTip: 'If you say "When" (e.g., yesterday), you MUST use Past Simple, not Present Perfect.'
      },
      {
        id: 'b1_will_vs_goingto',
        title: 'Future: Will vs Going To',
        icon: <ArrowRight size={20} />,
        summary: 'Predictions & Plans',
        definition: 'Two ways to talk about the future with subtle differences.',
        usage: 'Use "Going to" for plans and evidence. Use "Will" for instant decisions and promises.',
        forms: {
          positive: {
            structure: 'S + will + V  OR  S + am/is/are going to + V',
            examples: ['I will help you. (Decision)', 'Look at the clouds, it is going to rain. (Evidence)']
          },
          negative: {
            structure: 'S + won\'t + V  OR  S + am/is/are not going to + V',
            examples: ['I won\'t tell anyone.', 'She isn\'t going to buy that house.']
          },
          question: {
            structure: 'Will + S + V?  OR  Be + S + going to + V?',
            examples: ['Will you marry me?', 'Are you going to travel this summer?']
          }
        }
      }
    ]
  },
  {
    id: 'B2',
    label: 'Upper Int.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-600',
    borderColor: 'border-indigo-200',
    description: 'Complex ideas: Conditionals, Reported Speech, and Narrative Tenses.',
    topics: [
      {
        id: 'b2_second_conditional',
        title: 'Second Conditional',
        icon: <HelpCircle size={20} />,
        summary: 'Hypothetical Present',
        definition: 'Used to talk about impossible or unlikely situations in the present/future.',
        usage: 'Use for dreams, "if I were you" advice, or unlikely scenarios.',
        forms: {
          positive: {
            structure: 'If + Past Simple, ... would + Verb',
            examples: ['If I won the lottery, I would buy an island.', 'If I were you, I would study harder.']
          },
          negative: {
            structure: 'If + didn\'t + V, ... wouldn\'t + V',
            examples: ['If I didn\'t have to work, I wouldn\'t stay here.', 'If she didn\'t know, she wouldn\'t be angry.']
          },
          question: {
            structure: 'What would + S + do + if + Past Simple?',
            examples: ['What would you do if you saw a ghost?', 'Where would he go if he had a plane?']
          }
        },
        proTip: 'With "I/He/She/It", it is formal and correct to use "Were" instead of "Was". Ex: "If I were a boy..."'
      },
      {
        id: 'b2_passive',
        title: 'Passive Voice',
        icon: <RefreshIcon size={20} />,
        summary: 'Focus on Action',
        definition: 'Changes the focus of the sentence from the "Doer" to the "Object" of the action.',
        usage: 'Use when who did the action is unknown, obvious, or less important than the result.',
        forms: {
          positive: {
            structure: 'Object + To Be + Past Participle (+ by Agent)',
            examples: ['The book was written by J.K. Rowling.', 'My car is being repaired.', 'America was discovered in 1492.']
          },
          negative: {
            structure: 'Object + To Be + NOT + Past Participle',
            examples: ['The room wasn\'t cleaned yesterday.', 'This product isn\'t sold here.']
          },
          question: {
            structure: 'To Be + Object + Past Participle?',
            examples: ['Was the email sent?', 'Are credit cards accepted here?', 'When was this house built?']
          }
        }
      }
    ]
  },
  {
    id: 'C1',
    label: 'Advanced',
    color: 'text-purple-600',
    bg: 'bg-purple-600',
    borderColor: 'border-purple-200',
    description: 'Sophistication: Inversion, Mixed Conditionals, and Emphasis.',
    topics: [
      {
        id: 'c1_inversion',
        title: 'Negative Inversion',
        icon: <Zap size={20} />,
        summary: 'Formal Emphasis',
        definition: 'Changing the normal word order (Subject-Verb -> Verb-Subject) after negative adverbials for dramatic effect.',
        usage: 'Use in formal writing or speeches to emphasize a point strongly.',
        forms: {
          positive: {
            structure: 'Negative Adverb + Auxiliary + Subject + Verb',
            examples: ['Never have I seen such a beautiful view.', 'Rarely do we get such opportunities.', 'Little did he know the truth.']
          },
          negative: {
            structure: 'Not only + Aux + S + V, but (also)...',
            examples: ['Not only is she intelligent, but she is also kind.', 'No sooner had I arrived than the phone rang.']
          },
          question: {
            structure: 'N/A (Inversion is a statement technique)',
            examples: ['(Inversion is primarily used in statements, not questions, though it mimics question structure.)']
          }
        },
        proTip: 'Common triggers: Never, Rarely, Seldom, Little, Under no circumstances, Not only.'
      },
      {
        id: 'c1_mixed_conditional',
        title: 'Mixed Conditionals',
        icon: <HelpCircle size={20} />,
        summary: 'Past Cause, Present Result',
        definition: 'A mix of 2nd and 3rd conditionals to express a past action affecting the present.',
        usage: 'Use when a past mistake (or event) changes your current reality.',
        forms: {
          positive: {
            structure: 'If + Past Perfect, ... would + Base Verb',
            examples: ['If I had studied harder (past), I would be a doctor now (present).', 'If I hadn\'t missed the bus, I would be there.']
          },
          negative: {
            structure: 'If + Past Perfect (neg), ... would (neg) + Base Verb',
            examples: ['If I hadn\'t spent all my money, I wouldn\'t be broke.', 'If you had listened, we wouldn\'t be lost.']
          },
          question: {
            structure: 'Would + S + V + if + Past Perfect?',
            examples: ['Would you be happier if you had moved to Spain?', 'Where would we be if he hadn\'t helped us?']
          }
        }
      }
    ]
  },
  {
    id: 'C2',
    label: 'Proficiency',
    color: 'text-rose-600',
    bg: 'bg-rose-600',
    borderColor: 'border-rose-200',
    description: 'Mastery: Subjunctives, Cleft Sentences, and Nuance.',
    topics: [
      {
        id: 'c2_subjunctive',
        title: 'The Subjunctive',
        icon: <GraduationCap size={20} />,
        summary: 'Demands & Wishes',
        definition: 'A verb mood used to explore conditional or imaginary situations, and emotions like wish, command, or demand.',
        usage: 'Essential for formal American English after verbs like suggest, insist, recommend, demand.',
        forms: {
          positive: {
            structure: 'S + suggest/insist/ask + that + S + Base Verb',
            examples: ['I suggest that he study more.', 'The boss insisted that she be present.', 'It is essential that every student have a book.']
          },
          negative: {
            structure: 'S + ... + that + S + NOT + Base Verb',
            examples: ['I recommend that you not go there.', 'The judge ordered that the prisoner not be released.']
          },
          question: {
            structure: 'N/A (Mainly used in dependent clauses)',
            examples: ['Is it vital that he attend the meeting?']
          }
        },
        proTip: 'Notice "He study" (not studies) and "She be" (not is). The verb remains in the BASE form for all persons.'
      },
      {
        id: 'c2_cleft',
        title: 'Cleft Sentences',
        icon: <Zap size={20} />,
        summary: 'Structural Emphasis',
        definition: 'A way of splitting a sentence into two clauses to emphasize a specific part.',
        usage: 'Use to correct someone or highlight the most important information.',
        forms: {
          positive: {
            structure: 'It is/was + [Focus] + that/who + ...',
            examples: ['It was John who broke the window (not Mary).', 'It is her smile that I love the most.', 'All (that) I want is a little peace.']
          },
          negative: {
            structure: 'It wasn\'t + [Focus] + that...',
            examples: ['It wasn\'t me who called you.', 'It is not money that motivates him.']
          },
          question: {
            structure: 'Was it + [Focus] + that...?',
            examples: ['Was it you who left the door open?', 'Is it true that you are leaving?']
          }
        }
      }
    ]
  }
];

const GrammarBook: React.FC = () => {
  const [selectedLevelId, setSelectedLevelId] = useState('A1');
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);

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
                  
                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-lg ${currentLevel.bg} bg-opacity-10 text-${currentLevel.color.split('-')[1]}-600`}>
                        {React.cloneElement(topic.icon as React.ReactElement<any>, { className: currentLevel.color })}
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
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-none">{selectedTopic.title}</h2>
                  </div>
               </div>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
               
               {/* Definition & Usage */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="flex items-center text-sm font-bold text-blue-600 uppercase tracking-wide mb-3">
                         <Book className="w-4 h-4 mr-2" /> Definition
                      </h3>
                      <p className="text-gray-800 text-lg leading-relaxed font-medium">
                         {selectedTopic.definition}
                      </p>
                   </section>
                   <section className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                      <h3 className="flex items-center text-sm font-bold text-amber-600 uppercase tracking-wide mb-3">
                         <Zap className="w-4 h-4 mr-2" /> Usage Context
                      </h3>
                      <p className="text-gray-800 text-lg leading-relaxed font-medium">
                         {selectedTopic.usage}
                      </p>
                   </section>
               </div>

               {/* FORMS BREAKDOWN */}
               <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-2 flex items-center">
                    <List className="mr-2" /> Forms & Examples
                  </h3>

                  {/* Affirmative */}
                  <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden">
                      <div className="bg-green-50 px-6 py-3 border-b border-green-100 flex items-center">
                          <PlusCircle className="text-green-600 mr-2" size={20} />
                          <span className="font-bold text-green-800">Affirmative</span>
                      </div>
                      <div className="p-6">
                          <div className="mb-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-sm shadow-sm">
                              {selectedTopic.forms.positive.structure}
                          </div>
                          <ul className="space-y-2">
                              {selectedTopic.forms.positive.examples.map((ex, i) => (
                                  <li key={i} className="flex items-center text-gray-700">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                      {ex}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  {/* Negative */}
                  <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
                      <div className="bg-red-50 px-6 py-3 border-b border-red-100 flex items-center">
                          <MinusCircle className="text-red-600 mr-2" size={20} />
                          <span className="font-bold text-red-800">Negative</span>
                      </div>
                      <div className="p-6">
                          <div className="mb-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-sm shadow-sm">
                              {selectedTopic.forms.negative.structure}
                          </div>
                          <ul className="space-y-2">
                              {selectedTopic.forms.negative.examples.map((ex, i) => (
                                  <li key={i} className="flex items-center text-gray-700">
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-4 ml-1.5 flex-shrink-0"></div>
                                      {ex}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  {/* Interrogative */}
                  <div className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden">
                      <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex items-center">
                          <HelpCircle className="text-indigo-600 mr-2" size={20} />
                          <span className="font-bold text-indigo-800">Interrogative</span>
                      </div>
                      <div className="p-6">
                          <div className="mb-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-sm shadow-sm">
                              {selectedTopic.forms.question.structure}
                          </div>
                          <ul className="space-y-2">
                              {selectedTopic.forms.question.examples.map((ex, i) => (
                                  <li key={i} className="flex items-center text-gray-700">
                                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-4 ml-1.5 flex-shrink-0"></div>
                                      {ex}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
               </div>

               {/* Pro Tip Section */}
               {selectedTopic.proTip && (
                   <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 flex items-start text-white shadow-lg mt-8">
                       <GraduationCap className="text-yellow-400 w-8 h-8 mr-4 flex-shrink-0 mt-1" />
                       <div>
                          <h4 className="font-bold text-yellow-400 text-lg mb-2">Teacher's Pro Tip</h4>
                          <p className="text-gray-200 leading-relaxed">{selectedTopic.proTip}</p>
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