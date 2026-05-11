import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/file.middleware.js";
import { generateReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportByIdController } from "../controller/interview.controller.js";
export const InterviewRouter= express.Router();

/**
 * @route POST /api/interview/
 * @desc Generate an interview preparation report for a candidate based on their resume, self description and job description. The report includes a match score, list of technical and behavioral questions that can be asked in the interview along with their intention and how to answer them, list of skill gaps in the candidate's profile along with their severity, and a day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.
 * @access private
 * generateReportController
 */
InterviewRouter.post("/", authUser, upload.single("resume"), generateReportController);

/**
 * @route GET /api/interview/reports/:interviewId
 * @desc Get the interview report by its ID. Only the user who created the report can access it.
 * @access private
 */
InterviewRouter.get("/reports/:interviewId", authUser, getInterviewReportByIdController);

/**
 * @route GET /api/interview/reports
 * @desc Get all interview reports of the logged in user.
 * @access private
 */
InterviewRouter.get("/", authUser, getAllInterviewReportsController);

/**
 * @route GET /api/interview/resume/pdf
 * @desc Generate a resume pdf based on user self description, resume content and job description. The generated pdf is returned as a blob to the frontend.
 * @access private
 */

InterviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController)