import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(500).send({ message: `Произошла ошибка на стороне сервера: ${error}` }));
};

export const findUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => res.status(500).send({ message: `Произошла ошибка на стороне сервера: ${error}` }));
};

export const findUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  User.find({ _id: userId })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((error) => res.status(500).send({ message: `Произошла ошибка на стороне сервера: ${error}` }));
};
