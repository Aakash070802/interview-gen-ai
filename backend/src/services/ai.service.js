import config from "../config/config.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: config.GENAI_API_KEY,
});

async function invokeGeminiAI() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello Gemini! Explain what is Interview ?",
  });

  console.log(response.text);
}

export { invokeGeminiAI };
