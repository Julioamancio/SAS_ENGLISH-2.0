import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuizQuestion, GrammarAnalysis, StudyPlan, QuizMode, QuizData } from "../types";

// --- SAFE API KEY RETRIEVAL ---
const getApiKey = () => {
    try {
        // 1. Vite Standard (Render uses this during build if set in Environment Variables)
        // @ts-ignore
        if (import.meta && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
            // @ts-ignore
            return import.meta.env.VITE_GEMINI_API_KEY;
        }
        
        // 2. Process Fallback (Local Dev / Polyfill)
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            return process.env.API_KEY;
        }
    } catch (e) {
        // Ignore access errors
    }
    return '';
};

const API_KEY = getApiKey();

if (!API_KEY) {
    console.warn("⚠️ Gemini API Key missing. AI features will not work. Add VITE_GEMINI_API_KEY to Render Environment Variables.");
}

// Initialize with fallback to prevent immediate crash on app load.
// The 'dummy_key' allows the app to render; calls will fail gracefully with a clear error later.
const ai = new GoogleGenAI({ apiKey: API_KEY || 'dummy_key_to_prevent_crash' });

const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

// Helper to enforce CEFR complexity
const getCefrGuidelines = (level: Difficulty): string => {
  switch (level) {
    case Difficulty.A1:
      return "STRICT LEVEL A1 (Beginner): Use ONLY very basic vocabulary (top 500 common words). Sentences must be short and simple (Subject-Verb-Object). Avoid idioms, phrasal verbs, or complex tenses. Focus on concrete, daily topics.";
    case Difficulty.A2:
      return "STRICT LEVEL A2 (Elementary): Use basic daily vocabulary. Sentences can use 'and', 'but', 'because'. Grammar limited to Simple Past, Future with 'going to', and basic modals. No complex academic words.";
    case Difficulty.B1:
      return "STRICT LEVEL B1 (Intermediate): Use standard English found in work/school. Can use Present Perfect, First Conditional. Text should be straightforward but connected. Avoid overly obscure words.";
    case Difficulty.B2:
      return "STRICT LEVEL B2 (Upper Intermediate): Use a wide range of vocabulary including abstract concepts. Complex sentences (relative clauses, conditionals) are expected. Use common phrasal verbs and idioms naturally.";
    case Difficulty.C1:
      return "STRICT LEVEL C1 (Advanced): Use sophisticated, academic, or professional vocabulary. Text should be well-structured with complex cohesion. Use inversion, passive voice, and subtle nuances.";
    case Difficulty.C2:
      return "STRICT LEVEL C2 (Proficiency): Use native-level sophistication. Include rare vocabulary, complex idioms, cultural references, and literary structures. The text should be indistinguishable from educated native writing.";
    default:
      return "Adjust complexity to the target level.";
  }
};

export const generateQuiz = async (topic: string, level: Difficulty, mode: QuizMode): Promise<QuizData> => {
  if (!API_KEY) throw new Error("API Key missing. Please configure VITE_GEMINI_API_KEY.");

  const cefrInstruction = getCefrGuidelines(level);
  let prompt = "";
  
  const isVisualTopic = mode === 'enem' && (
      topic.includes('Tirinha') || 
      topic.includes('Charge') || 
      topic.includes('Cartum') || 
      topic.includes('Propaganda') ||
      topic.includes('Infográfico') ||
      topic.includes('HQ')
  );

  if (mode === 'enem') {
      if (isVisualTopic) {
        prompt = `You are an English Exam Creator preparing students for the ENEM exam. The user wants a question about "${topic}" at CEFR Level ${level}.
        
        ${cefrInstruction}
        
        Step 1: Design a visual concept (Cartoon/Charge/Ad) about a social or cultural theme.
        Step 2: Create a HIGHLY DETAILED image generation prompt that describes this visual concept effectively IN ENGLISH.
        Step 3: Create 4 multiple choice questions that require interpreting that visual concept.
        
        The questions and options must match the complexity of ${level}.

        IMPORTANT: ALL CONTENT MUST BE IN ENGLISH. 
        - The generated image text (bubbles/captions) must be in English.
        - The questions, options, and explanations must be strictly in English.

        Return JSON with:
        - imagePrompt: The prompt to generate the image (in English, detailed).
        - questions: Array of questions in English.
        `;
      } else {
        prompt = `Create an advanced English Exam preparation exercise focusing on the genre: "${topic}".
        Target Level: ${level} (CEFR).
        
        ${cefrInstruction}
        
        1. Context/Text:
           - Write a creative and realistic excerpt (approx 150-200 words) typical of this genre IN ENGLISH.
           - The text vocabulary and grammar MUST match the level ${level}.
           - The text must cover themes relevant to social criticism, history, or culture.
        
        2. Questions:
           - Create 4 multiple choice questions IN ENGLISH.
           - Focus on: Inference, Social Criticism, Main Idea, and Intertextuality.
           - DO NOT ask simple grammar questions. Ask about *meaning* and *interpretation*.
        
        IMPORTANT: The entire output (text passage, questions, options, answers, explanations) MUST BE STRICTLY IN ENGLISH.
        `;
      }
  } else if (mode === 'reading') {
      prompt = `Create a Reading Comprehension exercise for an English student at CEFR level ${level}.
      Topic: "${topic}".
      
      ${cefrInstruction}

      1. Write an engaging text passage (approx 150-200 words) appropriate for ${level} level IN ENGLISH.
         - For A1/A2: Keep it very simple, short sentences.
         - For C1/C2: Use complex sentence structures and advanced vocabulary.
      2. Create 4 multiple choice questions based *strictly* on the text testing comprehension.
      
      IMPORTANT: All content (passage, questions, options, explanation) MUST BE STRICTLY IN ENGLISH.
      `;
  } else {
      // Grammar Mode
      prompt = `Create a specific Grammar Quiz for an English student at CEFR level ${level}.
      Specific Topic: "${topic}".
      
      ${cefrInstruction}

      1. Create 5 multiple choice questions IN ENGLISH.
      2. The questions context sentences must match the vocabulary level of ${level}.
      3. The questions must specifically test the rules of "${topic}".
      4. For example, if the topic is "Present Perfect", use questions that distinguish it from Past Simple or test "for/since".
      5. Provide a clear explanation for the correct answer IN ENGLISH.
      
      IMPORTANT: All questions, options, and explanations MUST BE STRICTLY IN ENGLISH.
      `;
  }

  try {
    // 1. Generate Structure (Text/JSON)
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            imagePrompt: { type: Type.STRING, description: "Only for visual topics: Detailed prompt for image generation in English." },
            passage: { type: Type.STRING, description: "The reading text in English (required for reading/non-visual enem mode)" },
            questions: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { 
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        answer: { type: Type.STRING },
                        explanation: { type: Type.STRING }
                    },
                    required: ["question", "options", "answer", "explanation"]
                }
            }
          },
          required: ["questions"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");
    
    const data = JSON.parse(text);
    let imageUrl = undefined;

    // 2. If visual topic, Generate Image
    if (isVisualTopic && data.imagePrompt) {
        try {
            // Append instruction to ensure text inside image is English
            const imagePromptEnglish = `${data.imagePrompt}, ensure any text inside the image (speech bubbles, signs) is in ENGLISH. High quality, educational style.`;
            
            const imageResponse = await ai.models.generateContent({
                model: IMAGE_MODEL,
                contents: {
                    parts: [{ text: imagePromptEnglish }]
                }
            });

            for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        } catch (imgError) {
            console.error("Image generation failed", imgError);
            // Fallback: Use the prompt as a description text
            data.passage = `[IMAGE DESCRIPTION]: ${data.imagePrompt}`;
        }
    }
    
    return {
        topic,
        level,
        mode,
        passage: data.passage,
        imageUrl: imageUrl,
        questions: data.questions
    };
  } catch (error) {
    console.error("Quiz generation error:", error);
    throw new Error("Failed to generate quiz. Please try again.");
  }
};

