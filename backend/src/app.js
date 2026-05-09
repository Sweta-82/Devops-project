import express from 'express';
import cors from 'cors';
const app=express();
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// using all the routes
app.use("/api/auth",authRouter);

export default app;