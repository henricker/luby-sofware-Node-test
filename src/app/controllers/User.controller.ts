import { Request, Response } from "express";
import UserService from "../service/User.service";
import FollowService from '../service/Follow.service';

const userService = new UserService();
const followService = new FollowService();

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
    const data = await userService.delete(id);
    if (data["erro"]) return response.status(404).json(data);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const { name, username, avatar, email, city, state, bio } = request.body;

    const data = await userService.update(id, { avatar, bio, city, email, name, state, username });

    if(data['error'])
      return response.status(400).json(data);
    
    return response.status(200).json({ message: "Usuário atualizado"});
  }

  // //needs be authenticated
    async follow(request: Request, response: Response) {
    const followerId = Number.parseInt(request['id']);
    const followedId = Number.parseInt(request.params['id']);

    const data = await followService.follow(followerId, followedId);

    if(data['error'])
      return response.status(400).json(data);

    return response.status(200).json(data);
  }

    //needs be authenticated
    async unfollow(request: Request, response: Response) {
      const followerId= Number.parseInt(request['id']);
      const followedId = Number.parseInt(request.params['id']);
  
      const data = await followService.unfollow(followerId, followedId);
  
      if(data['error'])
        return response.status(400).json(data);
  
      return response.status(200).json(data);
    }

    async getFollowers(request: Request, response: Response) {

      const userId = Number.parseInt(request.params['id']);

      const followers = await userService.getFollowers(userId);

      return response.status(200).json(followers);
    }

    async getFollowings(request: Request, response: Response) {
      const userId = Number.parseInt(request.params['id']);

      const followings = await userService.getFollowings(userId);

      return response.status(200).json(followings);
    }
}

export default new UserController();
