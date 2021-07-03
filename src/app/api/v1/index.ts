import { Router } from 'express';
import { router as userRouter } from './user/user-router';
import { router as roleRouter } from './role/role-router';
import { router as permissionRouter } from './permission/permission-router';
import { router as churchDetailRouter } from './church-detail/church-detail-router';
import { router as articleRouter } from './article/article-router';
import { router as authorRouter } from './author/author-router';
import { router as videoRouter } from './video/video-router';
import { router as tagRouter } from './tag/tag-router';
import { router as quoteRouter } from './quote/quote-router';
import { router as prayerRouter } from './prayer-request/prayer-request-router';
import { router as eventRouter } from './event/event-router';
import { router as photoRouter } from './photo/photo-router';
import { router as bankDetailRouter } from './bank-detail/bank-detail-router';
import { router as bannerDetail } from './banner/banner-router';

const router = Router();

router.use('/v1', userRouter);
router.use('/v1', roleRouter);
router.use('/v1', permissionRouter);
router.use('/v1', churchDetailRouter);
router.use('/v1', articleRouter);
router.use('/v1', authorRouter);
router.use('/v1', videoRouter);
router.use('/v1', tagRouter);
router.use('/v1', quoteRouter);
router.use('/v1', prayerRouter);
router.use('/v1', eventRouter);
router.use('/v1', photoRouter);
router.use('/v1', bankDetailRouter);
router.use('/v1', bannerDetail);

export { router as v1 };
