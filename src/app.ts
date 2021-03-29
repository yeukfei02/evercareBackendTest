import Koa from 'koa';

import cors from '@koa/cors';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';

import env from 'dotenv';
env.config();

import router from './routes/routes';

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(logger());
app.use(
  compress({
    filter(content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    gzip: {
      flush: require('zlib').Z_SYNC_FLUSH,
    },
    deflate: {
      flush: require('zlib').Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  }),
);
app.use(bodyParser());
app.use(json());

app.use(router());

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
