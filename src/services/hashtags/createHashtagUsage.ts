import { saveHashtagToRedis } from '../../data-access/redis/hashtags/saveHashtagToRedis';
import logger from '../../utils/logger';
import { extractUniqueHashtags } from './util/extractUniqueHashtags';

export const createHashtagUsage = async (tweetContent: string): Promise<void> => {
  const hashtags = extractUniqueHashtags(tweetContent);

  if (hashtags.length === 0) return;

  const saveHashtagToRedisPromises = hashtags.map(async (hashtag) => await saveHashtagToRedis(hashtag));

  try {
    await Promise.all(saveHashtagToRedisPromises);
    logger.info(`Saved hashtag usage successfully`);
  } catch (error) {
    const err = error as Error;
    logger.error(`Failed to save hashtags to Redis: ${err.message}`);
    throw new Error(`Failed to save hashtags to Redis: ${err.message}`);
  }
};
