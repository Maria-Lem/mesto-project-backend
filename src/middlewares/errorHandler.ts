import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../types';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === StatusCodes.INTERNAL_SERVER_ERR
        ? 'На сервере произошла ошибка'
        : message,
    });

  return next();
};

export default errorHandler;
