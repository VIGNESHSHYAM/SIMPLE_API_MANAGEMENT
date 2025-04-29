import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f593f3'
);
const alg = 'HS256';

/**
 * Signs a JWT with the given payload.
 * @param {object} payload - The payload to include in the JWT.
 * @returns {Promise<string>} - The signed JWT.
 */
export async function signJWT(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(secret);
}

/**
 * Verifies a JWT and returns its payload and protected header.
 * @param {string} token - The JWT to verify.
 * @returns {Promise<{ payload: object, protectedHeader: object }>} - The decoded payload and header.
 */
export async function verifyJWT(token) {
  const { payload, protectedHeader } = await jwtVerify(token, secret, {
    issuer: 'urn:example:issuer',
    audience: 'urn:example:audience',
  });
  return { payload, protectedHeader };
}
