import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import { generateReport } from './src/services/ai.service.js';
import { connectDB } from './src/config/database.js';
connectDB();

// await main();
/**
 * for checking if the ai service is working fine or not, you can run this file and it will generate a report based on the provided resume, self description and job description. You can check the console for the generated report.   
 */
// await generateReport({
//     resume: "John Doe is a software engineer with 5 years of experience in full stack development. He has worked on various projects using technologies like React, Node.js, and MongoDB. He has a strong background in computer science fundamentals and is passionate about learning new technologies.",
//     selfDescription: "I am a highly motivated software engineer with a passion for building scalable and efficient applications. I have experience working in fast-paced environments and am always eager to take on new challenges. I am a quick learner and enjoy collaborating with others to solve complex problems.",
//     jobDescription: "We are looking for a skilled software engineer to join our team. The ideal candidate should have experience in full stack development, be proficient in React and Node.js, and have a strong understanding of computer science fundamentals. The candidate should also be a good communicator and be able to work well in a team environment."
// })


app.get('/',(req,res)=>{
    res.send('Working ');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})