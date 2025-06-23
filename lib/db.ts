// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!uri) throw new Error('Please define the MONGODB_URI environment variable');
if (!dbName) throw new Error('Please define the MONGODB_DB_NAME environment variable');

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = cachedClient ?? new MongoClient(uri);
  if (!cachedClient) cachedClient = client;

  await client.connect();
  const db = client.db(dbName);
  cachedDb = db;

  return db;
}

interface User {
  email: string;
  timezone?: string;
  preferredSendTime?: number; // Hour in 24h format (0-23)
  registeredAt: Date;
  day: number;
  lastEmailSent?: Date;
}


export async function findUserByEmail(email: string) {
  const db = await connectToDatabase();
  return db.collection('users').findOne({ email });
}

export async function createUser(email: string) {
  const db = await connectToDatabase();
  const now = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  
  return db.collection('users').insertOne({
    email,
    registeredAt: now,
    day: 1,
    timezone,
    preferredSendTime: 9
  });
}

// Keep these simple exports for future use
export async function updateUser(email: string, updates: Partial<Omit<User, 'email' | 'registeredAt'>>) {
  const db = await connectToDatabase();
  const result = await db.collection('users').updateOne(
    { email },
    { $set: updates }
  );
  return result;

}

export async function findUsersToNotify() {
  const db = await connectToDatabase();
  const now = new Date();

  // Get all users who haven't received an email today and are on day < 7
  const users = await db.collection('users').find({
    day: { $lt: 7 },
    $and: [
      {
        $or: [
          // Users with timezone set
          {
            timezone: { $exists: true, $ne: null },
            $expr: {
              $eq: [
                { $hour: { date: now, timezone: '$timezone' } },
                '$preferredSendTime'
              ]
            }
          },
          // Fallback for users without timezone (UTC)
          {
            $or: [
              { timezone: { $exists: false } },
              { timezone: null }
            ],
            $expr: {
              $and: [
                { $eq: [{ $hour: now }, 9] } // 9 AM UTC
              ]
            }
          }
        ]
      },
      {
        $or: [
          { lastEmailSent: { $exists: false } },
          { lastEmailSent: null },
          { lastEmailSent: { $lt: new Date(now.setHours(0, 0, 0, 0)) } }
        ]
      }
    ]
  }).toArray();

  return users;
}

