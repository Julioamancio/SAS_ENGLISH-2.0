
import { GrammarTopic } from '../../types';

export const A1_TOPICS: GrammarTopic[] = [
  {
    id: 'a1_tobe',
    title: 'Verb To Be (Am/Is/Are)',
    iconName: 'Zap',
    summary: 'Identity & State',
    definition: 'The most important verb in English. Used to describe identity, age, feelings, nationality, and location.',
    deepDive: [
      'Use AM for "I" (I am).',
      'Use IS for singular subjects like "He, She, It" (He is, The dog is).',
      'Use ARE for plural subjects like "You, We, They" (We are, John and Mary are).',
      'Contractions are very common in speaking: I\'m, You\'re, He\'s, It\'s, We\'re, They\'re.'
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
          'It is a beautiful sunny day.',
          'We are from Brazil.',
          'They are my best friends.',
          'My mother is a nurse.',
          'You are a very good student.',
          'The car is red and fast.'
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
          'I am not from the USA.',
          'You aren\'t listening to me.'
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
          'Is this your pen?',
          'Are your parents at home?'
        ] 
      }
    },
    commonMistakes: [
      { wrong: 'I have 20 years.', right: 'I am 20 years old.', explanation: 'In English, you "ARE" an age, you do not "HAVE" it.' },
      { wrong: 'She are happy.', right: 'She is happy.', explanation: 'She is singular, use IS.' }
    ]
  },
  {
    id: 'a1_pronouns',
    title: 'Personal Pronouns',
    iconName: 'User',
    summary: 'I, You, He, She, It...',
    definition: 'Words used to replace the names of people, animals, or things to avoid repetition.',
    deepDive: [
      'I = Me (The speaker). Always capitalized.',
      'You = The person listening (Singular or Plural).',
      'He = A man or boy.',
      'She = A woman or girl.',
      'It = An object, animal, or situation (Singular).',
      'We = Me + Others.',
      'They = Plural (People, things, animals).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Subject Pronoun + Verb',
        examples: [
          'I like pizza very much.',
          'You are my best friend.',
          'He plays soccer every weekend.',
          'She works in a big office.',
          'It looks delicious.',
          'We study English together.',
          'They live in New York City.',
          'It is raining today.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_articles',
    title: 'Articles (A/An/The)',
    iconName: 'Type',
    summary: 'A book / The book',
    definition: 'Small words that define a noun as specific (The) or unspecific (A/An).',
    deepDive: [
      'A: Used before consonant SOUNDS (A car, A university, A house).',
      'AN: Used before vowel SOUNDS (An apple, An hour, An elephant).',
      'THE: Used for specific things (The sun, The book on the table) or things mentioned before.',
      'No Article: For plurals in general (I like dogs) or proper names (Brazil, John).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'A/An + Singular Noun',
        examples: [
          'I have a cat.',
          'She wants an apple.',
          'He is a doctor.',
          'I need an umbrella.',
          'It takes an hour to get there.',
          'The sun is hot today.',
          'Open the door, please.',
          'I saw a movie. The movie was good.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    },
    commonMistakes: [
      { wrong: 'I have a car. The car is blue.', right: 'I have a car. The car is blue.', explanation: 'First time: A. Second time: THE (Specific).' },
      { wrong: 'The Brazil is big.', right: 'Brazil is big.', explanation: 'No "The" for most countries.' }
    ]
  },
  {
    id: 'a1_plurals',
    title: 'Regular Plurals',
    iconName: 'List',
    summary: '-s / -es',
    definition: 'How to make singular nouns plural.',
    deepDive: [
      'General Rule: Add -S (Car -> Cars, Book -> Books).',
      '-ES Rule: Words ending in -s, -sh, -ch, -x, -o (Bus -> Buses, Box -> Boxes).',
      '-IES Rule: Consonant + Y (City -> Cities).',
      'Vowel + Y: Just add -S (Boy -> Boys).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Noun + s/es',
        examples: [
          'I have two cats.',
          'She has three boxes.',
          'There are many cities in Brazil.',
          'He likes watches.',
          'The boys are playing.',
          'We need two buses to transport everyone.',
          'Potatoes are good for you.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_possessives',
    title: 'Possessive Adjectives',
    iconName: 'User',
    summary: 'My, Your, His, Her...',
    definition: 'Words that show ownership or relationship.',
    deepDive: [
      'I -> My (My book).',
      'You -> Your (Your car).',
      'He -> His (His house).',
      'She -> Her (Her phone).',
      'It -> Its (Its tail).',
      'We -> Our (Our school).',
      'They -> Their (Their problem).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Possessive + Noun',
        examples: [
          'This is my book.',
          'Is that your car?',
          'His name is John.',
          'Her hair is long.',
          'The dog wagged its tail.',
          'Our house is near here.',
          'Their children are at school.',
          'I like your shoes.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_adjectives',
    title: 'Common Adjectives',
    iconName: 'Star',
    summary: 'Big, Small, Good...',
    definition: 'Words that describe nouns (people, places, things).',
    deepDive: [
      'Position 1: Before the noun (A red car).',
      'Position 2: After verb To Be (The car is red).',
      'Adjectives never have a plural form (NOT "Reds cars").'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Adj + Noun / Be + Adj',
        examples: [
          'It is a big house.',
          'The house is big.',
          'She is a smart girl.',
          'They are good students.',
          'This food is bad.',
          'I am happy.',
          'He is sad today.',
          'The exam was easy.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    },
    commonMistakes: [
      { wrong: 'They are intellignets.', right: 'They are intelligent.', explanation: 'Adjectives do not have plural forms.' }
    ]
  },
  {
    id: 'a1_svo',
    title: 'Sentence Order (SVO)',
    iconName: 'AlignLeft',
    summary: 'Subject + Verb + Object',
    definition: 'The strict order of words in English sentences.',
    deepDive: [
      'English sentences almost always follow: Subject -> Verb -> Object.',
      'Subject: Who does the action.',
      'Verb: The action.',
      'Object: Who receives the action.',
      'Example: "I (S) love (V) pizza (O)."',
      'We cannot say "Pizza I love" (usually).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'S + V + O',
        examples: [
          'I eat apples.',
          'She reads books.',
          'We play soccer.',
          'He drinks coffee.',
          'They watch TV.',
          'John loves Mary.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_present_simple',
    title: 'Present Simple',
    iconName: 'Clock',
    summary: 'Habits, Facts & Routines',
    definition: 'The tense used for things that are permanent, repeated, or always true.',
    deepDive: [
      'USAGE 1: Habits/Routines (I wake up at 6am).',
      'USAGE 2: General Truths (The sun rises in the east).',
      'USAGE 3: Permanent situations (She works at a bank).',
      'CRITICAL SPELLING RULES (3rd Person: He/She/It):',
      '1. General Rule: Add -S (Work -> Works, Live -> Lives).',
      '2. Ends in -o, -ch, -sh, -ss, -x: Add -ES (Go -> Goes, Watch -> Watches, Wash -> Washes).',
      '3. Consonant + Y: Remove Y, add -IES (Study -> Studies, Cry -> Cries).',
      '4. Vowel + Y: Just add -S (Play -> Plays, Buy -> Buys).',
      'AUXILIARIES: Use "DO" for I/You/We/They. Use "DOES" for He/She/It.'
    ],
    signalWords: ['Always', 'Usually', 'Every day', 'On Mondays', 'Sometimes', 'Never', 'Once a week'],
    forms: {
      positive: {
        structure: 'S + Verb (+s/es/ies for He/She/It)',
        examples: [
          'I work in a bank.',
          'She LIVES in New York. (General)',
          'He WATCHES TV every night. (Rule: ch + es)',
          'The baby CRIES a lot. (Rule: y -> ies)',
          'Tom PLAYS soccer. (Rule: vowel+y -> s)',
          'My dog RUNS fast.',
          'It SNOWS in winter here.'
        ]
      },
      negative: {
        structure: 'S + Don\'t / Doesn\'t + BASE Verb',
        examples: [
          'I don\'t smoke.',
          'She DOESN\'T live here. (Note: No "s" on live)',
          'He doesn\'t watch TV. (Note: No "es" on watch)',
          'It doesn\'t work.',
          'We don\'t have a car.',
          'They don\'t like spicy food.',
          'John doesn\'t study French.'
        ]
      },
      question: {
        structure: 'Do / Does + Subject + BASE Verb?',
        examples: [
          'Do you speak English?',
          'Does she play the piano? (Note: No "s" on play)',
          'Does he live near here?',
          'Do they work together?',
          'Where do you live?',
          'What time does the train leave?',
          'Does your father cook?'
        ]
      }
    },
    commonMistakes: [
      { wrong: 'She live here.', right: 'She lives here.', explanation: 'He/She/It requires an S on the verb.' },
      { wrong: 'Does he plays?', right: 'Does he play?', explanation: 'When you use DOES, the main verb loses the S.' },
      { wrong: 'I am work.', right: 'I work.', explanation: 'Do not use AM/IS/ARE with other verbs in Present Simple.' }
    ]
  },
  {
    id: 'a1_present_continuous',
    title: 'Present Continuous',
    iconName: 'Clock',
    summary: 'Happening Now',
    definition: 'Used for actions happening exactly at this moment or temporary situations around now.',
    deepDive: [
      'STRUCTURE: Subject + To Be (am/is/are) + Verb-ING.',
      'SPELLING RULE 1 (Silent E): Remove "e", add "ing" (Write -> Writing, Dance -> Dancing).',
      'SPELLING RULE 2 (CVC - One Syllable): Double the last consonant (Run -> Running, Sit -> Sitting, Swim -> Swimming).',
      'SPELLING RULE 3 (-IE): Change "ie" to "y" (Die -> Dying, Lie -> Lying).',
      'STATIVE VERBS (WARNING): Do NOT use Present Continuous with verbs of feeling/thinking (Like, Love, Want, Need, Know, Understand). Use Present Simple instead.'
    ],
    signalWords: ['Now', 'Right now', 'At the moment', 'Look!', 'Listen!', 'Today', 'This week'],
    forms: {
      positive: {
        structure: 'S + am/is/are + V-ing',
        examples: [
          'I am studying English right now.',
          'She is dancing at the party. (Rule: Dance -> Dancing)',
          'He is swimming in the pool. (Rule: Swim -> Swimming)',
          'We are watching a movie.',
          'Look! The bus is coming.',
          'They are staying at a hotel this week. (Temporary)',
          'I am reading a very good book.'
        ]
      },
      negative: {
        structure: 'S + am/is/are + NOT + V-ing',
        examples: [
          'I am not sleeping, I am awake.',
          'He isn\'t listening to the teacher.',
          'We aren\'t working today, it is Sunday.',
          'She isn\'t wearing a coat.',
          'They aren\'t playing well.',
          'The computer isn\'t working.'
        ]
      },
      question: {
        structure: 'Am/Is/Are + Subject + V-ing?',
        examples: [
          'Are you waiting for someone?',
          'Is she coming with us?',
          'What are you doing?',
          'Is it raining outside?',
          'Are they watching TV?',
          'Where are you going?',
          'Why is the baby crying?'
        ]
      }
    },
    commonMistakes: [
      { wrong: 'I am wanting a pizza.', right: 'I want a pizza.', explanation: 'WANT is a stative verb. Never use -ing.' },
      { wrong: 'She is writeing.', right: 'She is writing.', explanation: 'Remove the "e" before adding "ing".' },
      { wrong: 'He is runing.', right: 'He is running.', explanation: 'Run has CVC structure (Consonant-Vowel-Consonant), so double the N.' }
    ]
  },
  {
    id: 'a1_can',
    title: 'Modal Verb Can',
    iconName: 'Zap',
    summary: 'Ability & Permission',
    definition: 'Used to talk about skills (what you know how to do) or to ask for permission.',
    deepDive: [
      'No "To": I can swim (NOT I can to swim).',
      'No "-S": He can (NOT He cans).',
      'Negative: Can\'t (Cannot).',
      'Use for ability: "I can dance".',
      'Use for permission: "Can I go?"'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Subject + Can + Verb',
        examples: [
          'I can speak English.',
          'She can drive a car.',
          'He can run very fast.',
          'Birds can fly.',
          'You can park here.',
          'We can finish this today.'
        ]
      },
      negative: {
        structure: 'Subject + Can\'t + Verb',
        examples: [
          'I can\'t hear you.',
          'He can\'t cook.',
          'Penguins can\'t fly.',
          'We can\'t go to the party.',
          'She can\'t see without glasses.',
          'You can\'t smoke here.'
        ]
      },
      question: {
        structure: 'Can + Subject + Verb?',
        examples: [
          'Can you help me?',
          'Can she swim?',
          'Can I open the window?',
          'Where can I buy a ticket?',
          'Can we go home now?',
          'Can you speak louder?'
        ]
      }
    }
  },
  {
    id: 'a1_imperative',
    title: 'Imperative',
    iconName: 'AlertTriangle',
    summary: 'Orders & Instructions',
    definition: 'Used to give orders, warnings, or instructions. There is no visible subject (Use "You" implicitly).',
    deepDive: [
      'Positive: Just the verb (Open the door).',
      'Negative: Don\'t + Verb (Don\'t open the door).',
      'Polite: Add "Please".'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Verb + Object',
        examples: [
          'Open the door.',
          'Sit down.',
          'Listen to me.',
          'Turn left at the corner.',
          'Please help me.',
          'Be quiet.',
          'Enjoy your meal.'
        ]
      },
      negative: {
        structure: 'Don\'t + Verb',
        examples: [
          'Don\'t touch that.',
          'Don\'t be late.',
          'Don\'t forget your keys.',
          'Don\'t speak Portuguese here.',
          'Don\'t worry.',
          'Don\'t run in the hall.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_wh_questions',
    title: 'Wh-Questions',
    iconName: 'HelpCircle',
    summary: 'What, Where, Who...',
    definition: 'Question words used to ask for specific information.',
    deepDive: [
      'What = Thing/Action.',
      'Where = Place.',
      'When = Time.',
      'Who = Person.',
      'Why = Reason.',
      'How = Manner/Process.',
      'Structure: Wh-word + Auxiliary + Subject + Verb?'
    ],
    signalWords: [],
    forms: {
      positive: { structure: '-', examples: [] },
      negative: { structure: '-', examples: [] },
      question: {
        structure: 'Wh-Word + Aux + S + V?',
        examples: [
          'What is your name?',
          'Where do you live?',
          'When is your birthday?',
          'Who is that man?',
          'Why are you sad?',
          'How do you spell it?',
          'What time is it?',
          'How old are you?'
        ]
      }
    }
  },
  {
    id: 'a1_yesno_questions',
    title: 'Yes/No Questions',
    iconName: 'HelpCircle',
    summary: 'Do you? / Are you?',
    definition: 'Questions that can be answered with a simple "Yes" or "No".',
    deepDive: [
      'With To Be: Swap Subject and Verb (You are -> Are you?).',
      'With Verbs: Add Do/Does (You like -> Do you like?).'
    ],
    signalWords: [],
    forms: {
      positive: { structure: '-', examples: [] },
      negative: { structure: '-', examples: [] },
      question: {
        structure: 'Auxiliary + Subject...?',
        examples: [
          'Are you hungry?',
          'Is he a student?',
          'Do you like coffee?',
          'Does she live here?',
          'Can you swim?',
          'Is it raining?',
          'Do they have a car?'
        ]
      }
    }
  },
  {
    id: 'a1_prepositions_place',
    title: 'Prepositions of Place',
    iconName: 'MapPin',
    summary: 'In, On, Under...',
    definition: 'Words that tell us WHERE something is.',
    deepDive: [
      'IN: Inside a 3D space (In the box, In the room, In London).',
      'ON: On a surface (On the table, On the wall, On the floor).',
      'UNDER: Below something (Under the bed).',
      'NEXT TO: Beside.',
      'BETWEEN: In the middle of two things.',
      'AT: A specific point (At the bus stop, At school).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Preposition + Noun',
        examples: [
          'The cat is in the box.',
          'The book is on the table.',
          'The shoes are under the bed.',
          'He is standing next to me.',
          'The bank is between the post office and the cafe.',
          'I am at home.',
          'Put it on the shelf.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_prepositions_time',
    title: 'Prepositions of Time',
    iconName: 'Clock',
    summary: 'In, On, At',
    definition: 'Words that tell us WHEN something happens.',
    deepDive: [
      'IN: Months, Years, Seasons, Parts of Day (In January, In 2020, In the morning).',
      'ON: Days and Dates (On Monday, On my birthday, On May 5th).',
      'AT: Clock times, Festivals, "Night" (At 5pm, At Christmas, At night).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Preposition + Time',
        examples: [
          'My birthday is in June.',
          'I was born in 1995.',
          'I will see you on Monday.',
          'The meeting is on Friday morning.',
          'Class starts at 9am.',
          'We sleep at night.',
          'I like to ski in winter.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_this_that',
    title: 'Demonstratives (This/That)',
    iconName: 'MapPin',
    summary: 'This/That/These/Those',
    definition: 'Pointing at things depending on distance and quantity.',
    deepDive: [
      'This: Singular + Near (This pen here).',
      'That: Singular + Far (That car over there).',
      'These: Plural + Near (These keys here).',
      'Those: Plural + Far (Those birds there).'
    ],
    signalWords: ['Here', 'There'],
    forms: {
      positive: {
        structure: 'Demonstrative + Noun',
        examples: [
          'This is my friend.',
          'That house is beautiful.',
          'These shoes are comfortable.',
          'Those clouds look dark.',
          'I like this color.',
          'Can you see that bird?'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a1_there_is',
    title: 'There Is / There Are',
    iconName: 'MapPin',
    summary: 'Existence',
    definition: 'Used to say that something exists in a specific place.',
    deepDive: [
      'There IS: Singular (One thing).',
      'There ARE: Plural (More than one thing).',
      'Contraction: There\'s (There is).',
      'Do NOT use "Have" to say existence.'
    ],
    signalWords: ['In', 'On', 'At'],
    forms: {
      positive: {
        structure: 'There is/are + Noun',
        examples: [
          'There is a book on the table.',
          'There is a car in the garage.',
          'There are five students in the room.',
          'There are many people here.',
          'There\'s a problem.',
          'There are some apples in the fridge.'
        ]
      },
      negative: {
        structure: 'There isn\'t/aren\'t',
        examples: [
          'There isn\'t any milk left.',
          'There aren\'t any chairs.',
          'There isn\'t a bank near here.',
          'There aren\'t many options.'
        ]
      },
      question: {
        structure: 'Is/Are there...?',
        examples: [
          'Is there a bathroom here?',
          'Are there any questions?',
          'Is there Wi-Fi in the hotel?',
          'Are there any dogs in the park?'
        ]
      }
    },
    commonMistakes: [
      { wrong: 'Have a car in the street.', right: 'There is a car in the street.', explanation: 'Do not use HAVE for existence. Use THERE IS.' }
    ]
  },
  {
    id: 'a1_quantifiers',
    title: 'Basic Quantifiers',
    iconName: 'List',
    summary: 'Some / Any',
    definition: 'Words used to talk about quantity when we don\'t know the exact number.',
    deepDive: [
      'SOME: Use in Positive sentences (I have some money).',
      'ANY: Use in Negatives and Questions (I don\'t have any money. Do you have any money?).',
      'Exception: Use SOME in offers/requests (Would you like some coffee?).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Some + Plural/Uncountable',
        examples: [
          'I have some friends in London.',
          'There is some milk in the fridge.',
          'She needs some help.',
          'We bought some apples.',
          'He wants some water.'
        ]
      },
      negative: {
        structure: 'Not... Any',
        examples: [
          'I don\'t have any brothers.',
          'There isn\'t any sugar.',
          'We didn\'t buy any flowers.',
          'She doesn\'t want any food.'
        ]
      },
      question: {
        structure: 'Any / Some (Offers)',
        examples: [
          'Do you have any pets?',
          'Is there any ice?',
          'Would you like some tea? (Offer)',
          'Can I have some water? (Request)',
          'Are there any letters for me?'
        ]
      }
    }
  }
];
