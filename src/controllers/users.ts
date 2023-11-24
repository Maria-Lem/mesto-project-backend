import { Request, Response } from 'express';
import User from '../models/user';
import {
  ERR_INCORRECT_DATA,
  ERR_INCORRECT_ID,
  ERR_NOT_FOUND,
  ERR_SERVER_FAILED,
} from '../errors/errors';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error instanceof Error && error.name === 'ValidationError') {
        res.status(ERR_INCORRECT_DATA.code).send({ message: ERR_INCORRECT_DATA.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};

export const findUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message }));
};

export const findUser = (req: Request, res: Response) => {
  const { _id } = req.user;

  User.findById({ _id })
    .orFail(new Error(ERR_INCORRECT_ID))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof Error && error.message === ERR_INCORRECT_ID) {
        res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};

export const updateUserInfo = (req: Request, res: Response) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true })
    .orFail(new Error(ERR_INCORRECT_ID))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof Error && error.message === ERR_INCORRECT_ID) {
        res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
      } else if (error instanceof Error && error.name === 'ValidationError') {
        res.status(ERR_INCORRECT_DATA.code).send({ message: ERR_INCORRECT_DATA.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};

export const updateUserAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true, new: true })
    .orFail(new Error(ERR_INCORRECT_ID))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof Error && error.message === ERR_INCORRECT_ID) {
        res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
      } else if (error instanceof Error && error.name === 'ValidationError') {
        res.status(ERR_INCORRECT_DATA.code).send({ message: ERR_INCORRECT_DATA.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};
