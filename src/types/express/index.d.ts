/* eslint-disable no-unused-vars */
import * as express from 'express';
import { ObjectId } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user: {
              _id: string | ObjectId;
            }
        }
    }
}
