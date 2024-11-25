import { Request, Response } from 'express';

import { createTweet } from '../../services/tweets/createTweet';
import logger from '../../utils/logger';

export const createTweetHandler = async (req: Request, res: Response) => {
  const { tweet } = req.body;

  if (!tweet || typeof tweet !== 'string') {
    logger.warn('Invalid tweet data received');
    return res.status(400).json({ message: 'Invalid or missing tweet content.' });
  }

  try {
    logger.debug({ tweet }, 'Attempting to create new tweet');

    const tweetResult = await createTweet(tweet);

    if (!tweetResult.isAdded) {
      logger.warn('Tweet is a duplicate or already processed');
      return res.status(409).json({ message: 'Tweet is a duplicate or already processed.' });
    }

    res.status(201).json({ message: 'Tweet created successfully' });
    logger.info(`Tweet created successfully`);
  } catch (error) {
    const err = error as Error;
    logger.error(`Failed to create tweet: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
