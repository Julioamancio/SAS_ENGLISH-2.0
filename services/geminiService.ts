import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuizQuestion, GrammarAnalysis, StudyPlan, QuizMode, QuizData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

export const generateQuiz = async (topic: string, level: Difficulty, mode: QuizMode): Promise<QuizData> => {
  
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
        prompt = `You are an ENEM Exam Creator. The user wants a question about "${topic}" (Level ${level}).
        
        Step 1: Design a visual concept (Cartoon/Charge/Ad) about a social or cultural theme relevant to exams.
        Step 2: Create a HIGHLY DETAILED image generation prompt that describes this visual concept effectively.
        Step 3: Create 4 multiple choice questions that require interpreting that visual concept.

        Return JSON with:
        - imagePrompt: The prompt to generate the image (in English, detailed).
        - questions: Array of questions.
        `;
      } else {
        prompt = `Create an advanced English Exam preparation exercise focusing on the genre: "${topic}".
        Target Level: ${level} (CEFR).
        
        1. Context/Text:
           - Write a creative and realistic excerpt (approx 150-200 words) typical of this genre.
           - The text must cover themes relevant to social criticism, history, or culture (typical of ENEM).
        
        2. Questions:
           - Create 4 multiple choice questions.
           - Focus on: Inference, Social Criticism, Main Idea, and Intertextuality.
           - DO NOT ask simple grammar questions. Ask about *meaning* and *interpretation*.
        `;
      }
  } else if (mode === 'reading') {
      prompt = `Create a Reading Comprehension exercise for an English student at CEFR level ${level}.
      Topic: "${topic}".
      1. Write an engaging text passage (approx 150 words) appropriate for ${level} level.
      2. Create 4 multiple choice questions based *strictly* on the text testing comprehension.
      `;
  } else {
      // Grammar Mode
      prompt = `Create a specific Grammar Quiz for an English student at CEFR level ${level}.
      Specific Topic: "${topic}".
      1. Create 5 multiple choice questions.
      2. The questions must specifically test the rules of "${topic}".
      3. For example, if the topic is "Present Perfect", use questions that distinguish it from Past Simple or test "for/since".
      4. Provide a clear explanation for the correct answer.
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
            imagePrompt: { type: Type.STRING, description: "Only for visual topics: Detailed prompt for image generation." },
            passage: { type: Type.STRING, description: "The reading text (required for reading/non-visual enem mode)" },
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
            const imageResponse = await ai.models.generateContent({
                model: IMAGE_MODEL,
                contents: {
                    parts: [{ text: data.imagePrompt + " high quality, clear text, educational style" }]
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
  const prompt = `Analyze the following English text for grammar, spelling, and style errors. Provide a corrected version and a list of specific errors with explanations. Text: "${textInput}"`;

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

export const chatWithAi = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
  try {
    const chat = ai.chats.create({
      model: TEXT_MODEL,
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