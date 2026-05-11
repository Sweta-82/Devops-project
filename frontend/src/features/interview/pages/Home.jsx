import React, { useState, useRef } from 'react'
import { UploadCloud, Zap, FileText } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useInterview } from '../hooks/UseInterview.js'

const Home = () => {
  const [fileName, setFileName] = useState(null)
  const [jdCount, setJdCount] = useState(0)
  const fileRef = useRef();
const { loading, generateReport } = useInterview();
  const navigate= useNavigate();
  const handleGenerateReport= async()=>{
    const resumeFile= fileRef.current?.files?.[0] || null;
   const data= await generateReport({ jobDescription:"same data", selfDescription:"same data", resumeFile })
   if (data?._id) {
      console.log("Home jsx", data._id);
      navigate(`/interview/report/${data._id}`)
    }
  }
  if(loading){
    return <div className='min-h-screen bg-[#0f1011] flex items-center justify-center px-4'>
        <p className='text-white text-2xl'>Generating your interview report...</p>
    </div>
  }

  return (
    <main className='min-h-screen bg-[#0a0a0c] text-white px-6 py-10 relative overflow-hidden font-sans'>
      <div className='relative z-10 max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-black tracking-tight leading-tight'>
            Interview{' '}
            <span className='bg-gradient-to-r from-[#e70f5b] to-[#ff6a9e] bg-clip-text text-transparent'>
              Report
            </span>{' '}
            Generator
          </h1>
          <p className='text-[#5a5855] text-sm mt-2 font-light'>
            Paste your JD, upload your resume — get a personalized prep kit
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

          {/* LEFT — Job Description */}
          <div className='bg-[#0f0d12]/80 border border-white/[0.07] rounded-2xl p-6
            backdrop-blur-xl hover:border-[#e70f5b]/20 transition-colors duration-300 flex flex-col'>
            <p className='text-[10px] uppercase tracking-widest text-[#e70f5b] font-semibold mb-1'>Step 01</p>
            <h2 className='text-lg font-bold text-[#f0ede8] mb-1'>Job Description</h2>
            <p className='text-[#5a5855] text-xs mb-4 font-light'>Paste the full job posting for accurate insights</p>
            <textarea
              rows={16}
              placeholder='Paste job description here...'
              onChange={e => setJdCount(e.target.value.length)}
              className='flex-1 w-full bg-[#0a0810]/70 border border-white/[0.07] rounded-xl p-4
                text-[#d0cdc8] text-sm outline-none resize-none placeholder-[#2e2c2a]
                focus:border-[#e70f5b]/40 focus:shadow-[0_0_0_3px_rgba(231,15,91,0.07)]
                transition-all duration-300'
            />
            <p className={`text-right text-[10px] mt-1 transition-colors duration-200
              ${jdCount > 0 ? 'text-[#e70f5b]' : 'text-[#2e2c2a]'}`}>
              {jdCount.toLocaleString()} chars
            </p>
          </div>

          {/* RIGHT */}
          <div className='flex flex-col gap-5'>

            {/* Resume Upload */}
            <div className='bg-[#0f0d12]/80 border border-white/[0.07] rounded-2xl p-6
              backdrop-blur-xl hover:border-[#e70f5b]/20 transition-colors duration-300'>
              <p className='text-[10px] uppercase tracking-widest text-[#e70f5b] font-semibold mb-1'>Step 02</p>
              <h2 className='text-lg font-bold text-[#f0ede8] mb-1'>Your Resume</h2>
              <p className='text-[#5a5855] text-xs mb-4 font-light'>Upload a PDF to match your skills to the JD</p>

              <label
                htmlFor='resume'
                onClick={() => fileRef.current?.click()}
                className='border-[1.5px] border-dashed border-white/10 rounded-xl p-8
                  flex flex-col items-center gap-3 cursor-pointer
                  hover:border-[#e70f5b]/40 hover:bg-[#e70f5b]/[0.03]
                  transition-all duration-300'
              >
                <div className='w-11 h-11 bg-[#e70f5b]/10 rounded-xl flex items-center justify-center'>
                  <UploadCloud size={22} className='text-[#e70f5b]' strokeWidth={1.8} />
                </div>
                <div className='text-center'>
                  <p className='text-[#b0ada8] text-sm font-medium'>Drop your resume here</p>
                  <p className='text-[#3a3835] text-xs mt-0.5'>PDF only · Max 10 MB</p>
                </div>
                <input ref={fileRef} type='file' id='resume' accept='.pdf' className='hidden'
                  onChange={e => setFileName(e.target.files?.[0]?.name || null)} />
              </label>

              {fileName && (
                <div className='mt-3 flex items-center gap-2 bg-[#e70f5b]/10 border border-[#e70f5b]/25
                  rounded-lg px-3 py-2 text-[#f04a85] text-xs'>
                  <FileText size={13} strokeWidth={2} />
                  {fileName}
                </div>
              )}
            </div>

            {/* Self Description */}
            <div className='bg-[#0f0d12]/80 border border-white/[0.07] rounded-2xl p-6
              backdrop-blur-xl hover:border-[#e70f5b]/20 transition-colors duration-300'>
              <p className='text-[10px] uppercase tracking-widest text-[#e70f5b] font-semibold mb-1'>Step 03</p>
              <h2 className='text-lg font-bold text-[#f0ede8] mb-1'>About You</h2>
              <p className='text-[#5a5855] text-xs mb-4 font-light'>Your experience, goals & standout skills</p>
              <textarea
                rows={5}
                placeholder='e.g. 3 years in full stack, strong React & Node, targeting senior roles...'
                className='w-full bg-[#0a0810]/70 border border-white/[0.07] rounded-xl p-4
                  text-[#d0cdc8] text-sm outline-none resize-none placeholder-[#2e2c2a]
                  focus:border-[#e70f5b]/40 focus:shadow-[0_0_0_3px_rgba(231,15,91,0.07)]
                  transition-all duration-300'
              />
            </div>

            {/* CTA Button — same #e70f5b as Login */}
            <button
              onClick={handleGenerateReport}
              className='w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5
                transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden'
              style={{
                background: 'linear-gradient(135deg, #e70f5b 0%, #c4134f 60%, #9c0f3f 100%)',
                boxShadow: '0 4px 24px rgba(231,15,91,0.28)'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(231,15,91,0.4)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(231,15,91,0.28)'}
            >
              <Zap size={18} strokeWidth={2} />
              Generate Interview Report
            </button>

          </div>
        </div>
      </div>
    </main>
  )
}

export default Home