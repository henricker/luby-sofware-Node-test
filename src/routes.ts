import { Router } from 'express';
import UserController from './controllers/User.controller';
import validatorMiddleware from './validators/Validator.middleware';
import { userSchema } from './validators/Validators';

const router = Router();

const userController = new UserController();


router.get('/user/:id', userController.getUser);
router.post('/user', (request, response, next) => validatorMiddleware(request, response, next, userSchema) ,userController.create);
router.delete('/user/:id', userController.delete);
router.put('/user/:id', (request, response, next) => validatorMiddleware(request, response, next, userSchema), userController.update);

export default router;