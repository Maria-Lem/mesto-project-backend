import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UpdateUser } from '../utils';
import { SECRET_JWT } from '../utils/variables';

import User from '../models/user';

import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../errors';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((error) => {
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      if (error.code === 11000) {
        return next(new ConflictError('Пользователь с таким Email уже существует'));
      }
      return next(error);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_JWT, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
          maxAge: 3600000 * 24 * 7,
        })
        .send({ token });
    })
    .catch(() => next(new UnauthorizedError('Необходима авторизация')));
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => next(error));
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;

  User.findById({ _id })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      if (error instanceof Error && error.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const getUserCurrent = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;

  User.findById({ _id })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(error);
    });
};

export const updateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  UpdateUser(_id, { name, about })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  UpdateUser(_id, { avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};
