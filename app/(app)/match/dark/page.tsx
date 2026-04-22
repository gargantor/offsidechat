"use client";
import React, { useState } from 'react';
import { Send, Users, Activity, List, Users as LineupIcon, Trophy } from 'lucide-react';

export default function WatchPartyPage() {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="min-h-screen bg-[#0f1113] text-[#e0e0e0] font-sans">
      
      {/* 1. SCOREBOARD HEADER */}
      <header className="bg-[#1a1d21] border-b border-gray-800 sticky top-0 z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          {/* Home Team */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center p-2 shadow-inner">
               <img src="/api/placeholder/100/100" alt="Home Logo" className="object-contain" />
            </div>
            <span className="font-black text-xs md:text-xl tracking-tight uppercase">Man United</span>
          </div>
          
          {/* Score & Time */}
          <div className="flex flex-col items-center px-4 md:px-10">
            <div className="flex items-center gap-1 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase">65' Live</span>
            </div>
            <div className="text-3xl md:text-5xl font-black tracking-tighter flex items-center gap-3">
              <span>2</span>
              <span className="text-gray-600 font-light">-</span>
              <span>1</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-2 md:gap-4 flex-1 text-right">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center p-2 shadow-inner">
               <img src="/api/placeholder/100/100" alt="Away Logo" className="object-contain" />
            </div>
            <span className="font-black text-xs md:text-xl tracking-tight uppercase">Liverpool</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT GRID */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-[calc(100vh-120px)]">
        
        {/* LEFT PANEL: FLASHCORE STATS */}
        <section className="lg:col-span-8 overflow-y-auto border-r border-gray-800 bg-[#1a1d21]/50">
          
          {/* Internal Tabs */}
          <div className="flex bg-[#212529] border-b border-gray-800 sticky top-0 z-10">
            {[
              { id: 'summary', label: 'Ringkasan', icon: <Trophy size={14}/> },
              { id: 'statistics', label: 'Statistik', icon: <Activity size={14}/> },
              { id: 'lineup', label: 'Line-up', icon: <LineupIcon size={14}/> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id 
                  ? 'text-emerald-400 border-b-2 border-emerald-400 bg-[#2b3035]' 
                  : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-8">
            {/* CONTENT: SUMMARY */}
            {activeTab === 'summary' && (
              <div className="max-w-xl mx-auto space-y-6">
                <EventRow time="32'" team="home" player="B. Fernandes" detail="Assist: Rashford" type="goal" />
                <EventRow time="45+1'" team="away" player="Virgil van Dijk" type="yellow" />
                <EventRow time="58'" team="home" player="Antony (In) / Garnacho (Out)" type="sub" />
                <EventRow time="62'" team="home" player="M. Rashford" detail="Assist: Fernandes" type="goal" />
              </div>
            )}

            {/* CONTENT: STATISTICS */}
            {activeTab === 'statistics' && (
              <div className="max-w-lg mx-auto space-y-8 py-4">
                <StatRow label="Penguasaan Bola" home="48%" away="52%" pHome={48} pAway={52} />
                <StatRow label="Total Tembakan" home="12" away="9" pHome={60} pAway={40} />
                <StatRow label="Tembakan Tepat Sasaran" home="5" away="3" pHome={62} pAway={38} />
                <StatRow label="Tendangan Sudut" home="8" away="4" pHome={66} pAway={33} />
                <StatRow label="Pelanggaran" home="10" away="14" pHome={40} pAway={60} />
              </div>
            )}

            {/* CONTENT: LINEUP */}
            {activeTab === 'lineup' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <LineupList teamName="Man United" formation="4-2-3-1" color="border-red-600" />
                <LineupList teamName="Liverpool" formation="4-3-3" color="border-blue-600" />
              </div>
            )}
          </div>
        </section>

        {/* RIGHT PANEL: LIVE CHAT */}
        <aside className="lg:col-span-4 flex flex-col bg-[#0f1113] h-[600px] lg:h-full border-l border-gray-800">
          <div className="p-4 bg-[#1a1d21] border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-500" />
              <span className="font-bold text-sm tracking-tight">Live Chat</span>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">1,240 Online</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
            <ChatMessage user="Rivaldo_99" msg="GGMU!! Rashford on fire malam ini 🔥" isMe={false} />
            <ChatMessage user="Anfield_Boys" msg="Van Dijk kena kartu kuning konyol bgt" isMe={false} />
            <ChatMessage user="Guest_312" msg="Link streaming lancar dimana guys?" isMe={false} />
            <ChatMessage user="Admin" msg="Gunakan bahasa yang sopan ya teman-teman." isMe={false} isAdmin />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#1a1d21] border-t border-gray-800">
            <div className="flex items-center gap-2 bg-[#0f1113] rounded-xl p-1 pr-2 border border-gray-700 focus-within:border-emerald-500 transition-all">
              <input 
                type="text" 
                placeholder="Tulis pesan..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 outline-none"
              />
              <button className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function StatRow({ label, home, away, pHome, pAway }: any) {
  return (
    <div className="group">
      <div className="flex justify-between text-[11px] font-black uppercase mb-2 px-1 tracking-tighter">
        <span>{home}</span>
        <span className="text-gray-500">{label}</span>
        <span>{away}</span>
      </div>
      <div className="h-1.5 flex bg-gray-800 rounded-full overflow-hidden">
        <div className="bg-red-600 transition-all duration-1000" style={{ width: `${pHome}%` }}></div>
        <div className="bg-blue-600 transition-all duration-1000" style={{ width: `${pAway}%` }}></div>
      </div>
    </div>
  );
}

function EventRow({ time, team, player, detail, type }: any) {
  return (
    <div className="flex items-center gap-4 group">
      <div className={`flex-1 text-right font-bold text-sm ${team === 'away' ? 'opacity-20' : ''}`}>
        {player} {detail && <span className="block text-[10px] text-gray-500 font-normal">{detail}</span>}
      </div>
      <div className="w-10 h-10 rounded-lg bg-[#2b3035] border border-gray-700 flex items-center justify-center text-[11px] font-black shadow-lg group-hover:border-emerald-500 transition-colors">
        {time}
      </div>
      <div className={`flex-1 text-left font-bold text-sm ${team === 'home' ? 'opacity-20' : ''}`}>
        {type === 'goal' && <span className="text-emerald-500">⚽ Goal!</span>}
        {type === 'yellow' && <span className="text-amber-500">🟨 Kartu Kuning</span>}
        {type === 'sub' && <span className="text-gray-400">🔄 Pergantian</span>}
        {team === 'away' ? player : ''}
      </div>
    </div>
  );
}

function LineupList({ teamName, formation, color }: any) {
  return (
    <div className="space-y-3">
      <div className={`border-l-4 ${color} pl-3 py-1 bg-[#212529]`}>
        <h4 className="text-xs font-black uppercase tracking-widest">{teamName}</h4>
        <p className="text-[10px] text-gray-500">{formation}</p>
      </div>
      <div className="grid gap-1">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded text-xs transition-colors cursor-pointer">
            <span className="w-5 text-gray-500 font-mono">2{i}</span>
            <span className="flex-1 font-semibold">Pemain Ke-{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMessage({ user, msg, isAdmin }: any) {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2">
      <span className={`text-[10px] font-black tracking-tight ${isAdmin ? 'text-rose-500' : 'text-emerald-400'}`}>
        {user} {isAdmin && '• Staff'}
      </span>
      <div className={`mt-1 p-2.5 rounded-xl rounded-tl-none text-xs leading-relaxed shadow-sm ${isAdmin ? 'bg-rose-500/10 border border-rose-500/20' : 'bg-[#1a1d21] border border-gray-800'}`}>
        {msg}
      </div>
    </div>
  );
}