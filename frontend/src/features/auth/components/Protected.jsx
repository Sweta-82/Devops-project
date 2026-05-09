import React from 'react'
import { useAuth } from '../../../hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router';

const Protected = ({children}) => {
    const {loading, user}= useAuth();
    const navigate= useNavigate();
    if(loading){
        return <div className='min-h-screen bg-[#0f1011] flex items-center justify-center px-4'>
            <p className='text-white text-2xl'>Loading...</p>
        </div>
    }
    if(!user){
        return <Navigate to="/login"/>  
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default Protected