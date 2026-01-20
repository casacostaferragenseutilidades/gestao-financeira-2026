import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://uxncnpfywehwwsdjejtp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4bmNucGZ5d2Vod3dzZGplanRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTAzNzc5OCwiZXhwIjoyMDgwNjEzNzk4fQ.seWtDBWMXqRlRFk840E2bZ9aqdaDMQwFo2_iaCdWrtE';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@financeirototal.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        name: 'Administrador'
      }
    });

    if (error) {
      console.error('Error creating user:', error);
      
      // If user already exists, try to get user info
      if (error.message.includes('already registered')) {
        console.log('User already exists, trying to sign in...');
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: 'admin@financeirototal.com',
          password: 'admin123'
        });
        
        if (signInError) {
          console.error('Sign in error:', signInError);
        } else {
          console.log('Sign in successful:', signInData);
        }
      }
    } else {
      console.log('User created successfully:', data);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestUser();
