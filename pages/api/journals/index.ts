import { NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { connectToDatabase } from '@/lib/db';

export default withAuth(async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const userId = req.user.uid;
  const db = await connectToDatabase();

  if (!db) {
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Create a new journal entry
  if (method === 'POST') {
    try {
      const { content, mood, title = '' } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const result = await db.collection('journals').insertOne({
        userId,
        title,
        content,
        mood: mood ? Number(mood) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({
        id: result.insertedId,
        message: 'Journal entry created successfully',
      });
    } catch (error) {
      console.error('Error creating journal entry:', error);
      return res.status(500).json({ error: 'Failed to create journal entry' });
    }
  }

  // Get all journal entries for the user
  if (method === 'GET') {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const [entries, total] = await Promise.all([
        db.collection('journals')
          .find({ userId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
          .toArray(),
        db.collection('journals').countDocuments({ userId }),
      ]);

      return res.status(200).json({
        data: entries.map(entry => ({
          id: entry._id,
          title: entry.title,
          content: entry.content,
          mood: entry.mood,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        })),
        pagination: {
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      return res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
});
