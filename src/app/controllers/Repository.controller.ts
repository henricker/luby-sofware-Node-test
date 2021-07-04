import { Request, Response } from "express";
import RepositoryService from "../service/Repository.service";
import StarService from '../service/Star.service';

const repositoryService = new RepositoryService();
const starService = new StarService();

class RepositoryController {

  async create(request: Request, response: Response) {
    const idUser = request['id'];
    const { name, description, publicRepo } = request.body;

    const data = await repositoryService.create({ description, name, publicRepo, user_id: idUser })

    if(data['error'])
      return response.status(400).json({ data });

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response) {
    const idRepo = Number.parseInt(request.params['id']);
    const idUser = request['id'];

    const { name, description, publicRepo } = request.body;

    const data = await repositoryService.update(idRepo, { description, name, publicRepo, user_id: idUser })

    if(data['error'])
      return response.status(400).json({ data });

    return response.status(200).json(data);
  }

  async delete(request: Request, response: Response) {
    const idRepository = Number.parseInt(request.params['id']);
    const userId = request['id'];

    const data = await repositoryService.delete(idRepository, userId);

    return response.status(200).json(data);
  }

  async getByUserId(request: Request, response: Response) {
    const userId = Number.parseInt(request.params['id']);
    const repositories = await repositoryService.getByUserId(userId);
    
    return response.status(200).json(repositories);
  }

  async getBySlug(request: Request, response: Response) {
    const slug = request.params['slug'];
    
    const data = await repositoryService.getBySlug(slug);

    if(data['error'])
      return response.status(404).json(data);

    return response.status(200).json(data);
  }

  async star(request: Request, response: Response) {
    const userId = Number.parseInt(request['id']);
    const repositoryId = Number.parseInt(request.params['id']);

    const data = await starService.star(userId, repositoryId);

    if(data['error'])
      return response.status(404).json(data);

    return response.status(201).json(data);
  }

  async unstar(request: Request, response: Response) {
    const userId = Number.parseInt(request['id']);
    const repositoryId = Number.parseInt(request.params['id']);

    const data = await starService.unstar(userId, repositoryId);

    if(data['error'])
      return response.status(404).json(data);

    return response.status(200).json(data);
  }

}

export default RepositoryController;