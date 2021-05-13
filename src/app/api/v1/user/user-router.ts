import { Router } from 'express';
import * as controller from './user-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);

base.use('/users', router);

export { base as router };