export const analyzeGrammar = async (textInput: string): Promise<GrammarAnalysis> => {
  if (!API_KEY) throw new Error("API Key missing.");
  const prompt = `Analyze the following English text for grammar, spelling, and style errors. Provide a corrected version and a list of specific errors with explanations IN ENGLISH. Text: "${textInput}"`;

  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correctedText: { type: Type.STRING },
            errors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  correction: { type: Type.STRING },
                  rule: { type: Type.STRING, description: "Grammar rule or reason for correction in English" }
                }
              }
            },
            feedback: { type: Type.STRING, description: "General constructive feedback on writing style and proficiency in English" }
          },
          required: ["correctedText", "errors", "feedback"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");
    return JSON.parse(text) as GrammarAnalysis;
  } catch (error) {
    console.error("Grammar analysis error:", error);
    throw new Error("Failed to analyze text.");
  }
};

// NEW: Rewrite Text Feature
export const rewriteText = async (textInput: string, tone: 'Formal' | 'Casual' | 'Native' | 'Concise'): Promise<string> => {
    if (!API_KEY) return "Error: API Key Missing";
    const prompt = `Rewrite the following text to make it more ${tone}. Keep the meaning but change the style. Text: "${textInput}". Return ONLY the rewritten text.`;
    try {
        const response = await ai.models.generateContent({
            model: TEXT_MODEL, contents: prompt
        });
        return response.text || "";
    } catch (e) { return "Error rewriting text."; }
};

// NEW: Suggest Reply Feature
export const suggestReply = async (history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
    if (!API_KEY) return "Error: API Key Missing";
    try {
        const chat = ai.chats.create({ model: TEXT_MODEL, history });
        const result = await chat.sendMessage({ message: "[SYSTEM: The user is stuck. Provide 3 short, natural suggested responses they could say next in this conversation context. Just list the options.]" });
        return result.text || "";
    } catch (e) { return ""; }
};

export const createStudyPlan = async (goal: string, level: Difficulty, days: number): Promise<StudyPlan> => {
  if (!API_KEY) throw new Error("API Key missing.");
  const prompt = `Create a ${days}-day English study plan for a ${level} student who wants to: ${goal}. The output MUST be in English.`;

  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            schedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING, description: "e.g., Day 1" },
                  focus: { type: Type.STRING, description: "Main topic of the day" },
                  activities: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");
    return JSON.parse(text) as StudyPlan;
  } catch (error) {
    console.error("Study plan error:", error);
    throw new Error("Failed to create study plan.");
  }
};

export const chatWithAi = async (message: string, history: { role: string, parts: { text: string }[] }[], systemInstruction?: string) => {
  if (!API_KEY) throw new Error("API Key missing.");
  try {
    const chat = ai.chats.create({
      model: TEXT_MODEL,
      history: history,
      config: {
        systemInstruction: systemInstruction || "You are a helpful, encouraging, and highly knowledgeable English tutor named 'SAS AI'. You help students improve their English skills. Keep answers concise but educational. ALL RESPONSES MUST BE IN ENGLISH.",
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat error", error);
    throw error;
  }
};