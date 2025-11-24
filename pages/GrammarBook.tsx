import React, { useState, useEffect } from 'react';
import { Book, ArrowRight, Zap, CheckCircle, HelpCircle, MinusCircle, PlusCircle, Bookmark, LayoutGrid, List, Clock, User, Link, Layers, AlertTriangle, Lightbulb, XCircle, MapPin, Hash, MessageCircle, Split, ArrowUpLeft, Calendar, Type, Check, Music, Star, Smile } from 'lucide-react';

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
              'They are my best friends.'
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
              'They are not (aren\'t) at home.'
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
              'Are they students?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have 20 years.', right: 'I am 20 years old.', explanation: 'In English, you "ARE" an age, you do not "HAVE" it.' },
          { wrong: 'She are happy.', right: 'She is happy.', explanation: 'She is singular, use IS.' }
        ]
      },
      // 2. PERSONAL PRONOUNS
      {
        id: 'a1_pronouns',
        title: 'Personal Pronouns',
        icon: <User size={20} />,
        summary: 'I, You, He, She...',
        definition: 'Words that replace names (nouns) to avoid repetition.',
        deepDive: [
          'I (Eu) - Always capitalized.',
          'You (Você/Vocês) - Same for singular and plural.',
          'He (Ele) - Men/Boys.',
          'She (Ela) - Women/Girls.',
          'It (Ele/Ela/Isso) - Objects, Animals, Weather, Time (Never for people!).',
          'We (Nós) - Me + Others.',
          'They (Eles/Elas) - Plural for People, Objects, or Animals.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Subject Pronoun + Verb', 
            examples: [
              'I like pizza.',
              'You look tired.',
              'He plays soccer.',
              'She reads books.',
              'It is a cat.',
              'We live here.',
              'They are coming.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        },
        commonMistakes: [
          { wrong: 'Is good.', right: 'It is good.', explanation: 'English sentences almost ALWAYS need a subject. Use "It".' }
        ]
      },
      // 3. ARTICLES
      {
        id: 'a1_articles',
        title: 'Articles (A/An/The)',
        icon: <Type size={20} />,
        summary: 'A, An, The',
        definition: 'Small words that define a noun as specific or unspecific.',
        deepDive: [
          'A: Before consonant sounds (A car, A house, A university).',
          'AN: Before vowel sounds (An apple, An hour, An elephant).',
          'THE: Specific things (The moon, The president) or things mentioned before.',
          'NO ARTICLE: For Plurals in general (I like dogs) or Names (Brazil, John).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'A/An + Singular Noun', 
            examples: [
              'I have a dog.',
              'She eats an apple.',
              'He is a doctor.',
              'It is an hour drive.',
              'The sun is hot.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        },
        commonMistakes: [
          { wrong: 'I have car.', right: 'I have a car.', explanation: 'Singular nouns usually need an article.' }
        ]
      },
      // 4. PLURALS
      {
        id: 'a1_plurals',
        title: 'Regular Plurals',
        icon: <List size={20} />,
        summary: '-S / -ES',
        definition: 'How to make nouns plural (more than one).',
        deepDive: [
          'General Rule: Add -S (Car -> Cars).',
          'Ending in -s, -sh, -ch, -x, -o: Add -ES (Bus -> Buses, Box -> Boxes).',
          'Ending in Consonant + Y: Remove Y, add -IES (Baby -> Babies).',
          'Ending in Vowel + Y: Just -S (Boy -> Boys).'
        ],
        signalWords: ['Two', 'Many', 'Some'],
        forms: {
          positive: { 
            structure: 'Noun + s/es', 
            examples: [
              'One dog, two dogs.',
              'I have three boxes.',
              'The babies are crying.',
              'He has two watches.',
              'I saw five buses.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        }
      },
      // 5. POSSESSIVES
      {
        id: 'a1_possessives',
        title: 'Possessive Adjectives',
        icon: <User size={20} />,
        summary: 'My, Your, His...',
        definition: 'Words that show ownership. They go BEFORE the noun.',
        deepDive: [
          'I -> My (My house).',
          'You -> Your (Your car).',
          'He -> His (His name).',
          'She -> Her (Her cat).',
          'It -> Its (Its tail).',
          'We -> Our (Our family).',
          'They -> Their (Their problem).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Possessive + Noun', 
            examples: [
              'My name is John.',
              'This is your book.',
              'His car is red.',
              'Her mother is nice.',
              'Our team won.',
              'Their house is big.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        },
        commonMistakes: [
          { wrong: 'I like the house of she.', right: 'I like her house.', explanation: 'Use possessive adjective + noun.' }
        ]
      },
      // 6. ADJECTIVES
      {
        id: 'a1_adjectives',
        title: 'Common Adjectives',
        icon: <Star size={20} />,
        summary: 'Big, Good, Red',
        definition: 'Words that describe nouns.',
        deepDive: [
          'Rule 1: Adjectives NEVER change for plural (Red cars, NOT Reds cars).',
          'Rule 2: Adjectives go BEFORE the noun (A big house).',
          'Rule 3: Adjectives go AFTER verb To Be (The house is big).'
        ],
        signalWords: ['Very', 'Really'],
        forms: {
          positive: { 
            structure: 'Adj + Noun / Be + Adj', 
            examples: [
              'It is a fast car.',
              'They are good students.',
              'She is beautiful.',
              'The test was hard.',
              'I am happy.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        },
        commonMistakes: [
          { wrong: 'I have two blues cars.', right: 'I have two blue cars.', explanation: 'Adjectives have no plural form.' }
        ]
      },
      // 7. SENTENCE ORDER
      {
        id: 'a1_order',
        title: 'Sentence Order (SVO)',
        icon: <List size={20} />,
        summary: 'Subject + Verb + Object',
        definition: 'The strict order of words in English sentences.',
        deepDive: [
          'Standard: Subject (Who) + Verb (Action) + Object (What).',
          'Example: I (S) + Love (V) + Pizza (O).',
          'Place before Time: I go to school (Place) at 8am (Time).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'S + V + O', 
            examples: [
              'I drink coffee.',
              'She plays tennis.',
              'We watch TV.',
              'They speak English.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        }
      },
      // 8. PRESENT SIMPLE
      {
        id: 'a1_present_simple',
        title: 'Present Simple',
        icon: <Clock size={20} />,
        summary: 'Habits & Facts',
        definition: 'Used for daily routines, permanent situations, and general facts.',
        deepDive: [
          'I/You/We/They: Use Base Verb (I work).',
          'He/She/It: Add -S (He works).',
          'Negative: Don\'t (I, You, We, They) / Doesn\'t (He, She, It).',
          'Question: Do / Does.'
        ],
        signalWords: ['Always', 'Every day', 'Usually', 'On Mondays'],
        forms: {
          positive: { 
            structure: 'S + Verb (+s)', 
            examples: [
              'I live in Brazil.',
              'She likes chocolate.',
              'He works at a bank.',
              'We study English.',
              'It rains a lot here.'
            ] 
          },
          negative: { 
            structure: 'S + Don\'t/Doesn\'t + Verb', 
            examples: [
              'I don\'t eat meat.',
              'She doesn\'t know him.',
              'He doesn\'t play piano.',
              'We don\'t have a car.'
            ] 
          },
          question: { 
            structure: 'Do/Does + S + Verb?', 
            examples: [
              'Do you speak English?',
              'Does she live here?',
              'Do they want coffee?',
              'Does it work?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'He don\'t like.', right: 'He doesn\'t like.', explanation: 'He/She/It uses DOES/DOESN\'T.' },
          { wrong: 'Does she works?', right: 'Does she work?', explanation: 'When you use Does, remove the -S from the verb.' }
        ]
      },
      // 9. PRESENT CONTINUOUS
      {
        id: 'a1_present_continuous',
        title: 'Present Continuous',
        icon: <Clock size={20} />,
        summary: 'Am/Is/Are + -ing',
        definition: 'Actions happening NOW or around this time.',
        deepDive: [
          'Structure: To Be (Am/Is/Are) + Verb-ING.',
          'Spelling: E drops (Make -> Making). CVC doubles (Run -> Running).'
        ],
        signalWords: ['Now', 'At the moment', 'Look!', 'Listen!'],
        forms: {
          positive: { 
            structure: 'S + Be + V-ing', 
            examples: [
              'I am studying now.',
              'She is sleeping.',
              'They are playing.',
              'Look! It is snowing.'
            ] 
          },
          negative: { 
            structure: 'S + Be + Not + V-ing', 
            examples: [
              'I am not watching TV.',
              'He isn\'t listening.',
              'We aren\'t talking.'
            ] 
          },
          question: { 
            structure: 'Be + S + V-ing?', 
            examples: [
              'Are you working?',
              'Is she crying?',
              'What are you doing?'
            ] 
          }
        }
      },
      // 10. MODAL CAN
      {
        id: 'a1_modal_can',
        title: 'Modal Verb: Can',
        icon: <Zap size={20} />,
        summary: 'Ability & Permission',
        definition: 'Expresses what is possible or allowed.',
        deepDive: [
          'Invariant: Same for all persons (I can, She can).',
          'Negative: Cannot or Can\'t.',
          'Main Verb: Always base form (She can swim, NOT She can swims).'
        ],
        signalWords: ['Well', 'Fast'],
        forms: {
          positive: { 
            structure: 'S + Can + Verb', 
            examples: [
              'I can swim.',
              'She can speak 3 languages.',
              'We can help you.',
              'Birds can fly.'
            ] 
          },
          negative: { 
            structure: 'S + Can\'t + Verb', 
            examples: [
              'I can\'t hear you.',
              'He can\'t drive.',
              'They can\'t come.'
            ] 
          },
          question: { 
            structure: 'Can + S + Verb?', 
            examples: [
              'Can you help me?',
              'Can I open the window?',
              'Can she cook?'
            ] 
          }
        }
      },
      // 11. IMPERATIVE
      {
        id: 'a1_imperative',
        title: 'Imperative',
        icon: <MessageCircle size={20} />,
        summary: 'Commands',
        definition: 'Used for orders, instructions, or offers.',
        deepDive: [
          'No Subject: Starts directly with the Verb.',
          'Negative: Don\'t + Verb.',
          'Polite: Add "Please".'
        ],
        signalWords: ['Please'],
        forms: {
          positive: { 
            structure: 'Verb + Object', 
            examples: [
              'Open the door.',
              'Sit down.',
              'Listen to me.',
              'Turn right.'
            ] 
          },
          negative: { 
            structure: 'Don\'t + Verb', 
            examples: [
              'Don\'t touch that.',
              'Don\'t be late.',
              'Don\'t worry.'
            ] 
          },
          question: { structure: '-', examples: [] }
        }
      },
      // 12. WH-QUESTIONS
      {
        id: 'a1_wh_questions',
        title: 'Wh-Questions',
        icon: <HelpCircle size={20} />,
        summary: 'What, Where, Who...',
        definition: 'Question words used to ask for information.',
        deepDive: [
          'What (Object/Action)',
          'Where (Place)',
          'When (Time)',
          'Who (Person)',
          'Why (Reason)',
          'How (Manner/State)'
        ],
        signalWords: [],
        forms: {
          positive: { structure: '-', examples: [] },
          negative: { structure: '-', examples: [] },
          question: { 
            structure: 'Wh + Aux + S + V?', 
            examples: [
              'What is your name?',
              'Where do you live?',
              'When is the party?',
              'Who is that?',
              'Why are you sad?',
              'How are you?'
            ] 
          }
        }
      },
      // 13. YES/NO QUESTIONS
      {
        id: 'a1_yesno',
        title: 'Yes/No Questions',
        icon: <HelpCircle size={20} />,
        summary: 'Do you? Are you?',
        definition: 'Questions that can be answered with a simple Yes or No.',
        deepDive: [
          'With To Be: Invert subject (Are you happy?).',
          'With Verbs: Use Do/Does (Do you like it?).'
        ],
        signalWords: [],
        forms: {
          positive: { structure: '-', examples: [] },
          negative: { structure: '-', examples: [] },
          question: { 
            structure: 'Aux + S + ...?', 
            examples: [
              'Are you hungry?',
              'Is he a student?',
              'Do you speak English?',
              'Does she work here?'
            ] 
          }
        }
      },
      // 14. PREPOSITIONS PLACE
      {
        id: 'a1_prep_place',
        title: 'Prepositions of Place',
        icon: <MapPin size={20} />,
        summary: 'In, On, Under',
        definition: 'Where things are.',
        deepDive: [
          'IN: Inside (In the box, In London).',
          'ON: Surface (On the table, On the wall).',
          'UNDER: Below (Under the bed).',
          'NEXT TO: Beside.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Be + Prep + Noun', 
            examples: [
              'The cat is in the box.',
              'The book is on the table.',
              'The shoes are under the bed.',
              'The bank is next to the park.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        }
      },
      // 15. PREPOSITIONS TIME
      {
        id: 'a1_prep_time',
        title: 'Prepositions of Time',
        icon: <Clock size={20} />,
        summary: 'At, On, In',
        definition: 'When things happen.',
        deepDive: [
          'AT: Clock time (At 5pm) & Festivals (At Christmas).',
          'ON: Days & Dates (On Monday, On May 1st).',
          'IN: Months, Years, Seasons, Parts of day (In July, In 2024, In the morning).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Prep + Time', 
            examples: [
              'I wake up at 7am.',
              'The class is on Tuesday.',
              'My birthday is in October.',
              'I was born in 1999.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        },
        commonMistakes: [
          { wrong: 'In Monday.', right: 'On Monday.', explanation: 'Days always use ON.' }
        ]
      },
      // 16. THIS/THAT
      {
        id: 'a1_demonstratives',
        title: 'Demonstratives',
        icon: <ArrowRight size={20} />,
        summary: 'This, That, These, Those',
        definition: 'Pointing at things near or far.',
        deepDive: [
          'THIS: Singular + Near (This pen here).',
          'THAT: Singular + Far (That car there).',
          'THESE: Plural + Near (These keys here).',
          'THOSE: Plural + Far (Those birds there).'
        ],
        signalWords: ['Here', 'There'],
        forms: {
          positive: { 
            structure: 'This/That + Is / These/Those + Are', 
            examples: [
              'This is my friend.',
              'That is a nice house.',
              'These are my shoes.',
              'Those are beautiful flowers.'
            ] 
          },
          negative: { structure: '-', examples: [] },
          question: { structure: '-', examples: [] }
        }
      },
      // 17. THERE IS/ARE
      {
        id: 'a1_there_is',
        title: 'Existence',
        icon: <MapPin size={20} />,
        summary: 'There is / There are',
        definition: 'To say that something exists in a place (Haver/Existir).',
        deepDive: [
          'There IS: Singular (There is a cat).',
          'There ARE: Plural (There are two cats).',
          'Contraction: There\'s.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'There + Be + Noun', 
            examples: [
              'There is a pen on the desk.',
              'There is a problem.',
              'There are five students here.',
              'There are many cars.'
            ] 
          },
          negative: { 
            structure: 'There + Be + Not', 
            examples: [
              'There isn\'t any milk.',
              'There aren\'t any chairs.'
            ] 
          },
          question: { 
            structure: 'Is/Are + There...?', 
            examples: [
              'Is there a bathroom here?',
              'Are there any questions?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'Have a car in the street.', right: 'There is a car in the street.', explanation: 'Do not use HAVE for existence. Use THERE IS.' }
        ]
      },
      // 18. QUANTIFIERS
      {
        id: 'a1_quantifiers',
        title: 'Basic Quantifiers',
        icon: <Hash size={20} />,
        summary: 'Some / Any',
        definition: 'Used to talk about indefinite quantities.',
        deepDive: [
          'SOME: Positive sentences (I have some money).',
          'ANY: Negative and Questions (I don\'t have any money. Do you have any money?).',
          'Exception: Use SOME in offers/requests (Would you like some water?).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Some + Noun', 
            examples: [
              'I need some water.',
              'There are some apples.',
              'I have some news.'
            ] 
          },
          negative: { 
            structure: 'Any + Noun', 
            examples: [
              'I don\'t have any brothers.',
              'There isn\'t any sugar.',
              'We don\'t need any help.'
            ] 
          },
          question: { 
            structure: 'Any + Noun?', 
            examples: [
              'Do you have any idea?',
              'Are there any cookies?'
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
    description: 'Past events, Future plans, Modals, and Life Experiences.',
    topics: [
      // 1. PAST SIMPLE
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
      // 2. PRESENT PERFECT (EXPERIENCE)
      {
        id: 'a2_pres_perf_exp',
        title: 'Present Perfect (Experience)',
        icon: <Layers size={20} />,
        summary: 'Have/Has + V3',
        definition: 'Used to talk about life experiences when the exact time is NOT important or NOT mentioned.',
        deepDive: [
          'Structure: Have/Has + Past Participle (V3).',
          'Focus: "I have the memory of this event" (Result in present).',
          'Comparison: "I went to Paris in 2010" (Past Simple - Specific Time) vs "I have been to Paris" (Present Perfect - Life Experience).',
          'BEEN vs GONE: "He has been to London" (He went and came back). "He has gone to London" (He is there now).'
        ],
        signalWords: ['Ever', 'Never', 'Before', 'Once', 'Twice'],
        forms: {
          positive: { 
            structure: 'S + Have/Has + V3', 
            examples: [
              'I have been to Japan twice.', 
              'She has met a famous actor.', 
              'We have eaten sushi before.',
              'He has seen that movie.', 
              'They have visited New York.'
            ] 
          },
          negative: { 
            structure: 'S + Haven\'t/Hasn\'t + V3', 
            examples: [
              'I haven\'t finished the book.', 
              'She hasn\'t travelled by plane.',
              'We have never tried octopus.',
              'He hasn\'t spoken to me.'
            ] 
          },
          question: { 
            structure: 'Have/Has + S + V3?', 
            examples: [
              'Have you ever been to Brazil?', 
              'Has she ever flown in a helicopter?',
              'Have they seen this film?',
              'Have you done this before?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', explanation: 'If you say WHEN (yesterday), use Past Simple.' }
        ]
      },
      // 3. FUTURE WITH WILL
      {
        id: 'a2_future_will',
        title: 'Future (Will)',
        icon: <ArrowRight size={20} />,
        summary: 'Decisions & Promises',
        definition: 'Used for decisions made at the moment of speaking, promises, offers, or predictions without evidence.',
        deepDive: [
          'Instant Decision: "The phone is ringing. I\'ll answer it." (Decided NOW).',
          'Promise: "I will love you forever."',
          'Prediction (Belief): "I think cars will fly in the future."',
          'Structure: Will + Base Verb (No "to").'
        ],
        signalWords: ['Tomorrow', 'Soon', 'I think', 'Probably'],
        forms: {
          positive: { 
            structure: 'S + Will + Verb', 
            examples: [
              'I\'ll help you with your bags.', 
              'I will call you later.',
              'It will be a great party.',
              'I promise I will study more.',
              'Maybe he will come.'
            ] 
          },
          negative: { 
            structure: 'S + Won\'t + Verb', 
            examples: [
              'I won\'t tell anyone your secret.', 
              'She won\'t agree with this.',
              'We won\'t be late.',
              'It won\'t happen again.'
            ] 
          },
          question: { 
            structure: 'Will + S + Verb?', 
            examples: [
              'Will you marry me?', 
              'Will it rain tomorrow?',
              'Will you be home for dinner?',
              'Where will you go?'
            ] 
          }
        }
      },
      // 4. FUTURE WITH GOING TO
      {
        id: 'a2_future_goingto',
        title: 'Future (Going To)',
        icon: <ArrowRight size={20} />,
        summary: 'Plans & Evidence',
        definition: 'Used for plans decided BEFORE speaking or predictions based on visible evidence.',
        deepDive: [
          'Plan: "I bought tickets. I am going to fly to Rome." (Decided BEFORE).',
          'Evidence: "Look at those clouds! It is going to rain." (I can see it coming).',
          'Structure: Verb To Be (am/is/are) + Going to + Base Verb.'
        ],
        signalWords: ['Next week', 'Tomorrow', 'Tonight', 'Planning to'],
        forms: {
          positive: { 
            structure: 'S + Be + Going to + Verb', 
            examples: [
              'I am going to buy a new car next week.', 
              'She is going to have a baby.',
              'Look! He is going to fall!',
              'We are going to visit our grandparents.',
              'They are going to play soccer on Saturday.'
            ] 
          },
          negative: { 
            structure: 'S + Be + Not + Going to', 
            examples: [
              'I am not going to do that.', 
              'She isn\'t going to come.',
              'We aren\'t going to buy the house.',
              'It isn\'t going to work.'
            ] 
          },
          question: { 
            structure: 'Be + S + Going to?', 
            examples: [
              'Are you going to travel this year?', 
              'Is he going to help us?',
              'What are you going to do?',
              'Are they going to stay?'
            ] 
          }
        }
      },
      // 5. PRESENT CONTINUOUS (FUTURE)
      {
        id: 'a2_pres_cont_future',
        title: 'Present Continuous (Future)',
        icon: <Calendar size={20} />,
        summary: 'Fixed Arrangements',
        definition: 'Used for future events that are already organized, booked, or scheduled with a specific time and place.',
        deepDive: [
          'Focus: Use this when you have an appointment or a booking.',
          'Example: "I am meeting my boss at 10 AM." (It is in my diary).',
          'Difference from Going To: Very similar, but Continuous implies a fixed arrangement with other people.'
        ],
        signalWords: ['Tonight', 'Tomorrow morning', 'On Friday'],
        forms: {
          positive: { 
            structure: 'S + Be + V-ing + Time', 
            examples: [
              'I am seeing the dentist tomorrow at 9.', 
              'We are flying to London on Friday.',
              'She is getting married next month.',
              'They are having a party tonight.'
            ] 
          },
          negative: { 
            structure: 'S + Be + Not + V-ing', 
            examples: [
              'I am not working tomorrow.', 
              'She isn\'t coming to the meeting.',
              'We aren\'t doing anything this weekend.'
            ] 
          },
          question: { 
            structure: 'Be + S + V-ing?', 
            examples: [
              'Are you doing anything tonight?', 
              'Is he playing football on Sunday?',
              'When are you leaving?',
              'Where are we meeting?'
            ] 
          }
        }
      },
      // 6. MODALS OF OBLIGATION
      {
        id: 'a2_modals_obligation',
        title: 'Modals: Must / Have to',
        icon: <AlertTriangle size={20} />,
        summary: 'Rules & Obligations',
        definition: 'Used to express necessity, rules, laws, and personal obligations.',
        deepDive: [
          'MUST: Internal obligation (I feel it is necessary) or Written Rules.',
          'HAVE TO: External obligation (The law/boss/school says so).',
          'MUSTN\'T: PROHIBITION. You cannot do it. It is illegal/forbidden.',
          'DON\'T HAVE TO: NO OBLIGATION. It is not necessary, but you can do it if you want (Optional).'
        ],
        signalWords: ['Rule', 'Law', 'Necessary', 'Optional'],
        forms: {
          positive: { 
            structure: 'Must / Has to / Have to', 
            examples: [
              'You must wear a seatbelt. (Law)', 
              'I must call my mom. (Internal feeling)',
              'She has to work on Saturdays. (Job rule)',
              'We have to study for the exam.'
            ] 
          },
          negative: { 
            structure: 'Mustn\'t / Don\'t have to', 
            examples: [
              'You MUSTN\'T smoke here. (It is forbidden!)', 
              'You MUSTN\'T touch the art. (Prohibited)',
              'You don\'t have to pay, it\'s free. (Optional)',
              'She doesn\'t have to come if she is tired.'
            ] 
          },
          question: { 
            structure: 'Do/Does + S + Have to?', 
            examples: [
              'Do we have to wear a uniform?', 
              'Does he have to work today?',
              'When do I have to finish this?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'You mustn\'t pay, it is free.', right: 'You don\'t have to pay.', explanation: 'Mustn\'t means prohibited. Don\'t have to means optional.' }
        ]
      },
      // 7. COMPARATIVES & SUPERLATIVES
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
              'This test wasn\'t as hard as I thought.',
              'She isn\'t as tall as her brother.'
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
        }
      },
      // 8. ADVERBS OF FREQUENCY
      {
        id: 'a2_adverbs_freq',
        title: 'Adverbs of Frequency',
        icon: <Clock size={20} />,
        summary: 'Always, Usually, Never',
        definition: 'Words that describe HOW OFTEN we do something.',
        deepDive: [
          'Scale: Always (100%) > Usually (80%) > Often (60%) > Sometimes (40%) > Rarely (10%) > Never (0%).',
          'Position Rule 1: BEFORE the main verb (I ALWAYS eat breakfast).',
          'Position Rule 2: AFTER the verb To Be (He IS always late).',
          'Position Rule 3: "Sometimes" can go at the beginning or end of sentence.'
        ],
        signalWords: ['How often?'],
        forms: {
          positive: { 
            structure: 'S + Adv + Verb / S + Be + Adv', 
            examples: [
              'I always brush my teeth.', 
              'She usually takes the bus.',
              'We often watch movies.',
              'They rarely eat meat.',
              'He is never late.',
              'I am always happy.'
            ] 
          },
          negative: { 
            structure: 'S + Don\'t/Doesn\'t + Adv + Verb', 
            examples: [
              'I don\'t usually drink coffee.', 
              'She doesn\'t often call me.',
              'They are not always correct.'
            ] 
          },
          question: { 
            structure: 'Do you + Adv + Verb?', 
            examples: [
              'Do you always walk to work?', 
              'Does he often get angry?',
              'Is she usually this quiet?',
              'How often do you go to the gym?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I go always to the park.', right: 'I always go to the park.', explanation: 'Adverb goes BEFORE the main verb.' }
        ]
      },
      // 9. BASIC CONNECTORS
      {
        id: 'a2_connectors',
        title: 'Basic Connectors',
        icon: <Link size={20} />,
        summary: 'And, But, Because, So',
        definition: 'Words used to join two sentences or ideas together.',
        deepDive: [
          'AND: Adds information (I like tea AND coffee).',
          'BUT: Shows contrast (I like tea, BUT I don\'t like coffee).',
          'BECAUSE: Gives a reason (I study BECAUSE I want to learn).',
          'SO: Gives a result (I was tired, SO I went to bed).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Sentence + Connector + Sentence', 
            examples: [
              'I bought a shirt and a hat.', 
              'He is rich, but he is unhappy.',
              'I am eating because I am hungry.',
              'It was raining, so we stayed home.',
              'She studied hard, so she passed the exam.'
            ] 
          },
          negative: { 
            structure: '-', 
            examples: [
               'I wanted to go, but I couldn\'t.',
               'He didn\'t eat because he wasn\'t hungry.'
            ] 
          },
          question: { 
            structure: 'Why...? Because...', 
            examples: [
              'Why are you crying? Because I am sad.',
              'Did you go out or stay home?'
            ] 
          }
        }
      },
      // 10. TOO / ENOUGH
      {
        id: 'a2_too_enough',
        title: 'Too & Enough',
        icon: <Split size={20} />,
        summary: 'Excess vs Sufficient',
        definition: 'Describing if we have the right amount of something.',
        deepDive: [
          'TOO: Means "More than necessary". Usually negative context. (The tea is TOO hot - I can\'t drink it).',
          'ENOUGH: Means "Sufficient". (I have ENOUGH money - I can buy it).',
          'Position: TOO + Adjective (Too big).',
          'Position: Adjective + ENOUGH (Big enough).',
          'Position: ENOUGH + Noun (Enough money).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Too + Adj / Adj + Enough', 
            examples: [
              'This box is too heavy.', 
              'It is too expensive for me.',
              'He is old enough to drive.',
              'We have enough food.',
              'This room is big enough.'
            ] 
          },
          negative: { 
            structure: 'Not ... enough', 
            examples: [
              'He isn\'t tall enough to play basketball.',
              'I don\'t have enough time.',
              'It isn\'t warm enough to swim.'
            ] 
          },
          question: { 
            structure: 'Is it ... enough?', 
            examples: [
              'Is the water warm enough?', 
              'Do you have enough money?',
              'Is this shirt too big?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have money enough.', right: 'I have enough money.', explanation: 'Enough goes BEFORE nouns.' },
          { wrong: 'He is enough tall.', right: 'He is tall enough.', explanation: 'Enough goes AFTER adjectives.' }
        ]
      },
      // 11. WOULD LIKE
      {
        id: 'a2_would_like',
        title: 'Would Like',
        icon: <MessageCircle size={20} />,
        summary: 'Polite Requests',
        definition: 'A polite way to say "I want". Essential for ordering food or making offers.',
        deepDive: [
          'Structure: Would like + Noun OR Would like + To + Verb.',
          'Contraction: I\'d like, You\'d like, She\'d like.',
          'Difference: "Do you like?" (General preference) vs "Would you like?" (Specific offer now).'
        ],
        signalWords: ['Please'],
        forms: {
          positive: { 
            structure: 'S + \'d like + Noun/To Verb', 
            examples: [
              'I\'d like a coffee, please.', 
              'She would like to speak with you.',
              'We\'d like a table for two.',
              'I would like to order now.',
              'He\'d like to go home.'
            ] 
          },
          negative: { 
            structure: 'S + Wouldn\'t like', 
            examples: [
              'I wouldn\'t like to be famous.', 
              'She wouldn\'t like that color.',
              'We wouldn\'t like to disturb you.'
            ] 
          },
          question: { 
            structure: 'Would you like...?', 
            examples: [
              'Would you like some tea? (Offer)', 
              'Would you like to come with us? (Invitation)',
              'What would you like to eat?',
              'Who would like to answer?'
            ] 
          }
        }
      },
      // 12. COUNTABLE & UNCOUNTABLE
      {
        id: 'a2_countables',
        title: 'Countable vs Uncountable',
        icon: <Hash size={20} />,
        summary: 'Apples vs Water',
        definition: 'Understanding which nouns can be counted and which cannot.',
        deepDive: [
          'Countable: Things you can count (One car, two cars). Use A/AN or Numbers. Plural has -S.',
          'Uncountable: Liquids, powders, abstract concepts (Water, Rice, Information, Money, Music). NO A/AN, NO Plural -S.',
          'To count uncountables, use containers: A bottle of water, A piece of information.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'There is (Uncountable) / There are (Countable)', 
            examples: [
              'I have an apple. (Countable)', 
              'I have some money. (Uncountable)',
              'There is water on the floor. (Uncountable - Singular)',
              'There are three books. (Countable - Plural)',
              'I like music. (Uncountable)'
            ] 
          },
          negative: { 
            structure: '-', 
            examples: [
               'There isn\'t any bread left.',
               'There aren\'t any eggs.'
            ] 
          },
          question: { 
            structure: '-', 
            examples: [
               'Do you want some cheese?',
               'Can I have a glass of milk?'
            ] 
          }
        },
        commonMistakes: [
          { wrong: 'I have many informations.', right: 'I have a lot of information.', explanation: 'Information is always singular/uncountable.' }
        ]
      },
      // 13. HOW MUCH / HOW MANY
      {
        id: 'a2_quantifiers_qs',
        title: 'How Much vs How Many',
        icon: <HelpCircle size={20} />,
        summary: 'Quantity Questions',
        definition: 'Asking about quantities based on countability.',
        deepDive: [
          'HOW MANY: Use with Countable Plural Nouns (Cars, People, Days).',
          'HOW MUCH: Use with Uncountable Nouns (Water, Time, Money, Love).',
          'Also use "How much" for PRICE.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: '-', 
            examples: [] 
          },
          negative: { 
            structure: '-', 
            examples: [] 
          },
          question: { 
            structure: 'How Much/Many + Noun...?', 
            examples: [
              'How many brothers do you have?', 
              'How many students are in the class?',
              'How many days are in a week?',
              'How much water do you drink?',
              'How much money do you need?',
              'How much time do we have?',
              'How much is this shirt? (Price)'
            ] 
          }
        }
      },
      // 14. PREPOSITIONS EXTENDED
      {
        id: 'a2_prepositions_adv',
        title: 'Prepositions (Extended)',
        icon: <MapPin size={20} />,
        summary: 'Behind, Between, Above...',
        definition: 'More precise words to describe location.',
        deepDive: [
          'BEHIND: At the back of.',
          'IN FRONT OF: The opposite of behind.',
          'OPPOSITE: Face to face.',
          'BETWEEN: In the middle of two things.',
          'ABOVE: Higher than (not touching).',
          'BELOW: Lower than (not touching).'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Be + Prep + Place', 
            examples: [
              'The garden is behind the house.', 
              'The car is in front of the garage.',
              'The bank is opposite the park.',
              'I am sitting between Tom and Jerry.',
              'The clock is above the door.',
              'The temperature is below zero.'
            ] 
          },
          negative: { 
            structure: '-', 
            examples: [] 
          },
          question: { 
            structure: 'Where is...?', 
            examples: [
              'Is the parking lot behind the building?',
              'What is under the table?'
            ] 
          }
        }
      },
      // 15. QUESTION TAGS
      {
        id: 'a2_question_tags',
        title: 'Question Tags',
        icon: <HelpCircle size={20} />,
        summary: '...isn\'t it?',
        definition: 'Mini-questions added to the end of a sentence to confirm information or ask for agreement.',
        deepDive: [
          'Rule 1: Positive Sentence -> Negative Tag (You are happy, aren\'t you?).',
          'Rule 2: Negative Sentence -> Positive Tag (You aren\'t happy, are you?).',
          'Rule 3: Use the SAME auxiliary verb (Is, Do, Did, Have, Will, Can).',
          'Special Exception: "I am" -> "Aren\'t I?".'
        ],
        signalWords: ['Right?'],
        forms: {
          positive: { 
            structure: 'Positive, Negative?', 
            examples: [
              'She is beautiful, isn\'t she?', 
              'You live here, don\'t you?',
              'He can swim, can\'t he?',
              'They will come, won\'t they?',
              'You bought bread, didn\'t you?'
            ] 
          },
          negative: { 
            structure: 'Negative, Positive?', 
            examples: [
              'You don\'t eat meat, do you?', 
              'She isn\'t ready, is she?',
              'He didn\'t call, did he?',
              'We can\'t go, can we?'
            ] 
          },
          question: { 
            structure: '-', 
            examples: [] 
          }
        },
        commonMistakes: [
          { wrong: 'I am late, am not I?', right: 'I am late, aren\'t I?', explanation: 'The tag for "I am" is always "aren\'t I".' }
        ]
      },
      // 16. SUGGESTIONS
      {
        id: 'a2_suggestions',
        title: 'Suggestions & Requests',
        icon: <MessageCircle size={20} />,
        summary: 'Let\'s / Shall we?',
        definition: 'Common ways to suggest ideas or activities to others.',
        deepDive: [
          'LET\'S (Let us): Used to suggest doing something together (Let\'s go).',
          'SHALL WE...?: A polite question form of Let\'s (Shall we go?).',
          'WHY DON\'T WE...?: Another polite suggestion.'
        ],
        signalWords: [],
        forms: {
          positive: { 
            structure: 'Let\'s + Verb', 
            examples: [
              'Let\'s go to the cinema.', 
              'Let\'s have dinner.',
              'Let\'s study English.',
              'Let\'s take a break.'
            ] 
          },
          negative: { 
            structure: 'Let\'s not + Verb', 
            examples: [
              'Let\'s not talk about this.',
              'Let\'s not go out today.'
            ] 
          },
          question: { 
            structure: 'Shall we...? / Why don\'t we...?', 
            examples: [
              'Shall we dance?', 
              'Shall we start?',
              'Why don\'t we go to the beach?',
              'Why don\'t you call him?'
            ] 
          }
        }
      }
    ]
  },
  // B1, B2, C1, C2 can be expanded later if needed or kept simple for now
  {
    id: 'B1',
    label: 'Intermediate',
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    borderColor: 'border-blue-200',
    description: 'Complex Tenses, Passive Voice, Conditionals.',
    topics: []
  },
  {
      id: 'B2',
      label: 'Upper-Int',
      color: 'text-indigo-600',
      bg: 'bg-indigo-600',
      borderColor: 'border-indigo-200',
      description: 'Advanced structures for fluent communication.',
      topics: []
  },
  {
      id: 'C1',
      label: 'Advanced',
      color: 'text-purple-600',
      bg: 'bg-purple-600',
      borderColor: 'border-purple-200',
      description: 'Refined grammar for professional and academic use.',
      topics: []
  },
  {
      id: 'C2',
      label: 'Proficiency',
      color: 'text-pink-600',
      bg: 'bg-pink-600',
      borderColor: 'border-pink-200',
      description: 'Near-native command of nuance and style.',
      topics: []
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