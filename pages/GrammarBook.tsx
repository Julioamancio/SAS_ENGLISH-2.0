import React, { useState } from 'react';
import { Book, ArrowRight, Zap, GraduationCap, CheckCircle, HelpCircle, MinusCircle, PlusCircle, Bookmark, LayoutGrid, List, Clock, User, Link, Layers, MessageCircle, AlertCircle, Type, Mic, Shuffle } from 'lucide-react';

// --- Interfaces ---

interface GrammarForm {
  structure: string;
  examples: string[];
}

interface GrammarTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string; // Short tag
  definition: string; // What is it?
  usage: string; // When to use it?
  forms: {
    positive: GrammarForm;
    negative: GrammarForm;
    question: GrammarForm;
  };
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
        definition: 'The most fundamental verb, describing identity, qualities, age, and location.',
        usage: 'Use to say who someone is, how they feel, or where they are.',
        forms: {
          positive: { 
            structure: 'S + am/is/are + ...', 
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
            structure: 'S + am/is/are + NOT', 
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
            structure: 'Am/Is/Are + S + ...?', 
            examples: [
              'Am I late?', 
              'Is she your sister?', 
              'Are they hungry?',
              'Is it far from here?',
              'Are we friends?',
              'Is he a doctor?'
            ] 
          }
        }
      },
      {
        id: 'a1_pronouns',
        title: 'Personal Pronouns',
        icon: <User size={20} />,
        summary: 'I, You, He...',
        definition: 'Words used to replace people or things in a sentence.',
        usage: 'Use Subject pronouns before verbs and Object pronouns after verbs.',
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
        }
      },
      {
        id: 'a1_articles',
        title: 'Articles',
        icon: <Type size={20} />,
        summary: 'A, An, The',
        definition: 'Words that define a noun as specific (the) or unspecific (a/an).',
        usage: 'Use "A/An" for singular countable nouns (first time). Use "The" for specific/unique items.',
        forms: {
          positive: { 
            structure: 'A/An + Noun / The + Noun', 
            examples: [
              'I have a cat.', 
              'The sun is hot.', 
              'She is an architect.',
              'He wants an apple.',
              'The book on the table is mine.',
              'We need a new car.'
            ] 
          },
          negative: { 
            structure: 'Not a/an / Not the', 
            examples: [
              'It is not a dog.', 
              'He is not the boss.',
              'That is not an orange.',
              'I am not the teacher.',
              'This is not a game.',
              'She is not the winner.'
            ] 
          },
          question: { 
            structure: 'Is it a/an/the...?', 
            examples: [
              'Is that a bird?', 
              'Where is the bathroom?',
              'Do you have a pen?',
              'Is he an engineer?',
              'Is the store open?',
              'Can I have an egg?'
            ] 
          }
        }
      },
      {
        id: 'a1_present_simple',
        title: 'Present Simple',
        icon: <Clock size={20} />,
        summary: 'Habits & Facts',
        definition: 'Describes habits, routines, and general truths.',
        usage: 'Use for things that happen regularly or are always true.',
        forms: {
          positive: { 
            structure: 'S + Verb (s/es for He/She/It)', 
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
            structure: 'S + don\'t/doesn\'t + Base Verb', 
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
            structure: 'Do/Does + S + Base Verb?', 
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
        proTip: 'Don\'t forget the "S" for He, She, It in affirmative sentences!'
      },
      {
        id: 'a1_present_cont',
        title: 'Present Continuous',
        icon: <Clock size={20} />,
        summary: 'Now / Happening',
        definition: 'Describes actions happening right now or temporary situations.',
        usage: 'Use for actions in progress at the moment of speaking.',
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
        }
      },
      {
        id: 'a1_can',
        title: 'Modal: Can',
        icon: <Zap size={20} />,
        summary: 'Ability',
        definition: 'Expresses ability, possibility, or permission.',
        usage: 'Use to say what someone knows how to do.',
        forms: {
          positive: { 
            structure: 'S + can + Base Verb', 
            examples: [
              'I can swim.', 
              'She can sing beautifully.',
              'They can speak three languages.',
              'He can drive a truck.',
              'We can help you.',
              'You can use my phone.'
            ] 
          },
          negative: { 
            structure: 'S + cannot/can\'t + Base Verb', 
            examples: [
              'I can\'t fly.', 
              'He can\'t cook at all.',
              'They can\'t hear us.',
              'She can\'t come tomorrow.',
              'We can\'t afford it.',
              'You can\'t park here.'
            ] 
          },
          question: { 
            structure: 'Can + S + Base Verb?', 
            examples: [
              'Can you help me?', 
              'Can they drive?',
              'Can I open the window?',
              'Can she play the piano?',
              'Can we go now?',
              'Can you repeat that?'
            ] 
          }
        }
      },
      {
        id: 'a1_thereis',
        title: 'There Is / Are',
        icon: <LayoutGrid size={20} />,
        summary: 'Existence',
        definition: 'Used to say that something exists in a place.',
        usage: 'Use "There is" for singular, "There are" for plural.',
        forms: {
          positive: { 
            structure: 'There is + Sing. / There are + Plural', 
            examples: [
              'There is a book on the table.', 
              'There are two cars outside.',
              'There is a spider in the bath.',
              'There are many people here.',
              'There is some milk in the fridge.',
              'There are five students in the class.'
            ] 
          },
          negative: { 
            structure: 'There isn\'t / There aren\'t', 
            examples: [
              'There isn\'t any milk.', 
              'There aren\'t any people.',
              'There isn\'t a bank near here.',
              'There aren\'t enough chairs.',
              'There isn\'t time for this.',
              'There aren\'t any cookies left.'
            ] 
          },
          question: { 
            structure: 'Is there...? / Are there...?', 
            examples: [
              'Is there a bank near here?', 
              'Are there any questions?',
              'Is there a doctor in the building?',
              'Are there any windows in this room?',
              'Is there wi-fi here?',
              'Are there many tourists in the city?'
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
    description: 'The Past, The Future, and Comparisons.',
    topics: [
      {
        id: 'a2_past_simple',
        title: 'Past Simple',
        icon: <Clock size={20} />,
        summary: 'Finished Past',
        definition: 'Actions that started and finished at a specific time in the past.',
        usage: 'Use with time words like "yesterday", "last year", "in 2010".',
        forms: {
          positive: { 
            structure: 'S + V-ed (or irregular)', 
            examples: [
              'I walked home yesterday.', 
              'She bought a new car.', 
              'We went to Paris last summer.',
              'He studied for the exam.',
              'They arrived late.',
              'I saw him two days ago.'
            ] 
          },
          negative: { 
            structure: 'S + did not (didn\'t) + Base Verb', 
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
            structure: 'Did + S + Base Verb?', 
            examples: [
              'Did you finish your homework?', 
              'Did they arrive on time?',
              'Did she tell you?',
              'Where did you go?',
              'When did he leave?',
              'Did you buy the bread?'
            ] 
          }
        }
      },
      {
        id: 'a2_present_perfect_1',
        title: 'Present Perfect (Intro)',
        icon: <Layers size={20} />,
        summary: 'Life Experience',
        definition: 'Past actions with undefined time or relevance to the present.',
        usage: 'Use to talk about life experiences ("Have you ever...?").',
        forms: {
          positive: { 
            structure: 'S + have/has + Participle', 
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
            structure: 'S + haven\'t/hasn\'t + Participle', 
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
            structure: 'Have/Has + S + Participle?', 
            examples: [
              'Have you ever visited Rome?', 
              'Has she finished?',
              'Have they called you?',
              'Have you ever eaten crocodile meat?',
              'Has he ever been late?',
              'Have we met before?'
            ] 
          }
        }
      },
      {
        id: 'a2_future',
        title: 'Future: Will vs Going To',
        icon: <ArrowRight size={20} />,
        summary: 'Plans & Predictions',
        definition: 'Two main ways to talk about the future.',
        usage: 'Use "Going to" for plans. Use "Will" for instant decisions.',
        forms: {
          positive: { 
            structure: 'S + will + V / S + be going to + V', 
            examples: [
              'I will help you carry that.', 
              'I am going to visit mom on Sunday.',
              'It will rain tomorrow.',
              'She is going to buy a house.',
              'We will see what happens.',
              'They are going to travel next month.'
            ] 
          },
          negative: { 
            structure: 'won\'t + V / isn\'t going to + V', 
            examples: [
              'I won\'t go there.', 
              'She isn\'t going to stay.',
              'We won\'t forget you.',
              'He isn\'t going to help.',
              'It won\'t hurt.',
              'They aren\'t going to come.'
            ] 
          },
          question: { 
            structure: 'Will + S...? / Are + S + going to...?', 
            examples: [
              'Will you marry me?', 
              'Are you going to travel?',
              'Will it be cold?',
              'Is she going to quit her job?',
              'When will you arrive?',
              'What are you going to do?'
            ] 
          }
        }
      },
      {
        id: 'a2_modals_oblig',
        title: 'Must / Have to',
        icon: <AlertCircle size={20} />,
        summary: 'Obligation',
        definition: 'Modals used to express necessity or laws.',
        usage: 'Must is often internal/urgent. Have to is external rules.',
        forms: {
          positive: { 
            structure: 'S + must/have to + V', 
            examples: [
              'You must stop at the red light.', 
              'I have to work tomorrow.',
              'She has to wear a uniform.',
              'We must call him immediately.',
              'You must try this cake.',
              'Doctors have to work long hours.'
            ] 
          },
          negative: { 
            structure: 'mustn\'t (prohibition) / don\'t have to (choice)', 
            examples: [
              'You mustn\'t smoke here (Prohibited).', 
              'You don\'t have to pay (It\'s free).',
              'She doesn\'t have to come if she is tired.',
              'We mustn\'t be late.',
              'He doesn\'t have to wear a tie.',
              'You mustn\'t touch that.'
            ] 
          },
          question: { 
            structure: 'Do + S + have to + V?', 
            examples: [
              'Do I have to go?', 
              'Does she have to wear a uniform?',
              'Do we have to pay now?',
              'Does he have to finish it today?',
              'Do you have to leave so soon?',
              'When do I have to be there?'
            ] 
          }
        }
      },
      {
        id: 'a2_comparatives',
        title: 'Comparisons',
        icon: <Layers size={20} />,
        summary: 'Bigger, The Biggest',
        definition: 'Comparing two things (comparative) or one thing to a group (superlative).',
        usage: 'Short words: -er/-est. Long words: more/most.',
        forms: {
          positive: { 
            structure: 'A is [adj]-er than B / A is the [adj]-est', 
            examples: [
              'Tom is taller than Joe.', 
              'Everest is the highest mountain.',
              'This car is more expensive than that one.',
              'She is the smartest student in class.',
              'My house is bigger than yours.',
              'This is the most interesting book I have read.'
            ] 
          },
          negative: { 
            structure: 'A is not as [adj] as B', 
            examples: [
              'London is not as big as Tokyo.', 
              'He is not as fast as me.',
              'The movie was not as good as the book.',
              'This test isn\'t as hard as the last one.',
              'I am not as rich as Elon Musk.',
              'Winter is not as pleasant as spring.'
            ] 
          },
          question: { 
            structure: 'Which is [adj]-er?', 
            examples: [
              'Which is faster, a car or a bike?', 
              'Who is the oldest person in your family?',
              'Which city is more beautiful?',
              'Is he taller than his brother?',
              'What is the most expensive thing you own?',
              'Which route is shorter?'
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
        definition: 'Connecting past to present with focus on duration or recent results.',
        usage: 'Use "For" (duration), "Since" (start point), "Just" (recent), "Yet" (negative).',
        forms: {
          positive: { 
            structure: 'S + have/has + Participle', 
            examples: [
              'I have lived here for 10 years.', 
              'She has just left the building.',
              'We have known each other since 2005.',
              'He has already finished his homework.',
              'They have worked here for a long time.',
              'I have lost my wallet (so I don\'t have it now).'
            ] 
          },
          negative: { 
            structure: 'S + haven\'t/hasn\'t + Participle', 
            examples: [
              'I haven\'t finished yet.', 
              'She hasn\'t called me since Monday.',
              'We haven\'t seen him recently.',
              'They haven\'t decided yet.',
              'He hasn\'t eaten anything all day.',
              'I haven\'t been there for years.'
            ] 
          },
          question: { 
            structure: 'Have + S + Participle?', 
            examples: [
              'Have you cleaned your room yet?', 
              'Has she arrived already?',
              'How long have you lived here?',
              'Have you seen my keys?',
              'Has he ever lied to you?',
              'Have they replied to your email?'
            ] 
          }
        }
      },
      {
        id: 'b1_past_cont',
        title: 'Past Continuous',
        icon: <Clock size={20} />,
        summary: 'Was/Were + Ing',
        definition: 'Actions in progress at a specific moment in the past.',
        usage: 'Often interrupted by Past Simple (When X happened, I was doing Y).',
        forms: {
          positive: { 
            structure: 'S + was/were + V-ing', 
            examples: [
              'I was sleeping when you called.', 
              'It was raining all day yesterday.',
              'They were playing tennis at 10 AM.',
              'She was cooking dinner when he arrived.',
              'We were walking home when we saw him.',
              'He was working on his laptop.'
            ] 
          },
          negative: { 
            structure: 'S + wasn\'t/weren\'t + V-ing', 
            examples: [
              'I wasn\'t listening to you.', 
              'She wasn\'t wearing a coat.',
              'They weren\'t paying attention.',
              'He wasn\'t driving fast.',
              'We weren\'t expecting guests.',
              'It wasn\'t snowing.'
            ] 
          },
          question: { 
            structure: 'Was/Were + S + V-ing?', 
            examples: [
              'Were you working at 9 PM?', 
              'Was she sleeping when you got home?',
              'What were you doing yesterday?',
              'Were they fighting?',
              'Who were you talking to?',
              'Was the sun shining?'
            ] 
          }
        }
      },
      {
        id: 'b1_zero_cond',
        title: 'Zero Conditional',
        icon: <Link size={20} />,
        summary: 'Facts & Truths',
        definition: 'Used for scientific facts, general truths, and rules.',
        usage: 'When the result is always true. (If = When).',
        forms: {
          positive: { 
            structure: 'If + Present Simple, ... Present Simple', 
            examples: [
              'If you heat ice, it melts.', 
              'If I drink coffee at night, I can\'t sleep.',
              'When the sun sets, it gets dark.',
              'If you mix red and yellow, you get orange.',
              'People die if they don\'t eat.',
              'If you press this button, the machine starts.'
            ] 
          },
          negative: { 
            structure: 'If ... don\'t ..., ... don\'t ...', 
            examples: [
              'If plants don\'t get water, they die.', 
              'If you don\'t eat, you get hungry.',
              'If he doesn\'t sleep, he gets cranky.',
              'If it doesn\'t rain, the grass turns brown.',
              'If I don\'t wear glasses, I can\'t see.',
              'The car doesn\'t start if you don\'t turn the key.'
            ] 
          },
          question: { 
            structure: 'What happens if...?', 
            examples: [
              'What happens if you mix red and blue?', 
              'Does ice melt if you heat it?',
              'What do you do if you have a headache?',
              'Does the alarm ring if there is smoke?',
              'What happens if you don\'t pay taxes?',
              'Do you get tired if you run?'
            ] 
          }
        }
      },
      {
        id: 'b1_first_cond',
        title: 'First Conditional',
        icon: <Link size={20} />,
        summary: 'Real Possibility',
        definition: 'Used for real or possible situations in the future.',
        usage: 'A specific condition that is likely to happen.',
        forms: {
          positive: { 
            structure: 'If + Present Simple, ... Will + Base Verb', 
            examples: [
              'If it rains, I will stay home.', 
              'If I see him, I will tell him.',
              'She will pass the exam if she studies.',
              'If we hurry, we will catch the train.',
              'I will buy a new car if I get the job.',
              'If you ask her, she will help you.'
            ] 
          },
          negative: { 
            structure: 'If ... don\'t ..., ... won\'t ...', 
            examples: [
              'If you don\'t hurry, you will miss the train.', 
              'I won\'t go if you don\'t go.',
              'If she doesn\'t call, I will be worried.',
              'They won\'t succeed if they don\'t try.',
              'If it doesn\'t rain, we won\'t cancel the picnic.',
              'You won\'t lose weight if you don\'t exercise.'
            ] 
          },
          question: { 
            structure: 'What will you do if...?', 
            examples: [
              'What will you do if you lose your job?', 
              'Will she come if I invite her?',
              'Where will you go if the hotel is full?',
              'Will you help me if I need it?',
              'What will happen if we are late?',
              'Who will you call if there is an emergency?'
            ] 
          }
        }
      },
      {
        id: 'b1_passive',
        title: 'Passive Voice',
        icon: <LayoutGrid size={20} />,
        summary: 'Object Focus',
        definition: 'Focuses on the action or object, not the doer.',
        usage: 'Use when the agent is unknown or obvious.',
        forms: {
          positive: { 
            structure: 'Object + Be + Participle', 
            examples: [
              'The car was stolen last night.', 
              'English is spoken here.',
              'The letter was written by John.',
              'A new bridge is being built.',
              'My bike has been repaired.',
              'Dinner is served at 8 PM.'
            ] 
          },
          negative: { 
            structure: 'Object + Be + Not + Participle', 
            examples: [
              'The room wasn\'t cleaned yesterday.', 
              'The decision hasn\'t been made yet.',
              'He wasn\'t invited to the party.',
              'The files were not saved.',
              'This product isn\'t sold in stores.',
              'Mistakes were not made.'
            ] 
          },
          question: { 
            structure: 'Be + Object + Participle?', 
            examples: [
              'Is lunch served at noon?', 
              'Was the window broken by the wind?',
              'Have the tickets been booked?',
              'When was this house built?',
              'Is credit card accepted here?',
              'Where were the keys found?'
            ] 
          }
        }
      },
      {
        id: 'b1_reported',
        title: 'Reported Speech',
        icon: <MessageCircle size={20} />,
        summary: 'He said that...',
        definition: 'Reporting what someone else said.',
        usage: 'Usually shift tenses back (Present -> Past).',
        forms: {
          positive: { 
            structure: 'He said (that) he was...', 
            examples: [
              'Direct: "I am happy." -> Reported: He said he was happy.', 
              'Direct: "I will go." -> Reported: She said she would go.',
              'Direct: "I have finished." -> Reported: He said he had finished.',
              'Direct: "I can swim." -> Reported: She said she could swim.',
              'Direct: "I must leave." -> Reported: He said he had to leave.',
              'Direct: "We are playing." -> Reported: They said they were playing.'
            ] 
          },
          negative: { 
            structure: 'She told me she didn\'t...', 
            examples: [
              'Direct: "I don\'t know." -> Reported: She said she didn\'t know.', 
              'Direct: "I won\'t do it." -> Reported: He said he wouldn\'t do it.',
              'Direct: "I haven\'t seen it." -> Reported: She said she hadn\'t seen it.',
              'Direct: "I can\'t come." -> Reported: He said he couldn\'t come.',
              'Direct: "It isn\'t true." -> Reported: They said it wasn\'t true.',
              'Direct: "I don\'t like tea." -> Reported: She told me she didn\'t like tea.'
            ] 
          },
          question: { 
            structure: 'He asked if...', 
            examples: [
              'Direct: "Are you ok?" -> Reported: He asked if I was ok.', 
              'Direct: "Where do you live?" -> Reported: She asked where I lived.',
              'Direct: "Can you help?" -> Reported: He asked if I could help.',
              'Direct: "Did you finish?" -> Reported: She asked if I had finished.',
              'Direct: "What time is it?" -> Reported: He asked what time it was.',
              'Direct: "Will you marry me?" -> Reported: He asked if I would marry him.'
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
    description: 'Hypothetical situations, Deduction, and Advanced Tenses.',
    topics: [
      {
        id: 'b2_second_cond',
        title: 'Second Conditional',
        icon: <Link size={20} />,
        summary: 'Unreal Present',
        definition: 'Used for imaginary, hypothetical, or impossible situations in the present.',
        usage: 'Dreaming ("If I won the lottery") or Advice ("If I were you").',
        forms: {
          positive: { 
            structure: 'If + Past Simple, ... Would + Base Verb', 
            examples: [
              'If I had a car, I would drive to work.', 
              'If I were rich, I would travel the world.',
              'If she knew the answer, she would tell us.',
              'I would buy a big house if I won the lottery.',
              'If I were you, I would apologize.',
              'If we lived in Spain, we would learn Spanish.'
            ] 
          },
          negative: { 
            structure: 'If ... didn\'t ..., ... wouldn\'t ...', 
            examples: [
              'If I didn\'t have to work, I wouldn\'t be here.', 
              'If she didn\'t like him, she wouldn\'t date him.',
              'I wouldn\'t do that if I were you.',
              'If it wasn\'t raining, we wouldn\'t stay inside.',
              'They wouldn\'t be lost if they had a map.',
              'If I didn\'t know you, I wouldn\'t trust you.'
            ] 
          },
          question: { 
            structure: 'What would you do if...?', 
            examples: [
              'What would you do if you saw a ghost?', 
              'Where would you live if you could choose anywhere?',
              'Would you help him if he asked?',
              'If you found a wallet, would you keep it?',
              'Who would you invite if you had a party?',
              'Would she be happy if she got the job?'
            ] 
          }
        },
        proTip: 'In formal English, use "If I were" instead of "If I was" (e.g., If I were you...).'
      },
      {
        id: 'b2_third_cond',
        title: 'Third Conditional',
        icon: <Link size={20} />,
        summary: 'Unreal Past',
        definition: 'Used for imaginary situations in the past (things that did NOT happen).',
        usage: 'Expressing regrets or how things could have been different.',
        forms: {
          positive: { 
            structure: 'If + Past Perfect, ... Would Have + Participle', 
            examples: [
              'If I had studied, I would have passed the exam.', 
              'If she had known, she would have come earlier.',
              'We would have gone to the beach if it hadn\'t rained.',
              'If you had told me, I would have helped you.',
              'I would have bought it if I had had enough money.',
              'They would have won if they had played better.'
            ] 
          },
          negative: { 
            structure: 'If ... hadn\'t ..., ... wouldn\'t have ...', 
            examples: [
              'If I hadn\'t eaten so much, I wouldn\'t have felt sick.', 
              'She wouldn\'t have been late if she hadn\'t missed the bus.',
              'If we hadn\'t left early, we would have missed the flight.',
              'He wouldn\'t have crashed if he hadn\'t been speeding.',
              'If I hadn\'t seen it, I wouldn\'t have believed it.',
              'You wouldn\'t have gotten wet if you had taken an umbrella.'
            ] 
          },
          question: { 
            structure: 'Would you have ... if ...?', 
            examples: [
              'Would you have helped me if I had asked?', 
              'What would you have done if you had been there?',
              'If you had known the truth, would you have told me?',
              'Where would you have gone if the flight was cancelled?',
              'Would she have accepted if he had proposed?',
              'How would you have reacted?'
            ] 
          }
        }
      },
      {
        id: 'b2_mixed_cond',
        title: 'Mixed Conditionals',
        icon: <Shuffle size={20} />,
        summary: 'Past Cause, Present Result',
        definition: 'Mixing 2nd and 3rd conditionals to connect past actions to present results.',
        usage: 'If I had studied (past), I would have a job now (present).',
        forms: {
          positive: { 
            structure: 'If + Past Perfect, ... Would + Base', 
            examples: [
              'If I had accepted the job, I would be rich now.', 
              'If she had been born in the US, she would speak English perfectly.',
              'If we had looked at the map, we would be there by now.',
              'I would be happier if I had stayed home.',
              'If he had taken his medicine, he would feel better.',
              'If you had listened to me, you wouldn\'t be in this mess.'
            ] 
          },
          negative: { 
            structure: 'If ... hadn\'t ..., ... wouldn\'t ...', 
            examples: [
              'If I hadn\'t spent the money, I wouldn\'t be broke now.', 
              'If she hadn\'t missed the train, she wouldn\'t be late.',
              'We wouldn\'t be lost if we hadn\'t forgotten the GPS.',
              'If I hadn\'t eaten that, I wouldn\'t feel sick.',
              'He wouldn\'t be in jail if he hadn\'t stolen the car.',
              'If you hadn\'t been rude, they wouldn\'t be angry.'
            ] 
          },
          question: { 
            structure: 'Would you be ... if you had ...?', 
            examples: [
              'Would you be happier if you had moved?', 
              'If you had studied harder, would you be in this class?',
              'Would he be alive if the ambulance had arrived sooner?',
              'Where would we be if we hadn\'t turned left?',
              'Would you be tired if you had slept more?',
              'If I had asked you, would you be helping me?'
            ] 
          }
        }
      },
      {
        id: 'b2_modals_deduction',
        title: 'Modals of Deduction',
        icon: <HelpCircle size={20} />,
        summary: 'Must, Might, Can\'t',
        definition: 'Guessing how true something is based on evidence.',
        usage: 'Must (90% sure yes), Can\'t (90% sure no), Might/Could (Maybe).',
        forms: {
          positive: { 
            structure: 'S + modal + V', 
            examples: [
              'He must be tired (he worked all day).', 
              'It might rain later, look at the clouds.',
              'She could be at home.',
              'They must know the truth.',
              'That might be the correct answer.',
              'He may come if he finishes work.'
            ] 
          },
          negative: { 
            structure: 'S + can\'t be / might not be', 
            examples: [
              'She can\'t be at home (I saw her outside).', 
              'He can\'t be hungry, he just ate.',
              'It might not be true.',
              'They may not arrive on time.',
              'That can\'t be right.',
              'You can\'t be serious!'
            ] 
          },
          question: { 
            structure: 'Do you think...? / Could it be...?', 
            examples: [
              'Could it be true?', 
              'Do you think he might be lost?',
              'Can it be that difficult?',
              'Might she be waiting for us?',
              'Could they be sleeping?',
              'Where could he be?'
            ] 
          }
        }
      },
      {
        id: 'b2_gerund_inf',
        title: 'Gerund vs Infinitive',
        icon: <List size={20} />,
        summary: 'Doing vs To Do',
        definition: 'Rules for using V-ing or To+V after certain verbs.',
        usage: 'Enjoy + doing, Decide + to do. Stop doing (quit) vs Stop to do (pause).',
        forms: {
          positive: { 
            structure: 'Verb + -ing / Verb + to...', 
            examples: [
              'I enjoy swimming.', 
              'I promised to help.', 
              'He stopped smoking (quit).',
              'He stopped to smoke (paused to do it).',
              'She suggested going to the cinema.',
              'We decided to leave early.'
            ] 
          },
          negative: { 
            structure: 'not doing / not to do', 
            examples: [
              'I regret not telling the truth.', 
              'I decided not to go.',
              'She pretended not to see me.',
              'Try not to laugh.',
              'I avoid eating sugar.',
              'He promised not to tell anyone.'
            ] 
          },
          question: { 
            structure: 'Do you enjoy reading?', 
            examples: [
              'Do you want to come?', 
              'Do you mind waiting?',
              'Have you finished eating?',
              'Did you manage to find it?',
              'Would you like to drink something?',
              'Do you fancy going out?'
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
    description: 'Stylistic devices, Inversion, and Advanced Structures.',
    topics: [
      {
        id: 'c1_inversion',
        title: 'Negative Inversion',
        icon: <Zap size={20} />,
        summary: 'Never have I...',
        definition: 'Inverting Subject and Auxiliary after negative adverbs for emphasis.',
        usage: 'Formal writing/speeches: Never, Seldom, Rarely, Not only.',
        forms: {
          positive: { 
            structure: 'Adv + Aux + S + V', 
            examples: [
              'Never have I seen such beauty.', 
              'Rarely do we go out these days.', 
              'Not only is she smart, but also funny.',
              'Under no circumstances should you touch this.',
              'Little did he know that she was watching.',
              'Scarcely had I arrived when the phone rang.'
            ] 
          },
          negative: { 
            structure: 'No sooner had I... than...', 
            examples: [
              'No sooner had I arrived than he left.', 
              'Not until I saw him did I believe it.',
              'Only later did we realize our mistake.',
              'At no time was the President aware of the plot.',
              'Nowhere will you find a better price.',
              'On no account must this door be opened.'
            ] 
          },
          question: { 
            structure: 'N/A (Statement structure)', 
            examples: [
              '(These are typically used for dramatic statements rather than questions, though they look like questions structurally.)'
            ] 
          }
        }
      },
      {
        id: 'c1_past_modals',
        title: 'Past Modals',
        icon: <Clock size={20} />,
        summary: 'Should have done',
        definition: 'Regrets, critiques, or deductions about the past.',
        usage: 'Should have (regret), Must have (deduction), Could have (possibility).',
        forms: {
          positive: { 
            structure: 'S + modal + have + Participle', 
            examples: [
              'I should have studied more.', 
              'He must have forgotten.',
              'They might have missed the bus.',
              'She could have been hurt.',
              'We would have called you, but we had no signal.',
              'You ought to have told me.'
            ] 
          },
          negative: { 
            structure: 'S + modal + not + have + Participle', 
            examples: [
              'You shouldn\'t have said that.', 
              'He can\'t have done it (it\'s impossible).',
              'They might not have received the letter.',
              'I wouldn\'t have bought it if I knew.',
              'She needn\'t have brought food (we had enough).',
              'It couldn\'t have been John.'
            ] 
          },
          question: { 
            structure: 'Should I have...?', 
            examples: [
              'Should I have called him?', 
              'Where could he have gone?',
              'What would you have done?',
              'Must they have left already?',
              'Need we have waited?',
              'Who could have stolen it?'
            ] 
          }
        }
      },
      {
        id: 'c1_passive_reporting',
        title: 'Passive Reporting',
        icon: <Mic size={20} />,
        summary: 'It is said that...',
        definition: 'Formal way to report general opinions or rumors.',
        usage: 'News and academic writing.',
        forms: {
          positive: { 
            structure: 'S + is said/believed + to + V', 
            examples: [
              'He is said to be a genius.', 
              'It is believed that prices will rise.',
              'The suspect is alleged to have fled the country.',
              'The company is reported to be bankrupt.',
              'She is known to be very strict.',
              'It is expected that the strike will end soon.'
            ] 
          },
          negative: { 
            structure: 'S + is thought not to + V', 
            examples: [
              'The company is thought not to be profitable.', 
              'He is understood not to be interested.',
              'It is generally agreed that this is not the solution.',
              'The treatment is shown not to produce side effects.',
              'They are not expected to survive.',
              'It was decided not to proceed.'
            ] 
          },
          question: { 
            structure: 'Is it said that...?', 
            examples: [
              'Is it true that he resigned?', 
              'Is he expected to win?',
              'Are they believed to be dangerous?',
              'Was it reported that the storm was coming?',
              'Is it known where the treasure is?',
              'Who is supposed to be in charge?'
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
    description: 'Mastery: Subjunctives, Cleft Sentences, and Nuance.',
    topics: [
      {
        id: 'c2_subjunctive',
        title: 'The Subjunctive',
        icon: <GraduationCap size={20} />,
        summary: 'I insist he be...',
        definition: 'Mood for demands, wishes, and hypothetical situations.',
        usage: 'After suggest, insist, recommend, demand. (Base verb always).',
        forms: {
          positive: { 
            structure: 'S + insist + (that) S + Base V', 
            examples: [
              'I suggest he go.', 
              'She insisted we be on time.',
              'It is vital that she submit the report.',
              'I demand that he apologize.',
              'The judge ordered that the prisoner be released.',
              'God save the Queen.'
            ] 
          },
          negative: { 
            structure: 'S + ask + (that) S + not + Base V', 
            examples: [
              'I asked that she not call me.', 
              'It is crucial that you not tell anyone.',
              'He requested that the information not be shared.',
              'It is recommended that he not travel alone.',
              'I prefer that she not know.',
              'It is imperative that we not delay.'
            ] 
          },
          question: { 
            structure: 'Is it essential that he attend?', 
            examples: [
              'Is it vital that we be there?', 
              'Was it necessary that he resign?',
              'Is it important that she sign the document?',
              'Do you insist that I go?',
              'Why is it crucial that he be present?',
              'Is it required that every student participate?'
            ] 
          }
        }
      },
      {
        id: 'c2_cleft',
        title: 'Cleft Sentences',
        icon: <Zap size={20} />,
        summary: 'It was John who...',
        definition: 'Splitting a sentence to focus on specific information.',
        usage: 'To emphasize WHO did something or WHAT happened.',
        forms: {
          positive: { 
            structure: 'It is/was [Focus] that...', 
            examples: [
              'It was John who paid the bill.', 
              'What I need is a break.',
              'All I want for Christmas is you.',
              'It was in London that we met.',
              'The reason why I came is to apologize.',
              'It is the journey that matters, not the destination.'
            ] 
          },
          negative: { 
            structure: 'It wasn\'t [Focus] that...', 
            examples: [
              'It wasn\'t me who lied.', 
              'It wasn\'t until yesterday that I realized.',
              'What I don\'t understand is why he left.',
              'It isn\'t money that makes you happy.',
              'It wasn\'t for lack of trying that we failed.',
              'All she didn\'t want was trouble.'
            ] 
          },
          question: { 
            structure: 'Was it [Focus] that...?', 
            examples: [
              'Was it you who left the door open?', 
              'Is it today that we are leaving?',
              'Was it the wind that broke the window?',
              'Is this what you wanted?',
              'Was it because of me that you stayed?',
              'Is it true that you are quitting?'
            ] 
          }
        }
      },
      {
        id: 'c2_ellipsis',
        title: 'Ellipsis & Substitution',
        icon: <Type size={20} />,
        summary: 'Omission of words',
        definition: 'Leaving out words to avoid repetition or be more concise.',
        usage: 'Native-level fluency often involves omitting obvious words.',
        forms: {
          positive: { 
            structure: 'Varies', 
            examples: [
              'Want a coffee? (Do you want...)', 
              'She can play piano, and so can I. (play piano)',
              'I\'ll help if I can. (help)',
              'Got any money? (Have you got...)',
              'See you later. (I will see you...)',
              'He went to Paris and she to London. (went)'
            ] 
          },
          negative: { 
            structure: 'Varies', 
            examples: [
              'Ready? No, not yet. (I am not ready yet)', 
              'I tried to lift it but couldn\'t. (lift it)',
              'Don\'t know. (I don\'t know)',
              'Unlike the others, she didn\'t quit.',
              'If not, we will leave. (If we cannot...)',
              'Nothing to declare.'
            ] 
          },
          question: { 
            structure: 'Varies', 
            examples: [
              'Sounds good? (Does that sound good?)', 
              'Coming? (Are you coming?)',
              'Any ideas?',
              'Finished yet?',
              'Mind if I sit here? (Do you mind...)',
              'Everything okay?'
            ] 
          }
        }
      }
    ]
  }
];

const GrammarBook: React.FC = () => {
  const [selectedLevelId, setSelectedLevelId] = useState('A1');
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);

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
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-none">{selectedTopic.title}</h2>
                  </div>
               </div>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
               
               {/* Definition & Usage */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="flex items-center text-sm font-bold text-blue-600 uppercase tracking-wide mb-3">
                         <Book className="w-4 h-4 mr-2" /> Definition
                      </h3>
                      <p className="text-gray-800 text-lg leading-relaxed font-medium">
                         {selectedTopic.definition}
                      </p>
                   </section>
                   <section className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                      <h3 className="flex items-center text-sm font-bold text-amber-600 uppercase tracking-wide mb-3">
                         <Zap className="w-4 h-4 mr-2" /> Usage Context
                      </h3>
                      <p className="text-gray-800 text-lg leading-relaxed font-medium">
                         {selectedTopic.usage}
                      </p>
                   </section>
               </div>

               {/* FORMS BREAKDOWN */}
               <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-2 flex items-center">
                    <List className="mr-2" /> Forms & Examples
                  </h3>

                  {/* Affirmative */}
                  <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden">
                      <div className="bg-green-50 px-6 py-3 border-b border-green-100 flex items-center">
                          <PlusCircle className="text-green-600 mr-2" size={20} />
                          <span className="font-bold text-green-800">Affirmative</span>
                      </div>
                      <div className="p-6">
                          <div className="mb-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-sm shadow-sm">
                              {selectedTopic.forms.positive.structure}
                          </div>
                          <ul className="space-y-2">
                              {selectedTopic.forms.positive.examples.map((ex, i) => (
                                  <li key={i} className="flex items-center text-gray-700">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                      {ex}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  {/* Negative */}
                  <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
                      <div className="bg-red-50 px-6 py-3 border-b border-red-100 flex items-center">
                          <MinusCircle className="text-red-600 mr-2" size={20} />
                          <span className="font-bold text-red-800">Negative</span>
                      </div>
                      <div className="p-6">
                          <div className="mb-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-sm shadow-sm">
                              {selectedTopic.forms.negative.structure}
                          </div>
                          <ul className="space-y-2">
                              {selectedTopic.forms.negative.examples.map((ex, i) => (
                                  <li key={i} className="flex items-center text-gray-700">
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-4 ml-1.5 flex-shrink-0"></div>
                                      {ex}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  {/* Interrogative */}
                  <div className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden">
                      <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex items-center">
                          <HelpCircle className="text-indigo-600 mr-2" size={20} />
                          <span className="font-bold text-indigo-800">Interrogative</span>
                      </div>
                      <div className="p-6">
                          <div className="mb-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-sm shadow-sm">
                              {selectedTopic.forms.question.structure}
                          </div>
                          <ul className="space-y-2">
                              {selectedTopic.forms.question.examples.map((ex, i) => (
                                  <li key={i} className="flex items-center text-gray-700">
                                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-4 ml-1.5 flex-shrink-0"></div>
                                      {ex}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
               </div>

               {/* Pro Tip Section */}
               {selectedTopic.proTip && (
                   <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 flex items-start text-white shadow-lg mt-8">
                       <GraduationCap className="text-yellow-400 w-8 h-8 mr-4 flex-shrink-0 mt-1" />
                       <div>
                          <h4 className="font-bold text-yellow-400 text-lg mb-2">Teacher's Pro Tip</h4>
                          <p className="text-gray-200 leading-relaxed">{selectedTopic.proTip}</p>
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