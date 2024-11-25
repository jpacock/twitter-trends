import crypto from 'crypto';

export const generateTweetHash = (tweetContent: string): string => {
  return crypto.createHash('sha256').update(tweetContent).digest('hex');
};
