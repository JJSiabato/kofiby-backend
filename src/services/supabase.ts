import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
import { RegistrationData } from '../types/RegistrationData';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export const insertUser = async ({ full_name, email, phone_number, actor_type, farm_name, state, city, interest_reason }: RegistrationData) => {
  const { data, error } = await supabase
    .from(actor_type === 'customer_pioneer' ? 'customers_waitlist' : 'pioneers')
    .insert([{ full_name, email, phone_number, actor_type, farm_name, state, city, interest_reason }])
    .select();

  if (error) throw error;
  return data[0];
};
