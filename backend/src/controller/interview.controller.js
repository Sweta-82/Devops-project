import { PDFParse } from "pdf-parse";

import { generateReport } from "../services/ai.service.js";
import ReportModel from "../models/report.model.js";

export async function generateReportController(req, res) {
    try {

        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Parse PDF
        const parser = new PDFParse({
            data: req.file.buffer
        });

        const resumeContent = await parser.getText();

        // Generate AI Report
        const interviewReportByAi = await generateReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        // Save to DB
        const interviewReport = await ReportModel.create({
            user: req.user.id,
            resumeText: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });

        return res.status(200).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {

        console.error("Generate Report Error:", error);

        return res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
}