import { NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export default withAuth(async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;
  const userId = req.user.uid;
  const db = await connectToDatabase();

  if (!db) {
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Validate ObjectId
  if (!ObjectId.isValid(id as string)) {
    return res.status(400).json({ error: 'Invalid journal ID' });
  }

  const journalId = new ObjectId(id as string);

  // Get a single journal entry
  if (method === 'GET') {
    try {
      const entry = await db.collection('journals').findOne({
        _id: journalId,
        userId
      });

      if (!entry) {
        return res.status(404).json({ error: 'Journal entry not found' });
      }

      return res.status(200).json({
        _id: entry._id,
        title: entry.title || '',
        content: entry.content,
        mood: entry.mood || null,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt
      });
    } catch (error) {
      console.error('Error fetching journal entry:', error);
      return res.status(500).json({ error: 'Failed to fetch journal entry' });
    }
  }

  // Update a journal entry
  if (method === 'PUT') {
    try {
      const { title, content, mood } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const updateData: any = {
        content,
        updatedAt: new Date(),
      };

      if (title !== undefined) {
        updateData.title = title;
      }
      if (mood !== undefined) {
        updateData.mood = mood !== null ? Number(mood) : null;
      }

      const result = await db.collection('journals').updateOne(
        { _id: journalId, userId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Journal entry not found' });
      }

      return res.status(200).json({
        message: 'Journal entry updated successfully',
        updated: result.modifiedCount > 0
      });
    } catch (error) {
      console.error('Error updating journal entry:', error);
      return res.status(500).json({ error: 'Failed to update journal entry' });
    }
  }

  // Delete a journal entry
  if (method === 'DELETE') {
    try {
      const result = await db.collection('journals').deleteOne({
        _id: journalId,
        userId
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Journal entry not found' });
      }

      return res.status(200).json({
        message: 'Journal entry deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      return res.status(500).json({ error: 'Failed to delete journal entry' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
});
