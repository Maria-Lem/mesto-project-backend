import { Router } from 'express';
import {
  getUser,
  getUserCurrent,
  getUsers,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/users';
import { userAvatarValidator, userIdValidator, userInfoValidator } from '../utils/validators/userValidators';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUserCurrent);
userRouter.get('/:id', userIdValidator, getUser);
userRouter.patch('/me', userInfoValidator, updateUserInfo);
userRouter.patch('/me/avatar', userAvatarValidator, updateUserAvatar);

export default userRouter;
