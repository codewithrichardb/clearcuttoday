import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const db = await connectToDatabase() 
    const users = await db.collection("users").find({}).toArray();
    
    
    res.status(200).json(users);
  } catch (error) {
    console.error("Admin API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
