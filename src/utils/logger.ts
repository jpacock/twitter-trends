import pino from 'pino';
import { getConfig } from '../services/config/getConfig';

const {
  log: { level },
} = getConfig();

const logger = pino({
  level,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export default logger;
