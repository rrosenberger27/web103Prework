import { createClient } from "@supabase/supabase-js";
const URL = "https://cobhadeaulravcfpnlfn.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvYmhhZGVhdWxyYXZjZnBubGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzM5NzMsImV4cCI6MjA2ODEwOTk3M30.z0TYL7OzO2eeGvr9fYm0gjcNvweCYM5B_BTt4QRy110";
export const supabase = createClient(URL, API_KEY);
