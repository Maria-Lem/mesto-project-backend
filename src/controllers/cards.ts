import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => res.status(500).send({ message: `Произошла ошибка на стороне сервера: ${error}` }));
};

export const createCard = (req: any, res: Response) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  const createdAt = new Date();

  return Card.create({
    name, link, owner: _id, createdAt,
  })
    .then((card) => res.send(card))
    .catch((error) => res.status(500).send({ message: `Произошла ошибка на стороне сервера: ${error}` }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => res.send(card))
    .catch((error) => res.status(404).send({ message: `Пост не найден: ${error}` }));
};
