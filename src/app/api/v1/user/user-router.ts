import { Router } from 'express';
import * as controller from './user-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', controller.show);
router.post('/', controller.create);
router.patch('/:uuid', controller.update);
router.delete('/:uuid', controller.destroy);

base.use('/users', router);

export { base as router };
