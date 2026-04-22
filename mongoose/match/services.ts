import { FilterMatchType } from "./custom";
import { Match } from "./model";
import { League } from "@/mongoose/league/model"
import { MatchType } from "./schema";
import { LeagueType } from "@/mongoose/league/schema";

async function findMatchs(
    filter: FilterMatchType | {}
): Promise<MatchType[] | []> {
    try {
        let result: Array<MatchType | undefined> = await Match.find(filter);
        return result as MatchType[];
    } catch (error) {
        console.log(error);
                
    }
    return [];    
}

export async function findAllMatchs(): Promise<MatchType[] | []> {
    let filter = {};
    return await findMatchs(filter);    
}

export async function findMatchById(
    providerMatchId: number
): Promise<MatchType[] | []> {
    let filter = {providerMatchId: providerMatchId};
    return await findMatchs(filter);    
}

export async function findMatchsById(
    providerMatchIds: number[]
): Promise<MatchType[] | []> {
    let filter = {providerMatchId: providerMatchIds};
    return await findMatchs(filter);    
}


export async function findMatchsByDate(dateString:string): Promise<MatchType[] | []> {
    try {      
        const tanggal = dateString
        const startOfDay = new Date(dateString);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(dateString);
        endOfDay.setHours(23, 59, 59, 999);
        const awal = new Date(tanggal+'T00:00:00.000Z');
        const akhir = new Date(tanggal+'T23:59:59.999Z');
        
        
        const matches =  await Match.find({
        startTime:{$gte:awal,$lte:akhir}
        //$gte: new Date(2012, 7, 14), 
        //$lt: new Date(2012, 7, 15)
        
        })
        .populate('league')
        .sort({ startTime: 1 }) // Urutkan berdasarkan jam tanding
        .lean(); // Mengembalikan objek JS biasa agar ringan
        //console.log(matches);
        
        return JSON.parse(JSON.stringify(matches));
    } catch (error) {
        console.error("Gagal mencari pertandingan:", error);
        return [];        
    }
    
}
export async function createMatchs(data: MatchType): Promise<MatchType> {
    try {
        let result: MatchType = await Match.create(data);
        return result as MatchType
    } catch (error) {
        console.log(error);
    }
    return null;
    
}

export async function createMatchWithLeague(data:MatchType, dataLeague:LeagueType) {
    try {
        let league:LeagueType = await League.findOne({providerLeagueId: dataLeague.providerLeagueId})
        //console.log(`league is ${league}`);
        if (!league) {
        league = await League.create({
            name: dataLeague.name,
            country: dataLeague.country,
            providerLeagueId: dataLeague.providerLeagueId,
            logo:dataLeague.logo
        });
        //console.log("new league created");
        const newMatch = await Match.create({
            league: league._id, // Menghubungkan Match ke League
            homeTeam: { name: data.homeTeam.name, logo: data.homeTeam.logo, id: data.homeTeam.id },
            awayTeam: { name: data.awayTeam.name, logo: data.awayTeam.logo, id: data.awayTeam.id },
            startTime: data.startTime,
            slug: data.slug,
            providerMatchId: data.providerMatchId
        });
        console.log("new match created");
        return { success: true, match: JSON.parse(JSON.stringify(newMatch)) };
    }
    } catch (error) {
        console.error("Gagal membuat match:", error);
        return { success: false, error: "Database error" };
        
    }
    
}