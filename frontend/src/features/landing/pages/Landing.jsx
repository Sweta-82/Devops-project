import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Zap, FileText, Target, Brain, ChevronRight, Star, ArrowRight, Sparkles, Shield, Clock, BarChart3, Users, CheckCircle2, Menu, X } from 'lucide-react'

const Landing = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animated counter
  useEffect(() => {
    const target = 2847
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setActiveCount(target); clearInterval(timer) }
      else setActiveCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [])

  const features = [
    { icon: Target, title: 'Smart JD Matching', desc: 'AI analyzes your resume against the job description and gives a precise match score with gap analysis.', color: '#e70f5b' },
    { icon: Brain, title: 'AI Interview Prep', desc: 'Get tailored technical & behavioral questions with expert-crafted answers specific to your role.', color: '#f0a030' },
    { icon: BarChart3, title: 'Skill Gap Analysis', desc: 'Identify exactly what skills you need to develop with severity-based prioritization.', color: '#30d060' },
    { icon: FileText, title: 'Resume Builder', desc: 'Generate an ATS-optimized resume tailored to the specific job description instantly.', color: '#6366f1' },
    { icon: Clock, title: 'Preparation Roadmap', desc: 'Get a day-by-day structured study plan customized for your interview timeline.', color: '#06b6d4' },
    { icon: Shield, title: 'STAR Method Ready', desc: 'Behavioral answers formatted using the STAR framework that interviewers love.', color: '#ec4899' },
  ]

  const steps = [
    { num: '01', title: 'Paste Job Description', desc: 'Copy the job posting you want to apply for and paste it into the platform.' },
    { num: '02', title: 'Upload Your Resume', desc: 'Upload your current resume as a PDF. Our AI reads and understands every detail.' },
    { num: '03', title: 'Get Your Report', desc: 'Receive a comprehensive interview prep kit with questions, answers, and a study roadmap.' },
  ]

  const testimonials = [
    { name: 'Rahul Sharma', role: 'SDE @ Amazon', text: 'This tool helped me crack my Amazon interview. The technical questions were spot-on!', rating: 5 },
    { name: 'Priya Patel', role: 'Frontend Dev @ Google', text: 'The skill gap analysis showed me exactly what to focus on. Got the offer in 2 weeks!', rating: 5 },
    { name: 'Amit Kumar', role: 'Full Stack @ Microsoft', text: 'The AI-generated roadmap was a game changer. Structured prep made all the difference.', rating: 5 },
  ]

  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#060608]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e70f5b] to-[#ff6a9e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap size={16} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">Skill<span className="text-[#e70f5b]">Sync</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#8a8885] hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-[#8a8885] hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm text-[#8a8885] hover:text-white transition-colors">Reviews</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm px-5 py-2 rounded-xl text-[#d0cdc8] hover:text-white border border-white/[0.08] hover:border-white/20 transition-all duration-300">
              Log in
            </Link>
            <Link to="/register" className="text-sm px-5 py-2 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #e70f5b 0%, #c4134f 100%)', boxShadow: '0 4px 20px rgba(231,15,91,0.3)' }}>
              Sign up free
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#0a0a0c]/98 backdrop-blur-2xl border-t border-white/[0.06] px-6 py-6 flex flex-col gap-4 animate-in">
            <a href="#features" onClick={() => setMobileMenu(false)} className="text-sm text-[#8a8885]">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="text-sm text-[#8a8885]">How it Works</a>
            <a href="#testimonials" onClick={() => setMobileMenu(false)} className="text-sm text-[#8a8885]">Reviews</a>
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1 text-center text-sm py-2.5 rounded-xl border border-white/10 text-[#d0cdc8]">Log in</Link>
              <Link to="/register" className="flex-1 text-center text-sm py-2.5 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #e70f5b, #c4134f)' }}>Sign up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #e70f5b 0%, transparent 70%)' }} />
          <div className="absolute top-40 left-1/4 w-2 h-2 rounded-full bg-[#e70f5b] opacity-30 animate-pulse" />
          <div className="absolute top-60 right-1/4 w-1.5 h-1.5 rounded-full bg-[#f0a030] opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-32 right-1/3 w-1 h-1 rounded-full bg-[#30d060] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 border border-[#e70f5b]/20"
            style={{ background: 'rgba(231,15,91,0.08)', color: '#f04a85' }}>
            <Sparkles size={12} /> AI-Powered Interview Preparation
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Nail Your Next
            <br />
            <span className="bg-gradient-to-r from-[#e70f5b] via-[#ff6a9e] to-[#f0a030] bg-clip-text text-transparent">
              Interview
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#6a6865] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Upload your resume, paste a job description, and get a personalized interview prep kit — 
            complete with <span className="text-[#b0ada8]">tailored questions</span>, <span className="text-[#b0ada8]">skill gap analysis</span>, and a <span className="text-[#b0ada8]">day-by-day roadmap</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/register"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #e70f5b 0%, #c4134f 60%, #9c0f3f 100%)', boxShadow: '0 8px 32px rgba(231,15,91,0.35)' }}>
              Get Started — It's Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium text-[#b0ada8] border border-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-300">
              I have an account
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-[#5a5855]">
            <div className="flex -space-x-2">
              {['#e70f5b', '#f0a030', '#30d060', '#6366f1'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#060608] flex items-center justify-center text-[10px] font-bold" style={{ background: c + '30', color: c }}>
                  {['R', 'P', 'A', 'S'][i]}
                </div>
              ))}
            </div>
            <span><span className="text-[#d0cdc8] font-semibold">{activeCount.toLocaleString()}+</span> candidates prepared</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '95%', label: 'Accuracy Rate' },
            { val: '10K+', label: 'Reports Generated' },
            { val: '< 30s', label: 'Generation Time' },
            { val: '4.9/5', label: 'User Rating' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center py-6 rounded-2xl border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-2xl md:text-3xl font-black text-[#f0ede8] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{val}</p>
              <p className="text-xs text-[#5a5855]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#e70f5b] font-semibold mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Everything You Need to <span className="text-[#e70f5b]">Ace</span> an Interview
            </h2>
            <p className="text-[#5a5855] max-w-lg mx-auto text-sm">Powered by advanced AI to give you the most comprehensive and personalized interview preparation experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title}
                className="group p-6 rounded-2xl border border-white/[0.06] hover:border-opacity-30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                style={{ background: '#0a090d' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color + '40'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
                  style={{ background: color + '15' }} />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: color + '12', color }}>
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-[#f0ede8] mb-2">{title}</h3>
                  <p className="text-sm text-[#6a6865] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#f0a030] font-semibold mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Three Steps to Interview <span className="text-[#f0a030]">Confidence</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className="flex items-start gap-6 p-6 rounded-2xl border border-white/[0.06] hover:border-[#e70f5b]/20 transition-all duration-300 group"
                style={{ background: '#0a090d' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#e70f5b', background: 'rgba(231,15,91,0.08)', border: '1px solid rgba(231,15,91,0.15)' }}>
                  {num}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f0ede8] mb-1.5 group-hover:text-white transition-colors">{title}</h3>
                  <p className="text-sm text-[#6a6865] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#30d060] font-semibold mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Loved by <span className="text-[#30d060]">Thousands</span> of Candidates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, text, rating }) => (
              <div key={name} className="p-6 rounded-2xl border border-white/[0.06]" style={{ background: '#0a090d' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#f0a030" stroke="#f0a030" />
                  ))}
                </div>
                <p className="text-sm text-[#a0ada8] leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(231,15,91,0.1)', color: '#e70f5b' }}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#d0cdc8]">{name}</p>
                    <p className="text-xs text-[#5a5855]">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(231,15,91,0.08) 0%, rgba(231,15,91,0.02) 100%)', border: '1px solid rgba(231,15,91,0.15)' }}>
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#e70f5b' }} />
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 relative z-10">
            Ready to <span className="text-[#e70f5b]">Ace</span> Your Interview?
          </h2>
          <p className="text-[#6a6865] mb-8 max-w-md mx-auto relative z-10">
            Join thousands of candidates who landed their dream jobs with AI-powered interview preparation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/register"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #e70f5b 0%, #c4134f 100%)', boxShadow: '0 8px 32px rgba(231,15,91,0.35)' }}>
              Start Free Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="text-sm text-[#8a8885] hover:text-white transition-colors flex items-center gap-1">
              Already have an account? <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#e70f5b] to-[#ff6a9e] flex items-center justify-center">
              <Zap size={14} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold">Skill<span className="text-[#e70f5b]">Sync</span></span>
          </div>
          <p className="text-xs text-[#3a3835]">© {new Date().getFullYear()} SkillSync. Built with ❤️ for job seekers.</p>
          <div className="flex gap-6 text-xs text-[#5a5855]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
