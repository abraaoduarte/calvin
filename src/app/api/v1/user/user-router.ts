import { Router } from 'express';
import * as controller from './user-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:id', controller.create);

base.use('/users', router);

export { base as router };
