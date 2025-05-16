import { supabase } from './supabaseClient';

async function testSupabaseConnection() {
  try {
    // Test by fetching a small amount of data
    const { data, error } = await supabase
      .from('v_comprehensive_analytics_dashboard')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error:', error);
      return false;
    }

    console.log('Successfully connected to Supabase!');
    console.log('Sample data:', data);
    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  }
}

testSupabaseConnection();
