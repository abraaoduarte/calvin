import { Router } from 'express';
import { router as userRouter } from './user/user-router';
import { router as roleRouter } from './role/role-router';
import { router as permissionRouter } from './permission/permission-router';
import { router as churchDetailRouter } from './church-detail/church-detail-router';
import { router as articleRouter } from './article/article-router';
import { router as authorRouter } from './author/author-router';
import { router as videoRouter } from './video/video-router';
import { router as tagRouter } from './tag/tag-router';

const router = Router();

router.use('/v1', userRouter);
router.use('/v1', roleRouter);
router.use('/v1', permissionRouter);
router.use('/v1', churchDetailRouter);
router.use('/v1', articleRouter);
router.use('/v1', authorRouter);
router.use('/v1', videoRouter);
router.use('/v1', tagRouter);

export { router as v1 };
