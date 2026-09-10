import request from 'supertest';
import express from 'express';
import featureRouter from './Feature';
import { db } from '../db/connection';

// Mock the database connection
jest.mock('../db/connection', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn(),
  }
}));

const app = express();
app.use(express.json());
app.use(featureRouter);

describe('Feature Router API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /usertype should return mocked user types', async () => {
    // Mock the database response
    const mockData = [
      { user_type_table: { id: 1, name: 'Admin' } },
      { user_type_table: { id: 2, name: 'Standard' } }
    ];
    ((db as any).from as jest.Mock).mockResolvedValueOnce(mockData);

    const response = await request(app).get('/usertype');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual(mockData);
    expect(response.body.message).toBe('User type fetched successfully');
  });

  it('GET /vehiclegroup should return mocked vehicle groups', async () => {
    // Mock the database response
    const mockData = [
      { vehicle_group_table: { id: 1, group_name: 'Trucks' } }
    ];
    ((db as any).from as jest.Mock).mockResolvedValueOnce(mockData);

    const response = await request(app).get('/vehiclegroup');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual(mockData);
  });
});
