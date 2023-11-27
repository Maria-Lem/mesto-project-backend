import { StatusCodes } from '../types';

export default class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT_ERR;
  }
}
