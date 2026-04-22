import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (str: string): string => {
  if (typeof str !== "string" || !str.trim()) return "?";

  return (
    str
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?"
  );
};

export function formatCurrency(
  amount: number,
  opts?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    noDecimals?: boolean;
  },
) {
  const { currency = "USD", locale = "en-US", minimumFractionDigits, maximumFractionDigits, noDecimals } = opts ?? {};

  const formatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
    maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits,
  };

  return new Intl.NumberFormat(locale, formatOptions).format(amount);
}

//Hanif Code 
export function createMatchSlug(homeTeam: string, awayTeam: string, date: Date | string): string {
  const d = new Date(date);
  
  // Format Tanggal: DD-MM-YYYY
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const dateStr = `${day}-${month}-${year}`;

  // Fungsi untuk membersihkan teks
  const slugify = (text: string) => 
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Ganti spasi dengan -
      .replace(/[^\w\-]+/g, '')       // Hapus karakter non-word (simbol)
      .replace(/\-\-+/g, '-')         // Ganti ganda -- dengan satu -
      .replace(/^-+/, '')             // Hapus - di awal
      .replace(/-+$/, '');            // Hapus - di akhir

  return `${slugify(homeTeam)}-vs-${slugify(awayTeam)}-${dateStr}`;
}

export function formatDateToYYYYMMDD(date:Date) {
  const year = date.getFullYear();
  // getMonth() returns a 0-based index (0 for January), so add 1
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function groupedByLeague(data:[]){
  //console.log(data);
  
  data.reduce((acc, current) => {
    
    
    const leagueId = current.league.providerLeagueId;

    // Cari apakah liga ini sudah ada di dalam akumulator
    let leagueGroup = acc.find(item => item.league.providerLeagueId === leagueId);

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
    //console.log(acc);
    return acc;
  }, []);
  //console.log(data);
  
}

/**
 * Mengelompokkan data fixture dari API-Football berdasarkan Liga
 * @param {Array} matches - Array dari testData.liveMatches
 * @returns {Array} - Data yang sudah terkelompok
 */
export async function groupMatchesByLeagueFromDB(matches) {
  if (!matches || !Array.isArray(matches)) return [];

  return matches.reduce((acc, current) => {
    const leagueId = current.league.providerLeagueId;

    // Cari apakah liga ini sudah ada di dalam akumulator
    let leagueGroup = acc.find(item => item.league.providerLeagueId === leagueId);

    if (!leagueGroup) {
      // Jika belum ada, buat grup baru untuk liga ini
      leagueGroup = {
        league: current.league,
        matches: []
      };
      acc.push(leagueGroup);
    }

    // Masukkan data pertandingan ke dalam grup liga yang sesuai
    leagueGroup.matches.push({
      fixture: current.providerMatchId,
      homeTeam: current.homeTeam,
      awayTeam: current.awayTeam,
      score: current.score,
      goals: current.goals,
      startTime: current.startTime,
      providerMatchId: current.providerMatchId,
      status: current.status,
      slug: current.slug,
    });

    return acc;
  }, []);
}

/**
 * Mengelompokkan data fixture dari API-Football berdasarkan Liga
 * @param {Array} matches - Array dari testData.liveMatches
 * @returns {Array} - Data yang sudah terkelompok
 */
export async function groupMatchesByLeagueFromAPI(matches) {
  if (!matches || !Array.isArray(matches)) return [];
  console.log('group started');
  return matches.reduce((acc, current) => {
    console.log('current:');
    
    
    console.log(current);
    
    const leagueId = current.league.id;

    // Cari apakah liga ini sudah ada di dalam akumulator
    let leagueGroup = acc.find(item => item.league.id === leagueId);

    if (!leagueGroup) {
      // Jika belum ada, buat grup baru untuk liga ini
      leagueGroup = {
        league: current.league,
        matches: []
      };
      acc.push(leagueGroup);
    }

    // Masukkan data pertandingan ke dalam grup liga yang sesuai
    leagueGroup.matches.push({
      fixture: current.fixture,
      homeTeam: current.teams.home,
      awayTeam: current.team.away,
      score: current.score,
      goals: current.goals,
      startTime: current.startTime,
      providerMatchId: current.providerMatchId,
      status: current.status,
      slug: current.slug,
    });

    return acc;
  }, []);
}