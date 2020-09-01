import * as Koa from 'koa';

export const getMain = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  ctx.response.status = 200;
  ctx.body = {
    message: 'evercareBackendTest api',
  };
};
