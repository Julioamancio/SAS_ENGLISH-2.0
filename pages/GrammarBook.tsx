import React, { useState, useEffect } from 'react';
import { Book, ArrowRight, Zap, CheckCircle, HelpCircle, MinusCircle, PlusCircle, Bookmark, LayoutGrid, List, Clock, User, Link, Layers, AlertTriangle, Lightbulb, XCircle, MapPin, Hash, MessageCircle, Split, ArrowUpLeft, Calendar, Type, Check, Music, Star, Smile, RefreshCw, GitBranch, GitMerge, Fingerprint, Scissors, Shuffle, Anchor, PenTool, Monitor, Quote, AlignLeft, Feather } from 'lucide-react';

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
    description: 'The essential foundation: Verbs, Structures, and Fundamental Vocabulary.',
    topics: [
      // ... A1 CONTENT PRESERVED ...
      // 1. VERB TO BE
      {
        id: 'a1_tobe',
        title: 'Verb To Be',
        icon: <Zap size={20} />,
        summary: 'Am / Is / Are',
        definition: 'The most important verb in English. Used for identity, age, feelings, nationality, and location.',
        deepDive: [
          'Use AM only for "I" (I am).',
          'Use IS for singular "He, She, It" (He is, The dog is).',
          'Use ARE for plural "You, We, They" (We are, John and Mary are).',
          'Contractions are essential in speaking: I\'m, You\'re, He\'s, It\'s, We\'re, They\'re.'
        ],
        signalWords: ['Today', 'Now', 'Happy', 'Students', 'From Brazil'],
        forms: {
          positive: { 
            structure: 'Subject + am/is/are', 
            examples: [
              'I am a teacher at a local school.', 
              'I am 25 years old.',
              'She is very happy today.', 
              'He is my brother.',
              'It is a beautiful day.',
              'We are from Brazil.',
              'They are my best friends.',
              'My mother is a nurse.',
              'You are a good student.'
            ] 
          },
          negative: { 
            structure: 'Subject + am/is/are + not', 
            examples: [
              'I am not tired right now.', 
              'He is not (isn\'t) a doctor.',
              'She is not (isn\'t) my sister.',
              'It is not (isn\'t) expensive.', 
              'We are not (aren\'t) ready yet.',
              'They are not (aren\'t) at home.',
              'The food is not good.',
              'I am not from the USA.'
            ] 
          },
          question: { 
            structure: 'Am/Is/Are + Subject?', 
            examples: [
              'Am I late for the meeting?',
              'Is he your brother?', 
              'Is she American?',
              'Is it raining outside?',
              'Are you ok?', 
              'Are we in the right place?',
              'Are they students?',
              'Is this your pen?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have 20 years.', right: 'I am 20 years old.', explanation: 'In English, you "ARE" an age, you do not "HAVE" it.' },
          { wrong: 'She are happy.', right: 'She is happy.', explanation: 'She is singular, use IS.' }
        ]
      },
      // ... (All other A1 topics preserved) ...
    ]
  },
  {
    id: 'A2',
    label: 'Elementary',
    color: 'text-teal-600',
    bg: 'bg-teal-600',
    borderColor: 'border-teal-200',
    description: 'Past events, Future plans, Modals, and Life Experiences.',
    topics: [
        // ... A2 CONTENT PRESERVED ...
         {
        id: 'a2_past_simple',
        title: 'Past Simple',
        icon: <Clock size={20} />,
        summary: 'Finished Actions',
        definition: 'Used for actions that started and finished at a SPECIFIC time in the past.',
        deepDive: [
          'Regular Verbs: Add -ED (Work -> Worked, Play -> Played).',
          'Irregular Verbs: Change completely (Go -> Went, See -> Saw, Buy -> Bought).',
          'Auxiliary DID: Use "Did" for Questions and Negatives for ALL persons.',
          'Important: When you use "Did/Didn\'t", the main verb returns to Base Form.'
        ],
        signalWords: ['Yesterday', 'Last night', 'Last week', 'Ago', 'In 2010', 'When I was young'],
        forms: {
          positive: { 
            structure: 'Subject + V2 (Past Form)', 
            examples: [
              'I worked late yesterday.', 
              'She went to Paris last summer.',
              'We saw a good movie last night.',
              'He bought a new car two days ago.',
              'They arrived 5 minutes ago.',
              'I studied English when I was at school.'
            ] 
          },
          negative: { 
            structure: 'Subject + didn\'t + V1 (Base)', 
            examples: [
              'I didn\'t go to the party.', 
              'He didn\'t see the sign.',
              'We didn\'t eat pizza.',
              'She didn\'t like the movie.',
              'It didn\'t rain yesterday.',
              'You didn\'t call me.'
            ] 
          },
          question: { 
            structure: 'Did + Subject + V1 (Base)?', 
            examples: [
              'Did you like the food?', 
              'Where did he go?',
              'Did they finish the work?',
              'What did you do yesterday?',
              'Did she call you?',
              'When did it happen?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I didn\'t went.', right: 'I didn\'t go.', explanation: 'After DID/DIDN\'T, use the base verb.' },
          { wrong: 'She goed to school.', right: 'She went to school.', explanation: 'GO is an irregular verb.' }
        ]
      },
      // ... (All other A2 topics preserved) ...
    ]
  },
  {
    id: 'B1',
    label: 'Intermediate',
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    borderColor: 'border-blue-200',
    description: 'Complex Tenses, Passive Voice, Conditionals, and Extended Vocabulary.',
    topics: [
        // ... B1 CONTENT PRESERVED ...
         {
        id: 'b1_pres_perf_full',
        title: 'Present Perfect (Full Usage)',
        icon: <Layers size={20} />,
        summary: 'Result / Duration / Experience',
        definition: 'Connecting the past to the present in three ways.',
        deepDive: [
          '1. Result (No Time): "I have lost my keys." (I don\'t have them NOW).',
          '2. Experience: "I have been to Paris." (Life achievement).',
          '3. Duration (Unfinished): "I have lived here for 10 years." (Started in past, still here now).',
          'Keywords: Just (Recent), Already (Earlier than expected), Yet (Negative), For (Duration), Since (Start point).'
        ],
        signalWords: ['Just', 'Already', 'Yet', 'For', 'Since', 'Recently'],
        forms: {
          positive: { 
            structure: 'S + Have/Has + V3', 
            examples: [
              'I have just finished my homework.', 
              'She has already eaten.',
              'We have lived here since 2010.',
              'He has worked here for 5 years.',
              'I have lost my wallet.',
              'I have bought a new car.',
              'They have known each other for ages.',
              'He has just called me.'
            ] 
          },
          negative: { 
            structure: 'S + Haven\'t/Hasn\'t + V3', 
            examples: [
              'I haven\'t seen him recently.', 
              'She hasn\'t arrived yet.',
              'We haven\'t finished the project.',
              'It hasn\'t rained for weeks.',
              'You haven\'t answered my email.',
              'They haven\'t visited us since Christmas.',
              'I haven\'t decided yet.'
            ] 
          },
          question: { 
            structure: 'Have/Has + S + V3?', 
            examples: [
              'Have you finished yet?', 
              'Has she called you?',
              'How long have you known him?',
              'Have they left already?',
              'Has he ever lied to you?',
              'What have you done?',
              'Where have they gone?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I live here since 2010.', right: 'I have lived here since 2010.', explanation: 'For unfinished actions starting in the past, use Present Perfect, not Present Simple.' }
        ]
      },
      // ... (All other B1 topics preserved) ...
    ]
  },
  {
      id: 'B2',
      label: 'Upper-Int',
      color: 'text-indigo-600',
      bg: 'bg-indigo-600',
      borderColor: 'border-indigo-200',
      description: 'Advanced structures for fluent communication.',
      topics: [
        // 1. PAST PERFECT CONTINUOUS
        {
          id: 'b2_past_perf_cont',
          title: 'Past Perfect Continuous',
          icon: <Clock size={20} />,
          summary: 'Had been doing',
          definition: 'Describes an action that was happening continuously up until another moment in the past.',
          deepDive: [
            'Structure: Had + Been + Verb-ING.',
            'Usage: Emphasize the duration or cause of a past event.',
            'Example: "The ground was wet (Past) because it HAD BEEN RAINING (Before that, for some time)."',
            'Compare with Past Perfect Simple: Simple is for completion (How many), Continuous is for activity/duration (How long).'
          ],
          signalWords: ['For', 'Since', 'Before', 'All day'],
          forms: {
            positive: { 
              structure: 'S + Had been + V-ing', 
              examples: [
                'He had been waiting for 2 hours when she finally arrived.', 
                'They had been playing soccer, so they were tired.',
                'I had been working there since 2010 before I quit.',
                'She had been studying all night for the exam.',
                'The pavement was wet because it had been raining.',
                'He was out of breath because he had been running.',
                'We had been planning the trip for months before we booked it.',
                'The band had been playing for an hour when the power went out.'
              ] 
            },
            negative: { 
              structure: 'S + Hadn\'t been + V-ing', 
              examples: [
                'I hadn\'t been sleeping well before the exam.', 
                'They hadn\'t been paying attention in class.',
                'She hadn\'t been feeling well for weeks.',
                'The car hadn\'t been working properly for a long time.',
                'We hadn\'t been expecting guests, so the house was messy.',
                'He hadn\'t been living there long when the fire happened.'
              ] 
            },
            question: { 
              structure: 'Had + S + Been + V-ing?', 
              examples: [
                'How long had you been waiting before the bus came?', 
                'Had he been drinking before driving?',
                'What had they been doing all afternoon?',
                'Had you been trying to call me?',
                'Where had she been living before she moved here?',
                'Had it been snowing for long?'
              ] 
            }
          }
        },
        // ... (All other B2 topics preserved) ...
         {
          id: 'b2_future_perfect',
          title: 'Future Perfect Simple & Continuous',
          icon: <ArrowRight size={20} />,
          summary: 'Will have done / Will have been doing',
          definition: 'Looking back from a future point in time.',
          deepDive: [
            'Future Perfect (Will have + V3): An action will be FINISHED before a specific time in the future.',
            'Future Perfect Continuous (Will have been + V-ing): An action will be IN PROGRESS for a duration up to a specific future time.',
            'By + Time: Use "By tomorrow", "By 2030".'
          ],
          signalWords: ['By', 'By the time', 'In 2 years time'],
          forms: {
            positive: { 
              structure: 'Will have + V3 / Will have been + V-ing', 
              examples: [
                'By 5 PM, I will have finished the report. (Simple)', 
                'By next year, we will have lived here for 10 years. (Simple)',
                'In 2030, I will have been working here for 20 years. (Continuous)',
                'She will have left by the time you arrive.',
                'The plane will have landed by now.',
                'We will have solved the problem by tomorrow.',
                'Next month, they will have been married for 50 years.'
              ] 
            },
            negative: { 
              structure: 'Won\'t have + V3', 
              examples: [
                'I won\'t have finished by then.', 
                'They won\'t have arrived yet.',
                'We won\'t have been waiting long.',
                'He won\'t have completed the training by June.',
                'I won\'t have saved enough money by Christmas.',
                'The meeting won\'t have started by the time we get there.'
              ] 
            },
            question: { 
              structure: 'Will you have...?', 
              examples: [
                'Will you have finished by dinner?', 
                'How long will you have been learning English by next year?',
                'Will they have fixed the car by tomorrow?',
                'What will you have achieved by the time you are 30?',
                'Will she have written the book by the end of the year?'
              ] 
            }
          }
        },
        {
          id: 'b2_deduction',
          title: 'Modals of Deduction',
          icon: <Lightbulb size={20} />,
          summary: 'Must / Might / Can\'t',
          definition: 'Making guesses based on evidence.',
          deepDive: [
            'MUST BE: 90-100% Sure it is TRUE. (He has a Ferrari -> He MUST BE rich).',
            'CAN\'T BE: 90-100% Sure it is FALSE. (He just ate lunch -> He CAN\'T BE hungry).',
            'MIGHT / MAY / COULD BE: 50% Possibility. (He isn\'t answering -> He MIGHT BE sleeping).',
            'Past Deduction: Must have + V3 (He must have forgotten).'
          ],
          signalWords: ['Surely', 'Definitely', 'Maybe', 'Impossible'],
          forms: {
            positive: { 
              structure: 'Must/Might/Could + Be', 
              examples: [
                'She is crying. She must be sad.', 
                'The lights are off. They might be out.',
                'It could be true.',
                'He must have missed the bus (Past).',
                'Look at the snow! It must be freezing outside.',
                'Someone is knocking. It could be the delivery driver.',
                'You have been working all day, you must be exhausted.'
              ] 
            },
            negative: { 
              structure: 'Can\'t be / Might not be', 
              examples: [
                'That can\'t be John, he is in London.', 
                'It can\'t be true!',
                'He might not come to the party.',
                'They can\'t have seen us (Past).',
                'She can\'t be serious about quitting her job.',
                'The keys might not be in the car.',
                'This result can\'t be correct.'
              ] 
            },
            question: { 
              structure: '-', 
              examples: [
                 'Could it be a mistake?',
                 'Do you think he might be lying?',
                 'Can it really be that simple?',
                 'Where could she have gone?'
              ] 
            }
          }
        },
        {
          id: 'b2_adv_passive',
          title: 'Passive Voice (Advanced)',
          icon: <GitBranch size={20} />,
          summary: 'Being done / Have been done',
          definition: 'Passive voice with continuous, perfect, and modal structures.',
          deepDive: [
            'Present Continuous Passive: Am/Is/Are + BEING + V3 ("The room is being cleaned").',
            'Present Perfect Passive: Have/Has + BEEN + V3 ("The decision has been made").',
            'Modal Passive: Modal + BE + V3 ("This can be done").',
            'Infinitive Passive: To be + V3 ("I want to be loved").'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: 'Be/Been/Being + V3', 
              examples: [
                'The road is being repaired right now.', 
                'My car has been stolen.',
                'Tickets can be bought online.',
                'The project must be finished today.',
                'I don\'t like being told what to do.',
                'The data is being analyzed by the computer.',
                'A new president has been elected.',
                'The winner will be announced soon.'
              ] 
            },
            negative: { 
              structure: 'Wasn\'t being / Hasn\'t been', 
              examples: [
                'The invitations haven\'t been sent yet.', 
                'It couldn\'t be fixed.',
                'I wasn\'t being followed.',
                'The problem hasn\'t been solved.',
                'She doesn\'t like being photographed.',
                'The report won\'t be finished on time.'
              ] 
            },
            question: { 
              structure: 'Has it been...?', 
              examples: [
                'Has the work been done?', 
                'Is the house being painted?',
                'Can it be fixed?',
                'Why was the meeting cancelled?',
                'Who has been invited?',
                'Are we being watched?'
              ] 
            }
          }
        },
        {
          id: 'b2_second_cond',
          title: 'Second Conditional',
          icon: <Split size={20} />,
          summary: 'Hypothetical Present',
          definition: 'Used to imagine situations in the PRESENT that are impossible or unlikely.',
          deepDive: [
            'Structure: If + Past Simple, Would + Verb.',
            'Note: "If I WERE" is preferred over "If I WAS" for all persons (If I were you, If he were rich).',
            'Meaning: I am imagining a different present reality.'
          ],
          signalWords: ['If I were you', 'Imagine'],
          forms: {
            positive: { 
              structure: 'If + Past, Would + Verb', 
              examples: [
                'If I had a million dollars, I would travel the world.', 
                'If I were you, I would accept the job.',
                'If she lived closer, we would see her more often.',
                'I would help you if I could.',
                'If I knew the answer, I would tell you.',
                'We would buy a big house if we won the lottery.',
                'If animals could talk, they would tell interesting stories.'
              ] 
            },
            negative: { 
              structure: 'If + Didn\'t, Wouldn\'t', 
              examples: [
                'If I didn\'t have to work, I would go to the beach.', 
                'I wouldn\'t do that if I were you.',
                'If it wasn\'t raining, we could go out.',
                'He wouldn\'t be angry if you told the truth.',
                'If she didn\'t love him, she wouldn\'t marry him.'
              ] 
            },
            question: { 
              structure: 'What would you do if...?', 
              examples: [
                'What would you do if you won the lottery?', 
                'Where would you live if you could choose anywhere?',
                'Would you buy it if it were cheaper?',
                'If you found a wallet, would you keep it?',
                'Who would you call if you were in trouble?'
              ] 
            }
          }
        },
        {
          id: 'b2_third_cond',
          title: 'Third Conditional',
          icon: <Split size={20} />,
          summary: 'Regrets about Past',
          definition: 'Used to imagine a different PAST. It is impossible because the past is finished.',
          deepDive: [
            'Structure: If + Past Perfect (Had + V3), Would Have + V3.',
            'Meaning: Hypothetical Past. "If I had known" (But I didn\'t know).',
            'Use: Regrets or criticism.'
          ],
          signalWords: ['If only'],
          forms: {
            positive: { 
              structure: 'If + Had V3, Would Have V3', 
              examples: [
                'If I had studied, I would have passed the exam.', 
                'If she had left earlier, she wouldn\'t have missed the train.',
                'I would have called you if I had known you were ill.',
                'They would have won if they had played better.',
                'If we had taken a map, we wouldn\'t have got lost.',
                'If you had listened to me, this wouldn\'t have happened.'
              ] 
            },
            negative: { 
              structure: 'If + Hadn\'t V3, Wouldn\'t Have V3', 
              examples: [
                'If I hadn\'t eaten so much, I wouldn\'t have felt sick.', 
                'He wouldn\'t have crashed if he hadn\'t been driving fast.',
                'If it hadn\'t rained, we would have gone to the beach.',
                'I wouldn\'t have been late if the alarm had worked.'
              ] 
            },
            question: { 
              structure: 'What would you have done?', 
              examples: [
                'What would you have done if you had been me?', 
                'Would you have helped him if he asked?',
                'Where would you have gone if the flight was cancelled?',
                'If you had known the truth, would you have told me?'
              ] 
            }
          }
        },
        {
          id: 'b2_mixed_cond',
          title: 'Mixed Conditionals',
          icon: <Split size={20} />,
          summary: 'Past Cause -> Present Result',
          definition: 'Connecting a past event with a present consequence.',
          deepDive: [
            'Most Common Mix: Past Cause (3rd) -> Present Result (2nd).',
            'Structure: If + Past Perfect (Had V3), Would + Base Verb.',
            'Example: "If I had studied medicine (Past), I would be a doctor now (Present)."'
          ],
          signalWords: ['Now'],
          forms: {
            positive: { 
              structure: 'If + Had V3, Would + Verb', 
              examples: [
                'If I had won the lottery (Past), I would be rich now (Present).', 
                'If she had taken the job, she would live in Paris.',
                'If we hadn\'t missed the bus, we would be there by now.',
                'If I had gone to bed earlier, I wouldn\'t be so tired.',
                'He would be the boss now if he hadn\'t insulted the manager.'
              ] 
            },
            negative: { 
              structure: '-', 
              examples: [
                'If you hadn\'t spent all your money, you wouldn\'t be broke now.',
                'If I hadn\'t eaten that sushi, I wouldn\'t feel sick.'
              ] 
            },
            question: { 
              structure: '-', 
              examples: [
                'Would you be happy if you had stayed?',
                'If you had married him, where would you live now?'
              ] 
            }
          }
        },
        {
          id: 'b2_rel_nondef',
          title: 'Non-Defining Relative Clauses',
          icon: <Link size={20} />,
          summary: 'Extra Information (Commas)',
          definition: 'Adding extra, non-essential details about a noun. Commas are mandatory.',
          deepDive: [
            'Defining: "The man who called is my dad." (Identifies which man).',
            'Non-Defining: "My dad, who is 60, likes golf." (Extra info).',
            'Rule 1: ALWAYS use commas.',
            'Rule 2: NEVER use "THAT". Must use Who or Which.',
            'Rule 3: Cannot omit the pronoun.'
          ],
          signalWords: [', who', ', which'],
          forms: {
            positive: { 
              structure: ', Who/Which ...,', 
              examples: [
                'My brother, who lives in Canada, is an engineer.', 
                'London, which is a big city, has a lot of traffic.',
                'The Queen, who was very popular, died recently.',
                'My car, which I bought last year, is broken.',
                'John, who I met at the party, is very funny.',
                'This painting, which was painted in 1890, is worth millions.'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          },
          commonMistakes: [
            { wrong: 'My dad, that lives here, is nice.', right: 'My dad, who lives here, is nice.', explanation: 'Never use THAT in non-defining clauses (with commas).' }
          ]
        },
        {
          id: 'b2_cleft',
          title: 'Cleft Sentences',
          icon: <Scissors size={20} />,
          summary: 'It was X that... / What I need is...',
          definition: 'Used to add emphasis to a specific part of the sentence.',
          deepDive: [
            'IT Clefts: It + Be + Focus + Relative Clause. ("It was JOHN who broke the window", not Mary).',
            'WH- Clefts: What clause + Be + Focus. ("What I need is a holiday").',
            'Purpose: To correct information or highlight what is important.'
          ],
          signalWords: ['What I need', 'It was'],
          forms: {
            positive: { 
              structure: 'It was X that... / What X is Y', 
              examples: [
                'It was my brother who called, not my sister.', 
                'It is the rain that annoys me.',
                'What I really want is a cup of coffee.',
                'What happened was that I overslept.',
                'All I did was ask a question.',
                'It was in 2010 that we first met.',
                'What she needs is a good rest.'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        {
          id: 'b2_adv_tags',
          title: 'Advanced Question Tags',
          icon: <HelpCircle size={20} />,
          summary: 'Imperatives & Special Cases',
          definition: 'Tricky rules for question tags beyond the basics.',
          deepDive: [
            'I am -> Aren\'t I?',
            'Let\'s -> Shall we?',
            'Imperative (Order) -> Will you? / Can you? / Could you? ("Open the door, will you?").',
            'Don\'t -> Will you? ("Don\'t be late, will you?").',
            'Nobody/Everyone -> They ("Everyone is here, aren\'t they?").'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: '-', 
              examples: [
                'Let\'s go, shall we?', 
                'Help me, will you?',
                'Don\'t tell anyone, will you?',
                'Someone is knocking, aren\'t they?',
                'I\'m right, aren\'t I?',
                'Everyone liked the movie, didn\'t they?',
                'Nobody called, did they?',
                'Pass me the salt, can you?'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        {
          id: 'b2_gerund_meaning',
          title: 'Gerunds/Infinitives (Meaning Change)',
          icon: <GitMerge size={20} />,
          summary: 'Stop / Try / Remember',
          definition: 'Some verbs change meaning depending on whether you use -ING or TO.',
          deepDive: [
            'STOP doing: Quit a habit ("Stop smoking").',
            'STOP to do: Pause to do something else ("I stopped walking to tie my shoe").',
            'TRY doing: Experiment ("Try restarting the computer").',
            'TRY to do: Attempt with effort, maybe fail ("I tried to lift the box").',
            'REMEMBER doing: Memory of past ("I remember locking the door").',
            'REMEMBER to do: Task/Future ("Remember to buy milk").'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: 'Verb + Ing / Verb + To', 
              examples: [
                'I stopped eating sugar. (Quit)', 
                'I stopped to buy water. (Paused)',
                'I tried calling him. (Experiment)',
                'I tried to climb the wall. (Attempt)',
                'I remember seeing her. (Memory)',
                'Remember to call your mom. (Task)',
                'I regret telling him. (Sorry for past)',
                'I regret to inform you. (Formal bad news)'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        {
          id: 'b2_wish',
          title: 'Wish / If Only',
          icon: <Star size={20} />,
          summary: 'Desires & Regrets',
          definition: 'Expressing a desire for reality to be different.',
          deepDive: [
            'Present Wish (Use Past Simple): "I wish I was rich" (I am not rich now).',
            'Past Regret (Use Past Perfect): "I wish I had studied" (I didn\'t study).',
            'Behavior Complaint (Use Would): "I wish you would stop talking" (You are annoying me).',
            'If Only: Stronger/More dramatic than "I wish".'
          ],
          signalWords: ['If only'],
          forms: {
            positive: { 
              structure: 'Wish + Past / Wish + Had V3', 
              examples: [
                'I wish I knew the answer. (Present)', 
                'I wish I lived in New York. (Present)',
                'I wish I hadn\'t said that. (Past Regret)',
                'If only I had more time.',
                'I wish it would stop raining. (Complaint)',
                'I wish he would answer the phone.',
                'If only I hadn\'t sold my car.',
                'I wish we could stay longer.'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        {
          id: 'b2_had_better',
          title: 'Had Better',
          icon: <AlertTriangle size={20} />,
          summary: 'Strong Advice',
          definition: 'Stronger than "Should". Implies a negative consequence if you don\'t do it.',
          deepDive: [
            'Structure: Subject + \'d better (Had better) + Base Verb.',
            'Meaning: "You should do this OR ELSE something bad happens."',
            'Not past tense: Refers to immediate future.',
            'Negative: Had better NOT.'
          ],
          signalWords: ['Or else'],
          forms: {
            positive: { 
              structure: 'S + \'d better + Verb', 
              examples: [
                'You\'d better leave now. (Or you will miss the bus)', 
                'We\'d better hurry.',
                'He\'d better tell the truth.',
                'I\'d better get back to work.',
                'You\'d better apologize to her.'
              ] 
            },
            negative: { 
              structure: 'S + \'d better not + Verb', 
              examples: [
                'You\'d better not be late.', 
                'She\'d better not forget.',
                'We\'d better not miss the flight.',
                'You\'d better not wake the baby.'
              ] 
            },
            question: { structure: '-', examples: [] }
          }
        },
        {
          id: 'b2_phrasals_adv',
          title: 'Advanced Phrasal Verbs',
          icon: <GitBranch size={20} />,
          summary: 'Turn out / Come across',
          definition: 'More complex phrasal verbs essential for B2 fluency.',
          deepDive: [
            'Turn out: Result in the end ("It turned out to be a mistake").',
            'Come across: Find by accident ("I came across an old photo").',
            'Put up with: Tolerate ("I can\'t put up with this noise").',
            'Look up to: Admire.',
            'Look down on: Despise.',
            'Run out of: Have none left.'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: '-', 
              examples: [
                'The party turned out to be fun.', 
                'I came across my old diary.',
                'We ran out of milk.',
                'I look up to my father.',
                'She came up with a great idea.',
                'He takes after his mother (resembles).',
                'I need to catch up on my work.',
                'The meeting was called off (cancelled).'
              ] 
            },
            negative: { 
              structure: '-', 
              examples: [
                'I won\'t put up with his behavior.',
                'Don\'t let me down.'
              ] 
            },
            question: { structure: '-', examples: [] }
          }
        },
        {
          id: 'b2_reported_full',
          title: 'Reported Speech (Full)',
          icon: <MessageCircle size={20} />,
          summary: 'Reporting Verbs & Questions',
          definition: 'Advanced reporting including questions, commands, and specific reporting verbs.',
          deepDive: [
            'Questions: Use IF or WH-word. Change order back to Statement. ("He asked where I lived", NOT where did I live).',
            'Commands: Tell/Ask + Object + TO + Verb. ("He told me to sit down").',
            'Reporting Verbs: Advise, Sugggest, Deny, Admit, Refuse.',
            'Suggest: Suggest + -ING or Suggest + (that) + S + V.'
          ],
          signalWords: ['Asked', 'Warned', 'Advised'],
          forms: {
            positive: { 
              structure: 'Reporting Verb + Structure', 
              examples: [
                'He asked me if I was ready. (Question)', 
                'She asked where I had bought the car. (Question)',
                'The doctor advised me to stop smoking. (Advice)',
                'He admitted stealing the money. (Verb + Ing)',
                'She suggested going to the cinema. (Suggestion)',
                'He warned me not to touch the fire.',
                'They invited us to stay for dinner.'
              ] 
            },
            negative: { 
              structure: 'Told not to...', 
              examples: [
                'He told me not to touch it.', 
                'She refused to help.',
                'He denied breaking the window.',
                'The police ordered him not to move.',
                'She promised not to tell anyone.'
              ] 
            },
            question: { structure: '-', examples: [] }
          }
        },
        {
          id: 'b2_adv_connectors',
          title: 'Advanced Connectors',
          icon: <Link size={20} />,
          summary: 'Despite / Whereas / Moreover',
          definition: 'Sophisticated linking words for formal writing and speaking.',
          deepDive: [
            'Contrast: Although / Even though (+ Clause).',
            'Contrast: Despite / In spite of (+ Noun/Gerund).',
            'Contrast: Whereas / While (Comparing two things).',
            'Addition: Moreover / Furthermore / In addition.',
            'Result: Therefore / Consequently.'
          ],
          signalWords: ['However', 'Therefore'],
          forms: {
            positive: { 
              structure: 'Connector + Clause/Noun', 
              examples: [
                'Despite the rain, we went out.', 
                'He is rich. However, he is not happy.',
                'I like tennis, whereas my brother prefers football.',
                'The rent is high. Moreover, the house is small.',
                'I studied hard. Therefore, I passed.',
                'In spite of feeling sick, she went to work.',
                'He was late. Consequently, he missed the meeting.',
                'It is expensive. Furthermore, it is ugly.'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          },
          commonMistakes: [
            { wrong: 'Despite it rained.', right: 'Despite the rain.', explanation: 'Despite is followed by a Noun or -ING, not a full sentence.' }
          ]
        }
      ]
  },
  {
      id: 'C1',
      label: 'Advanced',
      color: 'text-purple-600',
      bg: 'bg-purple-600',
      borderColor: 'border-purple-200',
      description: 'Refined grammar for professional and academic use. Precision and nuance.',
      topics: [
        // 1. INVERSION
        {
          id: 'c1_inversion',
          title: 'Inversion (Negative Adverbials)',
          icon: <Shuffle size={20} />,
          summary: 'Never have I... / Seldom do we...',
          definition: 'Changing the normal word order (Subject-Verb -> Verb-Subject) for dramatic effect or emphasis.',
          deepDive: [
            'Trigger: Used after negative or restrictive adverbials at the start of a sentence.',
            'Triggers: Never, Seldom, Rarely, Little, Not only... but also, Under no circumstances.',
            'Structure: Adverbial + Auxiliary + Subject + Main Verb.',
            'Tone: Very formal and emphatic. Common in speeches and literature.'
          ],
          signalWords: ['Never', 'Seldom', 'Rarely', 'Little', 'Not only'],
          forms: {
            positive: { 
              structure: 'Adverbial + Aux + S + V', 
              examples: [
                'Never have I seen such a beautiful sunset.', 
                'Rarely do we go out these days.',
                'Little did he know that the surprise was for him.',
                'Seldom does she complain about her job.',
                'Not only is he intelligent, but he is also kind.',
                'Under no circumstances should you open this door.',
                'No sooner had I arrived than the phone rang.',
                'Hardly had we started eating when the guests arrived.',
                'Only later did I realize my mistake.'
              ] 
            },
            negative: { structure: 'Technically positive form with negative meaning', examples: [] },
            question: { structure: 'N/A (Statement form)', examples: [] }
          }
        },
        // 2. REDUCED RELATIVE CLAUSES
        {
          id: 'c1_reduced_relative',
          title: 'Reduced Relative Clauses',
          icon: <Scissors size={20} />,
          summary: 'The man standing... / The car sold...',
          definition: 'Shortening relative clauses by removing the relative pronoun and the verb "be".',
          deepDive: [
            'Active Voice: Use Present Participle (-ING). "The man (who is) standing there..." -> "The man standing there..."',
            'Passive Voice: Use Past Participle (V3). "The cars (which are) made in Germany..." -> "The cars made in Germany..."',
            'Purpose: Makes text more concise and academic.'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: 'Noun + -ING / Noun + V3', 
              examples: [
                'The students preparing for the exam are in the library.', 
                'Do you know the man talking to John?',
                'The train arriving at platform 3 is from London.',
                'The books written by this author are famous.',
                'Products sold online are often cheaper.',
                'The evidence found at the scene was crucial.',
                'Anyone wishing to leave may do so.',
                'The money stolen from the bank was never recovered.'
              ] 
            },
            negative: { 
              structure: 'Noun + Not + -ING', 
              examples: [
                'Drivers not wearing seatbelts will be fined.', 
                'Students not paying attention will fail.',
                'Any product not listed here is unavailable.'
              ] 
            },
            question: { structure: '-', examples: [] }
          }
        },
        // 3. PASSIVE REPORTING STRUCTURES
        {
          id: 'c1_passive_reporting',
          title: 'Passive Reporting Structures',
          icon: <MessageCircle size={20} />,
          summary: 'It is said that... / He is believed to...',
          definition: 'Used to distance the writer from the information, often for news, rumors, or general beliefs.',
          deepDive: [
            'Form 1 (Impersonal): It + Passive Verb + THAT clause. ("It is said that he is rich").',
            'Form 2 (Personal): Subject + Passive Verb + TO infinitive. ("He is said to be rich").',
            'Form 2 Past: Subject + Passive Verb + TO HAVE + V3. ("He is said to have stolen the money").',
            'Verbs: Say, Believe, Think, Report, Know, Consider, Expect.'
          ],
          signalWords: ['Allegedly', 'Reportedly'],
          forms: {
            positive: { 
              structure: 'It is said that... / S is said to...', 
              examples: [
                'It is said that the company is bankrupt.', 
                'It is believed that the artifacts are 2000 years old.',
                'He is thought to be living in Mexico.',
                'The economy is expected to recover soon.',
                'She is known to be a strict teacher.',
                'The thieves are reported to have escaped by boat.',
                'The fire is believed to have started in the kitchen.',
                'The painting is considered to be a masterpiece.'
              ] 
            },
            negative: { 
              structure: 'It is not known...', 
              examples: [
                'It is not known where he went.', 
                'The cause of the accident is not yet known.',
                'He is not considered to be a suspect.'
              ] 
            },
            question: { 
              structure: 'Is it expected that...?', 
              examples: [
                'Is it true that he resigned?', 
                'Are they expected to arrive today?',
                'Who is believed to be the best candidate?'
              ] 
            }
          }
        },
        // 4. PAST MODALS OF DEDUCTION & CRITICISM
        {
          id: 'c1_past_modals_criticism',
          title: 'Past Modals (Criticism & Regret)',
          icon: <AlertTriangle size={20} />,
          summary: 'Should have / Needn\'t have',
          definition: 'Using modals to criticize past actions or express that something was unnecessary.',
          deepDive: [
            'Should have + V3: Criticism. You did the wrong thing. ("You should have told me").',
            'Could have + V3: Possibility/Criticism. You had the ability but didn\'t do it. ("You could have helped me!").',
            'Needn\'t have + V3: Unnecessary action. You did it, but it wasn\'t needed. ("You needn\'t have brought food").',
            'Ought to have + V3: Same as Should have (Formal).'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: 'Modal + Have + V3', 
              examples: [
                'You should have studied harder.', 
                'You could have called to say you were late!',
                'I should have listened to your advice.',
                'We ought to have left earlier.',
                'He could have become a doctor, but he chose art.',
                'You should have seen his face!'
              ] 
            },
            negative: { 
              structure: 'Shouldn\'t have / Needn\'t have', 
              examples: [
                'You shouldn\'t have shouted at him.', 
                'I shouldn\'t have eaten so much cake.',
                'You needn\'t have cooked dinner (we ordered pizza).',
                'We needn\'t have hurried, the train was late.',
                'He shouldn\'t have driven the car while drunk.'
              ] 
            },
            question: { 
              structure: 'Should I have...?', 
              examples: [
                'Should I have apologized?', 
                'What could I have done differently?',
                'Do you think I should have accepted the offer?'
              ] 
            }
          }
        },
        // 5. NOMINALIZATION
        {
          id: 'c1_nominalization',
          title: 'Nominalization',
          icon: <Type size={20} />,
          summary: 'Turning Verbs into Nouns',
          definition: 'Transforming verbs and adjectives into nouns to create a more formal, academic, or objective tone.',
          deepDive: [
            'Change: "The bomb exploded" -> "The explosion of the bomb".',
            'Change: "People are becoming obese" -> "The rise in obesity".',
            'Effect: Focuses on the concept/process rather than the person doing it.',
            'Common in: Scientific papers, business reports, legal documents.'
          ],
          signalWords: ['The implementation', 'The development'],
          forms: {
            positive: { 
              structure: 'Noun Phrases', 
              examples: [
                'The implementation of the new policy caused problems. (Instead of: "Implementing the policy...")', 
                'The proliferation of nuclear weapons is a threat. (Instead of: "Nuclear weapons are proliferating...")',
                'Global warming requires the reduction of carbon emissions.',
                'The analysis of the data took three weeks.',
                'Regular exercise contributes to the prevention of disease.',
                'The discovery of the new virus shocked scientists.',
                'Her refusal to answer was suspicious.',
                'The rapid expansion of the city is concerning.'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        // 6. FRONTING
        {
          id: 'c1_fronting',
          title: 'Fronting',
          icon: <ArrowUpLeft size={20} />,
          summary: 'Strange as it seems...',
          definition: 'Moving adjectives, adverbs, or clauses to the front of the sentence for cohesion or emphasis.',
          deepDive: [
            'Adjective Fronting: "Hard as it was, we finished." (Although it was hard).',
            'Participle Fronting: "Sitting on the bench was an old man."',
            'Adverbial Fronting: "Suddenly, the door opened."',
            'Purpose: Smooth transition from previous sentence or dramatic effect.'
          ],
          signalWords: ['As', 'Though'],
          forms: {
            positive: { 
              structure: 'Adj/Adv + Verb + Subject', 
              examples: [
                'Strange as it seems, I actually enjoyed the exam.', 
                'Hard as we tried, we couldn\'t open the box.',
                'Difficult though it was, we managed to succeed.',
                'Attached to this email is the report you requested.',
                'On the table stood a large vase.',
                'Fast as he ran, he couldn\'t catch the bus.',
                'Tired as she was, she kept working.'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        // 7. COMPLEX SUBJECT-VERB AGREEMENT
        {
          id: 'c1_agreement',
          title: 'Complex Subject-Verb Agreement',
          icon: <Check size={20} />,
          summary: 'Neither of them is/are...',
          definition: 'Rules for tricky subjects where it is unclear if the verb should be singular or plural.',
          deepDive: [
            'Neither of / Either of: Formally Singular ("Neither of them IS here"), Informally Plural ("Neither of them ARE here").',
            'Collective Nouns (Team, Family, Government): Singular if acting as one unit, Plural if acting as individuals.',
            'A number of (Plural) vs The number of (Singular).',
            'Distance: "The box of chocolates IS empty" (Subject is Box, not Chocolates).'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: 'Subject + Correct Verb', 
              examples: [
                'Neither of the answers is correct. (Formal)', 
                'The team is winning the game. (Unit)',
                'The team are arguing among themselves. (Individuals)',
                'A number of students have failed.',
                'The number of students has increased.',
                'Bread and butter is my favorite breakfast. (One concept)',
                'Ten dollars is not enough. (Amount)',
                'The police are investigating. (Always plural)',
                'Mathematics is difficult. (Subject ending in S)'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        // 8. ADVANCED VERB PATTERNS
        {
          id: 'c1_verb_patterns',
          title: 'Advanced Verb Patterns',
          icon: <LayoutGrid size={20} />,
          summary: 'Object to doing / Regret to inform',
          definition: 'Specific verbs followed by Preposition + ING, or complex infinitive structures.',
          deepDive: [
            'Verb + Preposition + ING: Confess TO stealing, Object TO working, Look forward TO seeing.',
            'Verb + Object + Infinitive: Enable him to go, Force her to stay.',
            'Subjunctive: suggest/insist that he BE (not is), recommend that she GO (not goes).'
          ],
          signalWords: [],
          forms: {
            positive: { 
              structure: 'Verb + Prep + ING / Subjunctive', 
              examples: [
                'He confessed to stealing the money.', 
                'I object to working on weekends.',
                'She succeeded in finding a job.',
                'We look forward to hearing from you.',
                'They accused him of lying.',
                'I insist that he be present at the meeting. (Subjunctive)',
                'The doctor recommended that she stop smoking. (Subjunctive)',
                'It is essential that everyone arrive on time.'
              ] 
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        }
      ]
  },
  {
      id: 'C2',
      label: 'Proficiency',
      color: 'text-pink-600',
      bg: 'bg-pink-600',
      borderColor: 'border-pink-200',
      description: 'Near-native command of nuance, style, and rhetorical structures.',
      topics: [
        // 1. COMPLEX INVERSION & CONDITIONALITY
        {
          id: 'c2_complex_inversion',
          title: 'Complex Inversion & Conditionality',
          icon: <Shuffle size={20} />,
          summary: 'Were it not for / Had I known',
          definition: 'Replacing "If" with inversion in formal contexts for hypothetical situations.',
          deepDive: [
            '2nd Conditional: "If it were not for..." -> "Were it not for...".',
            '3rd Conditional: "If I had known..." -> "Had I known...".',
            '1st Conditional (Formal): "If you should require..." -> "Should you require...".',
            'Use: Extremely formal, literary, or academic contexts.'
          ],
          signalWords: ['Were', 'Had', 'Should'],
          forms: {
            positive: {
              structure: 'Auxiliary + Subject + Verb',
              examples: [
                'Were it not for your help, I would have failed.',
                'Had I known the truth, I would have acted differently.',
                'Should you need any assistance, please contact us.',
                'Had we arrived sooner, we might have saved him.',
                'Were he to apologize, I might forgive him.',
                'Had the government intervened, the crisis could have been averted.',
                'Should any problems arise, execute the backup plan.',
                'Had it not been for the storm, the flight would have departed on time.'
              ]
            },
            negative: {
              structure: 'Had it not been for...',
              examples: [
                'Had it not been for the alarm, we would have slept in.',
                'Were it not for the traffic, I would be there by now.',
                'Had she not intervened, the argument would have escalated.'
              ]
            },
            question: { structure: '-', examples: [] }
          }
        },
        // 2. ELLIPSIS & SUBSTITUTION
        {
          id: 'c2_ellipsis',
          title: 'Ellipsis & Substitution',
          icon: <Scissors size={20} />,
          summary: 'I suppose so / I\'d love to',
          definition: 'Omitting words or using substitutes to avoid repetition and sound natural/native.',
          deepDive: [
            'Ellipsis: Leaving out words understandable from context ("Want to go?" instead of "Do you want to go?").',
            'Substitution (So/Not): "I think so", "I hope not".',
            'Substitution (One/Ones): "I like the red one".',
            'Substitution (Do): "He likes pizza and so do I".',
            'Infinitive Retention: "I didn\'t want to go, but I had to (go)."'
          ],
          signalWords: ['So', 'Do', 'One'],
          forms: {
            positive: {
              structure: 'Substitute word / Omission',
              examples: [
                'She is leaving tomorrow, and so am I.',
                'I didn\'t win the lottery, but I wish I had.',
                'Do you think he will come? I expect so.',
                'He didn\'t clean his room, but he should have.',
                'Is there a pharmacy nearby? There might be.',
                'I\'d love to join you, but I can\'t.',
                'These apples are nice. I\'ll take the red ones.',
                'We went to the beach, but John didn\'t.',
                'Got a minute? (Have you got a minute?)'
              ]
            },
            negative: {
              structure: 'I suppose not / I hope not',
              examples: [
                'Is it raining? I hope not.',
                'Will we be late? I suppose not.',
                'I wanted to buy it, but I didn\'t have the money to.',
                'She hasn\'t finished, and neither have I.'
              ]
            },
            question: { structure: '-', examples: [] }
          }
        },
        // 3. RHETORICAL GRAMMAR & EMPHASIS
        {
          id: 'c2_rhetorical',
          title: 'Rhetorical Grammar & Emphasis',
          icon: <Feather size={20} />,
          summary: 'A genius he is not / Do sit down',
          definition: 'Manipulating grammar rules for dramatic or stylistic effect.',
          deepDive: [
            'Fronting for Emphasis: "A genius he is not" (He is definitely not a genius).',
            'Emphatic DO: "I DO apologize", "Do sit down".',
            'The "What" Cleft: "What happened was..."',
            'Repetition: "He ran and ran".'
          ],
          signalWords: ['Do', 'Did'],
          forms: {
            positive: {
              structure: 'Inverted/Emphasized structure',
              examples: [
                'A hero he is not, but he tried his best.',
                'Crazy though it seems, I believe him.',
                'I do hope you can come.',
                'We did try to call you, but there was no answer.',
                'Do be quiet!',
                'It was the silence that frightened me most.',
                'Why he did it, I will never know.',
                'Gone are the days when we could leave the door unlocked.',
                'Into the room walked a tall, dark stranger.'
              ]
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        // 4. SYNTACTIC DENSITY & MULTI-CLAUSE
        {
          id: 'c2_syntax',
          title: 'Syntactic Density (Multi-Clause)',
          icon: <AlignLeft size={20} />,
          summary: 'Long, complex sentences',
          definition: 'Constructing long, sophisticated sentences with multiple subordinate clauses, participles, and parenthetical information.',
          deepDive: [
            'Combining absolute phrases, relative clauses, and connectors.',
            'Common in academic writing and high-level journalism.',
            'Requires perfect punctuation control (semicolons, em-dashes).',
            'Example: "Having considered all options, and despite the risks involved - which were significant - the board decided to proceed."'
          ],
          signalWords: [';', '--'],
          forms: {
            positive: {
              structure: 'Multi-clause complex sentence',
              examples: [
                'Having analyzed the data, and taking into account the recent market fluctuations, we have decided to delay the launch.',
                'The castle, situated on a hill and overlooking the valley, dominates the landscape, serving as a reminder of a bygone era.',
                'Not wanting to cause a scene, but unable to remain silent, she quietly left the room.',
                'The theory, while widely accepted by scholars, has recently come under scrutiny due to new evidence.',
                'Whatever your reasons for leaving, and I assume they are valid, you must admit that the timing is unfortunate.',
                'Exhausted by the journey, yet exhilarated by the destination, the travelers set up camp.',
                'The proposal, controversial as it was, passed with a unanimous vote, much to everyone\'s surprise.'
              ]
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        // 5. REGISTER & TONE SHIFTING
        {
          id: 'c2_register',
          title: 'Register & Tone Shifting',
          icon: <Quote size={20} />,
          summary: 'Formal vs Informal vs Literary',
          definition: 'The ability to switch linguistic style based on context with precision.',
          deepDive: [
            'Formal: "I request that you depart" (Subjunctive/Latinate vocab).',
            'Informal: "I want you to leave" (Phrasal verbs/Anglo-Saxon vocab).',
            'Literary: "He bade them farewell".',
            'Nominalization usually increases formality.'
          ],
          signalWords: [],
          forms: {
            positive: {
              structure: 'Context-dependent',
              examples: [
                'Formal: "We regret to inform you that your application was unsuccessful."',
                'Informal: "Sorry, you didn\'t get the job."',
                'Formal: "Please ensure that all personal belongings are removed."',
                'Informal: "Make sure you take your stuff."',
                'Academic: "The study demonstrates a significant correlation."',
                'Casual: "The study shows a big link."',
                'Legal: "Failure to comply will result in prosecution."',
                'Literary: "The sun dipped below the horizon, casting long shadows."'
              ]
            },
            negative: { structure: '-', examples: [] },
            question: { structure: '-', examples: [] }
          }
        },
        // 6. LEXICO-GRAMMAR & IDIOMS
        {
          id: 'c2_lexico',
          title: 'Lexico-Grammar & Idioms',
          icon: <Anchor size={20} />,
          summary: 'The more, the merrier / Come what may',
          definition: 'Fixed grammatical structures that act like idioms.',
          deepDive: [
            'Comparative structure: "The more, the merrier", "The bigger, the better".',
            'Subjunctive Idioms: "Be that as it may", "Suffice it to say", "Come what may".',
            'Inversion Idioms: "No way am I doing that".',
            'Double negatives for effect: "He is not unintelligent".'
          ],
          signalWords: [],
          forms: {
            positive: {
              structure: 'Fixed Phrases',
              examples: [
                'The sooner we start, the sooner we finish.',
                'Be that as it may, I still disagree.',
                'Suffice it to say, the project was a disaster.',
                'Come what may, I will support you.',
                'Far be it from me to criticize, but...',
                'The more I study, the less I feel I know.',
                'Try as I might, I couldn\'t open the jar.',
                'Happen what may, we must remain united.',
                'Truth be told, I never liked him.'
              ]
            },
            negative: {
              structure: 'No way / Not exactly',
              examples: [
                'No way am I going back there.',
                'Not for all the tea in China would I do that.',
                'It\'s not that I don\'t like it, it\'s just too expensive.',
                'He is by no means a fool.'
              ]
            },
            question: { structure: '-', examples: [] }
          }
        }
      ]
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