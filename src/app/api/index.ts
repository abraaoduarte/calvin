import { Router } from 'express';
import { v1 } from './v1';

const router = Router();

router.use('/api', v1);

export { router as api };
