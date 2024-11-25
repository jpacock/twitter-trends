import { Router } from 'express';

import { getTrendingHashtagsHandler } from '../handlers/hastags/getTrendingHashtagsHandler';

const router = Router();

router.get('/trending-hashtags', getTrendingHashtagsHandler);

export default router;
