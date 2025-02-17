import dotenv from 'dotenv';
import path from 'path';

/**
 * Retrives the data from the .env and stores it into the config object.
 * .env file is should be located in the same directory as the docker-compose.yml file.
 */

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api'
};