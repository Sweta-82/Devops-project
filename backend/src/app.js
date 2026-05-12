import express from 'express';
import cors from 'cors';
const app=express();
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import { InterviewRouter } from './routes/interview.routes.js';
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'https://skillsync-a2t0.onrender.com'],
    credentials: true
}))
// using all the routes
app.use("/api/auth",authRouter);
app.use("/api/interview", InterviewRouter);
export default app;