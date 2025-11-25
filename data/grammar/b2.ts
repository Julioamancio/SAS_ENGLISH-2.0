
import { GrammarTopic } from '../../types';

export const B2_TOPICS: GrammarTopic[] = [
  {
    id: 'b2_past_perf_cont',
    title: 'Past Perfect Continuous',
    iconName: 'Clock',
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
  {
    id: 'b2_future_perfect',
    title: 'Future Perfect Simple & Continuous',
    iconName: 'ArrowRight',
    summary: 'Will have done',
    definition: 'Looking back from the future. Actions that will be finished BEFORE a specific time.',
    deepDive: [
      'Simple: Will have + V3. (Completion). "By 2030, I will have retired."',
      'Continuous: Will have been + V-ing. (Duration). "By 5pm, I will have been working for 8 hours."',
      'Keyword "By": Means "At or before".'
    ],
    signalWords: ['By', 'By the time', 'In 10 years time'],
    forms: {
      positive: {
        structure: 'Will have + V3 / Will have been + V-ing',
        examples: [
          'By next year, I will have graduated.',
          'We will have finished the report by Friday.',
          'By the time you arrive, I will have cooked dinner.',
          'In June, we will have been married for 10 years.',
          'By 5pm, she will have been driving for 6 hours.',
          'Scientists will have discovered a cure by then.'
        ]
      },
      negative: {
        structure: 'Won\'t have + V3',
        examples: [
          'I won\'t have finished by then.',
          'She won\'t have saved enough money.',
          'They won\'t have arrived before the show starts.',
          'We won\'t have been living here long enough.'
        ]
      },
      question: {
        structure: 'Will + S + have...?',
        examples: [
          'Will you have finished by 8pm?',
          'How long will you have been working there?',
          'Will they have left by the time we get there?',
          'What will you have achieved by age 30?'
        ]
      }
    }
  },
  {
    id: 'b2_modals_deduction',
    title: 'Modals of Deduction',
    iconName: 'Lightbulb',
    summary: 'Must be / Can\'t be / Might be',
    definition: 'Using modals to guess if something is true based on evidence.',
    deepDive: [
      'Must be: I am 90-100% sure it IS true. ("He has a Ferrari. He MUST be rich.")',
      'Can\'t be: I am 90-100% sure it is IMPOSSIBLE. ("He is eating a steak. He CAN\'T be vegetarian.")',
      'Might/Could/May be: It is possible (50%). ("He isn\'t answering. He MIGHT be sleeping.")',
      'Past Deduction: Must have been / Can\'t have been.'
    ],
    signalWords: ['I\'m sure', 'Impossible', 'Possibly'],
    forms: {
      positive: { 
        structure: 'Must/Might + Be/Have been', 
        examples: [
          'It must be cold outside; everyone is wearing coats.',
          'She has been running for hours; she must be exhausted.',
          'He might be at the library, but I am not sure.',
          'They could be stuck in traffic.',
          'Someone is knocking; it must be the pizza delivery.',
          'The thief must have entered through the window.'
        ] 
      },
      negative: { 
        structure: 'Can\'t + Be/Have been', 
        examples: [
          'It can\'t be John; he is in London right now.',
          'She can\'t be hungry; she just ate a huge pizza.',
          'That can\'t be the right answer.',
          'They can\'t have left already; their car is still here.',
          'You can\'t be serious!',
          'He can\'t have stolen the money; he was with me.'
        ] 
      },
      question: { 
        structure: 'Could it be...?', 
        examples: [
          'Could it be true?',
          'Who could it be at the door?',
          'Where might they be?',
          'Could he have forgotten the meeting?',
          'Do you think it might rain?'
        ] 
      }
    }
  },
  {
    id: 'b2_passive_advanced',
    title: 'Advanced Passive Voice',
    iconName: 'Shuffle',
    summary: 'Being done / Having been done',
    definition: 'Passive voice in complex tenses and forms.',
    deepDive: [
      'Continuous Passive: Be + BEING + V3. ("The road is BEING repaired").',
      'Perfect Passive: Have/Has + BEEN + V3. ("The decision has BEEN made").',
      'Infinitive Passive: To BE + V3. ("There is nothing to BE done").',
      'Modal Passive: Must BE + V3. ("It must BE done").'
    ],
    signalWords: ['By'],
    forms: {
      positive: {
        structure: 'Various',
        examples: [
          'The house is being painted at the moment.',
          'The documents have been sent.',
          'This room must be cleaned immediately.',
          'I don\'t like being told what to do.',
          'He claims to have been kidnapped.',
          'The winner will be announced tomorrow.',
          'The problem might be solved soon.'
        ]
      },
      negative: {
        structure: 'Not being / Not been',
        examples: [
          'The car hasn\'t been repaired yet.',
          'I wasn\'t being followed.',
          'Rules are not to be broken.',
          'It can\'t be done.'
        ]
      },
      question: {
        structure: 'Is/Has/Can + Object...?',
        examples: [
          'Is the room being used?',
          'Have the invitations been sent?',
          'Can this glass be recycled?',
          'When will the work be finished?'
        ]
      }
    }
  },
  {
    id: 'b2_conditional_2',
    title: 'Second Conditional',
    iconName: 'Split',
    summary: 'Unreal Present / Imaginary',
    definition: 'Used for imaginary situations in the present or future that are unlikely to happen.',
    deepDive: [
      'Structure: If + Past Simple, Would + Verb.',
      'Meaning: "If I had money (I don\'t), I would buy a car (I can\'t)."',
      'Verb To Be: Use "WERE" for all persons (If I were you, If he were rich).',
      'Use: Advice ("If I were you...") or Daydreaming.'
    ],
    signalWords: ['If I were you'],
    forms: {
      positive: { 
        structure: 'If + Past Simple, Would + Verb', 
        examples: [
          'If I won the lottery, I would travel the world.',
          'If I were you, I would accept the job.',
          'If he studied more, he would pass the exam.',
          'We would live in Spain if we spoke Spanish.',
          'If I had a car, I would drive to work.',
          'If she knew the answer, she would tell us.'
        ] 
      },
      negative: { 
        structure: 'If... didn\'t, wouldn\'t', 
        examples: [
          'If I didn\'t have to work, I would stay in bed.',
          'I wouldn\'t do that if I were you.',
          'If it weren\'t raining, we would go to the beach.',
          'She wouldn\'t be angry if you apologized.',
          'If we didn\'t need money, we wouldn\'t work.'
        ] 
      },
      question: { 
        structure: 'What would you do if...?', 
        examples: [
          'What would you do if you found a wallet?',
          'Where would you live if you could choose anywhere?',
          'Would you buy a boat if you were rich?',
          'If you met an alien, what would you say?',
          'Who would you invite if you had a party?'
        ] 
      }
    }
  },
  {
    id: 'b2_conditional_3',
    title: 'Third Conditional',
    iconName: 'Split',
    summary: 'Past Regrets',
    definition: 'Imagining a different PAST. Impossible because it already happened.',
    deepDive: [
      'Structure: If + Past Perfect (Had + V3), Would HAVE + V3.',
      'Meaning: "If I HAD studied, I WOULD HAVE passed." (But I didn\'t study, and I didn\'t pass).',
      'Use: Regrets or relief about past events.'
    ],
    signalWords: ['If', 'Had'],
    forms: {
      positive: {
        structure: 'If + Had V3, Would Have V3',
        examples: [
          'If I had known you were coming, I would have baked a cake.',
          'If she had left earlier, she would have caught the train.',
          'We would have won if we had played better.',
          'If you had called me, I would have helped you.',
          'They would have bought the house if it had been cheaper.',
          'If I had seen him, I would have said hello.'
        ]
      },
      negative: {
        structure: 'If + Hadn\'t V3, Wouldn\'t Have V3',
        examples: [
          'If I hadn\'t eaten so much, I wouldn\'t have felt sick.',
          'She wouldn\'t have been angry if you hadn\'t lied.',
          'If it hadn\'t rained, we would have gone to the beach.',
          'We wouldn\'t have met if I hadn\'t gone to that party.'
        ]
      },
      question: {
        structure: 'What would you have done...?',
        examples: [
          'What would you have done if you had lost your passport?',
          'Where would you have gone if the flight was canceled?',
          'Would you have accepted the job if they offered it?',
          'Who would have helped us if you hadn\'t been there?'
        ]
      }
    }
  },
  {
    id: 'b2_mixed_conditionals',
    title: 'Mixed Conditionals',
    iconName: 'GitMerge',
    summary: 'Past Cause -> Present Result',
    definition: 'Mixing 2nd and 3rd conditionals when the time references are different.',
    deepDive: [
      'Type 1 (Most Common): Past Action -> Present Result.',
      'Structure: If + Past Perfect (3rd), Would + Verb (2nd).',
      'Example: "If I HAD eaten breakfast (Past), I wouldn\'t BE hungry now (Present)."',
      'Type 2: Present State -> Past Result.',
      'Example: "If I spoke French (General Truth), I would have got the job (Past)."'
    ],
    signalWords: ['Now', 'Yesterday'],
    forms: {
      positive: {
        structure: 'If + Past Perfect, Would + Base',
        examples: [
          'If I had studied medicine, I would be a doctor now.',
          'If we had booked the tickets, we would be in Paris right now.',
          'She would be rich if she had won the lottery.',
          'If I hadn\'t spent all my money, I would buy this today.',
          'If he were smarter (General), he wouldn\'t have done that (Past).'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_relative_clauses_non',
    title: 'Non-Defining Relative Clauses',
    iconName: 'Link',
    summary: 'Extra Information (Commas)',
    definition: 'Adding extra information about something that is already identified. Commas are mandatory.',
    deepDive: [
      'Punctuation: MUST use commas.',
      'Pronoun: CANNOT use "That". Must use Who (people) or Which (things).',
      'Meaning: If you remove the clause, the sentence still makes sense.',
      'Example: "My mom, who is a nurse, is kind." (My mom is specific already).'
    ],
    signalWords: [', who ,', ', which ,'],
    forms: {
      positive: {
        structure: 'S, who/which..., V',
        examples: [
          'My brother, who lives in London, is an architect.',
          'London, which is the capital of UK, is huge.',
          'The car, which cost $50,000, broke down.',
          'Napoleon, who died in 1821, was a great leader.',
          'This painting, which was painted in 1900, is valuable.',
          'My boss, whose car is red, is very strict.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    },
    commonMistakes: [
      { wrong: 'My dad, that is old, loves golf.', right: 'My dad, who is old, loves golf.', explanation: 'Never use THAT in non-defining clauses (with commas).' }
    ]
  },
  {
    id: 'b2_cleft_sentences',
    title: 'Cleft Sentences',
    iconName: 'ArrowUpLeft',
    summary: 'What I need is...',
    definition: 'Splitting a sentence to focus on specific information.',
    deepDive: [
      'Wh-Cleft: "What I need IS a coffee." (Focus on coffee).',
      'It-Cleft: "It was JOHN who called." (Focus on John, not someone else).',
      'All-Cleft: "All I want is respect."',
      'Usage: Emphasis and correction.'
    ],
    signalWords: ['What', 'It was'],
    forms: {
      positive: {
        structure: 'What... is... / It is... who...',
        examples: [
          'What I really need is a holiday.',
          'It was my brother who broke the window.',
          'What happens is that I don\'t have time.',
          'All I did was ask a question.',
          'It was in 2010 that we met.',
          'What she hates is dishonesty.',
          'The person who called was Mike.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_adv_questions_tags',
    title: 'Advanced Question Tags',
    iconName: 'HelpCircle',
    summary: 'Let\'s... shall we?',
    definition: 'Special cases for question tags.',
    deepDive: [
      'I am -> Aren\'t I?',
      'Let\'s -> Shall we?',
      'Imperative (Order) -> Will you? / Can you?',
      'Negative words (Never, Hardly) count as negative sentence -> Positive Tag.',
      'Nobody/Everyone -> They.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Statement, Tag?',
        examples: [
          'I am late, aren\'t I?',
          'Let\'s go, shall we?',
          'Don\'t do that, will you?',
          'Open the door, would you?',
          'He never smiles, does he? (Never is negative)',
          'Everyone is happy, aren\'t they?',
          'Nobody called, did they?',
          'Nothing happened, did it?'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_gerunds_special',
    title: 'Gerunds & Infinitives (Change Meaning)',
    iconName: 'Shuffle',
    summary: 'Stop doing vs Stop to do',
    definition: 'Verbs that change meaning depending on if you use ING or TO.',
    deepDive: [
      'Stop + ING: Quit an action. (Stop smoking).',
      'Stop + TO: Pause to do something else. (Stop walking TO smoke).',
      'Remember + ING: Memory of past. (I remember locking the door).',
      'Remember + TO: Task to do. (Remember to lock the door).',
      'Try + ING: Experiment. (Try restarting it).',
      'Try + TO: Attempt difficult thing. (Try to lift this weight).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Verb + ING / TO',
        examples: [
          'I remember meeting him years ago. (Memory)',
          'Please remember to buy milk. (Task)',
          'He stopped drinking coffee. (Quit)',
          'He stopped to drink coffee. (Paused driving to drink)',
          'I regret telling you. (Sorry I did it)',
          'I regret to tell you... (Bad news coming)',
          'Try pressing the green button. (Experiment)',
          'I tried to open the window, but it was stuck. (Effort)'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_wish',
    title: 'Wish / If Only',
    iconName: 'Star',
    summary: 'Desires & Regrets',
    definition: 'Talking about things we want to be different.',
    deepDive: [
      'Wish + Past Simple: Present Desire. ("I wish I was rich" - I am not rich now).',
      'Wish + Past Perfect: Past Regret. ("I wish I had studied" - I didn\'t study).',
      'Wish + Would: Complaint about behavior. ("I wish you would stop talking").',
      '"If Only" is stronger than "I wish".'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'I wish + Past/Past Perf',
        examples: [
          'I wish I knew the answer. (Present)',
          'I wish I had a car. (Present)',
          'I wish I hadn\'t said that. (Past Regret)',
          'If only I had listened to you. (Past Regret)',
          'I wish it would stop raining. (Complaint)',
          'I wish you would listen to me. (Complaint)',
          'I wish I could fly. (Ability)'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_had_better',
    title: 'Had Better',
    iconName: 'AlertTriangle',
    summary: 'Strong Advice / Warning',
    definition: 'Stronger than "Should". Suggests a negative consequence if not followed.',
    deepDive: [
      'Structure: Had better + Base Verb.',
      'Meaning: "You should do it, OR ELSE..."',
      'Contraction: You\'d better.',
      'Negative: Had better NOT.'
    ],
    signalWords: ['Or else'],
    forms: {
      positive: {
        structure: 'S + \'d better + Verb',
        examples: [
          'You had better leave now. (Or you will be late)',
          'You\'d better pay the rent. (Or you lose the house)',
          'He\'d better be ready.',
          'We\'d better take an umbrella.'
        ]
      },
      negative: {
        structure: 'S + \'d better not + Verb',
        examples: [
          'You\'d better not be late.',
          'She\'d better not tell anyone.',
          'You\'d better not forget.'
        ]
      },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_phrasal_advanced',
    title: 'Advanced Phrasal Verbs',
    iconName: 'GitMerge',
    summary: 'Turn out / Come across',
    definition: 'More complex phrasal verbs essential for fluency.',
    deepDive: [
      'Turn out: End in a specific way / Happen to be.',
      'Come across: Find by accident.',
      'Look forward to: Be excited about future (Followed by ING!).',
      'Put up with: Tolerate.',
      'Run out of: Have none left.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Verb + Prep',
        examples: [
          'It turned out to be a mistake.',
          'I came across an old photo.',
          'I look forward to seeing you. (Note: SEEING, not see)',
          'I can\'t put up with this noise.',
          'We have run out of coffee.',
          'The car broke down.',
          'The meeting was called off (cancelled).',
          'He made up the story (invented).'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_reported_speech_full',
    title: 'Reported Speech (Full)',
    iconName: 'MessageCircle',
    summary: 'Reporting Verbs',
    definition: 'Using verbs other than "Say" or "Tell" to report speech.',
    deepDive: [
      'Patterns:',
      'Verb + To + Infinitive: Agree, Offer, Refuse, Promise, Threaten.',
      'Verb + Object + To + Inf: Advise, Ask, Tell, Remind, Warn.',
      'Verb + ING: Suggest, Deny, Admit, Regret.',
      'Verb + That clause: Explain, Complain, Mention.'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Subject + Reporting Verb + Structure',
        examples: [
          'He refused to help me.',
          'She suggested going to the cinema. (Not "suggested to go")',
          'They denied stealing the money.',
          'I advised him to see a doctor.',
          'She reminded me to call my mom.',
          'He admitted making a mistake.',
          'She complained that the food was cold.',
          'He threatened to call the police.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  },
  {
    id: 'b2_connectors_adv',
    title: 'Advanced Connectors',
    iconName: 'Link',
    summary: 'Despite / Whereas',
    definition: 'Formal words to link complex ideas.',
    deepDive: [
      'Despite / In spite of: Followed by Noun or Verb-ING. (Not a sentence).',
      'Whereas / While: Used to compare two different things.',
      'Moreover / Furthermore: Adding information (Formal "Also").',
      'Nevertheless: However (Formal).'
    ],
    signalWords: [],
    forms: {
      positive: {
        structure: 'Connector + Clause/Noun',
        examples: [
          'Despite the rain, we went out.',
          'In spite of being tired, he finished the work.',
          'I like dogs, whereas my wife prefers cats.',
          'The car is expensive. Moreover, it is too small.',
          'The team played well. Nevertheless, they lost.',
          'He is rich. Furthermore, he is handsome.'
        ]
      },
      negative: { structure: '-', examples: [] },
      question: { structure: '-', examples: [] }
    }
  }
];
