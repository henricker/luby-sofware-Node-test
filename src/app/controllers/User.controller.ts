import { Request, Response } from "express";
import UserService from "../service/User.service";

const userService = new UserService();
class UserController {
  async getAllUsers(request: Request, response: Response) {
    const data = await userService.getAllUsers();
    return response.status(200).json(data);
  }

  async getUser(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);
    const data = await userService.getUser(id);
    if (data["error"]) return response.status(404).json(data);
    return response.status(200).json(data);
  }

  async create(request: Request, response: Response) {
    const { name, username, avatar, email, city, state, bio } = request.body;
    const data = await userService.create({
      avatar,
      bio,
      city,
      email,
      name,
      state,
      username,
    });

    if (data["error"]) return response.status(400).json(data);
    return response.status(201).json(data);
  }

  async delete(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);
    const data = userService.delete(id);
    if (data["erro"]) return response.status(404).json(data);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const { name, username, avatar, email, city, state, bio } = request.body;

    const data = await userService.update(id, { avatar, bio, city, email, name, state, username });

    if(data['error'])
      return response.status(400).json(data);
    
    return response.status(200).json(data);
  }
}

export default new UserController();
