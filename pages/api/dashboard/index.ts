import { NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { connectToDatabase } from '@/lib/db';
import { DashboardData } from '@/types/dashboard';

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse<{ data?: DashboardData; error?: string }>
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

    // Fetch user journey data
    const journey = await db.collection('userJourneys').findOne({ userId });
    
    // Fetch other dashboard data (example - adjust according to your collections)
    const [recentJournals] = await Promise.all([
      db.collection('journals')
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray()
    ]);

    // Calculate streak based on consecutive journal entries
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Get all journal entries sorted by date
    const allJournals = await db.collection('journals')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    // Calculate streak
    let streak = 0;
    if (allJournals.length > 0) {
      let currentDate = new Date(today);
      const lastJournalDate = new Date(allJournals[0].createdAt);
      
      // If latest journal is from today, start counting from yesterday
      if (lastJournalDate.toDateString() === today.toDateString()) {
        streak = 1;
        currentDate = new Date(yesterday);
      }
      
      // Count consecutive days with journal entries
      for (let i = 0; i < allJournals.length; i++) {
        const journalDate = new Date(allJournals[i].createdAt);
        if (journalDate.toDateString() === currentDate.toDateString()) {
          continue; // Skip if we've already counted this day
        }
        
        if (journalDate.toDateString() === currentDate.toDateString()) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break; // Streak broken
        }
      }
    }
    
    // Get today's mood from mood entries
    const todayMood = await db.collection('moodEntries').findOne({
      userId,
      date: todayDateString
    });
    
    // Get latest mood from journals as fallback (for backward compatibility)
    const latestMoodJournal = allJournals.find(j => j.mood !== undefined);
    const latestMood = todayMood?.mood || latestMoodJournal?.mood || null;

    // TODO: Implement actual next activity logic here
    // For now, we'll set it to null
    const nextActivity = null;

    const response: DashboardData = {
      journey: journey ? {
        track: journey.track,
        intentions: journey.intentions,
        createdAt: journey.createdAt,
        updatedAt: journey.updatedAt
      } : null,
      stats: {
        streak,
        mood: latestMood,
        recentJournals: recentJournals.map(journal => ({
          id: journal._id.toString(),
          title: journal.title || 'Untitled',
          content: journal.content,
          createdAt: journal.createdAt,
          updatedAt: journal.updatedAt || journal.createdAt
        }))
      },
      nextActivity
    };
    
    return res.status(200).json({ data: response });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    console.error('Dashboard API error:', error);
    return res.status(500).json({ 
      error: 'Failed to load dashboard data. Please try again later.'
    });
  }
}

export default withAuth(handler);
