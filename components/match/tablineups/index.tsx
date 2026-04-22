import React from 'react'

export default function TabLineups() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Kolom Tuan Rumah (Home) */}
        <LineupList 
        teamName="Man United" 
        formation="4-2-3-1" 
        color="border-red-500"
        players={[
            { number: '24', name: 'Andre Onana', isGK: true },
            { number: '20', name: 'Diogo Dalot' },
            { number: '6', name: 'Lisandro Martinez' },
            { number: '8', name: 'Bruno Fernandes', isCaptain: true },
            { number: '10', name: 'Marcus Rashford' },
            { number: '11', name: 'Rasmus Hojlund' },
        ]}
        />

        {/* Kolom Tamu (Away) */}
        <LineupList 
        teamName="Liverpool" 
        formation="4-3-3" 
        color="border-blue-500"
        players={[
            { number: '1', name: 'Alisson Becker', isGK: true },
            { number: '4', name: 'Virgil van Dijk', isCaptain: true },
            { number: '66', name: 'Trent Alexander-Arnold' },
            { number: '10', name: 'Alexis Mac Allister' },
            { number: '11', name: 'Mohamed Salah' },
            { number: '7', name: 'Luis Diaz' },
        ]}
        />
    </div>
  )
}

function LineupList({ teamName, formation, color, players }: any) {
  return (
    <div className="flex flex-col">
      {/* Header Tim dengan Aksen Warna */}
      <div className={`flex justify-between items-end pb-2 mb-2 border-b-2 ${color}`}>
        <div>
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">
            Starting XI
          </h4>
          <h3 className="text-base font-black text-slate-900 uppercase">
            {teamName}
          </h3>
        </div>
        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {formation}
        </span>
      </div>

      {/* Daftar Pemain */}
      <div className="flex flex-col">
        {players.map((p: any) => (
          <PlayerRow 
            key={p.number} 
            number={p.number} 
            name={p.name} 
            isGK={p.isGK} 
            isCaptain={p.isCaptain} 
          />
        ))}
      </div>
    </div>
  );
}
function PlayerRow({ number, name, isGK, isCaptain }: any) {
  return (
    <div className="flex items-center gap-4 py-3 px-3 border-b border-slate-50 hover:bg-slate-50 transition-colors group cursor-pointer">
      {/* Nomor Punggung - Gaya Monospace Flashscore */}
      <span className="w-6 text-[11px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
        {number}
      </span>
      
      {/* Nama Pemain */}
      <div className="flex-1 flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-950">
          {name}
        </span>
        
        {/* Badge Kapten */}
        {isCaptain && (
          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-black border border-amber-200 uppercase">
            C
          </span>
        )}
      </div>

      {/* Label Posisi/Status Khusus */}
      {isGK && (
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          GK
        </span>
      )}
    </div>
  );
}