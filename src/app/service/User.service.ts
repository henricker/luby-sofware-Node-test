import User from "../models/User.model";
import { IUserDTO } from "./DTO/CreateUser.dto";

class UserService {

  async getAllUsers() {
    const data = await User.findAll({ include: [{ model: User, as: 'followers' }, { model: User, as: 'followings' }] });

    return { data, count: data.length };
  }

  async getUser(id: number) {

    const user = await User.findByPk(id);
    
    if(user === null)
      return { error: ["Usuário não encontrado"]};

    return { data: [ user], count: 1};
  }

  async create({ name, username, avatar, email, city, state, bio }: IUserDTO) {
    
    const usernameExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    let error = []
    usernameExists !== null ? error.push("Username já cadastrado") : '';
    emailExists !== null ? error.push("Email já cadastrado") : '';

    if(error.length > 0)
      return { error };

    const user = await User.create({
      name,
      username,
      avatar,
      bio,
      email,
      city,
      state,
    });

    return user;
  }

  async delete(id: number) {
    const user = await User.findByPk(id);
    
    if(user === null)
      return { error: ["Usuário não encontrado"]};

    await User.destroy({
      where: { id },
    });
    
    return { message: "Usuário deletado com sucesso"};
  }

  async update(id: string, { name, avatar, bio, city, email, state, username }: IUserDTO) {

    const usernameExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    let error = []
    usernameExists !== null ? error.push("Username já cadastrado") : '';
    emailExists !== null ? error.push("Email já cadastrado") : '';

    if(error.length > 0)
      return { error };

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

    console.log(userUpdated);
    return userUpdated;
  }


  async existsUser(id: number): Promise<boolean> {
    const user = await User.findByPk(id);

    if(!user)
      return false;
    return true;
  }
}

export default UserService;
