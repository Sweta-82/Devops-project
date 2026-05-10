import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/file.middleware.js";
import { generateReportController } from "../controller/interview.controller.js";
export const InterviewRouter= express.Router();

/**
 * @route POST /api/interview/
 * @desc Generate an interview preparation report for a candidate based on their resume, self description and job description. The report includes a match score, list of technical and behavioral questions that can be asked in the interview along with their intention and how to answer them, list of skill gaps in the candidate's profile along with their severity, and a day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.
 * @access private
 * generateReportController
 */
InterviewRouter.post("/", authUser, upload.single("resume"), generateReportController);