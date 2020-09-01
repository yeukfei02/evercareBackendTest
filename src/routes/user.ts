import * as Router from 'koa-router';

const router = new Router();

import * as userController from '../controller/user';

router.get('/api/users', userController.getUsers);
router.delete('/api/users/:id', userController.deleteUserById);

export default router;
