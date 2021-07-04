import { Router } from "express";
import ValidatorMiddleware from "../app/validators/Validator.middleware";
import { repositorySchema } from "../app/validators/Validators";
import RepositoryController from "../app/controllers/Repository.controller";
import Auth from "../auth/Auth";

const repositoryRouter = Router();
const respositoryController = new RepositoryController();

//Needs be authenticated
repositoryRouter.post("/user/repository", Auth.authFilter, (request, response, next) =>
  ValidatorMiddleware(request, response, next, repositorySchema),
  respositoryController.create
);
repositoryRouter.put('/user/repository/:id', Auth.authFilter, (request, response, next) => 
  ValidatorMiddleware(request, response, next, repositorySchema),
  respositoryController.update
);
repositoryRouter.delete('/user/repository/:id', Auth.authFilter, respositoryController.delete);
repositoryRouter.post('/repository/like/:id', Auth.authFilter, respositoryController.star);
repositoryRouter.delete('/repository/unlike/:id', Auth.authFilter, respositoryController.unstar);

repositoryRouter.get('/user/repository/:slug', respositoryController.getBySlug);
repositoryRouter.get('/user/repositories/:id', respositoryController.getByUserId);



export default repositoryRouter;
