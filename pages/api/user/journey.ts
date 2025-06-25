import { NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { connectToDatabase } from '@/lib/db';

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.user.uid;
    const db = await connectToDatabase();
    
    if (!db) {
      throw new Error('Failed to connect to database');
    }

    const journey = await db.collection('userJourneys').findOne({ userId });

    if (!journey) {
      return res.status(404).json({ error: 'No journey data found' });
    }

    // Remove MongoDB _id and userId from the response
    // Using void to explicitly ignore the _id field
    const { _id, ...journeyData } = journey;
    void _id; // Explicitly mark as unused
    
    return res.status(200).json(journeyData);
  } catch (error) {
    console.error('Error fetching user journey:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ 
      error: 'Internal server error',
      message: errorMessage 
    });
  }
}

export default withAuth(handler);
