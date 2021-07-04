import Repository from "../models/Repository.model";
import User from "../models/User.model";
import { IUserDTO } from "./DTO/CreateUser.dto";

class UserService {
  async getAllUsers() {
    const data = (
      await User.findAll({
        include: [
          { model: User, as: "followers" },
          { model: User, as: "followings" },
          { model: Repository, as: "repositories" },
        ],
      })
    ).map((user) => {
      const userData = user.toJSON();
      userData["location"] = {
        state: userData["state"],
        city: userData["city"],
      };
      userData["state"] = undefined;
      userData["city"] = undefined;
      userData["followers"] = userData["followers"].length;
      userData["followings"] = userData["followings"].length;
      userData["repositories"] = userData["repositories"].length;
      userData["createdAt"] = undefined;
      userData["updatedAt"] = undefined;
      return userData;
    });

    return { data, count: data.length };
  }

  async getUser(id: number) {
    const userSearch = await User.findByPk(id, {
      include: [
        { model: User, as: "followers" },
        { model: User, as: "followings" },
        { model: Repository, as: "repositories" },
      ],
    });

    if (userSearch === null) return { error: ["Usuário não encontrado"] };

    const user = userSearch.toJSON();
    user["location"] = { state: user["state"], city: user["city"] };
    user["state"] = undefined;
    user["city"] = undefined;
    user["createdAt"] = undefined;
    user["updatedAt"] = undefined;
    user["followers"] = user["followers"].length;
    user["followings"] = user["followings"].length;
    user["repositories"] = user["repositories"].length;

    return { data: user, count: 1 };
  }

  async getUserByUsername(username: string) {
    const userSearch = await User.findOne({
      where: { username },
      include: [
        { model: User, as: "followers" },
        { model: User, as: "followings" },
        { model: Repository, as: "repositories" },
      ],
    });

    if (userSearch === null) return { error: ["Usuário não encontrado"] };

    const user = userSearch.toJSON();
    user["location"] = { state: user["state"], city: user["city"] };
    user["state"] = undefined;
    user["city"] = undefined;
    user["createdAt"] = undefined;
    user["updatedAt"] = undefined;
    user["followers"] = user["followers"].length;
    user["followings"] = user["followings"].length;
    user["repositories"] = user["repositories"].length;

    return user;
  }

  async create({ name, username, avatar, email, city, state, bio }: IUserDTO) {
    const usernameExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    let error = [];
    usernameExists !== null ? error.push("Username já cadastrado") : "";
    emailExists !== null ? error.push("Email já cadastrado") : "";

    if (error.length > 0) return { error };

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

    if (user === null) return { error: ["Usuário não encontrado"] };

    await User.destroy({
      where: { id },
    });

    return { message: "Usuário deletado com sucesso" };
  }

  async update(
    id: string,
    { name, avatar, bio, city, email, state, username }: IUserDTO
  ) {
    const usernameExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });

    let error = [];
    usernameExists !== null ? error.push("Username já cadastrado") : "";
    emailExists !== null ? error.push("Email já cadastrado") : "";

    if (error.length > 0) return { error };

    const userUpdated = await User.update(
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

    return userUpdated;
  }

  async existsUser(id: number): Promise<boolean> {
    const user = await User.findByPk(id);

    if (!user) return false;
    return true;
  }

  async getFollowers(userId: number) {
    const followers = (
      await User.findAll({
        include: { model: User, as: "followers" },
        attributes: {
          exclude: [
            "name",
            "username",
            "createdAt",
            "updatedAt",
            "id",
            "bio",
            "city",
            "state",
            "email",
            "avatar",
          ],
        },
        where: { id: userId },
      })
    ).map((follower) => follower.toJSON());

    const data = followers[0]["followers"].map((follower) => {
      follower["name"] = undefined;
      follower["bio"] = undefined;
      follower["city"] = undefined;
      follower["state"] = undefined;
      follower["email"] = undefined;
      follower["createdAt"] = undefined;
      follower["updatedAt"] = undefined;
      follower["follow"] = undefined;

      return follower;
    });

    return { data, count: data.length };
  }

  async getFollowings(userId: number) {
    const followers = (
      await User.findAll({
        include: { model: User, as: "followings" },
        attributes: {
          exclude: [
            "name",
            "username",
            "createdAt",
            "updatedAt",
            "id",
            "bio",
            "city",
            "state",
            "email",
            "avatar",
          ],
        },
        where: { id: userId },
      })
    ).map((following) => following.toJSON());

    const data = followers[0]["followings"].map((following) => {
      following["name"] = undefined;
      following["bio"] = undefined;
      following["city"] = undefined;
      following["state"] = undefined;
      following["email"] = undefined;
      following["createdAt"] = undefined;
      following["updatedAt"] = undefined;
      following["follow"] = undefined;

      return following;
    });

    console.log(data);

    return { data, count: data.length };
  }
}

export default UserService;
