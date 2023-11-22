import { Router } from 'express';
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/card/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

export default cardsRouter;
