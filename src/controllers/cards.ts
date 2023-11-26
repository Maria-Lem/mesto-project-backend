import { Request, Response } from 'express';

import { toggleCardLike } from '../utils';

import Card from '../models/card';
import {
  ERR_INCORRECT_DATA,
  ERR_NOT_FOUND,
  ERR_SERVER_FAILED,
} from '../errors/errors';
import { Action } from '../types';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  return Card.create({
    name, link, owner: _id,
  })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof Error && error.name === 'ValidationError') {
        res.status(ERR_INCORRECT_DATA.code).send({ message: ERR_INCORRECT_DATA.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(new Error('DocumentNotFoundError'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
      } else if (error instanceof Error && error.name === 'CastError') {
        res.status(ERR_INCORRECT_DATA.code).send({ message: ERR_INCORRECT_DATA.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};

export const likeCard = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  // Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
  toggleCardLike(cardId, _id, Action.LIKE)
    // .orFail(new Error('DocumentNotFoundError'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
      } else if (error instanceof Error && error.name === 'CastError') {
        res.status(ERR_INCORRECT_DATA.code).send({ message: ERR_INCORRECT_DATA.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  // Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
  toggleCardLike(cardId, _id, Action.DISLIKE)
    // .orFail(new Error('DocumentNotFoundError'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error instanceof Error && error.message === 'DocumentNotFoundError') {
        res.status(ERR_NOT_FOUND.code).send({ message: ERR_NOT_FOUND.message });
      } else if (error instanceof Error && error.name === 'CastError') {
        res.status(ERR_INCORRECT_DATA.code).send({ message: ERR_INCORRECT_DATA.message });
      }
      res.status(ERR_SERVER_FAILED.code).send({ message: ERR_SERVER_FAILED.message });
    });
};
