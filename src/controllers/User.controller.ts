import { Request, Response } from "express";
import User from "../models/User.model";

class UserController {

  async getAllUsers(request: Request, response: Response) {
    const data = await User.findAll();

    return response.status(200).json({ data, count: data.length });
  }

  async getUser(request: Request, response: Response) {
    const id = request.params.id;

    const user = await User.findByPk(id);
    
    if(user === null)
      return response.status(404).json({ error: ["Usuário não encontrado"]});

    return response.status(200).json({
      data: [
        user
      ],

      count: 1
    });
  }

  async create(request: Request, response: Response) {
    const { name, username, avatar, email, city, state, bio } = request.body;

    const usernameExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    let error = []
    usernameExists !== null ? error.push("Username já cadastrado") : '';
    emailExists !== null ? error.push("Email já cadastrado") : '';

    if(error.length > 0)
      return response.status(400).json({ error });

    const user = await User.create({
      name,
      username,
      avatar,
      bio,
      email,
      city,
      state,
    });

    return response.status(201).json(user);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    const user = await User.findByPk(id);
    
    if(user === null)
      return response.status(404).json({ error: ["Usuário não encontrado"]});

    await User.destroy({
      where: { id },
    });
    
    return response.status(200).json({ message: "Usuário deletado com sucesso"});
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;

    const { name, username, avatar, email, city, state, bio } = request.body;

    const usernameExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    let error = []
    usernameExists !== null ? error.push("Username já cadastrado") : '';
    emailExists !== null ? error.push("Email já cadastrado") : '';

    if(error.length > 0)
      return response.status(400).json({ error });

    const userUpdated = User.update(
      {
        name,
        username,
        avatar,
        email,
        city,
        state,
        bio,
      },
      { where: { id } }
    );

    return response.status(201).json(userUpdated);
  }
}

export default UserController;
