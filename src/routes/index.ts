import {
  Router,
  NextFunction,
  Response,
  Request,
} from 'express';
import userRouter from './users';
import cardsRouter from './cards';
import { NotFoundError } from '../errors';
import auth from '../middlewares/auth';
import { signInValidator, signUpValidator } from '../utils/validators/userValidators';
import { createUser, login } from '../controllers/users';

const router = Router();

router.post('/signin', signInValidator, login);
router.post('/signup', signUpValidator, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.get('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError('Запрашиваемая страница не найдена')));

export default router;
