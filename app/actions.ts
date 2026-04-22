
'use server'

import { createMatchSlug, formatDateToYYYYMMDD, groupMatchesByLeagueFromAPI, groupMatchesByLeagueFromDB } from "@/lib/utils";
import { getDateMatches, getLiveMatches, getMatchById } from "@/lib/football";
import dbConnect from "@/middleware/db-connect";
import { LeagueType } from "@/mongoose/league/schema";
import { League } from '@/mongoose/league/model';
import { MatchType } from "@/mongoose/match/schema";
import { createMatchs, findAllMatchs, findMatchsByDate, findMatchById, createMatchWithLeague } from "@/mongoose/match/services";
import {testData} from '@/temp_data/match2';
import { Match } from "@/mongoose/match/model";

export async function testActions() {
  const user = { name: "Hanif robbani" }
  return user
}

export async function actionLiveMatches() {
  const data = await getLiveMatches();
  const liveMatches = data.response;
  return liveMatches
}

export async function actionDateMatches(date:Date){
  let newmatches = [];
    await dbConnect();
    const formattedDateUTC = formatDateToYYYYMMDD(date);
    //console.log(formattedDateUTC); // Example output: "2026-02-27"
    // here should find data match on db
    let matches =  await findMatchsByDate(formattedDateUTC);
    let PromiseMatches;
    if(matches.length<1){
      
      console.log("not date match in db");     
      //const datas = testData; 
      const tempdatas = await getDateMatches(formattedDateUTC); //call from api   
      //const id=1491915;
      //const tempdatas = await getMatchById(id); //call from api   
      const datas =  tempdatas.response;
      
      
      
       
      
    
      
      //const datas =  testData.liveMatches;
      //matches = datas;
      //console.log(datas);
      //console.log(datas);
      PromiseMatches = datas.map(async (data) => {
        const  match = await actionCreateMatchWithLeague(data);
        newmatches.push(match);   
        //console.log('return newmatches');     
        return newmatches;
      });
      const tmpmatches = await Promise.all(PromiseMatches);  
      console.log('tmpmatches[0]');
      console.log(tmpmatches[0]);      
      
      
      
      return groupMatchesByLeagueFromDB(tmpmatches[0])
      
    }else {
      console.log('matches DB:');
      console.log(matches);
      return groupMatchesByLeagueFromDB(matches)
    }
    //console.log(matches);
    //console.log('return matches');
    //return matches;
    
}
async function checkIdMatch(id:number): Promise<any>{
  dbConnect();
  let match = await Match.findOne({ providerMatchId : id})
  const matchWithLeague = await fetchAndPopulateMatch(match._id)
  //console.log(match);
  
  const stringify = JSON.parse(JSON.stringify(matchWithLeague))
  return stringify
}

async function fetchAndPopulateMatch(matchId) {
    // Find the post and use .populate('author') to fetch the referenced user document
    const match = await Match.findById(matchId)
        .populate('league')
        .sort({ startTime: 1 }) // Urutkan berdasarkan jam tanding
        .lean();

    return match;
}

async function actionCreateMatchWithLeague(data:any) {  
  let dataMatch:MatchType = {
    providerMatchId: data.fixture.id,
    startTime: new Date(data.fixture.date),
    homeTeam: {
      name: data.teams.home.name,
      logo: data.teams.home.logo,
      id: data.teams.home.id,      
    },
    awayTeam: {
      name: data.teams.away.name,
      logo: data.teams.away.logo,
      id: data.teams.away.id,
    },
    status: data.fixture.status.short,
    slug: createMatchSlug(data.teams.home.name, data.teams.away.name, new Date(data.fixture.date)), 
    goals: data.goals,

  };
  let dataLeague:LeagueType = {
    name: data.league.name,
    country: data.league.country, 
    logo: data.league.logo,
    providerLeagueId: data.league.id,
    flag: data.league.flag,
  }
  dbConnect();
  try {
    // 1. Cari liga berdasarkan providerLeagueId (ID dari API Football)
    // atau buat baru jika belum ada
    //console.log("League.findOne");
    /* const filter = {providerLeagueId: dataLeague.providerLeagueId};
    let league = await League.findOneAndUpdate(dataLeague, dataLeague, {
      returnDocument: 'after',
      upsert: true,
    })
    
    if(league){
      dataMatch.league = league._id;
      let match = await Match.findOneAndUpdate(dataMatch, dataMatch, {
        returnDocument: 'after',
        upsert: true,
      })
      .populate('league')
      .sort({ startTime: 1 }) // Urutkan berdasarkan jam tanding
      .lean();
      
      return match
    }  */
    //let league = await League.findOne({ providerLeagueId:  dataLeague.providerLeagueId });
    let league = await League.findOneAndUpdate({ providerLeagueId:  dataLeague.providerLeagueId }, dataLeague, {
      returnDocument: 'after',
      upsert: true,
    })
    /* if(!league){
      //console.log("tak ada Liga");
      league = await League.create(dataLeague)
      //console.log(dataLeague);
      //console.log(league);
      
      
    }else{
      //console.log("ada Liga");
    } */
    
    if(league){
      //console.log('sudah add league');
      dataMatch.league = league._id;
      let match = await Match.create(dataMatch)
      const matchWithLeague = await fetchAndPopulateMatch(match._id)
      //console.log(match);
      
      const stringify = JSON.parse(JSON.stringify(matchWithLeague))
      //console.log(stringify);
      
      return stringify;
      //return match
      
    }

    
    
    
  } catch (error) {
    console.error("Gagal membuat match:", error);
    return { success: false, error: "Database error" };    
  }
}
/* async function actionCreateMatches(data:MatchType) {
  dbConnect()
  let match: MatchType = {}
        match.providerMatchId = data.fixture.id;        
        match.startTime = new Date(data.fixture.date);
        //match.leagueId = data.league.id;
        match.homeTeam = {
          name: data.teams.home.name,
          logo: data.teams.home.logo,
          id: data.teams.home.id,
        };
        match.awayTeam = {
          name: data.teams.away.name,
          logo: data.teams.away.logo,
          id: data.teams.away.id,
        }
        match.status = data.fixture.status.short;
        //match.slug = `${data.teams.home.name}`
        return result = await createMatchs(match);
  
} */
