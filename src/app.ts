import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';

import router from './routes';
import { ERR_NOT_FOUND } from './errors/errors';
import { createUser, login } from './controllers/users';
import limiter from './middlewares/limiter';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { StatusCodes } from './types';
import { signInValidator, signUpValidator } from './utils/validators/userValidators';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(limiter);

app.use(express.json());

app.use(requestLogger);

app.post('/signin', signInValidator, login);
app.post('/signup', signUpValidator, createUser);

app.use(auth);

app.use(router);

app.get('*', (req: Request, res: Response) => {
  res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
});

app.use(errorLogger);

app.use(errors());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === StatusCodes.INTERNAL_SERVER_ERR
        ? 'На сервере произошла ошибка'
        : message,
    });

  return next();
});

app.listen(PORT, () => {});
