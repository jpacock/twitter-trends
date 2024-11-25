import { getConfig } from '../../../services/config/getConfig';
import logger from '../../../utils/logger';
import client from '../redisClient';
import { generateTweetHash } from './util/generateTweetHash';
import { isTweetDuplicate } from './util/IsTweetDuplicate';

const {
  tweetDuplicateDetector: { duplicateInterval },
} = getConfig();

export const saveTweetToRedis = async (tweetContent: string): Promise<boolean> => {
  const tweetHash = generateTweetHash(tweetContent);

  const alreadyExists = await isTweetDuplicate(tweetContent);
  if (alreadyExists) {
    logger.warn('Recent duplicate tweet detected in redis');
    return false;
  }

  await client.set(tweetHash, 'exists', { EX: duplicateInterval });
  logger.info('Tweet added successfully');
  return true;
};
