import { Router } from 'express';
import {
  createUser,
  findUser,
  findUsers,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/users', findUsers);
userRouter.get('/users/:id', findUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUserInfo);
userRouter.patch('/users/me/avatar', updateUserAvatar);

export default userRouter;
