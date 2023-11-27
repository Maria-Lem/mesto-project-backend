import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { UnauthorizedError } from '../errors';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as JwtPayload;
  } catch (error) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = { _id: payload._id };

  return next();
};

export default auth;
