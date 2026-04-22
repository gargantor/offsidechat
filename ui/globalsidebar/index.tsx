import {ChevronRight, Trophy, Globe} from 'lucide-react'

export default function GlobalSidebar() {
  return (
    <aside className="hidden md:block md:col-span-3 lg:col-span-2 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Trophy size={12} /> Liga Utama
          </h3>
        </div>
        <div className="p-2 space-y-0.5">
          <LeagueItem name="Premier League" country="Inggris" active />
          <LeagueItem name="La Liga" country="Spanyol" />
          <LeagueItem name="Serie A" country="Italia" />
          <LeagueItem name="Bundesliga" country="Jerman" />
          <LeagueItem name="BRI Liga 1" country="Indonesia" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Globe size={12} /> Negara
          </h3>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2 space-y-0.5 scrollbar-thin">
          {['Argentina', 'Australia', 'Belanda', 'Brasil', 'Prancis', 'Portugal'].map(country => (
            <div key={country} className="flex justify-between items-center px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors group">
              <span>{country}</span>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function LeagueItem({ name, country, active }: any) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${active ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
      <div className="flex flex-col">
        <span className="text-xs">{name}</span>
        <span className="text-[9px] font-bold opacity-60 leading-none uppercase tracking-tighter">{country}</span>
      </div>
    </div>
  );
}
