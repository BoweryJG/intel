import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('v_comprehensive_analytics_dashboard')
          .select('*')
          .limit(1);

        if (error) throw error;
        
        setStatus('✅ Connection successful!');
        console.log('Test data:', data);
      } catch (err) {
        setError(err.message);
        setStatus('❌ Connection failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px', margin: '20px' }}>
      <h2>Supabase Connection Test</h2>
      <p>{status}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
