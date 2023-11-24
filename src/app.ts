import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import router from './routes';

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

app.listen(PORT, () => {});
