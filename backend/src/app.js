import express from 'express';
const app=express();
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());

// using all the routes
app.use("/api/auth",authRouter);

export default app;