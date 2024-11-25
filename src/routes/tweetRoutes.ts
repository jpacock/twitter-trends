import { Router } from 'express';

import { createTweetHandler } from '../handlers/tweets/createTweetHandler';

const router = Router();

router.post('/tweet', createTweetHandler);

export default router;
