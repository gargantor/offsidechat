import React from 'react'

export default function ScoreBoard() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center p-2 shadow-sm">
               <img src="/api/placeholder/100/100" alt="Home" />
            </div>
            <span className="font-black text-xs md:text-xl tracking-tight uppercase text-slate-800">Man United</span>
          </div>
          
          <div className="flex flex-col items-center px-4 md:px-10">
            <div className="flex items-center gap-1 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-600 text-[10px] md:text-xs font-bold tracking-widest uppercase">65' Live</span>
            </div>
            <div className="text-3xl md:text-5xl font-black tracking-tighter flex items-center gap-3 text-slate-900">
              <span>2</span>
              <span className="text-gray-300 font-light">-</span>
              <span>1</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-2 md:gap-4 flex-1 text-right">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center p-2 shadow-sm">
               <img src="/api/placeholder/100/100" alt="Away" />
            </div>
            <span className="font-black text-xs md:text-xl tracking-tight uppercase text-slate-800">Liverpool</span>
          </div>
        </div>
      </header>
  )
}
