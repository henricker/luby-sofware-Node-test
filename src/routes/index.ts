import { Router } from 'express';
import tokenRouter from './Token.router';
import userRouter from './User.router';
import repositoryRouter from './Repository.router';

const mainRouter = Router()

export default mainRouter
                  .use(userRouter)
                  .use(tokenRouter)
                  .use(repositoryRouter);