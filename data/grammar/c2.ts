
import { GrammarTopic } from '../../types';

export const C2_TOPICS: GrammarTopic[] = [
  {
    id: 'c2_complex_inversion',
    title: 'Complex Inversion',
    iconName: 'Shuffle',
    summary: 'Were it not for / Such was the...',
    definition: 'Advanced inversion used in formal, literary, or dramatic contexts to emphasize a specific element of the sentence.',
    deepDive: [
      'Conditionals: Replacing "If" (Were it not for, Had I known, Should you need).',
      'Result Clauses: "So" and "Such" at the beginning ("So quickly did he run that...", "Such was the force of the storm that...").',
      'Time Expressions: "No sooner... than", "Hardly... when".',
      'Prepositional Phrases: "On no account", "Under no circumstances".'
    ],
    signalWords: ['Were', 'Had', 'Should', 'So', 'Such', 'No sooner'],
    forms: {
      positive: {
        structure: 'Adverbial/Aux + S + V',
        examples: [
          'Were it not for your timely intervention, the project would have collapsed.',
          'Had I known the implications of my decision, I would have acted differently.',
          'Should you require further assistance, do not hesitate to contact us.',
          'So intense was the heat that the road began to melt.',
          'Such was his arrogance that everyone despised him.',
          'No sooner had we sat down than the fire alarm went off.',
          'Under no circumstances are you to leave your post.',
          'On no account must this door be opened.',
          'Little did they know what was about to happen.',
          'Nowhere else will you find such a dedicated team.'
        ]
      },
      negative: {
        structure: 'Had it not been for...',
        examples: [
          'Had it not been for the funding, we would have gone bankrupt.',
          'Were she not so stubborn, she would have apologized by now.',
          'Not until I saw him with my own eyes did I believe it.'
        ]
      },
      question: { structure: 'N/A (Statement form)', examples: [] }
    }
  },
  {
    id: 'c2_ellipsis_substitution',
    title: 'Ellipsis & Substitution',
    iconName: 'Scissors',
    summary: 'Leaving words out',
    definition: 'The omission of words that are understood from the context to avoid repetition and increase fluency (native-like flow).',
    deepDive: [
      'Ellipsis: Leaving out words completely ("(Do you) Want a coffee?", "I went to the bank and (I) withdrew some money").',
      'Substitution: Replacing words with One/Ones, Do/Does/Did, So/Not.',
      'Clause Substitution: "I think so", "I hope not".',
      'Infinitive without "to": "I didn\'t want to leave, but I had to (leave)."'
    ],
    signalWords: ['So', 'One', 'Do', 'Not'],
    forms: {
      positive: {
        structure: 'Implicit omission or substitution',
        examples: [
          'He didn\'t want to come, but he had to.',
          'I haven\'t read the book, but my sister has.',
          'She is happy, and so am I.',
          'You can stay if you want to.',
          'A: "Is he coming?" B: "I imagine so."',
          'We are going to France. At least, I hope so.',
          'I wanted to buy the red shoes, but I bought the black ones.',
          'Finished yet? (Have you finished yet?)',
          'Sounds good. (That sounds good.)'
        ]
      },
      negative: {
        structure: 'Substitution with Not',
        examples: [
          'A: "Is it raining?" B: "I hope not."',
          'A: "Will he be angry?" B: "I guess not."',
          'I wanted to help, but I couldn\'t.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c2_rhetorical_grammar',
    title: 'Rhetorical & Stylistic Grammar',
    iconName: 'PenTool',
    summary: 'It is not that... but that...',
    definition: 'Manipulating grammar for emphasis, contrast, or dramatic effect in speech and writing.',
    deepDive: [
      'Contrastive Emphasis: "It is not that I don\'t like him, but that I don\'t trust him."',
      'The "What" Cleft: "What is crucial is that we remain calm."',
      'Double Negatives (Standard): "It is not unlikely..." (It is likely).',
      'Fronting for flow: "Beside the table stood a tall man."'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Various stylistic structures',
        examples: [
          'It is not that the work is difficult, but that it is tedious.',
          'What matters most is your safety.',
          'It was only when I arrived that I realized the truth.',
          'Rich as he may be, he is terribly unhappy.',
          'Try as I might, I couldn\'t open the jar.',
          'It is not uncommon for snow to fall in April.',
          'All I did was ask a simple question.'
        ]
      },
      negative: {
        structure: 'Not only... but',
        examples: [
          'Not only did he fail to show up, but he also refused to apologize.',
          'She is by no means an inexperienced player.',
          'In no way am I suggesting that you are wrong.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c2_literary_structures',
    title: 'Literary & Archaic Structures',
    iconName: 'Book',
    summary: 'Be it... / Come what may',
    definition: 'Structures mostly found in literature, old texts, or extremely formal speeches.',
    deepDive: [
      'Subjunctive "Be": "Be that as it may..." (Even so...).',
      'Subjunctive "Were": "If I were you..." (Standard) -> "Were I you..." (Literary).',
      'Inverted Conditional: "Come what may" (Whatever happens).',
      'Suffice it to say: "It is enough to say".'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Fixed literary phrases',
        examples: [
          'Be that as it may, we must continue.',
          'Suffice it to say, we were not welcome.',
          'Come what may, I will stand by your side.',
          'Far be it from me to criticize, but this is wrong.',
          'So be it. (I accept the outcome).',
          'Be it rain or shine, the event goes on.',
          'Long live the King!'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c2_sophisticated_modals',
    title: 'Sophisticated Modals',
    iconName: 'Zap',
    summary: 'Dare / Need / Shall',
    definition: 'Using semi-modals and standard modals in nuanced, often formal or British contexts.',
    deepDive: [
      'Dare: Used as a modal in negatives/questions ("I daren\'t ask").',
      'Need: As a modal ("You need not worry").',
      'Shall: For legal obligation ("The tenant shall pay...").',
      'May: For concession ("He may be the boss, but he is wrong").',
      'Will: For habit/assumption ("That will be the postman").'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Modal + Base Verb',
        examples: [
          'The tenant shall maintain the property in good condition. (Legal)',
          'He may be rich, but he has no class. (Concession)',
          'That will be John knocking at the door. (Assumption)',
          'I dare say you are right. (I suppose)',
          'You need only ask. (Restriction)'
        ]
      },
      negative: {
        structure: 'Needn\'t / Daren\'t',
        examples: [
          'You need not have bothered. (Formal)',
          'I daren\'t tell him the truth. (I am afraid to)',
          'They need not worry about the cost.',
          'He shall not pass!'
        ]
      },
      question: {
        structure: 'Need I...? / Dare you...?',
        examples: [
          'Need I say more?',
          'Dare you ask him?',
          'How dare you speak to me like that?',
          'Shall we proceed?'
        ]
      }
    }
  },
  {
    id: 'c2_narrative_tenses',
    title: 'Creative Tense Usage',
    iconName: 'Clock',
    summary: 'Future in the past / Historic Present',
    definition: 'Manipulating tenses to tell stories more vividly or express complex time relationships.',
    deepDive: [
      'Historic Present: Using present tense for past stories to make them feel immediate ("So I walk into the room and he looks at me...").',
      'Future in the Past: "I was going to call you" / "He was to become king."',
      'Present Continuous for irritation: "He is always complaining!"'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Various',
        examples: [
          'I walk into the bar, and who do I see? My ex-boss. (Historic Present)',
          'He was to find out the truth years later. (Destiny in the past)',
          'I was going to help, but I ran out of time. (Unfulfilled plan)',
          'She is always interrupting me! (Irritation)',
          'We were hoping to speak to the manager. (Polite distancing)'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c2_advanced_cohesion',
    title: 'Advanced Cohesion',
    iconName: 'Link',
    summary: 'Albeit / Hence / Thus',
    definition: 'Using high-level discourse markers to connect ideas logically and formally.',
    deepDive: [
      'Albeit: Although ("He accepted the job, albeit with some hesitation").',
      'Thus / Hence: Therefore ("He missed the bus, hence he was late").',
      'Notwithstanding: Despite ("Notwithstanding the difficulties...").',
      'Thereby: By that means ("He signed the contract, thereby accepting the terms").'
    ],
    signalWords: ['Thus', 'Hence', 'Albeit', 'Thereby'],
    forms: {
      positive: {
        structure: 'Formal Connectors',
        examples: [
          'The task is difficult, albeit not impossible.',
          'He was a newcomer, hence his lack of knowledge.',
          'We lack funding; thus, the project is cancelled.',
          'The law was passed, notwithstanding the opposition.',
          'She forgot the map, thereby getting lost.',
          'He is a doctor and, as such, should know better.',
          'Inasmuch as you are willing, we can proceed.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c2_nominalization_density',
    title: 'Syntactic Density & Nominalization',
    iconName: 'Box',
    summary: 'Dense Academic Style',
    definition: 'Packing a lot of information into a noun phrase, common in academic and scientific English.',
    deepDive: [
      'Replacing verbs/adjectives with nouns to create dense sentences.',
      'Example: "Because the earth rotates..." -> "The rotation of the earth..."',
      'Example: "They failed to implement the plan..." -> "The failure to implement the plan..."'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Heavy Noun Phrases',
        examples: [
          'The rapid proliferation of technology has altered society.',
          'His reluctance to accept the offer was surprising.',
          'The implementation of the new protocol resulted in efficiency.',
          'There is a high probability of precipitation.',
          'The ambiguity of the instructions caused confusion.',
          'Failure to comply may result in prosecution.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  }
];
