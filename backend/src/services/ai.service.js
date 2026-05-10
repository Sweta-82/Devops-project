import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export const reportInputSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    ),

    title: z.string()
});

export async function generateReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
You are an interview preparation assistant.

Analyze the candidate and return ONLY valid JSON.

Required JSON format:

{
  "title": "string",
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low | medium | high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": "string",
      "tasks": ["string"]
    }
  ]
}

RULES:
- Return ONLY JSON
- No markdown
- No explanation
- Do not rename fields
- Do not add extra fields
- matchScore must be between 0 and 100

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });

    console.log("RAW AI RESPONSE:");
    console.log(response.text);

    const cleanedText = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsedData = JSON.parse(cleanedText);

    const validatedData =
        reportInputSchema.safeParse(parsedData);

    if (!validatedData.success) {

        console.log(
            validatedData.error.format()
        );

        throw new Error(
            "Invalid AI response structure"
        );
    }

    return validatedData.data;
}