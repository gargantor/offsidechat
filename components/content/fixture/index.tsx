import React, { useEffect, useState } from 'react';
import {Calendar, ChevronRight, Star} from 'lucide-react';
import { format } from "date-fns";
import Link from 'next/link';
import FixtureNav from '../fixturenav';
import { actionDateMatches } from '@/app/actions';
import { groupMatchesByLeagueFromDB } from '@/lib/utils';


export default function FixtureContent() {
  
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const onChangeDate = (newSelected) => {
    // Update the selected dates
    setDate(newSelected);
  };
  

  useEffect(() => {
            
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await actionDateMatches(new Date(date));
        //console.log(Promise.race(response));        
        //const TheData = await groupMatchesByLeagueFromDB(response);
        //console.log(TheData);
        setData(response);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
        
        
      } 
    }
    // callback pattern

    /* const fetchData = () => {
      setLoading(true);
      actionDateMatches(new Date(date))
      .then((response) => {
        // Hasil dari actionDateMatches diteruskan ke fungsi pengelompokan
        console.log(response);
        
        return groupMatchesByLeagueFromDB(response);
      })
      .then((theData) => {
        // Di sini Anda mendapatkan hasil akhir (theData)
        console.log(theData);
        setLoading(false); 
        setData(theData);
        
        // Lanjutkan logika UI Anda di sini (misal: setMatches(theData))
      })
      .catch((error) => {
        // Sangat disarankan untuk selalu menambahkan catch untuk menangani error
        console.error("Terjadi kesalahan:", error);
      }); 
    } */
    
    fetchData();
                       
         
    
  return () => { }
}, [])
  

  return (
    <>
        {/* DATE & FILTER NAVIGATION */}
        <FixtureNav onChangeDate={onChangeDate}  />
        
        
        
        {/* MATCH GROUPS */}
        <p><button onClick={()=>setLoading(!loading)}>change loading</button></p>
        <p>{date}</p>
        <div className="space-y-4">
           {data?.map((group) => (
            <div key={group.league.providerLeagueId}>
              <MatchGroup 
                league={group.league}
                matches={group.matches}
                loading={loading}
              />              
            </div>
          ))} 
            {/* <MatchGroup 
                loading={loading}
                league="Inggris: Premier League" 
                matches={[
                { id: 1, home: 'Man Utd', away: 'Liverpool', score: '2-1', time: "65'", status: 'live' },
                { id: 2, home: 'Arsenal', away: 'Chelsea', score: '0-0', time: "21:30", status: 'scheduled' }
                ]}
            />
            <MatchGroup 
                loading={loading}
                league="Spanyol: La Liga" 
                matches={[
                { id: 3, home: 'Real Madrid', away: 'Barcelona', score: '3-2', time: "FT", status: 'finished' }
                ]}
            /> */}
        </div>
    </>
  )
}
function MatchGroup({ league, matches, loading }: any) {
  return(
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
        <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!loading &&(<>
            <Star size={14} className="text-slate-300 cursor-pointer hover:text-amber-400 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-700">{league.name}</span>
            </>)}
            {loading &&(<>
            <div className="w-4 h-4 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
            </>)}
          </div>
        </div>
        {matches?.map((match) => (
          <div key={match.fixture}>
            <MatchRow 
              match={match}
              loading={loading}
            />
          </div>
        ))}
      </div>
    {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
      <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!loading &&(<>
          <Star size={14} className="text-slate-300 cursor-pointer hover:text-amber-400 transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-700">{league}</span>
          </>)}
          {loading &&(<>
          <div className="w-4 h-4 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
          </>)}
        </div>
        <ChevronRight size={14} className="text-slate-400" />
      </div>
      {matches.map((match) => (
        <MatchRow key={match.id} loading={loading} match={match} />
      ))}
    </div> */}
    </>
  )

}

