import { StatusCodes } from '../types';

export default class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST_ERR;
  }
}
