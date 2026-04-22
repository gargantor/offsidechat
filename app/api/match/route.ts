import { formatDateToYYYYMMDD } from "@/lib/utils";
import { getDateMatches, getMatchById } from "@/lib/football"

export const dynamic = 'force-static'
 
export async function GET() {
  const date  = new Date();
  const formattedDateUTC = "2026-03-05" //formatDateToYYYYMMDD(date);
  const id=1491915;
  //const data = await getDateMatches(formattedDateUTC);
  const data = await getMatchById(id);
  const liveMatches = data.response;
  //console.log(liveMatches);
 
  return Response.json({ liveMatches })
  
}