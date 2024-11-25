import axios from 'axios';
import 'dotenv';

import logger from './logger';
import { getConfig } from '../services/config/getConfig';

const {
  server: { port, host },
  tweetSimulator: { enabled, generationInterval },
} = getConfig();

const serverUrl = `http://${host}:${port}`;
const hashtagsList = [
  '#NodeJS',
  '#Javascript',
  '#Charter',
  '#COFFEE',
  '#NBA',
  '#F1',
  '#NHL',
  '#CFP',
  '#GRANDPRIX',
  '#NewYear',
  '#Spectrum',
  '#Sooners',
  '#Positivity',
  '#fun',
  '#Redis',
  '#devs',
  '#connected',
  '#web',
  '#Networking',
  '#Cable',
];
const randomWords = ['aboard', 'about', 'above', 'is', 'the', 'and', 'a', 'for', 'of'];

const generateRandomTweet = (): string => {
  const tweetLength = 10;
  const tweet = [];

  for (let i = 0; i < tweetLength; i++) {
    if (Math.random() < 0.3) {
      tweet.push(getRandomHashtag());
    } else {
      tweet.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
    }
  }

  return tweet.join(' ');
};

const getRandomHashtag = (): string => {
  return hashtagsList[Math.floor(Math.random() * hashtagsList.length)];
};

const sendTweetToServer = async (tweet: string) => {
  try {
    await axios.post(`${serverUrl}/tweet`, { tweet });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
  }
};

const generateTweets = (): void => {
  setInterval(() => {
    const tweet = generateRandomTweet();
    sendTweetToServer(tweet);
  }, generationInterval);
};

logger.info(`Generating tweets is turned ${enabled ? 'ON' : 'OFF'}.`);

if (enabled) {
  generateTweets();
}
