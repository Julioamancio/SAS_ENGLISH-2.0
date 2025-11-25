
import { GrammarTopic } from '../../types';

export const C1_TOPICS: GrammarTopic[] = [
  {
    id: 'c1_inversion',
    title: 'Inversion (Negative Adverbials)',
    iconName: 'Shuffle',
    summary: 'Never have I... / Seldom do we...',
    definition: 'Changing the normal word order (Subject-Verb -> Verb-Subject) for dramatic effect or emphasis in formal contexts.',
    deepDive: [
      'Trigger: Used after negative or restrictive adverbials at the START of a sentence.',
      'Common Triggers: Never, Seldom, Rarely, Little, Not only... but also, Under no circumstances, No sooner... than.',
      'Structure: Adverbial + Auxiliary + Subject + Main Verb.',
      'Tone: Very formal, rhetorical, and emphatic. Common in speeches and academic writing.'
    ],
    signalWords: ['Never', 'Seldom', 'Rarely', 'Little', 'Not only', 'No sooner'],
    forms: {
      positive: { 
        structure: 'Adverbial + Aux + S + V', 
        examples: [
          'Never have I seen such a blatant disregard for the rules.', 
          'Rarely do we encounter such dedication in a student.',
          'Little did he know that the surprise was planned for him.',
          'Seldom does the CEO visit the branch office.',
          'Not only is he intelligent, but he is also incredibly kind.',
          'Under no circumstances should you open this secure door.',
          'No sooner had I arrived than the phone rang.',
          'Hardly had we started eating when the guests arrived.',
          'Only later did I realize the magnitude of my mistake.',
          'Nowhere will you find a more committed team.'
        ] 
      },
      negative: { structure: 'Technically positive form with negative meaning', examples: [] },
      question: { structure: 'N/A (Statement form)', examples: [] }
    }
  },
  {
    id: 'c1_fronting',
    title: 'Fronting',
    iconName: 'ArrowUpLeft',
    summary: 'Interesting as it may seem...',
    definition: 'Moving parts of the sentence (Adjectives, Participles, Prepositions) to the beginning for emphasis or cohesion.',
    deepDive: [
      'Adjective Fronting: "Hard as it was, we finished." (Meaning: Although it was hard...).',
      'Prepositional Fronting: "In the corner stood a man." (Focus on location).',
      'Participle Fronting: "Waiting for the bus, I saw him." (Focus on action).',
      'Usage: Creates smooth transitions between sentences and highlights new information.'
    ],
    signalWords: ['As', 'Though'],
    forms: {
      positive: {
        structure: 'Adjective/Participle + Clause',
        examples: [
          'Strange as it may seem, I actually enjoy rainy days.',
          'Difficult though it was, they succeeded in the end.',
          'Walking down the street, I found a vintage wallet.',
          'Gone are the days when we could play outside all day.',
          'Included in the price is a complimentary breakfast.',
          'Attached to this email is the report you requested.',
          'Standing in the doorway was a tall stranger.',
          'Rich as he is, he is not generous.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c1_reduced_relative',
    title: 'Reduced Relative Clauses',
    iconName: 'Scissors',
    summary: 'The man living here / The car sold',
    definition: 'Shortening relative clauses by removing the relative pronoun (who, which, that) and the verb "be".',
    deepDive: [
      'Active (Present Participle): "The girl WHO IS waving" -> "The girl WAVING".',
      'Passive (Past Participle): "The book WHICH WAS written by..." -> "The book WRITTEN by...".',
      'Rules: You can only reduce if the subject of the clause is the same as the noun being described.',
      'Usage: Essential for concise academic and professional writing.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Noun + V-ing (Active) / V3 (Passive)',
        examples: [
          'The students studying for the exam are in the library. (Who are studying)',
          'The man sitting next to me is a doctor. (Who is sitting)',
          'Anyone wishing to leave early must sign out. (Who wishes)',
          'The cars produced in Germany are reliable. (Which are produced)',
          'The decision made by the committee is final. (Which was made)',
          'The evidence found at the scene was crucial. (Which was found)',
          'Applications received after the deadline will be rejected.'
        ]
      },
      negative: {
        structure: 'Not + V-ing / V3',
        examples: [
          'People not paying taxes will be fined.',
          'Not knowing what to do, he called the police.',
          'Any items not claimed within 30 days will be discarded.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c1_nominalization',
    title: 'Nominalization',
    iconName: 'Box',
    summary: 'Turning verbs into nouns',
    definition: 'The process of turning verbs or adjectives into nouns to make the text more formal, objective, and academic.',
    deepDive: [
      'Why use it? To focus on concepts rather than actions/people.',
      'Verb -> Noun: "They developed the plan" -> "The DEVELOPMENT of the plan".',
      'Adjective -> Noun: "It is complex" -> "The COMPLEXITY of the situation".',
      'Common Suffixes: -tion, -ment, -ness, -ity, -ance.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Formal Noun Phrases',
        examples: [
          'The implementation of the policy caused controversy. (They implemented the policy...)',
          'The analysis of the data took three weeks. (We analyzed the data...)',
          'Her reaction to the news was surprising. (She reacted...)',
          'The complexity of the problem requires a team. (The problem is complex...)',
          'The reduction in costs is significant. (We reduced costs...)',
          'Failure to comply will result in penalties. (If you fail to comply...)'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c1_passive_reporting',
    title: 'Passive Reporting Structures',
    iconName: 'MessageSquare',
    summary: 'It is said that... / He is believed to...',
    definition: 'Formal ways to report general beliefs, rumors, or facts without naming a specific source.',
    deepDive: [
      'Impersonal: "It is said/believed/thought/reported THAT..."',
      'Personal: "Subject IS said/believed/thought TO BE..."',
      'Past Reference: "He is believed TO HAVE BEEN..." (Refers to the past).',
      'Usage: News reports, academic papers, distancing the speaker from the claim.'
    ],
    signalWords: ['Said', 'Believed', 'Thought', 'Alleged', 'Reported'],
    forms: {
      positive: {
        structure: 'It is V3 that... / S + be + V3 + to...',
        examples: [
          'It is said that he is a millionaire.',
          'He is said to be a millionaire.',
          'She is believed to be living in Paris.',
          'It is reported that the company is bankrupt.',
          'The thief is thought to have escaped yesterday.',
          'The painting is alleged to be a fake.',
          'They are expected to arrive soon.'
        ]
      },
      negative: {
        structure: 'It is not... / S is not...',
        examples: [
          'It is not known where the treasure is.',
          'He is not believed to be dangerous.',
          'The virus is not thought to be airborne.'
        ]
      },
      question: {
        structure: 'Is it said...? / Is he believed...?',
        examples: [
          'Is it true that he resigned?',
          'Are they expected to win?',
          'Is the company rumored to be sold?'
        ]
      }
    }
  },
  {
    id: 'c1_past_modals_criticism',
    title: 'Past Modals: Criticism & Regret',
    iconName: 'AlertTriangle',
    summary: 'Should have / Needn\'t have',
    definition: 'Expressing regret about the past or criticizing past actions.',
    deepDive: [
      'Should have + V3: Criticism (You did wrong) or Regret (I made a mistake).',
      'Ought to have + V3: Same as "Should have", but slightly more formal.',
      'Needn\'t have + V3: You did it, but it wasn\'t necessary. ("You needn\'t have brought food").',
      'Could have + V3: You had the ability/opportunity, but didn\'t do it. (Criticism).'
    ],
    signalWords: ['Mistake', 'Regret', 'Waste'],
    forms: {
      positive: {
        structure: 'S + Modal + Have + V3',
        examples: [
          'You should have studied harder for the exam.',
          'I should have called her yesterday.',
          'We ought to have left earlier to avoid traffic.',
          'You could have told me the truth!',
          'You needn\'t have brought gifts, but thank you.',
          'He should have known better.',
          'They could have won if they tried.'
        ]
      },
      negative: {
        structure: 'S + Modal + Not + Have + V3',
        examples: [
          'You shouldn\'t have spoken to him like that.',
          'I shouldn\'t have eaten so much cake.',
          'We need not have hurried; the train was late.',
          'She ought not to have ignored the warning.'
        ]
      },
      question: {
        structure: 'Should + S + Have + V3?',
        examples: [
          'Should I have apologized?',
          'What should we have done differently?',
          'Need I have brought my passport?',
          'Could he have saved them?'
        ]
      }
    }
  },
  {
    id: 'c1_emphasis_aux',
    title: 'Emphasis Structures (Do/Does/Did)',
    iconName: 'Zap',
    summary: 'I DO believe you',
    definition: 'Using auxiliary verbs in positive sentences to add emotional emphasis or correct someone.',
    deepDive: [
      'Present: "I DO understand." (Stronger than "I understand").',
      'Past: "I DID call you." (Correcting someone who says you didn\'t).',
      'Imperative: "DO sit down." (Polite and welcoming).',
      'Frequency: "I DO often wonder..."'
    ],
    signalWords: ['Really', 'Indeed', 'Actually'],
    forms: {
      positive: {
        structure: 'Subject + Do/Does/Did + Base Verb',
        examples: [
          'I do hope you can come to the party.',
          'She does look beautiful in that dress.',
          'We did enjoy the meal, thank you.',
          'I did lock the door! I remember specifically.',
          'Do be quiet, please.',
          'He does seem a bit tired today.',
          'It did happen, I saw it with my own eyes.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c1_complex_agreement',
    title: 'Complex Subject-Verb Agreement',
    iconName: 'Scale',
    summary: 'Neither of them is/are',
    definition: 'Rules for tricky subjects where it is unclear if the verb should be singular or plural.',
    deepDive: [
      'Neither/Either of: Formal = Singular (Is). Informal = Plural (Are).',
      'Collective Nouns (Team, Government): Singular (Acting as one unit) or Plural (Individuals acting separately).',
      'Quantities: Money, Time, Distance = Singular ("Ten dollars is not enough").',
      'Compound subjects: "Bread and butter is..." (Considered one dish).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Complex Subject + V',
        examples: [
          'Neither of the answers is correct. (Formal)',
          'Neither of the players were ready. (Informal)',
          'The government has decided to cut taxes.',
          'The staff are not happy with the new policy. (Individuals)',
          'Ten miles is a long way to walk.',
          'Bread and butter is my favorite breakfast.',
          'A number of students are absent. (Plural verb)',
          'The number of students is increasing. (Singular verb)'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'c1_phrasal_verbs',
    title: 'C1 Phrasal Verbs',
    iconName: 'GitMerge',
    summary: 'Brush up on / Do away with',
    definition: 'Three-part phrasal verbs and abstract meanings essential for advanced fluency.',
    deepDive: [
      'Three-part verbs: Verb + Adv + Prep (Look forward to, Put up with).',
      'Abstract meaning: "Bring about" (Cause), "Come up with" (Invent).',
      'Separability rules usually apply to 2-part verbs, but never 3-part verbs.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Verb + Particle + Preposition',
        examples: [
          'I need to brush up on my French.',
          'The government did away with the old tax law.',
          'She came up with a brilliant idea.',
          'I can\'t put up with this noise anymore.',
          'We must face up to the reality.',
          'He looks down on people who don\'t have a degree.',
          'I\'ll get round to fixing the shelf eventually.',
          'The meeting broke up at midnight.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  }
];
