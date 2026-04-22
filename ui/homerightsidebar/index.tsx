import React from 'react'
import {Star} from 'lucide-react'

export default function HomeRightSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Star size={14} className="text-amber-400 fill-amber-400" /> Pertandingan Saya
            </h3>
            <div className="text-center py-6 px-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <p className="text-[11px] text-slate-500 font-medium">Klik bintang pada laga untuk memantau skor di sini.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
              Klasemen Live
            </div>
            <div className="p-2 space-y-0.5">
              <StandingsRow pos={1} team="Man City" p={32} active />
              <StandingsRow pos={2} team="Liverpool" p={29} />
              <StandingsRow pos={3} team="Arsenal" p={28} />
              <StandingsRow pos={4} team="Chelsea" p={25} />
            </div>
          </div>
    </aside>
  )
}

function StandingsRow({ pos, team, p, active }: any) {
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg text-xs transition-colors cursor-pointer ${active ? 'bg-slate-800 text-white' : 'hover:bg-slate-50'}`}>
      <div className="flex items-center gap-3">
        <span className={`w-4 font-bold ${active ? 'text-emerald-400' : 'text-slate-400'}`}>{pos}.</span>
        <span className="font-bold uppercase tracking-tighter">{team}</span>
      </div>
      <span className={`font-black ${active ? 'text-emerald-400' : 'text-slate-900'}`}>{p}</span>
    </div>
  );
}