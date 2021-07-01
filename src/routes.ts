import { Router } from 'express';
import Auth from './auth/Auth';
import UserController from './controllers/User.controller';

const router = Router();

const userController = new UserController();
const auth = new Auth();

router.get('/user/:id', userController.getUser);
router.post('/user', userController.create);
router.delete('/user/:id', userController.delete);
router.put('/user/:id', userController.update);

export default router;