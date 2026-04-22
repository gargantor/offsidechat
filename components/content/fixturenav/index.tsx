import React, { useState } from 'react'
import {Calendar} from 'lucide-react';
import { Calendar as MyCalendar} from '@/components/ui/calendar'
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function FixtureNav({onChangeDate}) {
    const [activeFilter, setActiveFilter] = useState('all');
    
  return (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <DateTab label="17 Feb" onChangeDate={onChangeDate}/>
                <DateTab label="Hari Ini"active onChangeDate={onChangeDate} />
                <DateTab label="19 Feb" onChangeDate={onChangeDate}/>
                <DateTab label="20 Feb" onChangeDate={onChangeDate}/>
                
                <Popover>
                    <PopoverTrigger asChild>
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Calendar size={18} /></button>
                    </PopoverTrigger>
                    <PopoverContent>
                    <MyCalendar
                        mode="single"
                        //selected={date}
                        //onSelect={handleSelect}
                    />

                    </PopoverContent>
                </Popover>
    
            </div>
        </CardHeader>
        <CardBody>
            <div className="flex items-center p-3 gap-2">
                <FilterTab label="Semua" count="42" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
                <FilterTab label="Langsung" count="12" active={activeFilter === 'live'} onClick={() => setActiveFilter('live')} isLive />
                <FilterTab label="Selesai" active={activeFilter === 'finished'} onClick={() => setActiveFilter('finished')} />
            </div>
            
        </CardBody>
    </Card>
  )
}

function DateTab({ label, active, onChangeDate }: any) {
  const handleChangeDate = () => {
    
    // Call the function passed from the parent and pass data back up
    onChangeDate(label);
  };
  return (
    <button onClick={handleChangeDate} className={`px-4 py-2 text-[11px] font-black whitespace-nowrap rounded-lg transition-all ${active ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}>
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