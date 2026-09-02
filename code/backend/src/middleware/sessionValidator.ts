import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from "../db/connection";
export const validateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      (req as any).invalidatedSession = true;
      next();
      return;
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
      
      // Check if user still exists
      const user = await db.select()
        .from(usersTable)
        .where(eq(usersTable.id, decoded.id))
        .limit(1);
      
      if (user.length === 0) {
        // User doesn't exist - invalidate the session
        (req as any).invalidatedSession = true;
        (req as any).deletedUserId = decoded.id;
      }
    } catch (jwtError) {
      // JWT verification failed
      (req as any).invalidatedSession = true;
    }
    
    next();
  } catch (error) {
    // Let the request proceed, but mark the session as invalid
    (req as any).invalidatedSession = true;
    next();
  }
};
