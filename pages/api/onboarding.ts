import { NextApiResponse } from 'next';
import { userJourneySchema } from '@/lib/schemas';
import { connectToDatabase } from '@/lib/db';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.user.uid;
    const { track, intentions } = req.body;

    // Validate the request body
    const validatedData = userJourneySchema.parse({
      userId,
      track,
      intentions,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Get the database connection
    const db = await connectToDatabase();
    if (!db) {
      throw new Error('Failed to connect to database');
    }

    // Save to MongoDB
    const result = await db.collection('userJourneys').updateOne(
      { userId },
      { $set: validatedData },
      { upsert: true }
    );

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error in onboarding API:', error);
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError' && 'errors' in error) {
      const zodError = error as { errors: unknown };
      return res.status(400).json({ 
        error: 'Validation error',
        details: zodError.errors 
      });
    }
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ 
      error: 'Internal server error',
      message: errorMessage 
    });
  }
}

export default withAuth(handler);
