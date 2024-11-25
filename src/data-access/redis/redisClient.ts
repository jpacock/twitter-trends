import { createClient } from 'redis';

import logger from '../../utils/logger';

const client = createClient();

export const initializeRedis = async () => {
  try {
    await client.connect();
    logger.info('Connected to Redis');
  } catch (error) {
    const err = error as Error;
    logger.error(`Could not connect to redis: ${err.message}`);
  }
};

export const closeRedis = async () => {
  await client.quit();
  logger.info('Redis connection closed.');
};

export default client;
