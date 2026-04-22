export default function TabSummary() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
        <EventRow time="32'" team="home" player="B. Fernandes" detail="Assist: Rashford" type="goal" />
        <EventRow time="45+1'" team="away" player="Virgil van Dijk" type="yellow" />
        <EventRow time="58'" team="home" player="Antony (In) / Garnacho (Out)" type="sub" />
        <EventRow time="62'" team="home" player="M. Rashford" detail="Assist: Fernandes" type="goal" />
    </div>
  )
}

function EventRow({ time, team, player, detail, type }: any) {
  // Cek tipe kejadian untuk menentukan warna/ikon
  const renderIcon = () => {
    switch (type) {
      case 'goal': return <span className="text-emerald-600">⚽</span>;
      case 'yellow': return <div className="w-2.5 h-3.5 bg-amber-400 rounded-[2px] shadow-sm"></div>;
      case 'red': return <div className="w-2.5 h-3.5 bg-rose-600 rounded-[2px] shadow-sm"></div>;
      case 'sub': return <span className="text-slate-400 text-xs">🔄</span>;
      default: return null;
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-6 group relative py-3">
      {/* Sisi Kiri (Home) */}
      <div className={`flex-1 flex flex-col items-end text-right pr-2 ${team === 'away' ? 'opacity-0 invisible' : ''}`}>
        <span className="text-sm font-bold text-slate-800">{player}</span>
        {detail && <span className="text-[10px] text-slate-500 leading-none">{detail}</span>}
      </div>

      {/* Indikator Menit & Garis Tengah */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-10 h-8 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[11px] font-black text-slate-700 group-hover:border-emerald-500 transition-colors">
          {time}
        </div>
        {/* Ikon kecil di bawah menit */}
        <div className="mt-1 h-4 flex items-center justify-center">
          {renderIcon()}
        </div>
      </div>

      {/* Sisi Kanan (Away) */}
      <div className={`flex-1 flex flex-col items-start text-left pl-2 ${team === 'home' ? 'opacity-0 invisible' : ''}`}>
        <span className="text-sm font-bold text-slate-800">{player}</span>
        {detail && <span className="text-[10px] text-slate-500 leading-none">{detail}</span>}
      </div>
    </div>
  );
}