import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fhgablmsryxaclfetblg.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZ2FibG1zcnl4YWNsZmV0YmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2MzU5NzUsImV4cCI6MjEwNTIxMTk3NX0.dGwIfKIz9zeyzGnYceA9n6ZNYoHV3gx8UXdPfiQBrek'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
