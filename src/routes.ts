import { Router } from 'express';
import TokenController from './controllers/Token.controller';
import UserController from './controllers/User.controller';
import validatorMiddleware from './validators/Validator.middleware';
import { userSchema } from './validators/Validators';

const router = Router();

const userController = new UserController();
const tokenController = new TokenController();

router.get('/token', tokenController.getTokens);


router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.post('/user', (request, response, next) => validatorMiddleware(request, response, next, userSchema) ,userController.create);
router.delete('/user/:id', userController.delete);
router.put('/user/:id', (request, response, next) => validatorMiddleware(request, response, next, userSchema), userController.update);

export default router;