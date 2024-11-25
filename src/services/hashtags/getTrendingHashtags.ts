import { getTrendingHashtagsInRedis } from '../../data-access/redis/hashtags/getTrendingHashtagsInRedis';
import logger from '../../utils/logger';

export const getTrendingHashtags = async () => {
  try {
    const topHashtags = await getTrendingHashtagsInRedis();
    return topHashtags;
  } catch (err) {
    logger.error('Error retrieving trending hashtags:', err);
    return [];
  }
};
