import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://uxncnpfywehwwsdjejtp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4bmNucGZ5d2Vod3dzZGplanRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTAzNzc5OCwiZXhwIjoyMDgwNjEzNzk4fQ.seWtDBWMXqRlRFk840E2bZ9aqdaDMQwFo2_iaCdWrtE';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Auth me function for Netlify
export const handler = async (event, context) => {
  console.log('Auth me request received:', JSON.stringify(event));
  
  // Check authorization header
  const authHeader = event.headers.authorization || event.headers.Authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ 
        error: 'Não autorizado',
        message: 'Token de autenticação não fornecido'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Get user from Supabase using token
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.log('Auth me failed:', error.message);
      
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          error: 'Não autorizado',
          message: 'Token inválido ou expirado'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    console.log('Auth me successful for user:', data.user?.email);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        user: {
          id: data.user?.id,
          username: data.user?.email,
          name: data.user?.user_metadata?.name || data.user?.email
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

  } catch (error) {
    console.error('Auth me error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erro interno',
        message: 'Ocorreu um erro ao verificar autenticação'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
