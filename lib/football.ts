"use server"
export async function getLiveMatches() {
  const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.APIF_KEY as string, // Simpan key di .env
    },
    // Next.js Cache: Data akan di-update setiap 25 detik (sesuai diskusi kita sebelumnya)
    //next: { revalidate: 25 } 
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari API Football");
  }

  return res.json();
}
export async function getDateMatches(date:string) {
  console.log('getDateMatches');
  
  
  const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.APIF_KEY as string, // Simpan key di .env
    },
    // Next.js Cache: Data akan di-update setiap 25 detik (sesuai diskusi kita sebelumnya)
    //next: { revalidate: 25 } 
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari API Football");
  }

  return res.json();
}

export async function getMatchById(id:number) {
  console.log('getMatchById');
  
  const res = await fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
    method: "GET",
    headers: {
      "x-apisports-key": process.env.APIF_KEY as string, // Simpan key di .env
    },
    // Next.js Cache: Data akan di-update setiap 25 detik (sesuai diskusi kita sebelumnya)
    //next: { revalidate: 25 } 
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari API Football");
  }

  return res.json();
}