import { Router } from 'express';
import userController from '../app/controllers/User.controller'
import validatorMiddleware from '../app/validators/Validator.middleware';
import { userSchema, authSchema } from '../app/validators/Validators';
import Auth from '../auth/Auth';

const userRouter = Router();

//Basic crud user
userRouter.get('/user', userController.getAllUsers);
userRouter.get('/user/:id', userController.getUser);
userRouter.post('/user', (request, response, next) => validatorMiddleware(request, response, next, userSchema) ,userController.create);
userRouter.delete('/user/:id', userController.delete);
userRouter.put('/user/:id', (request, response, next) => validatorMiddleware(request, response, next, userSchema), userController.update);

//Authentication
userRouter.post('/user/auth', (request, response, next) => validatorMiddleware(request, response, next, authSchema ), Auth.authenticate);

//Needs be authenticated
// userRouter.post('/user/follow/:id', userController.follow);
// userRouter.delete('/user/unfollow/:id', userController.unfollow);

export default userRouter;