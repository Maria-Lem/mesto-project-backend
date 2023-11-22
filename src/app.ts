import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardsRouter from './routes/cards';
// import { createUser } from './controllers/users';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

// app.post('/users', createUser);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '655ccff7436bf87019f1b806',
  };

  next();
});

app.use(userRouter);
app.use(cardsRouter);

app.listen(PORT, () => {});
