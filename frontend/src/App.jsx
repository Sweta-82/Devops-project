import React from 'react'
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from './features/auth/auth.context.jsx';
const App = () => {
  return (
    <div className='bg-[#060606] h-screen w-full text-white font-serif'>
      <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  )
}

export default App