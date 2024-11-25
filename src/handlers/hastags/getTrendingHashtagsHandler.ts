import { Request, Response } from 'express';

import { getTrendingHashtags } from '../../services/hashtags/getTrendingHashtags';
import logger from '../../utils/logger';

export const getTrendingHashtagsHandler = async (_: Request, res: Response) => {
  try {
    logger.debug(`Retrieving trending hashtags`);
    const trendingHashtags = await getTrendingHashtags();

    res.status(200).json({ hashtags: trendingHashtags });
    logger.info(`Successfully retrieved trending hashtags`);
  } catch (error) {
    const err = error as Error;
    logger.error(`Failed to create tweet: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
