
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static getAi() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  static async editImage(base64Image: string, mimeType: string, prompt: string): Promise<string | null> {
    const ai = this.getAi();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image.split(',')[1] || base64Image,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Image editing error:", error);
      return null;
    }
  }

  static async chat(messages: { role: 'user' | 'model', text: string }[]): Promise<string> {
    const ai = this.getAi();
    try {
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: 'You are a romantic, poetic assistant for a lovely girl named Shiki boo. Her partner, Nimna, loves her more than anything in the world. If she asks if Nimna loves her or about their relationship, tell her beautiful things about Nimna\'s deep devotion. Be sweet, supportive, and occasionally use heart emojis. Nimna is her Valentine and he is the one who sent her this app.',
        },
      });

      const lastMessage = messages[messages.length - 1].text;
      const response = await chat.sendMessage({ message: lastMessage });
      return response.text || "Nimna's love for you transcends words, but the connection seems a bit fuzzy right now. Try again, darling.";
    } catch (error) {
      console.error("Chat error:", error);
      return "I'm a bit speechless right now because of how beautiful you are. (Error connecting to Gemini)";
    }
  }
}
