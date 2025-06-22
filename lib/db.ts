import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'clearcut';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsInsecure: false,
    retryWrites: true,
    w: 'majority',
    retryReads: true,
  });

  const db = client.db(dbName);
  
  // Cache the database connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function withDatabase<T>(
  operation: (db: Db) => Promise<T>
): Promise<T> {
  const { db } = await connectToDatabase();
  
  try {
    return await operation(db);
  } finally {
    // Don't close the connection to allow for connection reuse
    // The connection will be automatically closed when the process ends
  }
}

export async function findUserByEmail(email: string) {
  return withDatabase(async (db) => {
    return await db.collection('users').findOne({ email });
  });
}

export async function createUser(email: string) {
  return withDatabase(async (db) => {
    const result = await db.collection('users').insertOne({ 
      email, 
      registeredAt: new Date(), 
      day: 1 
    });
    return result;
  });
}
