// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';
// import { JwtPayload } from 'jsonwebtoken';
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
