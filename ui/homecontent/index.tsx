import React, { useState } from 'react';
import {Calendar, ChevronRight, Star} from 'lucide-react';
import Link from 'next/link';
import { Calendar as MyCalendar} from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function HomeContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [date, setDate] = useState<Date>()
  const handleSelect = (newSelected) => {
    // Update the selected dates
    setDate(newSelected);
  };
  return (
    <>
        {/* DATE & FILTER NAVIGATION */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-2">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <DateTab label="17 Feb" />
                <DateTab label="Hari Ini" active />
                <DateTab label="19 Feb" />
                <DateTab label="20 Feb" />
                
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Calendar size={18} /></button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <MyCalendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
        />

                  </PopoverContent>
                </Popover>
  
                </div>
            </div>

            <div className="flex items-center p-3 gap-2">
                <FilterTab label="Semua" count="42" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
                <FilterTab label="Langsung" count="12" active={activeFilter === 'live'} onClick={() => setActiveFilter('live')} isLive />
                <FilterTab label="Selesai" active={activeFilter === 'finished'} onClick={() => setActiveFilter('finished')} />
            </div>
        </div>
        
        {/* MATCH GROUPS */}
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
    </>
  )
}

function DateTab({ label, active }: any) {
  return (
    <button className={`px-4 py-2 text-[11px] font-black whitespace-nowrap rounded-lg transition-all ${active ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}>
      {label}
    </button>
  );
}

function FilterTab({ label, count, active, isLive, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all border ${active ? 'bg-slate-800 border-slate-800 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
      {label}
      {count && <span className={isLive ? 'text-emerald-500' : 'text-slate-400'}>({count})</span>}
    </button>
  );
}

function MatchGroup({ league, matches }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
      <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star size={14} className="text-slate-300 cursor-pointer hover:text-amber-400 transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-700">{league}</span>
        </div>
        <ChevronRight size={14} className="text-slate-400" />
      </div>
      <div>
        {matches.map((m: any) => (
          <Link key={m.id} href={`match/test`/*`/match/${m.id}`)*/} className="flex items-center py-4 px-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors group">
            <div className="w-12 text-[10px] font-black text-center border-r border-slate-100 mr-4">
              <span className={m.status === 'live' ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}>
                {m.time}
              </span>
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between items-center pr-4">
                <span className={`text-sm ${m.status === 'live' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{m.home}</span>
                <span className={`font-mono font-black ${m.status === 'live' ? 'text-emerald-600' : 'text-slate-900'}`}>{m.score.split('-')[0]}</span>
              </div>
              <div className="flex justify-between items-center pr-4">
                <span className={`text-sm ${m.status === 'live' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{m.away}</span>
                <span className={`font-mono font-black ${m.status === 'live' ? 'text-emerald-600' : 'text-slate-900'}`}>{m.score.split('-')[1]}</span>
              </div>
            </div>
            <div className="pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-1 rounded-md uppercase">Pantau</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
