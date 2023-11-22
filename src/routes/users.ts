import { Router } from 'express';
import { createUser, findUser, findUsers } from '../controllers/users';

const userRouter = Router();

userRouter.get('/users', findUsers);
userRouter.get('/users/:id', findUser);
userRouter.post('/users', createUser);

export default userRouter;
