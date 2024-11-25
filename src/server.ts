import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import './data-access/redis/hashtags/saveTrendingAndReset';
import { initializeRedis } from './data-access/redis/redisClient';
import hashtagRoutes from './routes/hashtagRoutes';
import statusRoutes from './routes/statusRoutes';
import tweetRoutes from './routes/tweetRoutes';
import logger from './utils/logger';
import './utils/tweetSimulator';

const createServer = async (): Promise<Express> => {
  const server = express();

  await initializeRedis();

  server.use(cors());
  server.use(express.json());
  server.use(helmet());
  server.use(pinoHttp({ autoLogging: false, logger }));

  server.use(hashtagRoutes);
  server.use(statusRoutes);
  server.use(tweetRoutes);

  return server;
};

export default createServer;
