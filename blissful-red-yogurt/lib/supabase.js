import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hzeprqexwvfjjuvvxfam.supabase.co';
const SUPABASE_KEY = 'sb_publishable_7147viTf3McfoZZWP1uWJA_xxmGelAE';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);