import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../../hooks/UseAuth'
const Login = () => {
  const {loading, handleLogin}= useAuth();
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const navigate= useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await handleLogin({email, password});
        navigate("/dashboard");
    }

    if(loading){
        return <div className='min-h-screen bg-[#0f1011] flex items-center justify-center px-4'>
            <p className='text-white text-2xl'>Loading...</p>
        </div>
    }
  return (
    <main className='min-h-screen bg-[#0f1011] flex items-center justify-center px-4'>
      <div className='w-full max-w-md p-8 rounded-3xl'>
        <h1 className='text-4xl font-bold text-white mb-8'>
          Login
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className=''>
              Email
            </label>
            <input
              type="email"
              name='email'
              onChange={(e)=>setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full px-4 py-3 rounded-xl text-white border border-gray-600 outline-none focus:border-[#d31b5b]'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-gray-300'>
              Password
            </label>
            <input
              type="password"
              name='password'
              onChange={(e)=>setPassword(e.target.value)}

              placeholder='Enter your password'
              className='w-full px-4 py-3 rounded-xl text-white border border-gray-600 outline-none focus:border-[#d31b5b]'
            />
          </div>

          <button
            className='w-full bg-[#e70f5b] hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition duration-300'
          >
            Login
          </button>

        </form>
        <p className='text-gray-400 text-center mt-4'>
          Don't have an account? <Link to="/register" className='text-[#e5145d] hover:underline'>Register</Link>
        </p>
      </div>

    </main>
  )
}

export default Login