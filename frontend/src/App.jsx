import React from 'react'
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from './features/auth/auth.context.jsx';
import Interview from './features/interview/pages/Interview.jsx';
import { InterviewProvider } from './features/interview/Interview.context.jsx';
const App = () => {
  return (
    <div className='bg-[#060606] h-screen w-full text-white font-serif'>
      <AuthProvider>
        <InterviewProvider>

      <RouterProvider router={router}/>
        </InterviewProvider>
      </AuthProvider>
    </div>
  )
}

export default App