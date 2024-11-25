import { Router } from 'express';

import { getHealthHandler } from '../handlers/status/getHealthHandler';

const router = Router();

router.get('/health/ping', getHealthHandler);

export default router;
