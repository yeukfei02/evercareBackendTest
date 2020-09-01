import * as combineRouters from 'koa-combine-routers';

import mainRoutes from '../routes/main';
import userRoutes from '../routes/user';

const router = combineRouters(mainRoutes, userRoutes);

export default router;
