import logger from '../../../../utils/logger';
import client from '../../redisClient';
import { generateTweetHash } from './generateTweetHash';

export const isTweetDuplicate = async (tweetContent: string): Promise<boolean> => {
  const tweetHash = generateTweetHash(tweetContent);

  const exists = await client.exists(tweetHash);
  logger.debug({ tweetHash, exists }, 'Checking if tweet is a duplicate');
  return exists === 1;
};
