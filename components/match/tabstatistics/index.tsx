export default function TabStatistics() {
  return (
    <div className="max-w-lg mx-auto space-y-8 py-4">
        <StatRow label="Penguasaan Bola" home="48%" away="52%" pHome={48} pAway={52} />
        <StatRow label="Total Tembakan" home="12" away="9" pHome={60} pAway={40} />
        <StatRow label="Tembakan Tepat Sasaran" home="5" away="3" pHome={62} pAway={38} />
        <StatRow label="Tendangan Sudut" home="8" away="4" pHome={66} pAway={33} />
        <StatRow label="Pelanggaran" home="10" away="14" pHome={40} pAway={60} />
    </div>
  )
}

function StatRow({ label, home, away, pHome, pAway }: any) {
  return (
    <div className="group py-2">
      {/* Label & Nilai */}
      <div className="flex justify-between text-[11px] font-black uppercase mb-2 px-1 tracking-tight">
        <span className="text-slate-900 w-10 text-left">{home}</span>
        <span className="text-slate-400 font-bold">{label}</span>
        <span className="text-slate-900 w-10 text-right">{away}</span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="h-2 flex bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        {/* Home Bar (Merah) */}
        <div 
          className="bg-red-500 transition-all duration-1000 ease-out" 
          style={{ width: `${pHome}%` }}
        ></div>
        {/* Away Bar (Biru) */}
        <div 
          className="bg-blue-500 transition-all duration-1000 ease-out" 
          style={{ width: `${pAway}%` }}
        ></div>
      </div>
    </div>
  );
}