import { ObjectId } from 'mongoose';

import User from '../models/user';
import Card from '../models/card';
import { Action } from '../types';

interface IUser {
  name?: string;
  about?: string;
  avatar?: string;
}

export const UpdateUser = (userId: string | ObjectId, params: IUser) => {
  const { name, about, avatar } = params;

  return User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { runValidators: true, new: true },
  );
};

export const toggleCardLike = (
  cardId: string | ObjectId,
  userId: string | ObjectId,
  event: Action,
) => {
  if (event === Action.LIKE) {
    return Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail(new Error('DocumentNotFoundError'));
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  ).orFail(new Error('DocumentNotFoundError'));
};
