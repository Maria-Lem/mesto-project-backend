import { Router } from 'express';
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';
import { cardIdValidator, createCardValidator } from '../utils/validators/cardValidators';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidator, createCard);
cardsRouter.delete('/:cardId', cardIdValidator, deleteCard);
cardsRouter.put('/:cardId/likes', cardIdValidator, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default cardsRouter;
