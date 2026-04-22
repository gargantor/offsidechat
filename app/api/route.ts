import dbConnect from '@/middleware/db-connect';
import { NextResponse } from "next/server";

type Data = {
  name: string;
};

export async function GET() {
   await dbConnect(); // Your db connection
  
  return NextResponse.json({ name: "John Doe" }, { status: 200 });
}