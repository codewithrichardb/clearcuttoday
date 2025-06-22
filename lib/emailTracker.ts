import { NextApiRequest, NextApiResponse } from "next";

export async function trackOpen(req: NextApiRequest, res: NextApiResponse) {
  const { email, day } = req.query;
  if (!email || !day) return res.status(400).end();

  const { MongoClient } = await import("mongodb");
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const db = client.db("clearcut");

  await db.collection("users").updateOne(
    { email },
    {
      $addToSet: { opened: parseInt(day as string) },
      $set: { [`lastOpened`]: new Date() },
    }
  );

  client.close();
  res.setHeader("Content-Type", "image/gif");
  res.send(
    Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64")
  );
}
