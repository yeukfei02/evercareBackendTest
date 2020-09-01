import * as Router from 'koa-router';

const router = new Router();

import * as mainController from '../controller/main';

router.get('/', mainController.getMain);

export default router;
