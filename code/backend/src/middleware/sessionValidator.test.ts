import { validateSession } from './sessionValidator';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/connection';

jest.mock('jsonwebtoken');
jest.mock('../db/connection', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    limit: jest.fn(),
  }
}));

describe('Session Validator Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {};
    next = jest.fn();
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('should invalidate session if no auth header is present', async () => {
    await validateSession(req as Request, res as Response, next);
    expect((req as any).invalidatedSession).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  it('should invalidate session if jwt verification fails', async () => {
    req.headers = { authorization: 'Bearer invalid_token' };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await validateSession(req as Request, res as Response, next);
    expect((req as any).invalidatedSession).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  it('should invalidate session if user does not exist in db', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    (jwt.verify as jest.Mock).mockReturnValue({ id: 1 });
    
    ((db as any).limit as jest.Mock).mockResolvedValue([]); // Returns empty array to simulate missing user

    await validateSession(req as Request, res as Response, next);
    expect((req as any).invalidatedSession).toBe(true);
    expect((req as any).deletedUserId).toBe(1);
    expect(next).toHaveBeenCalled();
  });

  it('should NOT invalidate session if token is valid and user exists', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    (jwt.verify as jest.Mock).mockReturnValue({ id: 1 });
    
    ((db as any).limit as jest.Mock).mockResolvedValue([{ id: 1, name: 'Test User' }]); // User exists

    await validateSession(req as Request, res as Response, next);
    expect((req as any).invalidatedSession).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });
});
