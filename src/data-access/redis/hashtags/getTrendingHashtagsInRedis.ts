import redisClient from '../redisClient';
import logger from '../../../utils/logger';

let cachedHashtags: { [key: string]: string } | null = null;
let lastHistoricalFetchedKey: string | null = null;

export const getTrendingHashtagsInRedis = async (): Promise<string[]> => {
  try {
    const lastHistoricalKeys = await redisClient.lRange('historical_trending_hashtags_list', 0, 0);
    if (!lastHistoricalKeys || lastHistoricalKeys.length === 0) {
      logger.info(`No historical keys found.`);
      return [];
    }

    const latestKey = lastHistoricalKeys[0];

    if (latestKey === lastHistoricalFetchedKey && cachedHashtags) {
      return Object.keys(cachedHashtags);
    }

    const topHashtags = await redisClient.hGetAll(latestKey);
    if (!topHashtags || Object.keys(topHashtags).length === 0) {
      logger.info(`No trending hashtag history established yet.`);
      return [];
    }

    cachedHashtags = topHashtags;
    lastHistoricalFetchedKey = latestKey;

    return Object.keys(topHashtags);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error fetching trending hashtags: `, err.message);
    return [];
  }
};
