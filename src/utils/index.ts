import { NextFunction, Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';

import User from '../models/user';
import Card from '../models/card';
import { Action } from '../types';
import { BadRequestError, NotFoundError } from '../errors';

interface IUser {
  name?: string;
  about?: string;
  avatar?: string;
}

export const UpdateUser = (
  userId: string | ObjectId,
  params: IUser,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar } = params;

  return User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { runValidators: true, new: true },
  )
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const toggleCardLike = (
  cardId: string | ObjectId,
  userId: string | ObjectId,
  event: Action,
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  cardId,
  event === Action.LIKE ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } },
  { new: true },
)
  .orFail(new NotFoundError('Пост не найден'))
  .then((card) => res.send(card))
  .catch((error) => {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  });

export const getUserById = (
  userId: string | ObjectId,
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById({ userId })
  .orFail(new NotFoundError('Пользователь не найден'))
  .then((user) => res.send(user))
  .catch((error) => {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  });
