import { Router } from 'express';
import { createCard, deleteCard, getCards } from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/card/:cardId', deleteCard);

export default cardsRouter;
