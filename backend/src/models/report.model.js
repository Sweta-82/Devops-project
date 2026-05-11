import mongoose from "mongoose";
/**
 * -job description sechma: String
 * - resume text: String
 * - self descritpion: String
 * 
 * - matchScore: Number
 * 
 * Technical questions
 * - Behavioral questions: [
 * {
 * question:""",
 * intension:"",
 * answer:""
 * }
 * ]
 * - Skills gaps:[{
 * skill:"",
 * severity:{
 * type: String,
 * enum:["low", "medium", "high"]
 * }
 * 
 * }]
 * - preparation plan:[{
 * day: Number,
 * focusArea: String,
 * tasks:[String]
 * }]
 */

// report.model.js

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    }
}, {
    _id: false
});

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    focus: {
        type: String,
        required: true
    },
    tasks: [{
        type: String,
        required: true
    }]
}, {
    _id: false
});

const reportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },

    resumeText: {
        type: String,
        required: true
    },

    selfDescription: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },

    technicalQuestions: [technicalQuestionSchema],

    behavioralQuestions: [behavioralQuestionSchema],

    skillGaps: [skillGapSchema],

    preparationPlan: [preparationPlanSchema],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type:String,
        required:[true, "Report title is required"]
    }


}, {
    timestamps: true
});

const ReportModel = mongoose.model("Report", reportSchema);

export default ReportModel;