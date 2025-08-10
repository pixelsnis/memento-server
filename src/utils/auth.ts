import { createRemoteJWKSet, jwtVerify } from 'jose';

const SUPABASE_URL = 'https://xpjuesvglvuiszokgpsl.supabase.co';
const SUPABASE_JWKS_URL = `${SUPABASE_URL}/auth/v1/.well-known/jwks.json`;

async function verifySupabaseToken(token: string) {
  const JWKS = createRemoteJWKSet(new URL(SUPABASE_JWKS_URL));

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${SUPABASE_URL}/auth/v1`,
      audience: 'authenticated',
    });
    return payload;
  } catch (error) {
    console.error('Supabase token verification failed:', error);
    throw new Error('Invalid Supabase token');
  }
}

export async function validateAuth(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const payload = await verifySupabaseToken(token);
    return payload;
  } catch (error) {
    console.error("Auth validation failed", error);
    return null;
  }
}
