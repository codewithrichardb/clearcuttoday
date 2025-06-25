import { NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { connectToDatabase } from '@/lib/db';

export default withAuth(async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.user.uid;
    const { mood } = req.body;

    if (typeof mood !== 'number' || mood < 1 || mood > 5) {
      return res.status(400).json({ error: 'Invalid mood value. Must be between 1 and 5.' });
    }

    const db = await connectToDatabase();
    if (!db) {
      throw new Error('Failed to connect to database');
    }

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Update or insert mood record
    await db.collection('moodEntries').updateOne(
      { userId, date: today },
      { $set: { mood, updatedAt: new Date() } },
      { upsert: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving mood:', error);
    return res.status(500).json({ error: 'Failed to save mood' });
  }
});
