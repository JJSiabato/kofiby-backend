import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-body';
import dotenv from 'dotenv';
import registerRoute from './routes/register';

dotenv.config();

const app = new Koa();
const router = new Router();

router.use('/api/register', registerRoute.routes());

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
