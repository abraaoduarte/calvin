import { Router } from 'express';
import { router as userRouter } from './user/user-router';
import { router as roleRouter } from './role/role-router';
import { router as permissionRouter } from './permission/permission-router';

const router = Router();

router.use('/v1', userRouter);
router.use('/v1', roleRouter);
router.use('/v1', permissionRouter);

export { router as v1 };
