import { Router } from 'express';
import TokenController from './app/controllers/Token.controller';
import userController from './app/controllers/User.controller'
import validatorMiddleware from './app/validators/Validator.middleware';
import { userSchema } from './app/validators/Validators';

const router = Router();


const tokenController = new TokenController();

router.get('/token', tokenController.getTokens);


router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.post('/user', (request, response, next) => validatorMiddleware(request, response, next, userSchema) ,userController.create);
router.delete('/user/:id', userController.delete);
router.put('/user/:id', (request, response, next) => validatorMiddleware(request, response, next, userSchema), userController.update);

export default router;