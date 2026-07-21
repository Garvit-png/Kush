import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecret = process.env.SUPABASE_SECRET_KEY!;

// Server-side client — uses secret key, never exposed to browser
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecret);
