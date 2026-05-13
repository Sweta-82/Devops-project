import React, { useState } from 'react'
import { Code2, MessageSquare, Map, ChevronDown, LayoutDashboard, User, Calendar, Star, Download, LogOut } from 'lucide-react'
import { useInterview } from '../hooks/UseInterview.js'
import { useAuth } from '../../../hooks/UseAuth.js'



// ─── SEVERITY CONFIG ──────────────────────────────────────────
const SEV = {
  high:   { label: 'High',   bg: 'rgba(231,15,91,0.1)',   border: 'rgba(231,15,91,0.22)',   color: '#f04a85', bar: 85 },
  medium: { label: 'Medium', bg: 'rgba(240,160,48,0.1)',  border: 'rgba(240,160,48,0.22)',  color: '#e8a040', bar: 55 },
  low:    { label: 'Low',    bg: 'rgba(48,208,96,0.08)',  border: 'rgba(48,208,96,0.2)',    color: '#50d878', bar: 28 },
}

// ─── ACCORDION QUESTION ───────────────────────────────────────
const QItem = ({ num, question, intention, answer, accent = 'pink' }) => {
  const [open, setOpen] = useState(false)
  const isOrange = accent === 'orange'
  const ac     = isOrange ? '#f0a030' : '#e70f5b'
  const bOpen  = isOrange ? 'rgba(240,160,48,0.22)' : 'rgba(231,15,91,0.22)'
  const ib     = isOrange ? 'rgba(240,160,48,0.35)' : 'rgba(231,15,91,0.3)'
  const abg    = isOrange ? 'rgba(240,160,48,0.05)' : 'rgba(231,15,91,0.05)'
  const abr    = isOrange ? 'rgba(240,160,48,0.12)' : 'rgba(231,15,91,0.12)'

const {report}= useInterview();

  return (
    <div className='rounded-xl mb-2 overflow-hidden transition-all duration-200'
      style={{ background: '#181520', border: `1px solid ${open ? bOpen : 'rgba(255,255,255,0.07)'}` }}>
      <button className='w-full flex items-start gap-3 px-4 py-3.5 text-left'
        onClick={() => setOpen(o => !o)}>
        <span className='text-[10px] font-bold mt-0.5 w-5 shrink-0'
          style={{ color: ac, fontFamily: 'Syne, sans-serif' }}>Q{num}</span>
        <span className={`flex-1 text-[12.5px] leading-relaxed transition-colors ${open ? 'text-[#f0ede8]' : 'text-[#c8c5c0]'}`}>
          {question}
        </span>
        <ChevronDown size={13} strokeWidth={2}
          className={`shrink-0 mt-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ stroke: open ? ac : '#5a5855' }} />
      </button>
      {open && (
        <div className='px-4 pb-4 pl-11'>
          <div className='text-[11px] text-[#6a6865] leading-relaxed mb-3 pl-3'
            style={{ borderLeft: `2px solid ${ib}` }}>
            🎯 <span className='text-[#8a8885]'>Interviewer's intention:</span> {intention}
          </div>
          <p className='text-[9px] uppercase tracking-widest font-semibold mb-1.5' style={{ color: ac }}>
            Suggested Answer
          </p>
          <div className='text-[11.5px] text-[#a0ada8] leading-relaxed rounded-lg px-3 py-2.5'
            style={{ background: abg, border: `1px solid ${abr}` }}>
            {answer}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────
const Interview = () => {
  const [tab, setTab] = useState('technical')
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const { report, getResumePdf } = useInterview();
  const { handleLogout, user } = useAuth();
  const candidateName = report?.candidateName || user?.username || "Candidate";
  if (!report) {
   return (
      <div className="text-white p-10">
         Loading report...
      </div>
   )
}

  const navItems = [
    { id: 'overview',   label: 'Overview',             Icon: LayoutDashboard },
    { id: 'technical',  label: 'Technical Questions',  Icon: Code2 },
    { id: 'behavioral', label: 'Behavioral Questions', Icon: MessageSquare },
    { id: 'roadmap',    label: 'Road Map',             Icon: Map },
  ]

  const circ  = 2 * Math.PI * 36
  const offset = circ - (circ * report.matchScore) / 100

  const scoreColor = report.matchScore >= 85 ? '#30d060' : report.matchScore >= 65 ? '#f0a030' : '#e70f5b'
  const scoreLabel = report.matchScore >= 85 ? 'Strong match for this role' : report.matchScore >= 65 ? 'Good match' : 'Needs improvement'

  return (
    <div className='flex flex-col h-screen bg-[#0f0e11] text-white overflow-hidden'
      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>

      {/* ── FAKE BROWSER BAR ── */}
      <div className='h-9 bg-[#0d0c0f] border-b border-white/[0.07] flex items-center gap-2 px-4 shrink-0'>
        {['#ff5f57','#ffbd2e','#28c840'].map(c => (
          <div key={c} className='w-2.5 h-2.5 rounded-full' style={{ background: c }} />
        ))}
        <div className='mx-auto bg-white/[0.04] border border-white/[0.07] rounded px-3 h-[22px]
          flex items-center text-[11px] text-[#5a5855] max-w-xs w-full'>
          localhost:5173/report/{report._id}
        </div>
      </div>

      <div className='flex flex-1 overflow-hidden'>

        {/* ── SIDEBAR ── */}
        <div className='w-52 bg-[#0d0c0f] border-r border-white/[0.07] p-4 flex flex-col shrink-0'>
          {/* Candidate pill */}
          <div className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-5'
            style={{ background: 'rgba(231,15,91,0.06)', border: '1px solid rgba(231,15,91,0.12)' }}>
            <div className='w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0'
              style={{ background: 'rgba(231,15,91,0.15)', color: '#e70f5b' }}>
              {candidateName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className='text-[11px] font-semibold text-[#d0cdc8] leading-none'>{candidateName}</p>
              <p className='text-[10px] text-[#5a5855] mt-0.5'>{report.title}</p>
            </div>
          </div>

          <p className='text-[9px] uppercase tracking-widest text-[#3a3835] font-semibold mb-2 px-1'>
            Sections
          </p>
          {navItems.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className='w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs mb-1.5 transition-all duration-200'
              style={tab === id
                ? { background: 'rgba(231,15,91,0.09)', border: '1px solid rgba(231,15,91,0.18)', color: '#e70f5b' }
                : { border: '1px solid transparent', color: '#5a5855' }}>
              <Icon size={12} strokeWidth={2} />
              {label}
            </button>
          ))}

          {/* DOWNLOAD PDF — pushed to bottom */}
          <div className='mt-auto pt-4'>
            <button
              onClick={async () => {
                setDownloadingPdf(true)
                try {
                  await getResumePdf(report._id)
                } finally {
                  setDownloadingPdf(false)
                }
              }}
              disabled={downloadingPdf}
              className='w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
              style={{
                background: downloadingPdf
                  ? 'rgba(231,15,91,0.15)'
                  : 'linear-gradient(135deg, #e70f5b 0%, #c4134f 60%, #9c0f3f 100%)',
                boxShadow: downloadingPdf ? 'none' : '0 4px 20px rgba(231,15,91,0.25)',
                color: '#fff',
              }}
            >
              {downloadingPdf ? (
                <>
                  <svg className='animate-spin w-3.5 h-3.5' viewBox='0 0 24 24' fill='none'>
                    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='3' strokeDasharray='31.4 31.4' strokeLinecap='round' />
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                  <Download size={13} strokeWidth={2.5} />
                  Download Resume
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className='w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium mt-2 transition-all duration-200 hover:bg-white/[0.04]'
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#5a5855',
              }}
            >
              <LogOut size={13} strokeWidth={2} />
              Logout
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className='flex-1 overflow-y-auto p-6' style={{ scrollbarWidth: 'thin' }}>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div>
              <h2 className='font-bold text-[#f0ede8] mb-0.5 text-[1.05rem]'
                style={{ fontFamily: 'Syne, sans-serif' }}>Overview</h2>
              <p className='text-[11px] text-[#5a5855] mb-5'>Full report summary for {candidateName}</p>

              {/* Stats row */}
              <div className='grid grid-cols-2 gap-3 mb-4'>
                {[
                  { label: 'Match Score', val: `${report.matchScore}%`, sub: 'vs job description', color: scoreColor },
                  { label: 'Technical Q&A', val: report.technicalQuestions.length, sub: 'role-specific questions', color: '#e70f5b' },
                  { label: 'Behavioral Q&A', val: report.behavioralQuestions.length, sub: 'STAR method answers', color: '#f0a030' },
                  { label: 'Prep Plan', val: `${report.preparationPlan.length} days`, sub: 'structured roadmap', color: '#30d060' },
                ].map(({ label, val, sub, color }) => (
                  <div key={label} className='rounded-xl p-4 transition-colors duration-200'
                    style={{ background: '#181520', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className='text-[10px] uppercase tracking-widest text-[#5a5855] mb-2'>{label}</p>
                    <p className='font-black text-[1.8rem] text-[#f0ede8] leading-none mb-1'
                      style={{ fontFamily: 'Syne, sans-serif' }}>{val}</p>
                    <p className='text-[11px]' style={{ color }}>{sub}</p>
                  </div>
                ))}
              </div>

              {/* Skill gap preview */}
              <div className='rounded-xl p-4 mb-4'
                style={{ background: '#181520', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className='text-[10px] uppercase tracking-widest text-[#5a5855] mb-3'>Skill Gaps to Address</p>
                <div className='flex flex-col gap-3'>
                  {report.skillGaps.map((g, i) => {
                    const cfg = SEV[g.severity]
                    return (
                      <div key={i}>
                        <div className='flex justify-between items-center mb-1.5'>
                          <span className='text-xs text-[#d0cdc8]'>{g.skill}</span>
                          <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full'
                            style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                            {cfg.label}
                          </span>
                        </div>
                        <div className='h-[3px] rounded-full bg-white/[0.05] overflow-hidden'>
                          <div className='h-full rounded-full transition-all duration-700'
                            style={{ width: `${cfg.bar}%`, background: cfg.color }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick actions */}
              <div className='rounded-xl p-4'
                style={{ background: '#181520', border: '1px solid rgba(231,15,91,0.12)' }}>
                <p className='text-[10px] uppercase tracking-widest text-[#e70f5b] font-semibold mb-3'>Quick Actions</p>
                <div className='flex flex-wrap gap-2'>
                  {[
                    { label: 'Practice Technical Q&A', target: 'technical' },
                    { label: 'Behavioral Practice', target: 'behavioral' },
                    { label: 'View Road Map', target: 'roadmap' },
                  ].map(({ label, target }) => (
                    <button key={target} onClick={() => setTab(target)}
                      className='text-xs px-4 py-2 rounded-lg transition-all duration-200'
                      style={{ background: 'rgba(231,15,91,0.08)', border: '1px solid rgba(231,15,91,0.18)', color: '#f04a85' }}>
                      {label} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TECHNICAL */}
          {tab === 'technical' && (
            <div>
              <h2 className='font-bold text-[#f0ede8] mb-0.5 text-[1.05rem]'
                style={{ fontFamily: 'Syne, sans-serif' }}>Technical Questions</h2>
              <p className='text-[11px] text-[#5a5855] mb-5'>{report.technicalQuestions.length} questions · Click to expand answer hints</p>
              {report.technicalQuestions.map((q, i) => (
                <QItem key={i} num={i + 1} question={q.question}
                  intention={q.intention} answer={q.answer} accent='pink' />
              ))}
            </div>
          )}

          {/* BEHAVIORAL */}
          {tab === 'behavioral' && (
            <div>
              <h2 className='font-bold text-[#f0ede8] mb-0.5 text-[1.05rem]'
                style={{ fontFamily: 'Syne, sans-serif' }}>Behavioral Questions</h2>
              <p className='text-[11px] text-[#5a5855] mb-5'>{report.behavioralQuestions.length} questions · Use the STAR method</p>
              {report.behavioralQuestions.map((q, i) => (
                <QItem key={i} num={i + 1} question={q.question}
                  intention={q.intention} answer={q.answer} accent='orange' />
              ))}
            </div>
          )}

          {/* ROADMAP */}
          {tab === 'roadmap' && (
            <div>
              <h2 className='font-bold text-[#f0ede8] mb-0.5 text-[1.05rem]'
                style={{ fontFamily: 'Syne, sans-serif' }}>Road Map</h2>
              <p className='text-[11px] text-[#5a5855] mb-5'>{report.preparationPlan.length}-day structured preparation plan</p>

              {/* Timeline */}
              <div className='relative'>
                <div className='absolute left-[19px] top-0 bottom-0 w-px'
                  style={{ background: 'linear-gradient(to bottom, rgba(231,15,91,0.4), rgba(231,15,91,0.05))' }} />
                {report.preparationPlan.map((plan, i) => (
                  <div key={i} className='flex gap-4 mb-4 relative'>
                    <div className='w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10 text-xs font-black'
                      style={{
                        fontFamily: 'Syne, sans-serif', color: '#e70f5b',
                        background: '#0f0e11', border: '2px solid rgba(231,15,91,0.4)'
                      }}>
                      D{plan.day}
                    </div>
                    <div className='flex-1 rounded-xl p-4 transition-colors duration-200'
                      style={{ background: '#181520', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <p className='text-xs font-semibold text-[#f0ede8] mb-2.5'>{plan.focus}</p>
                      {plan.tasks.map((t, j) => (
                        <div key={j} className='flex items-start gap-2 text-[11.5px] text-[#7a7875] mb-2 last:mb-0'>
                          <span className='w-1.5 h-1.5 rounded-full mt-1.5 shrink-0'
                            style={{ background: '#e70f5b', opacity: 0.7 }} />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className='w-52 border-l border-white/[0.07] bg-[#0d0c0f] p-4 overflow-y-auto shrink-0'
          style={{ scrollbarWidth: 'thin' }}>

          {/* MATCH SCORE */}
          <p className='text-[9px] uppercase tracking-widest text-[#3a3835] font-semibold mb-3'>Match Score</p>
          <div className='flex flex-col items-center mb-2'>
            <div className='relative w-[90px] h-[90px]'>
              <svg className='w-full h-full -rotate-90' viewBox='0 0 90 90'>
                <circle cx='45' cy='45' r='36' fill='none'
                  stroke='rgba(255,255,255,0.06)' strokeWidth='7' />
                <circle cx='45' cy='45' r='36' fill='none'
                  stroke={scoreColor} strokeWidth='7' strokeLinecap='round'
                  strokeDasharray={circ} strokeDashoffset={offset} />
              </svg>
              <div className='absolute inset-0 flex items-center justify-center flex-col gap-0.5'>
                <span className='font-black leading-none' style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: '#f0ede8' }}>
                  {report.matchScore}
                </span>
                <span className='text-[9px]' style={{ color: scoreColor }}>/ 100</span>
              </div>
            </div>
            <p className='text-[11px] font-medium text-center mt-2' style={{ color: scoreColor }}>
              {scoreLabel}
            </p>
          </div>

          <div className='h-px bg-white/[0.05] my-4' />

          {/* SKILL GAPS */}
          <p className='text-[9px] uppercase tracking-widest text-[#3a3835] font-semibold mb-3'>Skill Gaps</p>
          <div className='flex flex-col gap-2'>
            {report.skillGaps.map((g, i) => {
              const cfg = SEV[g.severity]
              return (
                <div key={i} className='rounded-lg px-2.5 py-2 text-[11px] font-medium leading-snug'
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                  {g.skill}
                  <span className='block text-[9px] opacity-70 mt-0.5 uppercase tracking-wider'>{cfg.label} priority</span>
                </div>
              )
            })}
          </div>

          <div className='h-px bg-white/[0.05] my-4' />

          {/* STATS */}
          <p className='text-[9px] uppercase tracking-widest text-[#3a3835] font-semibold mb-3'>Report Info</p>
          {[
            { label: 'Role',       val: report.title },
            { label: 'Match',      val: `${report.matchScore}%`, color: scoreColor },
            { label: 'Tech Q&A',   val: `${report.technicalQuestions.length} questions` },
            { label: 'Behavioral', val: `${report.behavioralQuestions.length} questions` },
            { label: 'Prep Days',  val: `${report.preparationPlan.length} days` },
          ].map(({ label, val, color }) => (
            <div key={label} className='flex justify-between items-start mb-2.5'>
              <span className='text-[11px] text-[#4a4845]'>{label}</span>
              <span className='text-[11px] font-medium text-right max-w-[110px] leading-tight'
                style={{ color: color || '#d0cdc8' }}>{val}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Interview