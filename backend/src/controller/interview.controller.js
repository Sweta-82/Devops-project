import { PDFParse } from "pdf-parse";

import { generateReport, generateResumePdf } from "../services/ai.service.js";
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


/**
 * @description Controller to get interview report by interviewId.
 */
export async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await ReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
export async function getAllInterviewReportsController(req, res) {
    const interviewReports = await ReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume pdf based on user self description, resume content and job description.
 * The generated pdf is returned as a blob to the frontend.
 */
export async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params;
    const interviewReport = await ReportModel.findOne({ _id: interviewReportId, user: req.user.id })
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }
    const {resumeText,jobDescription,selfDescription} = interviewReport;
    const resumePdfBuffer = await generateResumePdf({resume: resumeText, jobDescription, selfDescription});

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=resume_${interviewReportId}.pdf`
    });

    res.send(resumePdfBuffer);
}






