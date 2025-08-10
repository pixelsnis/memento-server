import { createRemoteJWKSet, jwtVerify } from "jose";

const APPLE_JWKS_URL = "https://appleid.apple.com/auth/keys";

interface AppleTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  nonce: string;
  c_hash: string;
  email: string;
  email_verified: string;
  auth_time: number;
  is_private_email: string;
}

export async function verifyAppleToken(token: string) {
  const JWKS = createRemoteJWKSet(new URL(APPLE_JWKS_URL));

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: "https://appleid.apple.com",
      audience: "com.pixelsnis.Memento",
    });

    return payload as unknown as AppleTokenPayload;
  } catch (error) {
    console.error("Apple token verification failed:", error);
    throw new Error("Invalid Apple ID token");
  }
}

export async function validateAuth(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const payload = await verifyAppleToken(token);
    return payload;
  } catch (error) {
    console.error("Auth validation failed", error);
    return null;
  }
}