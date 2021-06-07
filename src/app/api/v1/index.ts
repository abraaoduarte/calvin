import { Router } from 'express';
import { router as userRouter } from './user/user-router';
import { router as roleRouter } from './role/role-router';

const router = Router();

router.use('/v1', userRouter);
router.use('/v1', roleRouter);

export { router as v1 };
