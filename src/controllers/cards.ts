import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { toggleCardLike } from '../utils';

import Card from '../models/card';
import { Action } from '../types';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  return Card.create({
    name, link, owner: _id,
  })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .orFail(new NotFoundError('Пост не найден'))
    .then((card) => {
      if (card.owner.toString() !== _id) {
        throw new ForbiddenError('Вы не можете удалить чужой пост');
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then(() => res.send({ message: 'Пост удален' }))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  toggleCardLike(cardId, _id, Action.LIKE, req, res, next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  toggleCardLike(cardId, _id, Action.DISLIKE, req, res, next);
};