function MatchRow({match, loading}): any {
  return(
    <>
    {!loading &&(
      <Link key={match.id} href={`match/test`/*`/match/${m.id}`)*/} className="flex items-center py-4 px-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors group">
        <div className="w-12 text-[10px] font-black text-center border-r border-slate-100 mr-4">
          <span className={match.status === 'live' ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}>
            TIME(for later)
          </span>
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-center pr-4">
            <span className={`text-sm ${match.status === 'live' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{match.homeTeam.name}</span>
            <span className={`font-mono font-black ${match.status === 'live' ? 'text-emerald-600' : 'text-slate-900'}`}>{match.goals.home}</span>
          </div>
          <div className="flex justify-between items-center pr-4">
            <span className={`text-sm ${match.status === 'live' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{match.awayTeam.name}</span>
            <span className={`font-mono font-black ${match.status === 'live' ? 'text-emerald-600' : 'text-slate-900'}`}>{match.goals.away}</span>
          </div>
        </div>
        <div className="pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-1 rounded-md uppercase">Pantau</div>
        </div>
      </Link>
    )}
    {loading &&(
        <div className="flex items-center py-4 px-4 border-b border-slate-100 last:border-0">
          {/* Time/Status Skeleton */}
          <div className="w-12 border-r border-slate-100 mr-4">
            <div className="h-3 w-8 bg-slate-200 rounded animate-pulse" />
          </div>
          
          {/* Teams Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center pr-4">
              <div className="h-4 w-32 bg-slate-200 rounded animate-shimmer" />
              <div className="h-4 w-4 bg-slate-100 rounded" />
            </div>
            <div className="flex justify-between items-center pr-4">
              <div className="h-4 w-28 bg-slate-200 rounded animate-shimmer" />
              <div className="h-4 w-4 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
    )}
    </>

  )
}
function MatchRow2({match, loading}): any {
  return (
    <>
    {!loading &&(
      <Link key={match.id} href={`match/test`/*`/match/${m.id}`)*/} className="flex items-center py-4 px-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors group">
        <div className="w-12 text-[10px] font-black text-center border-r border-slate-100 mr-4">
          <span className={match.status === 'live' ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}>
            TIME(for later)
          </span>
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-center pr-4">
            <span className={`text-sm ${match.status === 'live' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{match.homeTeam.name}</span>
            <span className={`font-mono font-black ${match.status === 'live' ? 'text-emerald-600' : 'text-slate-900'}`}>{match.score.home}</span>
          </div>
          <div className="flex justify-between items-center pr-4">
            <span className={`text-sm ${match.status === 'live' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{match.awayTeam.name}</span>
            <span className={`font-mono font-black ${match.status === 'live' ? 'text-emerald-600' : 'text-slate-900'}`}>{match.score.away}</span>
          </div>
        </div>
        <div className="pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-1 rounded-md uppercase">Pantau</div>
        </div>
      </Link>
    )}
    {loading &&(
        <div className="flex items-center py-4 px-4 border-b border-slate-100 last:border-0">
          {/* Time/Status Skeleton */}
          <div className="w-12 border-r border-slate-100 mr-4">
            <div className="h-3 w-8 bg-slate-200 rounded animate-pulse" />
          </div>
          
          {/* Teams Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center pr-4">
              <div className="h-4 w-32 bg-slate-200 rounded animate-shimmer" />
              <div className="h-4 w-4 bg-slate-100 rounded" />
            </div>
            <div className="flex justify-between items-center pr-4">
              <div className="h-4 w-28 bg-slate-200 rounded animate-shimmer" />
              <div className="h-4 w-4 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
    )}
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

function MatchGroupBu({ league, matches, loading }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
      <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!loading &&(<>
          <p>loading adalah false {loading}</p>
          <Star size={14} className="text-slate-300 cursor-pointer hover:text-amber-400 transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-700">{league}</span>
          </>)}
          {loading &&(<>
          <p>loading adalah true {loading}</p>
          <div className="w-4 h-4 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
          </>)}
        </div>
        <ChevronRight size={14} className="text-slate-400" />
      </div>
      <div>
        {matches.map((m: any) => (
          <>
          {!loading &&(
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
          )}
          {loading &&(
            <div className="flex items-center py-4 px-4 border-b border-slate-100 last:border-0">
              {/* Time/Status Skeleton */}
              <div className="w-12 border-r border-slate-100 mr-4">
                <div className="h-3 w-8 bg-slate-200 rounded animate-pulse" />
              </div>
              
              {/* Teams Skeleton */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center pr-4">
                  <div className="h-4 w-32 bg-slate-200 rounded animate-shimmer" />
                  <div className="h-4 w-4 bg-slate-100 rounded" />
                </div>
                <div className="flex justify-between items-center pr-4">
                  <div className="h-4 w-28 bg-slate-200 rounded animate-shimmer" />
                  <div className="h-4 w-4 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          )}
          
          </>
          
        ))}
      </div>
    </div>
  );
}
