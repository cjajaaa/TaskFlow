import { createClient } from &#39;@supabase/supabase-js&#39;;
const SUPABASE_URL = 'https://ybuoesqeivlovlzkxpxh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidW9lc3FlaXZsb3Zsemt4cHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTE4MTEsImV4cCI6MjA5Nzc2NzgxMX0.wOMuKvaZG0syHyaViMLMzOz6K7ATwJxsozgEfjdlqBk';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);