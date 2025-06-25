import { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '@/lib/firebase-admin';

export interface AuthenticatedRequest extends NextApiRequest {
  user: {
    uid: string;
    email?: string | null;
  };
}

export const withAuth = (handler: (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => Promise<void> | void) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    // Skip middleware for OPTIONS method (CORS preflight)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      
      // Attach user to request
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
      };

      return handler(req, res);
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };
};
