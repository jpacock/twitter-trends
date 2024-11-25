import dotenv from 'dotenv';

dotenv.config();

export const getConfig = () => {
  return {
    log: {
      level: process.env.LOG_LEVEL || 'INFO',
    },
    redis: {
      currentKey: 'current_trending_hashtags',
      historicalKeyPrefix: 'historical_trending_hashtags',
      trendingListKey: 'historical_trending_hashtags_list',
    },
    server: {
      host: process.env.SERVER_HOST || 'localhost',
      port: process.env.SERVER_PORT || 8080,
    },
    trending: {
      recalculationInterval: parseInt(process.env.TRENDING_RECALCULATION_INTERVAL_SEC || '60'),
      size: parseInt(process.env.TRENDING_SIZE || '10'),
    },
    tweetDuplicateDetector: {
      duplicateInterval: parseInt(process.env.TWEET_DUPLICATE_INTERVAL_SEC || '10'),
    },
    tweetSimulator: {
      enabled: (process.env.TWEET_SIMULATOR_ENABLED || '').toUpperCase() == 'TRUE',
      generationInterval: parseInt(process.env.TWEET_GENERATION_INTERVAL_MS || '50'),
    },
  };
};
