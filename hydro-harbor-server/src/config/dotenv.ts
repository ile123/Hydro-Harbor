import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
  DB_URL: process.env.DB_URL || '',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || ''
};
