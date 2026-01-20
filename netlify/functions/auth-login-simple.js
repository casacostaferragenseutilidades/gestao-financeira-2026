import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://uxncnpfywehwwsdjejtp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4bmNucGZ5d2Vod3dzZGplanRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTAzNzc5OCwiZXhwIjoyMDgwNjEzNzk4fQ.seWtDBWMXqRlRFk840E2bZ9aqdaDMQwFo2_iaCdWrtE';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Simple login function
export const handler = async (event, context) => {
  console.log('Login request received:', JSON.stringify(event));
  
  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ 
        error: 'Method not allowed',
        message: 'Only POST method is allowed'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  // Parse body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Invalid JSON',
        message: 'Request body must be valid JSON'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  const { username, password } = body;
  
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Credenciais inválidas',
        message: 'Usuário e senha são obrigatórios'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  try {
    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password
    });

    if (error) {
      console.log('Login failed:', error.message);
      
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          error: 'Credenciais inválidas',
          message: 'Usuário ou senha incorretos'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    console.log('Login successful for user:', data.user?.email);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        user: {
          id: data.user?.id,
          username: data.user?.email,
          name: data.user?.user_metadata?.name || data.user?.email
        },
        token: data.session?.access_token,
        refreshToken: data.session?.refresh_token
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

  } catch (error) {
    console.error('Login error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erro interno',
        message: 'Ocorreu um erro ao processar o login'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
