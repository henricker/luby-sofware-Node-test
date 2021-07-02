import { Router } from 'express';
import TokenController from '../app/controllers/Token.controller';

const tokenController = new TokenController();

const tokenRouter = Router();
tokenRouter.get('/token', tokenController.getTokens);

export default tokenRouter;