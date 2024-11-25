import { getConfig } from '../../../services/config/getConfig';
import logger from '../../../utils/logger';
import redisClient from '../redisClient';
import { generateTimeBucket } from './util/generateTimeBucket';

const {
  redis: { currentKey, historicalKeyPrefix, trendingListKey },
  trending: { recalculationInterval, size },
} = getConfig();
const TIME_RECALCULATION_PERIOD_MS = recalculationInterval * 1000;

export const saveTrendingAndReset = async () => {
  try {
    const trendingHashtags = await redisClient.zRangeWithScores(currentKey, 0, size - 1, { REV: true });

    if (trendingHashtags.length === 0) {
      logger.info('No recent trending hashtags history to save.');
      return;
    }

    const timeBucket = generateTimeBucket();
    const historicalKey = `${historicalKeyPrefix}:${timeBucket}`;

    const hashtagsObject: { [key: string]: string } = {};

    trendingHashtags.forEach(({ value, score }) => {
      hashtagsObject[value] = score.toString();
    });

    await redisClient.hSet(historicalKey, hashtagsObject);

    await redisClient.lPush(trendingListKey, historicalKey);

    logger.info(`Successfully stored recently trending hashtags for ${historicalKey}`);

    await redisClient.del(currentKey);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error storing recently trending hashtags:`, err.message);
  }
};

setInterval(saveTrendingAndReset, TIME_RECALCULATION_PERIOD_MS);
