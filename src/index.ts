import createServer from './server';
import { getConfig } from './services/config/getConfig';
import logger from './utils/logger';

const {
  server: { port },
} = getConfig();

const main = async () => {
  const server = await createServer();

  server.listen(port, () => logger.info(`Server listening on port ${port}!`));
};

main();
