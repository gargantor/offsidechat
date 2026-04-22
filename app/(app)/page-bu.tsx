"use client";
import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  Star, 
  Clock, 
  Trophy, 
  LayoutGrid, 
  Filter
} from 'lucide-react';
import GlobalHeader from '@/ui/globalheader'; 
import GlobalSidebar from '@/ui/globalsidebar';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all'); // all, live, finished, scheduled

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#1A1D21] font-sans">
      
      {/* 1. TOP NAVIGATION / SEARCH */}
      {/* ui header here */}
      <GlobalHeader />
      

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        
        {/* --- LEFT SIDEBAR: LEAGUES --- */}
        <GlobalSidebar />

        {/* --- MAIN CONTENT: MATCH LIST --- */}
        <main className="md:col-span-9 lg:col-span-7 space-y-4">
          
          {/* DATE & FILTER NAVIGATION */}
          <div className="bg-[#1a1d21] rounded-lg border border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-800 p-2">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <DateTab label="Sen, 16" />
                <DateTab label="Sel, 17" />
                <DateTab label="Hari Ini" active />
                <DateTab label="Kam, 19" />
                <DateTab label="Jum, 20" />
                <button className="p-2 hover:bg-gray-800 rounded-md text-gray-400"><Calendar size={18} /></button>
              </div>
            </div>

            <div className="flex items-center p-2 gap-2">
              <FilterTab label="Semua" count="42" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
              <FilterTab label="Langsung" count="12" active={activeFilter === 'live'} onClick={() => setActiveFilter('live')} isLive />
              <FilterTab label="Selesai" active={activeFilter === 'finished'} onClick={() => setActiveFilter('finished')} />
              <FilterTab label="Jadwal" active={activeFilter === 'scheduled'} onClick={() => setActiveFilter('scheduled')} />
            </div>
          </div>

          {/* MATCH GROUPS (Contoh Per Liga) */}
          <div className="space-y-4">
            <MatchGroup 
              league="Inggris: Premier League" 
              matches={[
                { id: 1, home: 'Man Utd', away: 'Liverpool', score: '2-1', time: "65'", status: 'live' },
                { id: 2, home: 'Arsenal', away: 'Chelsea', score: '0-0', time: "21:30", status: 'scheduled' }
              ]}
            />
            <MatchGroup 
              league="Spanyol: La Liga" 
              matches={[
                { id: 3, home: 'Real Madrid', away: 'Barcelona', score: '3-2', time: "FT", status: 'finished' }
              ]}
            />
          </div>
        </main>

        {/* --- RIGHT SIDEBAR: MY GAMES / STATS --- */}
        <aside className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="bg-[#1a1d21] rounded-lg border border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <Star size={14} fill="currentColor" /> Pertandingan Saya
              </h3>
            </div>
            <div className="text-center py-8 px-4 border-2 border-dashed border-gray-800 rounded-lg">
              <p className="text-xs text-gray-500">Klik ikon bintang pada pertandingan untuk menambahkannya ke sini.</p>
            </div>
          </div>

          <div className="bg-[#1a1d21] rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-3 bg-gray-800/50 border-b border-gray-800 text-[10px] font-bold uppercase tracking-widest">Top Klasemen</div>
            <div className="p-2 space-y-1">
              <StandingsRow pos={1} team="Man City" p={32} />
              <StandingsRow pos={2} team="Liverpool" p={29} />
              <StandingsRow pos={3} team="Arsenal" p={28} />
              <StandingsRow pos={4} team="Chelsea" p={25} />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */



function DateTab({ label, active }: any) {
  return (
    <button className={`px-4 py-2 text-[11px] font-bold whitespace-nowrap rounded-md transition-all ${active ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>
      {label}
    </button>
  );
}

function FilterTab({ label, count, active, isLive, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-tight transition-all border ${active ? 'bg-[#2b3035] border-gray-600 text-white' : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'}`}>
      {label}
      {count && <span className={`${isLive ? 'text-emerald-400' : 'text-gray-400'}`}>({count})</span>}
    </button>
  );
}

function MatchGroup({ league, matches }: any) {
  return (
    <div className="bg-[#1a1d21] rounded-lg border border-gray-800 overflow-hidden">
      <div className="bg-gray-800/30 px-3 py-2 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star size={12} className="text-gray-600 cursor-pointer hover:text-amber-500 transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{league}</span>
        </div>
        <ChevronRight size={14} className="text-gray-600" />
      </div>
      <div>
        {matches.map((m: any) => (
          <a key={m.id} href={`/match/${m.id}`} className="flex items-center py-3 px-3 hover:bg-[#212529] border-b border-gray-800/50 last:border-0 transition-colors">
            <div className="w-12 text-[10px] font-mono font-bold text-center">
              <span className={m.status === 'live' ? 'text-emerald-400 animate-pulse' : 'text-gray-500'}>
                {m.time}
              </span>
            </div>
            <div className="flex-1 grid grid-cols-1 gap-1">
              <div className="flex justify-between items-center pr-4">
                <span className={`text-sm ${m.status === 'live' ? 'font-semibold' : ''}`}>{m.home}</span>
                <span className="font-mono font-bold text-emerald-400">{m.score.split('-')[0]}</span>
              </div>
              <div className="flex justify-between items-center pr-4">
                <span className={`text-sm ${m.status === 'live' ? 'font-semibold' : ''}`}>{m.away}</span>
                <span className="font-mono font-bold text-emerald-400">{m.score.split('-')[1]}</span>
              </div>
            </div>
            <div className="pl-2 border-l border-gray-800">
              <Star size={14} className="text-gray-700 hover:text-amber-500 transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function StandingsRow({ pos, team, p }: any) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded text-xs transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <span className="w-4 text-gray-500">{pos}.</span>
        <span className="font-medium">{team}</span>
      </div>
      <span className="font-bold">{p}</span>
    </div>
  );
}