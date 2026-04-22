import { getLiveMatches } from "@/lib/football"

export const dynamic = 'force-static'
 
export async function GET() {
  const data = await getLiveMatches();
  const liveMatches = data.response;
  //console.log(liveMatches);
 
  return Response.json({ liveMatches })
  
}