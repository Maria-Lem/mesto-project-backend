import { Router } from 'express';
import {
  createUser,
  findUser,
  findUsers,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', findUsers);
userRouter.get('/:id', findUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
