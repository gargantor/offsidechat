import {testData} from './match2';

export async function fetchMatch2(){    
    const groupedByLeague = testData.liveMatches.reduce((acc, current) => {
        const leagueId = current.league.id;

        // Cari apakah liga ini sudah ada di dalam akumulator
        let leagueGroup = acc.find(item => item.league.id === leagueId);

        if (!leagueGroup) {
            // Jika belum ada, buat grup baru untuk liga ini
            leagueGroup = {
            league: current.league, // Mengambil info liga (id, name, logo, flag, dll)
            matches: []
            };
            acc.push(leagueGroup);
        }

        // Masukkan data pertandingan ke dalam grup liga yang sesuai
        leagueGroup.matches.push({
            fixture: current.fixture,
            teams: current.teams,
            goals: current.goals,
            score: current.score
        });

    return acc;
    }, []);

    return groupedByLeague;

}
