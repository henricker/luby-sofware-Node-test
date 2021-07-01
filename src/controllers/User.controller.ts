import { exception } from "console";
import { Request, Response } from "express-serve-static-core";
import User from '../models/User.model';

class UserController {

	async getUser(request: Request, reponse: Response) {
		const id = request.params.id;

		const user = await User.findByPk(id);

		if(!user)
			throw new exception("O usuário não existe");

		return reponse.status(200).json(user);
	}

  async create (request: Request , response: Response) {

    const {
      name,
      username,
      avatar,
      email,
      city,
      state,
      bio
     } = request.body;

    const user = await User.create({
      name,
      username,
      avatar,
      bio,
      email,
      city,
      state
    });

    return response.status(201).json(user);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await User.destroy({
      where: { id }
    });

    return response.status(204);
  }

  async update(request: Request, response: Response) {

    const id = request.params.id;

    const {
      name,
      username,
      avatar,
      email,
      city,
      state,
      bio
     } = request.body;

    const userAlreadyExists = await User.findByPk(id);

    if(!userAlreadyExists)
		 	throw new exception("O usuário não existe");

    const userUpdated = User.update({
			name,
			username,
			avatar,
			email,
			city,
			state,
			bio
		}, { where: { id }});

    return response.status(201).json(userUpdated);
  }

}

export default UserController;