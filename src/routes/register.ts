import Router from '@koa/router';
import { insertUser } from '../services/supabase';
import { sendMail } from '../services/mailer';
import { RegistrationData } from '../types/RegistrationData';

const router = new Router();

router.post('/', async (ctx) => {
  try {
    const { full_name, email, phone_number, actor_type, farm_name, state, city, interest_reason } = ctx.request.body as unknown as RegistrationData;

    if (!full_name || !email) {
      ctx.status = 400;
      ctx.body = { error: 'Name and email are required.' };
      return;
    }

    // 1️⃣ Guardar en Supabase
    //const result = await insertUser({ full_name, email, phone_number, actor_type, farm_name, state, city, interest_reason });

    // 2️⃣ Enviar correo de confirmación
    await sendMail(email, full_name);

    ctx.status = 201;
    ctx.body = { success: true };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
});

export default router;
