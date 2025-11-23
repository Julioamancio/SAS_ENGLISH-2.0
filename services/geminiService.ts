import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuizQuestion, GrammarAnalysis, StudyPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateQuiz = async (topic: string, difficulty: Difficulty): Promise<QuizQuestion[]> => {
  const prompt = `Generate a 5-question multiple choice quiz about "${topic}" for a student at ${difficulty} level of English.`;
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              answer: { type: Type.STRING, description: "Must be exactly one of the strings in options" },
              explanation: { type: Type.STRING, description: "Why this is the correct answer" }
            },
            required: ["question", "options", "answer", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("Quiz generation error:", error);
    throw new Error("Failed to generate quiz. Please try again.");
  }
};

export const analyzeGrammar = async (textInput: string): Promise<GrammarAnalysis> => {
  const prompt = `Analyze the following English text for grammar, spelling, and style errors. Provide a corrected version and a list of specific errors with explanations. Text: "${textInput}"`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
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
                  rule: { type: Type.STRING, description: "Grammar rule or reason for correction" }
                }
              }
            },
            feedback: { type: Type.STRING, description: "General constructive feedback on writing style and proficiency" }
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

export const createStudyPlan = async (goal: string, level: Difficulty, days: number): Promise<StudyPlan> => {
  const prompt = `Create a ${days}-day English study plan for a ${level} student who wants to: ${goal}.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
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

export const chatWithAi = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: history,
      config: {
        systemInstruction: "You are a helpful, encouraging, and highly knowledgeable English tutor named 'SAS AI'. You help students improve their English skills. Keep answers concise but educational.",
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat error", error);
    throw error;
  }
};
