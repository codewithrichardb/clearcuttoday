import { NextApiRequest, NextApiResponse } from 'next';
import { withDatabase } from '@/lib/db';
import { userJourneySchema } from '@/lib/schemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, track, intentions } = req.body;
    
    // Validate input
    const validatedData = userJourneySchema.partial().parse({
      userId,
      track,
      intentions,
    });

    await withDatabase(async (db) => {
      const userJourney = db.collection('userJourneys');
      
      // Upsert the user's journey
      await userJourney.updateOne(
        { userId },
        { $set: { ...validatedData, lastActive: new Date() } },
        { upsert: true }
      );
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return res.status(500).json({ 
      error: 'Failed to save onboarding data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
