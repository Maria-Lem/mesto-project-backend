import { NextFunction, Request, Response } from 'express';

import { toggleCardLike } from '../utils';

import Card from '../models/card';
import { Action } from '../types';
import { BadRequestError, NotFoundError } from '../errors';

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
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(new Error('DocumentNotFoundError'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        return next(new NotFoundError('Запрашиваемая информация не найдена'));
      }
      if (error instanceof Error && error.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  toggleCardLike(cardId, _id, Action.LIKE)
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        return next(new NotFoundError('Запрашиваемая информация не найдена'));
      }
      if (error instanceof Error && error.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  toggleCardLike(cardId, _id, Action.DISLIKE)
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        return next(new NotFoundError('Запрашиваемая информация не найдена'));
      }
      if (error instanceof Error && error.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(error);
    });
};
