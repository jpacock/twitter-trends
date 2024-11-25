import { saveTweetToRedis } from '../../data-access/redis/tweets/saveTweetToRedis';
import logger from '../../utils/logger';
import { createHashtagUsage } from '../hashtags/createHashtagUsage';

export const createTweet = async (tweetContent: string) => {
  try {
    const isAdded = await saveTweetToRedis(tweetContent);

    if (!isAdded) {
      logger.warn('Tweet is a recent duplicate');
      return { isAdded, message: 'Tweet is a recent duplicate' };
    }

    await createHashtagUsage(tweetContent);

    return { isAdded, message: 'Tweet created successfully' };
  } catch (error) {
    const err = error as Error;
    logger.error(`Error creating tweet: ${err.message}`);
    throw new Error('Failed to create tweet');
  }
};
