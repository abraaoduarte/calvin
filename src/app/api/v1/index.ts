import { Router } from 'express';
import { router as userRouter } from './user/user-router';
import { router as roleRouter } from './role/role-router';
import { router as permissionRouter } from './permission/permission-router';
import { router as churchDetailRouter } from './church-detail/church-detail-router';

const router = Router();

router.use('/v1', userRouter);
router.use('/v1', roleRouter);
router.use('/v1', permissionRouter);
router.use('/v1', churchDetailRouter);

export { router as v1 };
