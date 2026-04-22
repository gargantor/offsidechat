import dbConnect from '@/middleware/db-connect'
import { League } from '../../../mongoose/league/model';
import { seedLeagues } from '../../../temp_data/liga';
export async function GET() {
  await dbConnect();
  const leaguesLength = await League.countDocuments()
  console.log(leaguesLength);
  
  if(leaguesLength === 0 ){
    const initialData = seedLeagues;
    await League.insertMany(initialData);
    console.log('Database seeded!');   
  }
  const leagues = await League.find({});
  return Response.json({ leagues })
}