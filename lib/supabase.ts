import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export function getStorageUrl(filename: string): string {
  if (!supabaseUrl) return `/uploads/${filename}`;
  return `${supabaseUrl}/storage/v1/object/public/belluno-uploads/${filename}`;
}
