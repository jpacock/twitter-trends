import { getConfig } from '../../../services/config/getConfig';
import logger from '../../../utils/logger';
import redisClient from '../redisClient';

const {
  redis: { currentKey },
} = getConfig();

export const saveHashtagToRedis = async (hashtag: string, increment: number = 1) => {
  try {
    await redisClient.zIncrBy(currentKey, increment, hashtag);
    logger.trace(`Hashtag ${hashtag} frequency incremented by ${increment}`);
  } catch (err) {
    logger.error(`Error adding hashtag ${hashtag} to Redis:`, err);
  }
};
