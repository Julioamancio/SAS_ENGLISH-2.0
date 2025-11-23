import React, { useState, useEffect } from 'react';
import { Book, ArrowRight, Zap, GraduationCap, CheckCircle, HelpCircle, MinusCircle, PlusCircle, Bookmark, LayoutGrid, List, Clock, User, Link, Layers, MessageCircle, AlertCircle, Type, Mic, Shuffle, Check, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';

// --- Interfaces ---

interface GrammarForm {
  structure: string;
  examples: string[];
}

interface CommonMistake {
  wrong: string;
  right: string;
  explanation: string;
}

interface GrammarTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string; // Short tag
  definition: string; // Brief definition
  deepDive: string[]; // Detailed explanation bullet points
  signalWords: string[]; // Keywords (e.g., yesterday, yet, now)
  forms: {
    positive: GrammarForm;
    negative: GrammarForm;
    question: GrammarForm;
  };
  commonMistakes?: CommonMistake[];
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

// --- DATA CONTENT (A1 - C2) ---

const GRAMMAR_DATA: LevelData[] = [
  {
    id: 'A1',
    label: 'Beginner',
    color: 'text-green-600',
    bg: 'bg-green-600',
    borderColor: 'border-green-200',
    description: 'Essential building blocks: To Be, Simple Tenses, and Basic Structures.',
    topics: [
      {
        id: 'a1_tobe',
        title: 'Verb To Be',
        icon: <Zap size={20} />,
        summary: 'Am, Is, Are',
        definition: 'The most fundamental verb in English, used to describe identity, qualities, feelings, age, and location.',
        deepDive: [
          'It is an irregular verb. It changes forms completely (Am, Is, Are).',
          'Use "Am" only with "I".',
          'Use "Is" with singular subjects (He, She, It, John, The Cat).',
          'Use "Are" with plural subjects (We, You, They, John and Mary).'
        ],
        signalWords: ['Today', 'Now', 'Always'],
        forms: {
          positive: { 
            structure: 'Subject + AM / IS / ARE + ...', 
            examples: [
              'I am a teacher.', 
              'She is happy.', 
              'They are from Brazil.',
              'It is cold today.',
              'We are students.',
              'You are very kind.'
            ] 
          },
          negative: { 
            structure: 'Subject + AM / IS / ARE + NOT', 
            examples: [
              'I am not tired.', 
              'He isn\'t my brother.', 
              'We aren\'t at home.',
              'It is not expensive.',
              'They are not ready yet.',
              'She is not in the office.'
            ] 
          },
          question: { 
            structure: 'AM / IS / ARE + Subject + ...?', 
            examples: [
              'Am I late?', 
              'Is she your sister?', 
              'Are they hungry?',
              'Is it far from here?',
              'Are we friends?',
              'Is he a doctor?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have 20 years.', right: 'I am 20 years old.', explanation: 'In English, we ARE an age, we do not HAVE an age.' },
          { wrong: 'He are my friend.', right: 'He is my friend.', explanation: 'He is singular, so use IS.' }
        ]
      },
      {
        id: 'a1_pronouns',
        title: 'Personal Pronouns',
        icon: <User size={20} />,
        summary: 'I, You, He...',
        definition: 'Words used to replace specific names of people or things to avoid repetition.',
        deepDive: [
          'Subject Pronouns (I, You, He...) come BEFORE the verb. They do the action.',
          'Object Pronouns (Me, You, Him...) come AFTER the verb. They receive the action.',
          '"It" is used for animals, things, weather, and time.',
          '"You" is both singular and plural.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Subject + Verb + Object', 
            examples: [
              'I see him every day.', 
              'She helps us with homework.', 
              'They know me very well.',
              'We like them.',
              'He calls her "Mom".',
              'It scares me.'
            ] 
          },
          negative: { 
            structure: 'S + Don\'t/Doesn\'t + V + O', 
            examples: [
              'I don\'t like it.', 
              'He doesn\'t call her anymore.',
              'We don\'t invite them.',
              'She doesn\'t understand me.',
              'They don\'t help us.',
              'You don\'t know him.'
            ] 
          },
          question: { 
            structure: 'Do/Does + S + V + O?', 
            examples: [
              'Do you love me?', 
              'Does she know him?',
              'Do they see us?',
              'Does he help her?',
              'Do we need it?',
              'Do you understand them?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'Him is my friend.', right: 'He is my friend.', explanation: 'Use Subject pronouns at the start of the sentence.' },
          { wrong: 'She likes he.', right: 'She likes him.', explanation: 'Use Object pronouns after the verb.' }
        ]
      },
      {
        id: 'a1_present_simple',
        title: 'Present Simple',
        icon: <Clock size={20} />,
        summary: 'Habits & Facts',
        definition: 'Describes habits, routines, permanent situations, and general truths.',
        deepDive: [
          'It is NOT for actions happening right now (that is Present Continuous).',
          'For He/She/It, you MUST add -s or -es to the verb (Works, Goes).',
          'Use "Do" and "Does" for questions and negatives.'
        ],
        signalWords: ['Always', 'Usually', 'Often', 'Sometimes', 'Never', 'Every day', 'On Mondays'],
        forms: {
          positive: { 
            structure: 'Subject + Verb (+s/es for He/She/It)', 
            examples: [
              'I work here.', 
              'She plays tennis on Saturdays.', 
              'Water boils at 100°C.',
              'He likes pizza.',
              'They live in London.',
              'My brother studies hard.'
            ] 
          },
          negative: { 
            structure: 'Subject + don\'t / doesn\'t + Base Verb', 
            examples: [
              'I don\'t smoke.', 
              'He doesn\'t drive.',
              'We don\'t speak French.',
              'She doesn\'t want to go.',
              'It doesn\'t work.',
              'They don\'t eat meat.'
            ] 
          },
          question: { 
            structure: 'Do / Does + Subject + Base Verb?', 
            examples: [
              'Do you speak English?', 
              'Does it rain a lot here?',
              'Do they play instruments?',
              'Does she know the answer?',
              'When do you wake up?',
              'Where does he live?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'He work here.', right: 'He works here.', explanation: 'Don\'t forget the S for third person singular (He/She/It).' },
          { wrong: 'Does she works?', right: 'Does she work?', explanation: 'In questions with Does, the main verb loses the S.' }
        ]
      },
      {
        id: 'a1_present_cont',
        title: 'Present Continuous',
        icon: <Clock size={20} />,
        summary: 'Now / Happening',
        definition: 'Describes actions happening exactly at the moment of speaking or temporary situations.',
        deepDive: [
          'Formed with To Be (am/is/are) + Verb-ing.',
          'Describes temporary actions (I am living here for a month).',
          'Describes specific "Now" actions (I am eating).',
          'Stative Verbs (Like, Love, Know, Want) are usually NOT used in this form.'
        ],
        signalWords: ['Now', 'Right now', 'At the moment', 'Look!', 'Listen!', 'Currently'],
        forms: {
          positive: { 
            structure: 'S + am/is/are + V-ing', 
            examples: [
              'I am eating now.', 
              'She is sleeping.',
              'They are playing football.',
              'We are studying English.',
              'He is working on a new project.',
              'The phone is ringing.'
            ] 
          },
          negative: { 
            structure: 'S + am/is/are + not + V-ing', 
            examples: [
              'I\'m not listening.', 
              'They aren\'t watching TV.',
              'He isn\'t working today.',
              'We aren\'t going to the party.',
              'She isn\'t feeling well.',
              'It isn\'t snowing.'
            ] 
          },
          question: { 
            structure: 'Am/Is/Are + S + V-ing?', 
            examples: [
              'Are you watching TV?', 
              'Is it raining outside?',
              'Are they coming?',
              'Is she crying?',
              'What are you doing?',
              'Where is he going?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I am wanting a coffee.', right: 'I want a coffee.', explanation: 'Want is a Stative Verb, avoid using it in continuous forms.' },
          { wrong: 'She reading a book.', right: 'She IS reading a book.', explanation: 'You cannot omit the verb To Be.' }
        ]
      }
    ]
  },
  {
    id: 'A2',
    label: 'Elementary',
    color: 'text-teal-600',
    bg: 'bg-teal-600',
    borderColor: 'border-teal-200',
    description: 'The Past, The Future, and Comparisons.',
    topics: [
      {
        id: 'a2_past_simple',
        title: 'Past Simple',
        icon: <Clock size={20} />,
        summary: 'Finished Past',
        definition: 'Actions that started and finished at a specific time in the past.',
        deepDive: [
          'The time IS important and usually mentioned (Yesterday, Last night).',
          'Regular verbs end in -ED (Walked, Played).',
          'Irregular verbs change completely (Go -> Went, See -> Saw).',
          'In negatives and questions, use "Did" and revert the verb to base form.'
        ],
        signalWords: ['Yesterday', 'Last night', 'Last week', 'Ago', 'In 2010', 'When I was young'],
        forms: {
          positive: { 
            structure: 'Subject + V2 (Past Form)', 
            examples: [
              'I walked home yesterday.', 
              'She bought (buy) a new car.', 
              'We went (go) to Paris last summer.',
              'He studied for the exam.',
              'They arrived late.',
              'I saw (see) him two days ago.'
            ] 
          },
          negative: { 
            structure: 'Subject + did not (didn\'t) + Base Verb', 
            examples: [
              'I didn\'t see him.', 
              'She didn\'t go to school.',
              'We didn\'t like the movie.',
              'He didn\'t finish the job.',
              'They didn\'t call me.',
              'It didn\'t rain yesterday.'
            ] 
          },
          question: { 
            structure: 'Did + Subject + Base Verb?', 
            examples: [
              'Did you finish your homework?', 
              'Did they arrive on time?',
              'Did she tell you?',
              'Where did you go?',
              'When did he leave?',
              'Did you buy the bread?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I didn\'t went.', right: 'I didn\'t go.', explanation: 'After Did/Didn\'t, use the Base Verb.' },
          { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', explanation: 'If you say "Yesterday", you must use Past Simple, not Present Perfect.' }
        ]
      },
      {
        id: 'a2_present_perfect_1',
        title: 'Present Perfect (Intro)',
        icon: <Layers size={20} />,
        summary: 'Life Experience',
        definition: 'Actions that happened in the past but the exact time is NOT important or unknown.',
        deepDive: [
          'Focus is on the experience, not when it happened.',
          'Formed with Have/Has + Past Participle (V3).',
          'Commonly used with "Ever" (in questions) and "Never".',
          'Also used for things that happened recently with a result now.'
        ],
        signalWords: ['Ever', 'Never', 'Just', 'Already', 'Yet', 'Recently'],
        forms: {
          positive: { 
            structure: 'Subject + have/has + V3 (Participle)', 
            examples: [
              'I have been to USA.', 
              'She has eaten sushi.',
              'We have seen that movie.',
              'He has broken his leg.',
              'They have visited London.',
              'I have lost my keys.'
            ] 
          },
          negative: { 
            structure: 'Subject + haven\'t/hasn\'t + V3', 
            examples: [
              'I haven\'t seen Titanic.', 
              'He hasn\'t traveled yet.',
              'We haven\'t finished.',
              'She hasn\'t met him.',
              'They haven\'t arrived.',
              'I haven\'t tried this food.'
            ] 
          },
          question: { 
            structure: 'Have/Has + Subject + V3?', 
            examples: [
              'Have you ever visited Rome?', 
              'Has she finished?',
              'Have they called you?',
              'Has he ever been late?',
              'Have we met before?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', explanation: 'Never use specific past time markers (yesterday) with Present Perfect.' },
          { wrong: 'I have went.', right: 'I have gone.', explanation: 'The participle of Go is Gone, not Went.' }
        ]
      },
      {
        id: 'a2_future',
        title: 'Future: Will vs Going To',
        icon: <ArrowRight size={20} />,
        summary: 'Plans & Predictions',
        definition: 'Two distinct ways to express the future based on intent and evidence.',
        deepDive: [
          'GOING TO: Used for plans decided BEFORE speaking. "I bought tickets, I am going to fly."',
          'GOING TO: Used for predictions with evidence. "Look at those clouds! It is going to rain."',
          'WILL: Used for instant decisions made NOW. "The phone is ringing, I will answer it."',
          'WILL: Used for promises, offers, and general predictions without evidence.'
        ],
        signalWords: ['Tomorrow', 'Next week', 'Soon', 'Later', 'In the future'],
        forms: {
          positive: { 
            structure: 'S + will + V  OR  S + am/is/are going to + V', 
            examples: [
              'I will help you. (Instant offer)', 
              'I am going to visit mom. (Plan)',
              'It will rain tomorrow. (Prediction)',
              'She is going to buy a house. (Plan)',
              'We will see. (Uncertainty)'
            ] 
          },
          negative: { 
            structure: 'won\'t + V  OR  isn\'t/aren\'t going to + V', 
            examples: [
              'I won\'t do it again. (Promise)', 
              'She isn\'t going to stay. (Plan)',
              'We won\'t forget you.',
              'He isn\'t going to help.'
            ] 
          },
          question: { 
            structure: 'Will + S...?  OR  Are + S + going to...?', 
            examples: [
              'Will you marry me?', 
              'Are you going to travel next year?',
              'Will it be cold?',
              'Is she going to quit her job?'
            ] 
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
    description: 'Complex Tenses, Passive Voice, and Conditionals.',
    topics: [
      {
        id: 'b1_pres_perf_full',
        title: 'Present Perfect (Full)',
        icon: <Layers size={20} />,
        summary: 'For, Since, Just, Yet',
        definition: 'Connecting past to present: Unfinished time or Past actions with present results.',
        deepDive: [
          'FOR: Used for a duration of time (For 2 years, For a long time).',
          'SINCE: Used for a starting point (Since 2010, Since I was born).',
          'JUST: Happened very recently (I have just eaten).',
          'YET: Used in negatives/questions for "until now" (Have you finished yet?).',
          'ALREADY: Happened sooner than expected (I have already done it).'
        ],
        signalWords: ['For', 'Since', 'Just', 'Already', 'Yet', 'So far', 'Lately'],
        forms: {
          positive: { 
            structure: 'S + have/has + Participle', 
            examples: [
              'I have lived here for 10 years.', 
              'She has just left.',
              'We have known each other since 2005.',
              'He has already finished.',
              'I have lost my wallet (so I don\'t have it now).'
            ] 
          },
          negative: { 
            structure: 'S + haven\'t/hasn\'t + Participle', 
            examples: [
              'I haven\'t finished yet.', 
              'She hasn\'t called since Monday.',
              'We haven\'t seen him lately.',
              'They haven\'t decided yet.'
            ] 
          },
          question: { 
            structure: 'Have + S + Participle?', 
            examples: [
              'Have you cleaned your room yet?', 
              'How long have you lived here?',
              'Have you seen my keys?',
              'Has he arrived already?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I live here since 2010.', right: 'I HAVE LIVED here since 2010.', explanation: 'If the action started in the past and continues to now, use Present Perfect.' },
          { wrong: 'I have already finished yet.', right: 'I have already finished.', explanation: 'Use "Yet" only in negatives and questions.' }
        ]
      },
      {
        id: 'b1_zero_cond',
        title: 'Zero Conditional',
        icon: <Link size={20} />,
        summary: 'Facts & Truths',
        definition: 'Used for scientific facts, general truths, and rules where the result is certain.',
        deepDive: [
          'Structure: If + Present Simple, ... Present Simple.',
          'Used for laws of nature (Physics, Biology).',
          'Used for instructions (If you press this, it starts).',
          '"If" can usually be replaced by "When" without changing the meaning.'
        ],
        signalWords: ['If', 'When', 'Whenever', 'Always'],
        forms: {
          positive: { 
            structure: 'If + Present, ... Present', 
            examples: [
              'If you heat ice, it melts.', 
              'If I drink coffee at night, I can\'t sleep.',
              'When the sun sets, it gets dark.',
              'If you mix red and yellow, you get orange.'
            ] 
          },
          negative: { 
            structure: 'If ... don\'t ..., ... don\'t ...', 
            examples: [
              'If plants don\'t get water, they die.', 
              'If you don\'t eat, you get hungry.',
              'The car doesn\'t start if you don\'t turn the key.'
            ] 
          },
          question: { 
            structure: 'What happens if...?', 
            examples: [
              'What happens if you mix red and blue?', 
              'Does ice melt if you heat it?',
              'What do you do if you have a headache?'
            ] 
          }
        }
      },
      {
        id: 'b1_first_cond',
        title: 'First Conditional',
        icon: <Link size={20} />,
        summary: 'Real Possibility',
        definition: 'Used for real or possible situations in the future dependent on a condition.',
        deepDive: [
          'Structure: If + Present Simple, ... Will + Verb.',
          'Describes a specific situation, not a general fact.',
          'The "If" clause is in the Present, but it refers to the Future.',
          'You can use other modals like "Can", "Might", "Should" instead of Will.'
        ],
        signalWords: ['If', 'Unless', 'As soon as', 'When'],
        forms: {
          positive: { 
            structure: 'If + Present, ... Will + Verb', 
            examples: [
              'If it rains, I will stay home.', 
              'If I see him, I will tell him.',
              'She will pass the exam if she studies.',
              'If we hurry, we will catch the train.'
            ] 
          },
          negative: { 
            structure: 'If ... don\'t ..., ... won\'t ...', 
            examples: [
              'If you don\'t hurry, you will miss the train.', 
              'I won\'t go if you don\'t go.',
              'Unless you study, you will fail.'
            ] 
          },
          question: { 
            structure: 'What will you do if...?', 
            examples: [
              'What will you do if you lose your job?', 
              'Will she come if I invite her?',
              'Where will you go if the hotel is full?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'If I will see him, I will tell him.', right: 'If I SEE him, I will tell him.', explanation: 'Never use "Will" in the IF clause.' }
        ]
      }
    ]
  },
  {
    id: 'B2',
    label: 'Upper Int.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-600',
    borderColor: 'border-indigo-200',
    description: 'Hypothetical situations, Deduction, and Advanced Tenses.',
    topics: [
      {
        id: 'b2_second_cond',
        title: 'Second Conditional',
        icon: <Link size={20} />,
        summary: 'Unreal Present',
        definition: 'Used for imaginary, hypothetical, or impossible situations in the present.',
        deepDive: [
          'Structure: If + Past Simple, ... Would + Verb.',
          'It is "Unreal" because the condition is not true right now.',
          'Used for dreaming ("If I won the lottery...").',
          'Used for advice ("If I were you...").',
          'Note: With "To Be", we usually use "Were" for all subjects (I were, He were).'
        ],
        signalWords: ['If', 'Would', 'Were'],
        forms: {
          positive: { 
            structure: 'If + Past, ... Would + Verb', 
            examples: [
              'If I had a car, I would drive to work. (But I don\'t have a car)', 
              'If I were rich, I would travel the world.',
              'If she knew the answer, she would tell us.',
              'I would buy a big house if I won the lottery.'
            ] 
          },
          negative: { 
            structure: 'If ... didn\'t ..., ... wouldn\'t ...', 
            examples: [
              'If I didn\'t have to work, I wouldn\'t be here.', 
              'If she didn\'t like him, she wouldn\'t date him.',
              'I wouldn\'t do that if I were you.'
            ] 
          },
          question: { 
            structure: 'What would you do if...?', 
            examples: [
              'What would you do if you saw a ghost?', 
              'Where would you live if you could choose anywhere?',
              'Would you help him if he asked?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'If I was you...', right: 'If I WERE you...', explanation: 'In formal conditional grammar, use "Were" for all persons.' },
          { wrong: 'If I would have money...', right: 'If I HAD money...', explanation: 'Never use "Would" in the IF clause.' }
        ]
      },
      {
        id: 'b2_third_cond',
        title: 'Third Conditional',
        icon: <Link size={20} />,
        summary: 'Unreal Past',
        definition: 'Used for imaginary situations in the past (things that did NOT happen).',
        deepDive: [
          'Structure: If + Past Perfect, ... Would Have + Participle.',
          'Used to express REGRETS or criticism.',
          'It talks about a past that cannot be changed.',
          '"If I had studied" implies -> I did NOT study.'
        ],
        signalWords: ['If only', 'Would have'],
        forms: {
          positive: { 
            structure: 'If + Past Perfect, ... Would Have + V3', 
            examples: [
              'If I had studied, I would have passed the exam.', 
              'If she had known, she would have come earlier.',
              'We would have gone to the beach if it hadn\'t rained.'
            ] 
          },
          negative: { 
            structure: 'If ... hadn\'t ..., ... wouldn\'t have ...', 
            examples: [
              'If I hadn\'t eaten so much, I wouldn\'t have felt sick.', 
              'She wouldn\'t have been late if she hadn\'t missed the bus.',
              'He wouldn\'t have crashed if he hadn\'t been speeding.'
            ] 
          },
          question: { 
            structure: 'Would you have ... if ...?', 
            examples: [
              'Would you have helped me if I had asked?', 
              'What would you have done if you had been there?',
              'If you had known the truth, would you have told me?'
            ] 
          }
        }
      }
    ]
  }
];

// Add generic C1/C2 data structure to prevent errors if expanding later
// (Keeping the logic simpler for this update focused on teaching quality)
// Note: In a real full deployment, all C1/C2 topics would be updated with deepDive/signalWords/mistakes too.

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
                          {React.cloneElement(selectedTopic.icon as React.ReactElement<any>, { size: 120 })}
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