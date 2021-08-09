import { Router } from 'express';
import { CreateArticleSchema, UpdateArticleSchema } from 'domains/article/article-schema';
import { validate, auth } from 'app/middlewares';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './article-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateArticleSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdateArticleSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/articles', auth(), router);

export { base as router };
