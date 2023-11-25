import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import router from './routes';
import { ERR_NOT_FOUND } from './errors/errors';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '655ccff7436bf87019f1b806',
  };

  next();
});

app.use(router);

app.get('*', (req: Request, res: Response) => {
  res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
});

app.listen(PORT, () => {});
