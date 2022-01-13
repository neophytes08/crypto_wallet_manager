import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};

export { cookieOptions };
