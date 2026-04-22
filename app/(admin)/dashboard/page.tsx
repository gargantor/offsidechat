"use client";
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Trophy, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Circle, 
  MousePointer2,
  MoreVertical,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-emerald-600 font-black text-xl tracking-tighter italic">MP ADMIN</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<Megaphone size={18}/>} label="Kelola Iklan" active={activeTab === 'ads'} onClick={() => setActiveTab('ads')} />
          <NavItem icon={<Trophy size={18}/>} label="Popular League" active={activeTab === 'leagues'} onClick={() => setActiveTab('leagues')} />
          <NavItem icon={<Users size={18}/>} label="Statistik User" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">AD</div>
            <div>
              <p className="text-xs font-bold text-slate-800">Admin Utama</p>
              <p className="text-[10px] text-slate-500 italic">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-800">
              {activeTab === 'overview' && "Dashboard Overview"}
              {activeTab === 'ads' && "Manajemen Iklan"}
              {activeTab === 'leagues' && "Konfigurasi Liga"}
              {activeTab === 'users' && "Analitik Pengguna"}
            </h2>
            <p className="text-sm text-slate-500 font-medium">Selamat datang kembali, pantau performa MatchPulse hari ini.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
              Download Report
            </button>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-100 transition-all flex items-center gap-2">
              <Plus size={16}/> Tambah Baru
            </button>
          </div>
        </header>

        {/* --- DYNAMIC CONTENT BASED ON TAB --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Total User" value="12,840" trend="+12%" icon={<Users className="text-blue-500" />} />
              <StatCard label="Aktif Chat" value="1,204" trend="+5%" icon={<TrendingUp className="text-emerald-500" />} />
              <StatCard label="API Hits Today" value="45,210" trend="Normal" icon={<LayoutDashboard className="text-amber-500" />} />
              <StatCard label="Ads Revenue" value="Rp 8.2M" trend="+18%" icon={<Megaphone className="text-rose-500" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Leagues List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Liga Populer Saat Ini</h3>
                <div className="space-y-4">
                  <LeagueRow name="Premier League" matches="10 Matches" status="Trending" isPopular />
                  <LeagueRow name="BRI Liga 1" matches="4 Matches" status="High Traffic" isPopular />
                  <LeagueRow name="La Liga" matches="8 Matches" status="Normal" isPopular />
                </div>
              </div>

              {/* Recent Ads Performa */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Performa Iklan Aktif</h3>
                <div className="space-y-4">
                  <AdRow name="Banner Utama - Shopee" clicks="1.2k" ctr="4.2%" status="Active" />
                  <AdRow name="Sidebar - Vidio.com" clicks="850" ctr="2.1%" status="Active" />
                  <AdRow name="Chat Interstitial" clicks="120" ctr="0.8%" status="Paused" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ADS MANAGEMENT TAB --- */}
        {activeTab === 'ads' && (
           <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400">Nama Iklan</th>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400">Posisi</th>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400">Clicks</th>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400">Status</th>
                    <th className="p-4 text-[10px] font-black uppercase text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AdTableItem name="Vidio World Cup" pos="Sticky Bottom" clicks="4,200" active={true} />
                  <AdTableItem name="Nike Football Gear" pos="Sidebar Right" clicks="1,102" active={true} />
                  <AdTableItem name="Indomie Special Edition" pos="Between Matches" clicks="890" active={false} />
                </tbody>
              </table>
           </div>
        )}

      </main>
    </div>
  );
}

/* --- ADMIN UI COMPONENTS --- */

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        active 
        ? 'bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100/50' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, trend, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black text-slate-900 mt-1">{value}</h4>
    </div>
  );
}

function LeagueRow({ name, matches, status, isPopular }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-lg ${isPopular ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'}`}>
          <Trophy size={16} fill={isPopular ? "currentColor" : "none"} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{matches}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-1 rounded-md border border-slate-200">
        {status}
      </span>
    </div>
  );
}

function AdRow({ name, clicks, ctr, status }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <div>
        <p className="text-sm font-bold text-slate-800">{name}</p>
        <p className="text-[10px] text-slate-400 font-medium">CTR: {ctr}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-black text-slate-700">{clicks} Clicks</p>
        <p className={`text-[9px] font-black uppercase ${status === 'Active' ? 'text-emerald-500' : 'text-slate-300'}`}>{status}</p>
      </div>
    </div>
  );
}

function AdTableItem({ name, pos, clicks, active }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-4">
        <p className="text-sm font-bold text-slate-800">{name}</p>
      </td>
      <td className="p-4 text-xs font-medium text-slate-500">{pos}</td>
      <td className="p-4 text-xs font-black text-slate-700">{clicks}</td>
      <td className="p-4">
        <div className={`flex items-center gap-2 text-[10px] font-black uppercase ${active ? 'text-emerald-500' : 'text-slate-300'}`}>
          {active ? <CheckCircle2 size={14}/> : <Circle size={14}/>} {active ? 'Running' : 'Paused'}
        </div>
      </td>
      <td className="p-4">
        <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><MoreVertical size={16}/></button>
      </td>
    </tr>
  );
}