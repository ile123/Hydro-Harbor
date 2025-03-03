import dotenv from 'dotenv';
import path from 'path';

/**
 * Retrives the data from the .env and stores it into the config object.
 * .env file is should be located in the same directory as the docker-compose.yml file.
 */

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
  DB_URL: process.env.DB_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || ''
};
