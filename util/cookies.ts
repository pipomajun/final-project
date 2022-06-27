import cookie from 'cookie';

export function createSerializedSessionCookie(token: string) {
  // check if we are in production
  const isProduction = process.env.NODE_ENV === 'production';

  // this is the maxAge of the session - in this case 24 hours
  const maxAge = 60 * 60 * 24;
  return cookie.serialize('sessionToken', token, {
    // maxAge for newer browsers (time in s)
    maxAge: maxAge,
    // expires for older browser, e.g. IE (time in ms)
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });
}
