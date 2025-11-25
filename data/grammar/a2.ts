
import { GrammarTopic } from '../../types';

export const A2_TOPICS: GrammarTopic[] = [
  {
    id: 'a2_past_simple',
    title: 'Past Simple',
    iconName: 'Clock',
    summary: 'Finished Actions',
    definition: 'Used for actions, states, or habits that started and finished at a SPECIFIC time in the past.',
    deepDive: [
      'THE GOLDEN RULE: Separate "To Be" from "Action Verbs".',
      '1. THE WORLD OF "TO BE" (Was/Were): Never use "Did". (I was happy. Were you happy?).',
      '2. THE WORLD OF ACTIONS (Play, Go, Eat): Use "Did" for questions/negatives.',
      'SPELLING RULES (Regular Verbs):',
      '- Ends in E: Add -d (Live -> Lived).',
      '- Consonant + Y: Remove Y, add -ied (Study -> Studied, Cry -> Cried).',
      '- CVC (One syllable): Double the last letter (Stop -> Stopped, Plan -> Planned).',
      '- Normal: Add -ed (Work -> Worked).',
      'IRREGULAR VERBS: No rules! You must memorize them (Go -> Went, Buy -> Bought, Cut -> Cut).',
      'THE "DID" EFFECT: When you use "DID" or "DIDN\'T", the main verb returns to base form. (Did you go? NOT Did you went?).'
    ],
    signalWords: ['Yesterday', 'Last night', 'Last week', 'Two days ago', 'In 2010', 'When I was a child'],
    forms: {
      positive: { 
        structure: 'S + V2 (Past Form) OR S + Was/Were', 
        examples: [
          'I worked late yesterday. (Regular)', 
          'She lived in Brazil for two years. (Regular - Ends in E)',
          'We studied hard for the test. (Regular - Y -> IED)',
          'He stopped the car immediately. (Regular - CVC)',
          'I went to the beach last Sunday. (Irregular: Go -> Went)',
          'They bought a new house. (Irregular: Buy -> Bought)',
          'She was very tired last night. (Verb To Be)',
          'We were friends in high school. (Verb To Be)'
        ] 
      },
      negative: { 
        structure: 'S + Didn\'t + Base Verb OR S + Wasn\'t/Weren\'t', 
        examples: [
          'I didn\'t work yesterday. (NOT didn\'t worked)', 
          'He didn\'t go to the party. (NOT didn\'t went)',
          'She didn\'t like the movie.',
          'We didn\'t see anything.',
          'It didn\'t rain last week.',
          'I wasn\'t happy with the service. (To Be)',
          'They weren\'t at home. (To Be)'
        ] 
      },
      question: { 
        structure: 'Did + S + Base Verb? OR Was/Were + S...?', 
        examples: [
          'Did you call me?', 
          'Where did he go?',
          'Did she finish the report?',
          'What did you eat for lunch?',
          'Did they arrive on time?',
          'Was she angry? (To Be)',
          'Were you at the gym? (To Be)',
          'Why were they late? (To Be)'
        ] 
      }
    },
    commonMistakes: [
      { wrong: 'I didn\'t went.', right: 'I didn\'t go.', explanation: 'Did/Didn\'t steals the past tense. The verb becomes normal.' },
      { wrong: 'Did you was happy?', right: 'Were you happy?', explanation: 'Never mix "Did" with "Was/Were".' },
      { wrong: 'She studyed.', right: 'She studied.', explanation: 'Remove the Y and add IED.' }
    ]
  },
  {
    id: 'a2_present_perfect_basic',
    title: 'Present Perfect (Experience)',
    iconName: 'Layers',
    summary: 'Have/Has + V3',
    definition: 'Used to talk about experiences in your life without saying WHEN they happened.',
    deepDive: [
      'Structure: Have/Has + V3 (Past Participle).',
      'Usage: Focus on the result or the experience, not the time.',
      'Comparison: "I have been to Paris" (Sometime in my life) vs "I went to Paris in 2010" (Specific past).',
      'V3 Irregulars: Go -> Gone/Been, See -> Seen, Do -> Done.'
    ],
    signalWords: ['Ever', 'Never', 'Before', 'Once', 'Many times'],
    forms: {
      positive: {
        structure: 'S + Have/Has + V3',
        examples: [
          'I have seen that movie.',
          'She has visited London.',
          'We have eaten sushi.',
          'He has met the President.',
          'They have finished the game.',
          'I have lost my keys.',
          'You have grown a lot!',
          'My computer has crashed.'
        ]
      },
      negative: {
        structure: 'S + Haven\'t/Hasn\'t + V3',
        examples: [
          'I haven\'t read that book.',
          'She hasn\'t been to Brazil.',
          'We haven\'t tried this food.',
          'He hasn\'t arrived yet.',
          'They haven\'t seen the news.',
          'I haven\'t done my homework.',
          'It hasn\'t rained for months.'
        ]
      },
      question: {
        structure: 'Have/Has + S + V3?',
        examples: [
          'Have you ever been to Spain?',
          'Has she seen the email?',
          'Have they eaten?',
          'Have you ever ridden a horse?',
          'Has he ever played golf?',
          'Have we met before?',
          'What have you done?'
        ]
      }
    },
    commonMistakes: [
      { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', explanation: 'Do not use Present Perfect with specific past time words.' }
    ]
  },
  {
    id: 'a2_future_will',
    title: 'Future with Will',
    iconName: 'ArrowRight',
    summary: 'Promises & Predictions',
    definition: 'Used for decisions made NOW, predictions without evidence, promises, or offers.',
    deepDive: [
      'Prediction (Opinion): "I think it will rain."',
      'Instant Decision: "The phone is ringing. I will answer it."',
      'Promise: "I will help you."',
      'Offer: "I will carry your bag."',
      'Contraction: \'ll (I\'ll, You\'ll).'
    ],
    signalWords: ['Tomorrow', 'Next week', 'I think', 'Probably', 'Maybe'],
    forms: {
      positive: {
        structure: 'Subject + Will + Base Verb',
        examples: [
          'I will help you with your homework.',
          'She will be a great doctor.',
          'I think it will rain tomorrow.',
          'We will always love you.',
          'I\'ll call you later.',
          'Maybe they will come.',
          'You will enjoy this movie.',
          'He will probably be late.'
        ]
      },
      negative: {
        structure: 'Subject + Won\'t + Base Verb',
        examples: [
          'I won\'t tell anyone.',
          'He won\'t come to the party.',
          'It won\'t happen again.',
          'They won\'t agree.',
          'I promise I won\'t be late.',
          'She won\'t answer my calls.',
          'We won\'t forget you.'
        ]
      },
      question: {
        structure: 'Will + Subject + Base Verb?',
        examples: [
          'Will you marry me?',
          'Will it rain today?',
          'Where will you go?',
          'Will they win the game?',
          'Will you help me?',
          'What will happen next?',
          'Who will be there?'
        ]
      }
    }
  },
  {
    id: 'a2_going_to',
    title: 'Future with Going To',
    iconName: 'ArrowRight',
    summary: 'Plans & Evidence',
    definition: 'Used for plans decided BEFORE speaking or predictions based on visible evidence.',
    deepDive: [
      'Plan: "I am going to buy a car next year" (I already decided).',
      'Evidence: "Look at those clouds! It is going to rain."',
      'Structure: To Be (am/is/are) + Going to + Base Verb.'
    ],
    signalWords: ['Next month', 'Tonight', 'Tomorrow'],
    forms: {
      positive: {
        structure: 'S + Be + Going to + Verb',
        examples: [
          'I am going to visit my mom next weekend.',
          'She is going to study medicine.',
          'Look! He is going to fall.',
          'We are going to travel next week.',
          'They are going to buy a new house.',
          'I\'m going to clean my room tonight.',
          'It is going to be a great day.'
        ]
      },
      negative: {
        structure: 'S + Be + Not + Going to',
        examples: [
          'I am not going to buy it.',
          'She isn\'t going to come.',
          'It isn\'t going to work.',
          'We aren\'t going to wait any longer.',
          'They aren\'t going to like this.',
          'He isn\'t going to apply for the job.',
          'I\'m not going to tell you.'
        ]
      },
      question: {
        structure: 'Be + S + Going to + Verb?',
        examples: [
          'Are you going to watch the game?',
          'Is she going to stay?',
          'What are you going to do?',
          'Are they going to get married?',
          'Where are we going to eat?',
          'Is it going to rain?',
          'When are you going to leave?'
        ]
      }
    }
  },
  {
    id: 'a2_present_continuous_future',
    title: 'Present Continuous (Future)',
    iconName: 'Calendar',
    summary: 'Arrangements',
    definition: 'Used for fixed arrangements in the future, usually with a specific time and place.',
    deepDive: [
      'Meaning: You have organized it (booked a flight, agreed with someone).',
      'Example: "I am flying to New York tomorrow" (I have the ticket).',
      'Difference from Going to: Going to is an intention; Present Continuous is a confirmed plan.'
    ],
    signalWords: ['Tomorrow', 'Next week', 'At 8pm'],
    forms: {
      positive: {
        structure: 'S + Be + V-ing + Future Time',
        examples: [
          'I am meeting John at 7pm.',
          'We are flying to Paris tomorrow morning.',
          'She is seeing the doctor on Tuesday.',
          'They are getting married next month.',
          'I am working this weekend.',
          'He is playing tennis with Mark tonight.'
        ]
      },
      negative: {
        structure: 'S + Be + Not + V-ing',
        examples: [
          'I am not doing anything tonight.',
          'She isn\'t coming to the party.',
          'We aren\'t leaving until Friday.',
          'He isn\'t working tomorrow.'
        ]
      },
      question: {
        structure: 'Be + S + V-ing?',
        examples: [
          'Are you doing anything this weekend?',
          'Is he meeting us there?',
          'When are they arriving?',
          'Where are you staying in London?'
        ]
      }
    }
  },
  {
    id: 'a2_modals_must',
    title: 'Modals: Must / Have to',
    iconName: 'AlertTriangle',
    summary: 'Obligation & Prohibition',
    definition: 'Rules and necessary actions.',
    deepDive: [
      'Must: Internal obligation (I think it is important) or Strong Rules.',
      'Have to: External obligation (The law/boss says so).',
      'Mustn\'t: PROHIBITION (You cannot do it).',
      'Don\'t have to: NO OBLIGATION (You can do it if you want, but it is not necessary).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Must/Have to + Verb',
        examples: [
          'You must wear a seatbelt.',
          'I have to work tomorrow.',
          'Students must turn off their phones.',
          'She has to wake up early.',
          'We must go now.',
          'You have to try this cake, it\'s delicious.',
          'I must call my mom.'
        ]
      },
      negative: {
        structure: 'Mustn\'t / Don\'t have to',
        examples: [
          'You mustn\'t smoke here. (Forbidden)',
          'You don\'t have to pay. (It\'s free)',
          'He doesn\'t have to work on Sundays.',
          'We mustn\'t be late.',
          'You don\'t have to answer if you don\'t want to.',
          'Students mustn\'t run in the corridor.',
          'She doesn\'t have to wear a uniform.'
        ]
      },
      question: {
        structure: 'Do/Does + S + Have to?',
        examples: [
          'Do you have to go?',
          'Does she have to wear a uniform?',
          'When do we have to finish?',
          'Do I have to sign this?',
          'Does he have to work late?'
        ]
      }
    }
  },
  {
    id: 'a2_comparatives',
    title: 'Comparatives & Superlatives',
    iconName: 'Scale',
    summary: 'Bigger / The Biggest',
    definition: 'Comparing two things (Comparative) or one thing to a group (Superlative).',
    deepDive: [
      'Short Adj: Add -er (Old -> Older) / The -est (The oldest).',
      'Long Adj: More (More expensive) / The Most (The most expensive).',
      'Irregular: Good -> Better -> Best / Bad -> Worse -> Worst / Far -> Further -> Furthest.'
    ],
    signalWords: ['Than', 'The', 'In the world'],
    forms: {
      positive: {
        structure: 'Adj-er + Than / The + Adj-est',
        examples: [
          'An elephant is bigger than a mouse.',
          'This car is more expensive than that one.',
          'She is the best student in the class.',
          'Everest is the highest mountain.',
          'This is the worst pizza I ever ate.',
          'English is easier than Chinese.',
          'He is older than me.',
          'That was the most boring movie ever.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a2_adverbs_frequency',
    title: 'Adverbs of Frequency',
    iconName: 'Clock',
    summary: 'Always, Often, Never',
    definition: 'Describing how often we do something.',
    deepDive: [
      'Order: Always (100%) -> Usually -> Often -> Sometimes -> Rarely -> Never (0%).',
      'Position 1: BEFORE the main verb (I ALWAYS drink coffee).',
      'Position 2: AFTER the verb To Be (She IS ALWAYS happy).',
      'Never: Already carries a negative meaning. Don\'t use "don\'t" with "never".'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Subject + Adverb + Verb',
        examples: [
          'I always wake up at 7am.',
          'She often visits her grandmother.',
          'We sometimes eat out.',
          'He rarely complains.',
          'They never listen to me.',
          'You are usually right.',
          'It is often cold here.',
          'I hardly ever watch TV.'
        ]
      },
      negative: { 
        structure: 'Don\'t usually / Don\'t often',
        examples: [
          'I don\'t usually drink tea.',
          'She doesn\'t often call me.',
          'We don\'t always agree.'
        ] 
      },
      question: {
        structure: 'How often...?',
        examples: [
          'How often do you go to the gym?',
          'Do you always drive to work?',
          'Does she ever smile?',
          'How often does it rain here?',
          'Do they usually come on time?'
        ]
      }
    }
  },
  {
    id: 'a2_connectors',
    title: 'Basic Connectors',
    iconName: 'Link',
    summary: 'And, But, Because, So',
    definition: 'Words used to join two ideas together.',
    deepDive: [
      'AND: Adds information (I like tea AND coffee).',
      'BUT: Shows contrast (I like tea, BUT I don\'t like coffee).',
      'BECAUSE: Gives a reason (I study English BECAUSE I want a job).',
      'SO: Gives a result (I was tired, SO I went to bed).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Clause + Connector + Clause',
        examples: [
          'I bought a shirt and a tie.',
          'She is smart, but she is lazy.',
          'He stayed home because he was sick.',
          'It was raining, so we took a taxi.',
          'I want to travel, but I don\'t have money.',
          'She didn\'t study, so she failed the test.',
          'We are happy because it is Friday.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a2_too_enough',
    title: 'Too / Enough',
    iconName: 'Scale',
    summary: 'Excess & Sufficiency',
    definition: 'Describing if we have more than we need or sufficient amount.',
    deepDive: [
      'TOO: More than necessary. Goes BEFORE adjectives (Too hot, Too expensive).',
      'ENOUGH: Sufficient. Goes AFTER adjectives (Old enough) but BEFORE nouns (Enough money).',
      'Too usually has a negative meaning (I can\'t buy it, it\'s too expensive).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Too + Adj / Adj + Enough',
        examples: [
          'This coffee is too hot to drink.',
          'He is old enough to drive.',
          'We have enough time.',
          'You are walking too fast.',
          'The music is too loud.',
          'She is tall enough to reach the shelf.',
          'I have enough food for everyone.'
        ]
      },
      negative: {
        structure: 'Not + Adj + Enough',
        examples: [
          'I am not rich enough to buy a Ferrari.',
          'He isn\'t old enough to vote.',
          'There isn\'t enough water.',
          'This box isn\'t big enough.'
        ]
      },
      question: {
        structure: 'Is it... enough?',
        examples: [
          'Is it warm enough for you?',
          'Do we have enough money?',
          'Is the bag too heavy?',
          'Are you old enough?'
        ]
      }
    }
  },
  {
    id: 'a2_would_like',
    title: 'Would Like',
    iconName: 'Star',
    summary: 'Polite Request',
    definition: 'A polite way to say "I want".',
    deepDive: [
      'Structure: Would like + Noun OR Would like + To + Verb.',
      'Usage: Use for offers and requests.',
      'Contraction: \'d like (I\'d like).',
      'Difference: "I like pizza" (General) vs "I would like pizza" (Specific request now).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Subject + Would like + (to)',
        examples: [
          'I would like a coffee, please.',
          'She would like to visit Spain.',
          'I\'d like the steak.',
          'We would like to book a table.',
          'He\'d like to speak to the manager.',
          'I\'d like to go home now.'
        ]
      },
      negative: {
        structure: 'Subject + Would not like',
        examples: [
          'I wouldn\'t like to live there.',
          'She wouldn\'t like that color.',
          'We wouldn\'t like to disturb you.'
        ]
      },
      question: {
        structure: 'Would + S + like...?',
        examples: [
          'Would you like some tea?',
          'What would you like to eat?',
          'Would she like to come with us?',
          'Where would you like to sit?',
          'Would you like a receipt?'
        ]
      }
    }
  },
  {
    id: 'a2_quantifiers_count',
    title: 'Countable & Uncountable',
    iconName: 'List',
    summary: 'How much / How many',
    definition: 'Understanding nouns that can be counted and those that cannot.',
    deepDive: [
      'Countable: Things with a plural (Apple/Apples, Car/Cars). Use "Many" and numbers.',
      'Uncountable: Liquids, powders, abstract ideas (Water, Rice, Money, Music). Use "Much".',
      'Use "A lot of" for both.'
    ],
    signalWords: ['Much', 'Many', 'A lot of', 'A few', 'A little'],
    forms: {
      positive: {
        structure: 'A lot of / Some',
        examples: [
          'I have many friends.',
          'She has much money (uncommon in positive, usually "a lot of").',
          'We have a lot of time.',
          'There is a little water left.',
          'I have a few questions.'
        ]
      },
      negative: {
        structure: 'Not much / Not many',
        examples: [
          'I don\'t have much time.',
          'There aren\'t many people here.',
          'He doesn\'t have much patience.',
          'We didn\'t spend much money.'
        ]
      },
      question: {
        structure: 'How much / How many...?',
        examples: [
          'How many brothers do you have?',
          'How much water do you drink?',
          'How much is this?',
          'How many apples did you buy?',
          'How much does it cost?'
        ]
      }
    }
  },
  {
    id: 'a2_prepositions_adv',
    title: 'Prepositions of Place',
    iconName: 'MapPin',
    summary: 'Between, Behind, Above',
    definition: 'Describing the exact position of objects.',
    deepDive: [
      'Behind: At the back of.',
      'In front of: At the face of.',
      'Between: In the middle of two things.',
      'Above: Higher than (not touching).',
      'Below: Lower than.',
      'Next to / Beside: At the side of.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Preposition + Noun',
        examples: [
          'The car is behind the bus.',
          'I am standing in front of the school.',
          'The bank is between the cinema and the park.',
          'The clock is above the door.',
          'Please sign below the line.',
          'Sit next to me.',
          'The cat is hiding under the sofa.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a2_question_tags',
    title: 'Question Tags',
    iconName: 'HelpCircle',
    summary: 'Isn\'t it? / Do you?',
    definition: 'Short questions added to the end of sentences to check information or ask for agreement.',
    deepDive: [
      'Rule 1: If the sentence is Positive, the tag is Negative.',
      'Rule 2: If the sentence is Negative, the tag is Positive.',
      'Rule 3: Use the same auxiliary verb (Is->Isn\'t, Have->Haven\'t, Can->Can\'t).',
      'Exceptions: I am -> Aren\'t I? / Let\'s -> Shall we?'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Positive sentence, Negative Tag?',
        examples: [
          'You are American, aren\'t you?',
          'She is a doctor, isn\'t she?',
          'They live here, don\'t they?',
          'He can swim, can\'t he?',
          'We have finished, haven\'t we?',
          'It was a good movie, wasn\'t it?'
        ]
      },
      negative: {
        structure: 'Negative sentence, Positive Tag?',
        examples: [
          'You aren\'t hungry, are you?',
          'He doesn\'t like coffee, does he?',
          'They didn\'t go, did they?',
          'She hasn\'t arrived, has she?',
          'You can\'t drive, can you?'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'a2_suggestions',
    title: 'Suggestions & Requests',
    iconName: 'MessageCircle',
    summary: 'Let\'s / Shall we',
    definition: 'Ways to suggest doing something together.',
    deepDive: [
      'Let\'s: Let us (Suggestion).',
      'Shall we: Question form of suggestion.',
      'Why don\'t we: Asking for agreement.',
      'How about / What about: Followed by Verb-ING.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Let\'s + Verb',
        examples: [
          'Let\'s go to the beach.',
          'Let\'s eat pizza tonight.',
          'Let\'s take a break.',
          'Let\'s study together.'
        ]
      },
      negative: {
        structure: 'Let\'s not + Verb',
        examples: [
          'Let\'s not talk about work.',
          'Let\'s not go there.',
          'Let\'s not argue.'
        ]
      },
      question: {
        structure: 'Shall we / Why don\'t we...?',
        examples: [
          'Shall we go?',
          'Shall we dance?',
          'Why don\'t we watch a movie?',
          'How about going to the park?',
          'What about having dinner now?'
        ]
      }
    }
  }
];
