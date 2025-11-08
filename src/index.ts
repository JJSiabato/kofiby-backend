import Koa, { Context } from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-body';
import cors from '@koa/cors';
import dotenv from 'dotenv';
import registerRoute from './routes/register';

dotenv.config();

const app = new Koa();
const router = new Router();

// Configuración de CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : process.env.NODE_ENV === 'production' 
    ? ['https://kofiby.com'] // Origen por defecto en producción
    : ['http://localhost:8080']; // Solo puerto 8080 en desarrollo

app.use(cors({
  origin: (ctx: Context) => {
    const origin = ctx.headers.origin;
    if (!origin) return false as any;
    
    // En desarrollo, permitir localhost:8080
    if (process.env.NODE_ENV !== 'production') {
      if (origin === 'http://localhost:8080' || origin === 'http://127.0.0.1:8080') {
        return origin;
      }
    }
    
    // En producción, verificar contra la lista de orígenes permitidos
    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    
    return false as any;
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
}));

router.use('/api/register', registerRoute.routes());

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
