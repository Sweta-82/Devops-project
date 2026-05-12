import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer";

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


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
    });
    const page = await browser.newPage();
    // wait until all external resources (like fonts) are loaded
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });
    
    await browser.close();
    // Puppeteer > v19 returns Uint8Array. Buffer.from ensures Express sends it as binary.
    return Buffer.from(pdfBuffer);
}

/**
 * @description Function to generate resume pdf based on user self description, resume content and job description.
 * html to pdf conversion can be done using libraries like puppeteer or pdfkit. The generated pdf can then be returned as a blob to the frontend.
 */
export async function generateResumePdf({resume, selfDescription, jobDescription}) {
    const resumePdfSchema = z.object({
        html: z.string().describe("HTML content of resume which can be used for the resume PDF")
    })

    const prompt = `Act as an expert technical recruiter and premium UI designer. Generate a 1-page, high-impact, ATS-optimized HTML resume.

INPUT:
- Resume Data: ${resume}
- Self Description: ${selfDescription}
- Target Job Description: ${jobDescription}

CONTENT RULES:
1. Extract and naturally integrate keywords/skills from the Job Description.
2. Write concise, human-sounding bullet points focusing on measurable impact and technologies used. Avoid generic buzzwords.
3. Keep it brief. Prioritize readability over quantity.

DESIGN & HTML RULES:
1. Provide a complete HTML5 document with inline CSS inside a <style> tag. No external libraries.
2. Design must be minimal, elegant, and print-friendly (A4). 
3. Use a clean white background with #1e3a5f as the primary accent color for headings/dividers.
4. Use standard section names (e.g., Professional Summary, Technical Skills, Projects, Education) and semantic tags to ensure ATS parsing.

OUTPUT RULES:
Output ONLY a valid JSON object in the exact format below. Do not include markdown code blocks, explanations, or extra text.
{
  "html": "<complete HTML document here>"
}`
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema)
        }
    })

    console.log("RAW AI RESPONSE FOR RESUME PDF:");
    console.log(response.text);
    const jsonContent = JSON.parse(response.text);
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    return pdfBuffer;

}