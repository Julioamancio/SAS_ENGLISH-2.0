import React, { useState, useEffect } from 'react';
import { Book, ArrowRight, Zap, CheckCircle, HelpCircle, MinusCircle, PlusCircle, Bookmark, LayoutGrid, List, Clock, User, Link, Layers, AlertTriangle, Lightbulb, XCircle, MapPin, Hash, MessageCircle, Mic, ArrowUpLeft, Type, Quote, MoveRight, ToggleLeft, Check } from 'lucide-react';

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
    description: 'Foundation: To Be, Basic Tenses, Pronouns & Prepositions.',
    topics: [
      {
        id: 'a1_tobe',
        title: 'Verb To Be',
        icon: <Zap size={20} />,
        summary: 'Am / Is / Are',
        definition: 'The most important verb. It describes identity, age, feelings, nationality, and location.',
        deepDive: [
          'Use AM for "I" (I am).',
          'Use IS for singular "He, She, It" (He is, The car is).',
          'Use ARE for plural "You, We, They" (We are, John and Mary are).',
          'Contractions are very common in speaking: I\'m, You\'re, He\'s.'
        ],
        signalWords: ['Now', 'Today', 'At the moment'],
        forms: {
          positive: { 
            structure: 'Subject + am/is/are', 
            examples: [
              'I am a teacher at a local school.', 
              'She is very happy today.', 
              'They are my best friends.',
              'It is cold outside.',
              'We are from Brazil.',
              'You are incredibly smart.'
            ] 
          },
          negative: { 
            structure: 'Subject + am/is/are + not', 
            examples: [
              'I am not tired right now.', 
              'It is not expensive.', 
              'We are not ready yet.',
              'She is not (isn\'t) my sister.',
              'They are not (aren\'t) at home.'
            ] 
          },
          question: { 
            structure: 'Am/Is/Are + Subject?', 
            examples: [
              'Are you ok?', 
              'Is he your brother?', 
              'Am I late for the meeting?',
              'Are we in the right place?',
              'Is it raining outside?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have 20 years.', right: 'I am 20 years old.', explanation: 'In English, you ARE an age, you do not HAVE it.' },
          { wrong: 'She are happy.', right: 'She is happy.', explanation: 'She is singular, so use IS.' }
        ],
        proTip: 'Native speakers almost always use contractions when speaking. Say "She\'s nice" instead of "She is nice".'
      },
      {
        id: 'a1_pronouns',
        title: 'Personal Pronouns',
        icon: <User size={20} />,
        summary: 'I, You, He...',
        definition: 'Words that replace names to avoid repetition.',
        deepDive: [
          'Subject Pronouns (I, You, He, She, It, We, They) come BEFORE the verb. They do the action.',
          'Object Pronouns (Me, You, Him, Her, It, Us, Them) come AFTER the verb. They receive the action.',
          'Always capitalize "I", even in the middle of a sentence.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Subject + Verb + Object', 
            examples: [
              'I love him. (Subject I, Object Him)', 
              'She helps us every day.', 
              'We know them from school.',
              'He calls me every night.',
              'It usually rains here.'
            ] 
          },
          negative: { 
            structure: 'S + Don\'t/Doesn\'t + V + O', 
            examples: [
              'I don\'t know her.', 
              'He doesn\'t like it.',
              'We don\'t see them often.',
              'She doesn\'t understand me.'
            ] 
          },
          question: { 
            structure: 'Do/Does + S + V + O?', 
            examples: [
              'Do you like me?', 
              'Does she see us?',
              'Do they know him?',
              'Does it help you?'
            ] 
          }
        }
      },
      {
        id: 'a1_pres_simple',
        title: 'Present Simple',
        icon: <Clock size={20} />,
        summary: 'Routines & Facts',
        definition: 'Used for habits, daily routines, general truths, and timetables.',
        deepDive: [
          'For He/She/It, you MUST add -S or -ES to the verb (Works, Goes, Watches).',
          'Spelling Rule: Consonant + y -> -ies (Study -> Studies).',
          'Spelling Rule: Ends in ch/sh/s/x/o -> -es (Watch -> Watches, Go -> Goes).',
          'Use DO/DOES for questions and negatives.'
        ],
        signalWords: ['Always', 'Every day', 'Usually', 'Often', 'Sometimes', 'Never', 'On Mondays'],
        forms: {
          positive: { 
            structure: 'S + V(+s/es)', 
            examples: [
              'He works at a bank.', 
              'I play soccer every weekend.',
              'The sun rises in the east.',
              'She studies English every night.',
              'My train leaves at 8 PM.'
            ] 
          },
          negative: { 
            structure: 'S + don\'t/doesn\'t + V', 
            examples: [
              'I don\'t drink coffee.', 
              'She doesn\'t eat meat (She\'s vegetarian).',
              'We don\'t live here.',
              'He doesn\'t know the answer.',
              'It doesn\'t work.'
            ] 
          },
          question: { 
            structure: 'Do/Does + S + V?', 
            examples: [
              'Do you live in London?', 
              'Does she speak French?',
              'Do they play video games?',
              'Does John work with you?',
              'Where do you live?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'He work here.', right: 'He works here.', explanation: 'Don\'t forget the -S for third person singular.' },
          { wrong: 'Does she works?', right: 'Does she work?', explanation: 'When you use DOES, the main verb loses the -S.' }
        ]
      },
      {
        id: 'a1_pres_cont',
        title: 'Present Continuous',
        icon: <Clock size={20} />,
        summary: 'Now / Happening',
        definition: 'Describes actions happening exactly at this moment or temporary situations.',
        deepDive: [
          'Formula: Verb To Be (am/is/are) + Verb-ING.',
          'Spelling: One syllable ending in CVC -> Double last letter (Run -> Running, Sit -> Sitting).',
          'Spelling: Ends in E -> Remove E (Make -> Making, Write -> Writing).',
          'Stative Verbs (Like, Love, Know, Want) generally CANNOT be used in continuous.'
        ],
        signalWords: ['Now', 'At the moment', 'Look!', 'Listen!', 'Currently'],
        forms: {
          positive: { 
            structure: 'S + be + V-ing', 
            examples: [
              'I am eating lunch right now.', 
              'She is sleeping upstairs.',
              'They are playing football in the park.',
              'Look! It is raining.',
              'We are studying for the exam.'
            ] 
          },
          negative: { 
            structure: 'S + be + not + V-ing', 
            examples: [
              'We aren\'t listening to music.',
              'He isn\'t working today.',
              'I am not joking.',
              'They aren\'t coming to the party.'
            ] 
          },
          question: { 
            structure: 'Be + S + V-ing?', 
            examples: [
              'Are you coming?',
              'Is she crying?',
              'What are you doing?',
              'Are they watching TV?',
              'Why is he running?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I am wanting a car.', right: 'I want a car.', explanation: 'WANT is a stative verb, not an action. Use Simple Present.' }
        ]
      },
      {
        id: 'a1_prepositions',
        title: 'Prepositions (Place/Time)',
        icon: <MapPin size={20} />,
        summary: 'In / On / At',
        definition: 'Little words that describe location or time.',
        deepDive: [
          'TIME - AT: Precise time (At 5pm, At noon, At night).',
          'TIME - ON: Days and Dates (On Sunday, On July 4th, On my birthday).',
          'TIME - IN: Long periods (In 2024, In July, In the morning/afternoon).',
          'PLACE - AT: Point/Station (At the door, At work).',
          'PLACE - ON: Surface/Line (On the table, On the wall, On Main St).',
          'PLACE - IN: Enclosed space/City/Country (In the box, In London, In Brazil).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Prep + Noun', 
            examples: [
              'See you on Monday.', 
              'My birthday is in May.', 
              'Meet me at the station at 9 AM.',
              'The book is on the table.',
              'She lives in Paris.'
            ] 
          },
          negative: { 
            structure: '-', 
            examples: [
              'I am not at home.',
              'The keys aren\'t in the bag.'
            ] 
          },
          question: { 
            structure: 'Where/When...?', 
            examples: [
              'When is the party?', 
              'Where are my keys?',
              'Are you at school?',
              'Is it in the drawer?'
            ] 
          }
        }
      }
    ]
  },
  {
    id: 'A2',
    label: 'Elementary',
    color: 'text-teal-600',
    bg: 'bg-teal-600',
    borderColor: 'border-teal-200',
    description: 'Past events, Future plans, and Comparisons.',
    topics: [
      {
        id: 'a2_past_simple',
        title: 'Past Simple',
        icon: <Clock size={20} />,
        summary: 'Finished Past',
        definition: 'Actions that started and finished at a specific time in the past.',
        deepDive: [
          'Regular Verbs: Add -ED (Work -> Worked, Play -> Played).',
          'Irregular Verbs: Change completely (Go -> Went, See -> Saw, Buy -> Bought).',
          'Auxiliary DID: Use "Did" for Questions and Negatives. When you use "Did", the main verb goes back to base form.',
          'Pronunciation of -ED: /t/ (Walked), /d/ (Played), /id/ (Started).'
        ],
        signalWords: ['Yesterday', 'Last night', 'Last week', 'Ago', 'In 2010', 'When I was young'],
        forms: {
          positive: { 
            structure: 'S + V2 (Past)', 
            examples: [
              'I worked late yesterday.', 
              'She went to Paris last summer.',
              'We saw a movie last night.',
              'He bought a new car.',
              'They arrived 5 minutes ago.'
            ] 
          },
          negative: { 
            structure: 'S + didn\'t + V1 (Base)', 
            examples: [
              'I didn\'t go to school.', 
              'He didn\'t see the sign.',
              'We didn\'t eat pizza.',
              'She didn\'t like the movie.',
              'It didn\'t rain.'
            ] 
          },
          question: { 
            structure: 'Did + S + V1 (Base)?', 
            examples: [
              'Did you like it?', 
              'Where did he go?',
              'Did they finish the work?',
              'What did you do yesterday?',
              'Did she call you?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I didn\'t went.', right: 'I didn\'t go.', explanation: 'Double past is incorrect. "Did" is already past, so the verb stays base.' },
          { wrong: 'She goed.', right: 'She went.', explanation: 'Go is irregular.' }
        ]
      },
      {
        id: 'a2_future',
        title: 'Future (Will vs Going to)',
        icon: <ArrowRight size={20} />,
        summary: 'Plans vs Decisions',
        definition: 'Different ways to talk about the future depending on context.',
        deepDive: [
          'GOING TO: Use for Plans made BEFORE speaking (I bought tickets, I am going to fly).',
          'GOING TO: Use for Evidence (Look at those clouds, it is going to rain).',
          'WILL: Use for Instant Decisions made NOW (I\'ll have a coffee).',
          'WILL: Use for Promises, Predictions without evidence, and Offers.'
        ],
        signalWords: ['Tomorrow', 'Next week', 'Soon', 'Later'],
        forms: {
          positive: { 
            structure: 'Will / Be Going To', 
            examples: [
              'I am going to visit my mom on Saturday. (Plan)', 
              'Look out! You are going to fall! (Evidence)',
              'I forgot my wallet. I will pay later. (Instant Decision)',
              'I promise I will help you. (Promise)',
              'I think cars will fly in 2050. (Prediction)'
            ] 
          },
          negative: { 
            structure: 'Won\'t / Not going to', 
            examples: [
              'I won\'t do it again.', 
              'She isn\'t going to come.',
              'We won\'t tell anyone.',
              'It isn\'t going to work.'
            ] 
          },
          question: { 
            structure: 'Will...? / Are you going to...?', 
            examples: [
              'Will you marry me?', 
              'Are you going to study tonight?',
              'Where are we going to eat?',
              'Will it rain?'
            ] 
          }
        }
      },
      {
        id: 'a2_comparatives',
        title: 'Comparatives & Superlatives',
        icon: <ArrowUpLeft size={20} />,
        summary: 'Bigger / The Biggest',
        definition: 'Comparing characteristics between two or more nouns.',
        deepDive: [
          'Short Adjectives (1 syllable): Add -er / -est (Fast -> Faster -> Fastest).',
          'Long Adjectives (2+ syllables): Use More / Most (Expensive -> More expensive -> Most expensive).',
          'Ending in Y: Change Y to I (Happy -> Happier -> Happiest).',
          'Irregulars: Good->Better->Best, Bad->Worse->Worst, Far->Further->Furthest.'
        ],
        signalWords: ['Than', 'The', 'As...as'],
        forms: {
          positive: { 
            structure: 'Adj-er + than / The + Adj-est', 
            examples: [
              'He is taller than me.', 
              'This is the most expensive car in the shop.',
              'Ferrari is faster than Fiat.',
              'She is the best student in class.',
              'English is easier than Chinese.'
            ] 
          },
          negative: { 
            structure: 'Not as ... as', 
            examples: [
              'I am not as old as you.',
              'This test wasn\'t as hard as I thought.'
            ] 
          },
          question: { 
            structure: 'Which is better?', 
            examples: [
              'Which is faster, a car or a bus?',
              'Who is the tallest person in your family?',
              'Is New York bigger than London?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'He is more tall.', right: 'He is taller.', explanation: 'Tall is a short word, use -er.' },
          { wrong: 'The most good.', right: 'The best.', explanation: 'Good is irregular.' }
        ]
      }
    ]
  },
  {
    id: 'B1',
    label: 'Intermediate',
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    borderColor: 'border-blue-200',
    description: 'Complex Tenses, Passive Voice, Conditionals.',
    topics: [
      {
        id: 'b1_pres_perf_full',
        title: 'Present Perfect',
        icon: <Layers size={20} />,
        summary: 'Have/Has + Past Participle',
        definition: 'Connects the past to the present. Used for experiences, changes, and continuing situations.',
        deepDive: [
          'Unfinished Time: "I have lived here for 10 years" (I still live here).',
          'Experience: "I have seen that movie" (In my life, time doesn\'t matter).',
          'Recent Action with Result: "I have lost my keys" (So I can\'t enter the house now).',
          'Contrast with Past Simple: If you say WHEN it happened (Yesterday), you MUST use Past Simple.'
        ],
        signalWords: ['For', 'Since', 'Just', 'Already', 'Yet', 'Ever', 'Never', 'Lately'],
        forms: {
          positive: { 
            structure: 'Subject + Have/Has + V3', 
            examples: [
              'I have lived here for 10 years.', 
              'She has already finished her homework.',
              'We have been to the USA twice.',
              'I have lost my phone.',
              'He has just arrived.'
            ] 
          },
          negative: { 
            structure: 'Haven\'t / Hasn\'t + V3', 
            examples: [
              'I haven\'t finished yet.',
              'She hasn\'t called me.',
              'We haven\'t seen that movie.',
              'It hasn\'t stopped raining.'
            ] 
          },
          question: { 
            structure: 'Have/Has + Subject + V3?', 
            examples: [
              'Have you seen my keys?', 
              'How long have you been here?',
              'Has she ever eaten sushi?',
              'Have you done your job?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', explanation: 'Specific past time (Yesterday) requires Past Simple.' }
        ]
      },
      {
        id: 'b1_passive',
        title: 'Passive Voice (Intro)',
        icon: <ToggleLeft size={20} />,
        summary: 'Be + Past Participle',
        definition: 'Focuses on the ACTION or the OBJECT, rather than who did it.',
        deepDive: [
          'Structure: Object + Verb To Be (in correct tense) + Past Participle (V3).',
          'Use it when: We don\'t know who did it, it\'s obvious who did it, or the object is more important.',
          'To mention the doer, use "BY".'
        ],
        signalWords: ['By'],
        forms: {
          positive: { 
            structure: 'Object + Be + V3', 
            examples: [
              'The book was written by JK Rowling.', 
              'English is spoken in many countries.',
              'The house was built in 1990.',
              'The emails are sent automatically.',
              'My car has been stolen!'
            ] 
          },
          negative: { 
            structure: 'Be + Not + V3', 
            examples: [
              'The room wasn\'t cleaned yesterday.',
              'Service is not included in the bill.',
              'The letter hasn\'t been sent yet.'
            ] 
          },
          question: { 
            structure: 'Be + Obj + V3?', 
            examples: [
              'When was the Taj Mahal built?',
              'Is credit card accepted here?',
              'Has the work been finished?',
              'Where are these cars made?'
            ] 
          }
        }
      },
      {
        id: 'b1_conditionals_01',
        title: 'Conditionals 0 & 1',
        icon: <Link size={20} />,
        summary: 'Facts & Real Future',
        definition: 'Describing cause and effect relationships.',
        deepDive: [
          'Zero Conditional (Facts): If + Present, ... Present. (If you heat ice, it melts). Always true.',
          'First Conditional (Real Possibility): If + Present, ... Will. (If it rains, I will stay home). Specific future situation.',
          'You can swap the order: "I will stay home if it rains" (No comma).'
        ],
        signalWords: ['If', 'Unless', 'When', 'As soon as'],
        forms: {
          positive: { 
            structure: 'If + Pres, ... Pres / Will', 
            examples: [
              'If you mix red and blue, you get purple. (Zero)', 
              'If I see him, I will tell him the news. (First)',
              'If we hurry, we will catch the bus.',
              'Unless you study, you will fail.'
            ] 
          },
          negative: { 
            structure: 'Unless / If ... not', 
            examples: [
              'If you don\'t water plants, they die.',
              'I won\'t go if you don\'t go.',
              'Unless the weather improves, we will cancel the picnic.'
            ] 
          },
          question: { 
            structure: 'What will you do if...?', 
            examples: [
              'What happens if you press this button?',
              'What will you do if you miss the train?',
              'Where will you go if the hotel is full?'
            ] 
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
    description: 'Hypothetical situations, Deduction, Advanced Passive.',
    topics: [
      {
        id: 'b2_cond_2',
        title: 'Second Conditional',
        icon: <Link size={20} />,
        summary: 'Unreal Present',
        definition: 'Used for imaginary, impossible, or unlikely situations in the PRESENT or FUTURE.',
        deepDive: [
          'Formula: If + Past Simple, ... WOULD + Verb.',
          'Important: It uses Past Simple, but it talks about NOW.',
          'Subjunctive: With verb To Be, use "WERE" for all persons (If I were you, If she were here).',
          'Use it for advice: "If I were you, I would..."'
        ],
        signalWords: ['If', 'Would', 'Were'],
        forms: {
          positive: { 
            structure: 'If + Past, ... Would', 
            examples: [
              'If I won the lottery, I would buy a boat. (I probably won\'t win)', 
              'If I were you, I would accept the job.',
              'If he studied more, he would pass. (But he doesn\'t study)',
              'I would travel the world if I had more money.'
            ] 
          },
          negative: { 
            structure: 'If ... didn\'t ..., wouldn\'t', 
            examples: [
              'If I didn\'t have to work, I wouldn\'t go.',
              'I wouldn\'t do that if I were you.',
              'If she didn\'t like him, she wouldn\'t call him.'
            ] 
          },
          question: { 
            structure: 'What would you do if...?', 
            examples: [
              'What would you do if you saw a ghost?',
              'Where would you live if you could live anywhere?',
              'Would you help me if I asked you?'
            ] 
          }
        }
      },
      {
        id: 'b2_cond_3',
        title: 'Third Conditional',
        icon: <Link size={20} />,
        summary: 'Unreal Past / Regrets',
        definition: 'Used for imaginary situations in the PAST. It describes something that did NOT happen.',
        deepDive: [
          'Formula: If + Past Perfect (had done), ... WOULD HAVE + Past Participle (done).',
          'Use this for regrets or criticizing past actions.',
          '"If I had studied" means I DID NOT study.'
        ],
        signalWords: ['If only', 'Would have', 'Had'],
        forms: {
          positive: { 
            structure: 'If + Past Perf, ... Would Have', 
            examples: [
              'If I had known, I would have come earlier.', 
              'If it hadn\'t rained, we would have gone to the beach.',
              'If she had seen the sign, she would have stopped.',
              'I would have passed if I had studied.'
            ] 
          },
          negative: { 
            structure: 'Wouldn\'t have...', 
            examples: [
              'I wouldn\'t have been late if the bus had arrived on time.',
              'If you hadn\'t lied, I wouldn\'t have been angry.'
            ] 
          },
          question: { 
            structure: 'Would you have...?', 
            examples: [
              'What would you have done if you had lost your passport?',
              'Would you have helped me if I had asked?',
              'Where would you have gone?'
            ] 
          }
        }
      },
      {
        id: 'b2_modals_deduction',
        title: 'Modals of Deduction',
        icon: <Lightbulb size={20} />,
        summary: 'Must / Can\'t / Might',
        definition: 'Using modals to guess how true something is based on evidence.',
        deepDive: [
          'MUST: 90-100% Sure it\'s TRUE. (He has a Ferrari -> He must be rich).',
          'CAN\'T: 90-100% Sure it\'s FALSE. (He just ate lunch -> He can\'t be hungry).',
          'MIGHT / COULD / MAY: 50% Possibility. (He isn\'t answering -> He might be sleeping).',
          'Note: The opposite of "Must be" is "Can\'t be", not "Mustn\'t be".'
        ],
        signalWords: ['Surely', 'Definitely', 'Maybe', 'Perhaps'],
        forms: {
          positive: { 
            structure: 'Must be / Might be', 
            examples: [
              'You\'ve been working all day, you must be tired.', 
              'She might be at home, the lights are on.',
              'It could be true.',
              'Look at the snow! It must be freezing outside.'
            ] 
          },
          negative: { 
            structure: 'Can\'t be', 
            examples: [
              'It can\'t be true! I don\'t believe it.', 
              'He can\'t be the winner, he wasn\'t even playing.',
              'She might not come today.'
            ] 
          },
          question: { 
            structure: '-', 
            examples: [
              'Could it be true?',
              'Do you think he might be lost?'
            ] 
          }
        }
      },
      {
        id: 'b2_gerunds',
        title: 'Gerunds (-ing)',
        icon: <Type size={20} />,
        summary: 'Verbs as Nouns',
        definition: 'When a verb ends in -ING and functions as a noun.',
        deepDive: [
          'As the SUBJECT of a sentence: "Smoking is bad for you."',
          'After PREPOSITIONS: "I am interested IN learning."',
          'After CERTAIN VERBS: Enjoy, Mind, Suggest, Avoid, Finish, Miss.',
          'Example: "I enjoy playing" (Not I enjoy to play).'
        ],
        signalWords: ['Enjoy', 'Mind', 'Stop', 'Suggest', 'Avoid'],
        forms: {
          positive: { 
            structure: 'V-ing', 
            examples: [
              'Swimming is good exercise.', 
              'I enjoy reading books.', 
              'Thanks for helping me.',
              'She suggested going to the cinema.',
              'He avoided answering the question.'
            ] 
          },
          negative: { 
            structure: 'Not -ing', 
            examples: [
              'I suggest not going there at night.',
              'He admitted not doing the homework.'
            ] 
          },
          question: { 
            structure: 'Do you mind -ing?', 
            examples: [
              'Do you mind opening the window?',
              'Do you like cooking?',
              'Have you finished eating?'
            ] 
          }
        }
      },
      {
        id: 'b2_infinitives',
        title: 'Infinitives (To)',
        icon: <Type size={20} />,
        summary: 'To + Verb',
        definition: 'The base form of the verb with TO.',
        deepDive: [
          'To show PURPOSE: "I went to the shop TO buy milk."',
          'After ADJECTIVES: "It is easy TO learn."',
          'After CERTAIN VERBS: Want, Decide, Promise, Plan, Hope, Offer, Refuse.',
          'Example: "I decided to go" (Not I decided going).'
        ],
        signalWords: ['Want', 'Hope', 'Decide', 'Plan', 'Promise'],
        forms: {
          positive: { 
            structure: 'To + V', 
            examples: [
              'I want to go home.', 
              'It is dangerous to swim here.', 
              'I called him to apologize.',
              'She promised to help me.',
              'We decided to sell the house.'
            ] 
          },
          negative: { 
            structure: 'Not to + V', 
            examples: [
              'I decided not to go.',
              'She promised not to tell anyone.',
              'Try not to be late.'
            ] 
          },
          question: { 
            structure: 'Want to...?', 
            examples: [
              'Do you want to come?',
              'Where do you hope to work?',
              'Did he offer to pay?'
            ] 
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
    description: 'Precision, Nuance, and Style.',
    topics: [
      {
        id: 'c1_inversion',
        title: 'Inversion',
        icon: <ArrowUpLeft size={20} />,
        summary: 'Never have I...',
        definition: 'Changing the normal word order (Subject + Verb -> Verb + Subject) for dramatic emphasis or formality.',
        deepDive: [
          'Triggered by Negative Adverbials at the start: Never, Seldom, Rarely, Hardly, Under no circumstances.',
          'Structure looks like a question, but it is a statement.',
          '"Never have I seen" instead of "I have never seen".',
          'Only after...', 'Not only... but also...', 'Little did he know...'
        ],
        signalWords: ['Never', 'Seldom', 'Rarely', 'No sooner', 'Little', 'Not only'],
        forms: {
          positive: { 
            structure: 'Adv + Aux + S + V', 
            examples: [
              'Never have I seen such a beautiful view.', 
              'Rarely do we go out these days.', 
              'Under no circumstances should you open this door.',
              'Little did he know that she was lying.',
              'Not only is he rich, but he is also generous.'
            ] 
          },
          negative: { 
            structure: '-', 
            examples: [] 
          },
          question: { 
            structure: '-', 
            examples: [] 
          }
        },
        proTip: 'Use this in essays or formal speeches to sound sophisticated. Don\'t overuse it in casual chat.'
      },
      {
        id: 'c1_past_modals',
        title: 'Past Modals',
        icon: <Clock size={20} />,
        summary: 'Should have done',
        definition: 'Talking about past possibilities, deductions, and regrets.',
        deepDive: [
          'SHOULD HAVE + V3: Regret or Criticism (You didn\'t do it, but it was a good idea).',
          'MUST HAVE + V3: Logical Deduction - Certainty (It happened).',
          'CAN\'T HAVE + V3: Logical Deduction - Impossibility (It didn\'t happen).',
          'COULD HAVE + V3: Possibility that didn\'t happen.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Modal + Have + V3', 
            examples: [
              'You should have called me. (You didn\'t call)', 
              'He must have left already. (His car is gone)',
              'I could have won, but I fell.',
              'They might have missed the bus.'
            ] 
          },
          negative: { 
            structure: 'Needn\'t have / Can\'t have', 
            examples: [
              'You needn\'t have brought gifts (it wasn\'t necessary, but you did).', 
              'He can\'t have stolen it (he was with me).',
              'I shouldn\'t have eaten so much.'
            ] 
          },
          question: { 
            structure: 'Should I have...?', 
            examples: [
              'Should I have told him?',
              'Where could he have gone?'
            ] 
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
    description: 'Native-level command and literary structures.',
    topics: [
      {
        id: 'c2_subjunctive',
        title: 'The Subjunctive',
        icon: <AlertTriangle size={20} />,
        summary: 'I insist that he be...',
        definition: 'A formal mood used to explore conditional or imaginary situations, or to express wishes, commands, and demands.',
        deepDive: [
          'Often follows verbs like: Suggest, Recommend, Insist, Demand, Request.',
          'Also follows adjectives: Essential, Vital, Important, Necessary.',
          'RULE: Use the BASE form of the verb for ALL persons (He go, She be, It have). No -s, no -ed, no -ing.',
          'Example: "I suggest that he study" (Not studies).'
        ],
        signalWords: ['Insist', 'Recommend', 'Vital', 'Essential', 'Crucial'],
        forms: {
          positive: { 
            structure: 'S + V + that + S + Base Verb', 
            examples: [
              'I suggest that he study more.', 
              'It is essential that she be here on time.',
              'The doctor recommended that he stop smoking.',
              'I demand that I be allowed to speak.',
              'It is vital that the machine remain on.'
            ] 
          },
          negative: { 
            structure: '...that + S + not + Base', 
            examples: [
              'I recommend that you not go there.',
              'It is important that she not know the truth yet.'
            ] 
          },
          question: { 
            structure: '-', 
            examples: [] 
          }
        },
        commonMistakes: [
          { wrong: 'I suggest that he goes.', right: 'I suggest that he GO.', explanation: 'Subjunctive uses base form (no -s).' }
        ]
      },
      {
        id: 'c2_complex_inversion',
        title: 'Complex Inversion',
        icon: <ArrowUpLeft size={20} />,
        summary: 'Had I known...',
        definition: 'Inverting conditional sentences by removing "IF". This is extremely formal and literary.',
        deepDive: [
          'Type 2 Conditional: "If I were..." -> "Were I..."',
          'Type 3 Conditional: "If I had known..." -> "Had I known..."',
          'First Conditional (Formal): "If you should see..." -> "Should you see..."',
          'Negative: Keep "Not" after the subject. "Had I not..."'
        ],
        signalWords: ['Had', 'Were', 'Should'],
        forms: {
          positive: { 
            structure: 'Aux + S + ...', 
            examples: [
              'Had I known you were coming, I would have baked a cake.', 
              'Were it not for your help, I would have failed.', 
              'Should you need assistance, please call me.',
              'Were he richer, he would buy an island.'
            ] 
          },
          negative: { 
            structure: 'Had I not...', 
            examples: [
              'Had I not seen it with my own eyes, I wouldn\'t believe it.',
              'Were we not so tired, we would join you.'
            ] 
          },
          question: { 
            structure: '-', 
            examples: [] 
          }
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