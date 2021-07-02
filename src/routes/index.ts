import { Router } from 'express';
import tokenRouter from './Token.router';
import userRouter from './User.router';

const mainRouter = Router()

export default mainRouter
                  .use(userRouter)
                  .use(tokenRouter);