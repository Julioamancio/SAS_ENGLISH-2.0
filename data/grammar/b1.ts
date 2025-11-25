
import { GrammarTopic } from '../../types';

export const B1_TOPICS: GrammarTopic[] = [
  {
    id: 'b1_present_perfect_full',
    title: 'Present Perfect (Full Usage)',
    iconName: 'Layers',
    summary: 'Experience / Result / Continuity',
    definition: 'Connecting the past to the present in three specific ways.',
    deepDive: [
      '1. Experience: Things you have done in your life (time is not important).',
      '2. Result: Recent actions with results NOW ("I have lost my keys" = I don\'t have them now).',
      '3. Continuity: Unfinished actions ("I have lived here for 10 years" = I still live here).',
      'Keywords: FOR (duration) and SINCE (starting point).'
    ],
    signalWords: ['Just', 'Already', 'Yet', 'For', 'Since', 'Recently', 'Ever', 'Never'],
    forms: {
      positive: {
        structure: 'Have/Has + Past Participle (V3)',
        examples: [
          'I have already finished my homework.',
          'She has lived in London for five years.',
          'We have known each other since 2010.',
          'He has just arrived at the airport.',
          'They have visited ten different countries.',
          'I have lost my wallet (so I can\'t pay).',
          'It has rained a lot this week.',
          'You have changed so much since last year!'
        ]
      },
      negative: {
        structure: 'Haven\'t/Hasn\'t + V3',
        examples: [
          'I haven\'t seen that movie yet.',
          'She hasn\'t called me today.',
          'We haven\'t finished the project.',
          'He hasn\'t eaten anything since breakfast.',
          'They haven\'t decided where to go.',
          'I haven\'t found my keys.',
          'It hasn\'t stopped raining.',
          'You haven\'t answered my question.'
        ]
      },
      question: {
        structure: 'Have/Has + Subject + V3?',
        examples: [
          'Have you ever been to Brazil?',
          'Has she finished her work?',
          'Have they arrived yet?',
          'How long have you lived here?',
          'What have you done?',
          'Has he ever met a famous person?',
          'Where have you put the keys?',
          'Have we met before?'
        ]
      }
    }
  },
  {
    id: 'b1_present_perf_cont',
    title: 'Present Perfect Continuous',
    iconName: 'Clock',
    summary: 'Have been doing',
    definition: 'Focuses on the activity itself and how long it has been happening.',
    deepDive: [
      'Structure: Have/Has + BEEN + Verb-ING.',
      'Usage 1: Actions that started in the past and continue now (Emphasis on duration).',
      'Usage 2: Actions that just stopped but have visible evidence ("You are wet! I have been running in the rain").',
      'Difference: Present Perfect Simple focuses on completion (How much/many). Continuous focuses on activity (How long).'
    ],
    signalWords: ['How long', 'For', 'Since', 'All day', 'Lately'],
    forms: {
      positive: {
        structure: 'S + Have/Has + Been + V-ing',
        examples: [
          'I have been waiting for you for two hours.',
          'She has been working here since January.',
          'It has been raining all day.',
          'We have been studying English for years.',
          'He has been playing video games since morning.',
          'They have been traveling around Europe.',
          'My eyes are red because I have been crying.',
          'You have been sleeping a lot lately.'
        ]
      },
      negative: {
        structure: 'S + Haven\'t/Hasn\'t + Been + V-ing',
        examples: [
          'I haven\'t been sleeping well lately.',
          'She hasn\'t been practicing the piano.',
          'We haven\'t been feeling well.',
          'He hasn\'t been working very hard.',
          'They haven\'t been listening to me.',
          'It hasn\'t been snowing this year.'
        ]
      },
      question: {
        structure: 'Have/Has + S + Been + V-ing?',
        examples: [
          'How long have you been waiting?',
          'Has she been crying?',
          'What have you been doing?',
          'Have they been playing outside?',
          'How long has it been raining?',
          'Have you been working out? You look fit.',
          'Where have you been hiding?'
        ]
      }
    }
  },
  {
    id: 'b1_past_continuous',
    title: 'Past Continuous',
    iconName: 'Clock',
    summary: 'Was/Were doing',
    definition: 'Actions that were in progress at a specific moment in the past.',
    deepDive: [
      'Structure: Was/Were + Verb-ING.',
      'Interruption: Often used with Past Simple ("I was sleeping when the phone rang").',
      'Parallel Actions: "I was cooking while he was reading."',
      'Scene Setting: "The sun was shining and birds were singing..."'
    ],
    signalWords: ['While', 'When', 'At 8pm last night'],
    forms: {
      positive: {
        structure: 'S + Was/Were + V-ing',
        examples: [
          'I was watching TV at 8pm last night.',
          'It was raining all day yesterday.',
          'They were playing tennis when I arrived.',
          'She was working on her laptop.',
          'We were having dinner when the lights went out.',
          'He was driving fast.',
          'The baby was sleeping peacefully.'
        ]
      },
      negative: {
        structure: 'S + Wasn\'t/Weren\'t + V-ing',
        examples: [
          'I wasn\'t listening to you, sorry.',
          'He wasn\'t driving fast.',
          'We weren\'t expecting guests.',
          'She wasn\'t feeling well.',
          'They weren\'t fighting.',
          'It wasn\'t snowing.'
        ]
      },
      question: {
        structure: 'Was/Were + S + V-ing?',
        examples: [
          'Were you sleeping?',
          'What was she doing when you called?',
          'Where were they going?',
          'Was it raining in London?',
          'Who were you talking to?',
          'Why was he running?'
        ]
      }
    }
  },
  {
    id: 'b1_past_perfect',
    title: 'Past Perfect',
    iconName: 'ArrowUpLeft',
    summary: 'Had done',
    definition: 'The "Past before the Past". Used to show which action happened first.',
    deepDive: [
      'Structure: Had + Past Participle (V3).',
      'Timeline: Past Action 2 (Simple Past) <--- Past Action 1 (Past Perfect).',
      'Example: "When I arrived (2), the movie HAD started (1)."',
      'If the order is clear (like with "before" or "after"), Past Perfect is optional but recommended.'
    ],
    signalWords: ['By the time', 'After', 'Before', 'When', 'Already'],
    forms: {
      positive: {
        structure: 'S + Had + V3',
        examples: [
          'When I got home, my mom had already cooked dinner.',
          'She had finished the exam before the bell rang.',
          'The train had left when we arrived at the station.',
          'I realized I had lost my wallet.',
          'He had never been to France before that trip.',
          'They had sold the house by the time we called.'
        ]
      },
      negative: {
        structure: 'S + Hadn\'t + V3',
        examples: [
          'I hadn\'t seen him before that day.',
          'She hadn\'t studied, so she failed.',
          'We hadn\'t finished eating when he arrived.',
          'The movie hadn\'t started yet.',
          'They hadn\'t met until the conference.'
        ]
      },
      question: {
        structure: 'Had + S + V3?',
        examples: [
          'Had you finished the report before the meeting?',
          'Had she left when you arrived?',
          'Had they been there before?',
          'What had happened?',
          'Had he eaten breakfast?'
        ]
      }
    }
  },
  {
    id: 'b1_used_to',
    title: 'Used to',
    iconName: 'RotateCcw',
    summary: 'Past Habits',
    definition: 'Habits or states in the past that are NOT true anymore.',
    deepDive: [
      'Structure: Used to + Base Verb.',
      'Usage: "I used to smoke" (I don\'t smoke now).',
      'Negative: "I didn\'t use to..." (Drop the "d").',
      'Question: "Did you use to...?" (Drop the "d").',
      'Don\'t confuse with "Be used to" (Accustomed to).'
    ],
    signalWords: ['When I was young', 'In the past'],
    forms: {
      positive: {
        structure: 'S + Used to + Verb',
        examples: [
          'I used to play soccer every day.',
          'She used to have long hair.',
          'We used to live in that house.',
          'He used to be my best friend.',
          'I used to love chocolate, but now I hate it.',
          'They used to work together.'
        ]
      },
      negative: {
        structure: 'S + Didn\'t use to + Verb',
        examples: [
          'I didn\'t use to like vegetables.',
          'She didn\'t use to wear glasses.',
          'We didn\'t use to study much.',
          'He didn\'t use to be so angry.',
          'They didn\'t use to travel.'
        ]
      },
      question: {
        structure: 'Did + S + Use to + Verb?',
        examples: [
          'Did you use to play video games?',
          'Did she use to live here?',
          'Did they use to be friends?',
          'Where did you use to go to school?',
          'What did you use to do on weekends?'
        ]
      }
    }
  },
  {
    id: 'b1_would_past',
    title: 'Would for Past Habits',
    iconName: 'RotateCcw',
    summary: 'Nostalgic Habits',
    definition: 'Another way to talk about repeated actions in the past, often with nostalgia.',
    deepDive: [
      'Usage: "When I was a kid, my dad WOULD read to me."',
      'Difference from "Used to": "Would" CANNOT be used for states (Have, Be, Live, Love). Only actions.',
      'Right: "I used to have a bike." (State)',
      'Wrong: "I would have a bike."',
      'Right: "I would ride my bike." (Action)'
    ],
    signalWords: ['Every summer', 'When we were kids'],
    forms: {
      positive: {
        structure: 'S + Would + Verb',
        examples: [
          'Every summer, we would go to the beach.',
          'My grandmother would bake cakes for us.',
          'We would play outside until dark.',
          'He would always bring me flowers.',
          'They would sit on the porch for hours.',
          'On Sundays, we would visit the park.'
        ]
      },
      negative: {
        structure: 'S + Wouldn\'t + Verb',
        examples: [
          'He wouldn\'t listen to anyone.',
          'She wouldn\'t eat her vegetables.',
          'The car wouldn\'t start.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b1_future_continuous',
    title: 'Future Forms & Future Continuous',
    iconName: 'ArrowRight',
    summary: 'Will be doing',
    definition: 'Review of future forms plus Future Continuous for actions in progress at a time in the future.',
    deepDive: [
      'Will: Predictions/Decisions.',
      'Going to: Plans/Evidence.',
      'Present Cont: Arrangements.',
      'Future Continuous: Will + Be + V-ing. ("At 8pm tomorrow, I will be watching TV").',
      'Use: Predicting what is happening at a specific future moment.'
    ],
    signalWords: ['This time tomorrow', 'In 5 years time'],
    forms: {
      positive: {
        structure: 'S + Will be + V-ing',
        examples: [
          'This time tomorrow, I will be flying to Paris.',
          'Don\'t call me at 8, I will be watching the game.',
          'In ten years, robots will be doing our jobs.',
          'She will be waiting for you at the station.',
          'We will be having dinner then.'
        ]
      },
      negative: {
        structure: 'S + Won\'t be + V-ing',
        examples: [
          'I won\'t be working tomorrow.',
          'She won\'t be using the car.',
          'We won\'t be staying long.',
          'They won\'t be sleeping yet.'
        ]
      },
      question: {
        structure: 'Will + S + Be + V-ing?',
        examples: [
          'Will you be using the computer?',
          'Where will you be living in 2030?',
          'Will she be joining us?',
          'What will you be doing this time next week?'
        ]
      }
    }
  },
  {
    id: 'b1_modals_varied',
    title: 'Modals: Should, Could, May, Might',
    iconName: 'Zap',
    summary: 'Advice & Possibility',
    definition: 'Nuances of advice and probability.',
    deepDive: [
      'Should / Ought to: Advice ("You should study").',
      'Could: Past ability OR Future possibility ("It could rain").',
      'May / Might: Probability (50%). "It might rain" = Maybe it will rain.',
      'May: Also formal permission ("May I come in?").'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Modal + Base Verb',
        examples: [
          'You should see a doctor.',
          'We ought to go now.',
          'It could be true.',
          'She might come later.',
          'They may arrive soon.',
          'You could ask him for help.',
          'He might know the answer.'
        ]
      },
      negative: {
        structure: 'Modal + Not + Verb',
        examples: [
          'You shouldn\'t smoke.',
          'It might not rain.',
          'She may not want to go.',
          'He couldn\'t swim when he was 5.',
          'We shouldn\'t be late.'
        ]
      },
      question: {
        structure: 'Modal + S + Verb?',
        examples: [
          'Should I call him?',
          'Could you open the window?',
          'May I help you?',
          'Might it be a mistake?',
          'What should we do?'
        ]
      }
    }
  },
  {
    id: 'b1_passive_intro',
    title: 'Passive Voice (Intro)',
    iconName: 'Shuffle',
    summary: 'Object focus',
    definition: 'When the action is more important than WHO did it.',
    deepDive: [
      'Structure: Be + Past Participle (V3).',
      'Active: "Someone stole my car."',
      'Passive: "My car was stolen."',
      'Use "By" if you want to say who did it.',
      'Tenses: Be changes (Is, Was, Will be, Has been) + V3.'
    ],
    signalWords: ['By'],
    forms: {
      positive: {
        structure: 'Object + Be + V3',
        examples: [
          'English is spoken here.',
          'The house was built in 1990.',
          'This book was written by JK Rowling.',
          'Dinner is served at 8pm.',
          'The emails are sent automatically.',
          'My bike was stolen yesterday.',
          'The winner will be announced soon.'
        ]
      },
      negative: {
        structure: 'Object + Be + Not + V3',
        examples: [
          'The room wasn\'t cleaned.',
          'My phone isn\'t broken.',
          'These cars aren\'t made in Japan.',
          'I wasn\'t invited to the party.',
          'The letter hasn\'t been sent.'
        ]
      },
      question: {
        structure: 'Be + Object + V3?',
        examples: [
          'Is this seat taken?',
          'Was the job finished?',
          'When was America discovered?',
          'Are credit cards accepted?',
          'Will the food be delivered?'
        ]
      }
    }
  },
  {
    id: 'b1_conditionals_01',
    title: 'Conditionals 0 & 1',
    iconName: 'Split',
    summary: 'Facts & Possibilities',
    definition: 'Talking about cause and effect.',
    deepDive: [
      'Zero Conditional (Facts): If + Present, Present. ("If you heat ice, it melts").',
      'First Conditional (Future Possibility): If + Present, Will. ("If it rains, I will stay home").',
      'Unless: Means "If... not".'
    ],
    signalWords: ['If', 'Unless'],
    forms: {
      positive: {
        structure: 'If... Present... Will/Present',
        examples: [
          'If I drink coffee, I can\'t sleep. (Zero)',
          'If you mix red and blue, you get purple. (Zero)',
          'If I study, I will pass the exam. (First)',
          'She will be late if she doesn\'t hurry. (First)',
          'If we go to London, we will see the Big Ben. (First)',
          'Unless you run, you will miss the bus.'
        ]
      },
      negative: {
        structure: 'If... don\'t, won\'t',
        examples: [
          'If it doesn\'t rain, we will go to the beach.',
          'I won\'t go if you don\'t go.',
          'Unless you study, you will fail.',
          'If he doesn\'t call, I will leave.'
        ]
      },
      question: {
        structure: 'Will... if...?',
        examples: [
          'What will you do if it rains?',
          'Will she come if I invite her?',
          'What happens if you press this button?',
          'Where will you go if the hotel is full?'
        ]
      }
    }
  },
  {
    id: 'b1_gerund_infinitive',
    title: 'Gerund vs Infinitive',
    iconName: 'List',
    summary: 'Doing vs To Do',
    definition: 'Some verbs are followed by ING, others by TO.',
    deepDive: [
      'Verbs + Gerund (ING): Enjoy, Mind, Finish, Avoid, Suggest. ("I enjoy playing").',
      'Verbs + Infinitive (TO): Want, Decide, Promise, Hope, Offer. ("I want to play").',
      'Prepositions + Gerund: After, Before, Of, About. ("Interested in learning").',
      'Stop Doing (Quit) vs Stop To Do (Pause to do action).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Verb + ING / TO',
        examples: [
          'I enjoy reading books. (ING)',
          'She avoided answering the question. (ING)',
          'He finished working. (ING)',
          'I want to go home. (TO)',
          'She decided to buy the car. (TO)',
          'He promised to help me. (TO)',
          'I stopped smoking. (Quit)',
          'I stopped to smoke. (Paused to smoke)'
        ]
      },
      negative: {
        structure: 'Not doing / Not to do',
        examples: [
          'I promise not to be late.',
          'She suggested not going there.',
          'He decided not to buy it.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b1_relative_clauses',
    title: 'Defining Relative Clauses',
    iconName: 'Link',
    summary: 'Who / Which / That',
    definition: 'Used to define exactly WHICH person or thing we are talking about.',
    deepDive: [
      'Who: For people ("The man WHO lives here").',
      'Which: For things ("The car WHICH is red").',
      'That: For people or things (Informal).',
      'Where: For places.',
      'No commas are used in defining clauses.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Noun + Relative Pronoun + Clause',
        examples: [
          'This is the man who helped me.',
          'Where is the book that I bought?',
          'The car which crashed was blue.',
          'I know a girl who speaks Japanese.',
          'This is the hotel where we stayed.',
          'The phone that is on the table is mine.',
          'He is the actor who played Spiderman.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b1_reported_speech',
    title: 'Reported Speech (Basic)',
    iconName: 'MessageCircle',
    summary: 'He said that...',
    definition: 'Reporting what someone else said. Tenses usually move one step back into the past.',
    deepDive: [
      'Say vs Tell: "He SAID (that)..." vs "He TOLD ME (that)...".',
      'Present Simple -> Past Simple ("I like it" -> He said he LIKED it).',
      'Present Continuous -> Past Continuous.',
      'Will -> Would.',
      'Can -> Could.',
      'Pronouns change (I -> He/She).'
    ],
    signalWords: ['He said', 'She told me'],
    forms: {
      positive: {
        structure: 'S + Said + (That) + Backshifted Clause',
        examples: [
          'Direct: "I am happy." -> Indirect: He said he was happy.',
          'Direct: "I work here." -> Indirect: She said she worked there.',
          'Direct: "I will call you." -> Indirect: He said he would call me.',
          'Direct: "I can swim." -> Indirect: She said she could swim.',
          'Direct: "I am leaving." -> Indirect: He told me he was leaving.',
          'Direct: "I have finished." -> Indirect: She said she had finished.'
        ]
      },
      negative: {
        structure: 'S + Said + Negative',
        examples: [
          'Direct: "I don\'t like it." -> Indirect: He said he didn\'t like it.',
          'Direct: "I won\'t go." -> Indirect: She said she wouldn\'t go.',
          'Direct: "I can\'t help." -> Indirect: He said he couldn\'t help.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b1_phrasal_verbs',
    title: 'Common Phrasal Verbs',
    iconName: 'GitMerge',
    summary: 'Get up / Turn on',
    definition: 'Verbs combined with prepositions that change the meaning completely.',
    deepDive: [
      'Literal: "Look up" (Look at the ceiling).',
      'Idiomatic: "Look up" (Find information).',
      'Separable: "Turn it on" OR "Turn on the TV".',
      'Common ones: Get up (rise), Look for (search), Turn on/off (power), Give up (quit).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Verb + Preposition',
        examples: [
          'I get up at 7am.',
          'Please turn on the light.',
          'I am looking for my keys.',
          'He gave up smoking.',
          'Put on your coat.',
          'We ran out of milk.',
          'The plane took off on time.',
          'I get along with my sister.'
        ]
      },
      negative: {
        structure: 'Don\'t + Phrasal Verb',
        examples: [
          'Don\'t give up!',
          'He didn\'t show up.',
          'I can\'t figure it out.',
          'Don\'t throw it away.'
        ]
      },
      question: {
        structure: '...',
        examples: [
          'What are you looking for?',
          'Can you turn down the volume?',
          'When do you wake up?',
          'Who are you waiting for?'
        ]
      }
    }
  },
  {
    id: 'b1_connectors',
    title: 'Connectors: Although & However',
    iconName: 'Link',
    summary: 'Contrast',
    definition: 'Advanced ways to show contrast between two ideas.',
    deepDive: [
      'Although / Even though: Starts a clause. ("Although it rained, we went out").',
      'However: Starts a new sentence. ("It rained. However, we went out").',
      'Therefore: Shows result (Formal "So").'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Although... / ... However...',
        examples: [
          'Although he is rich, he is not happy.',
          'We enjoyed the trip, although the weather was bad.',
          'The food was expensive. However, it was delicious.',
          'He didn\'t study. Therefore, he failed.',
          'Even though I was tired, I went to the gym.',
          'I love London. However, it is very expensive.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b1_sequencers',
    title: 'Sequencers',
    iconName: 'List',
    summary: 'First, Then, Finally',
    definition: 'Words used to order events in a story or instructions.',
    deepDive: [
      'Beginning: First, Firstly, To start with.',
      'Middle: Then, Next, After that, Later.',
      'End: Finally, In the end, Lastly.',
      'Use commas after sequencers.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Sequencer + Comma + Sentence',
        examples: [
          'First, break the eggs.',
          'Then, add milk and sugar.',
          'Next, mix everything together.',
          'After that, put it in the pan.',
          'Finally, serve with fruit.',
          'In the end, we decided to stay home.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  }
];
