import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import { connectDB } from './src/config/database.js';
connectDB();

app.get('/',(req,res)=>{
    res.send('Working ');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})