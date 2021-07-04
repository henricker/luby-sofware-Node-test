import UserService from "./User.service";
import Follow from "../models/Follow.model";
import User from "../models/User.model";

const userService = new UserService();

class FollowService {
  async follow(followerId: number, followedId: number) {
    if (followerId === followedId)
      return { error: "Você não pode seguir você mesmo" };

    const existsUser = await userService.existsUser(followedId);

    if (!existsUser) return { error: "Usuário não encontrado" };

    const existsFollow = await this.existsFollow(followerId, followedId);

    if (existsFollow) return { error: "Você já segue esse usuário" };

    const createFollow = (
      await Follow.create({ follower: followerId, followed: followedId })
    ).toJSON();

    return { data: createFollow, count: 1 };
  }

  async unfollow(followerId: number, followedId: number) {
    const existsUser = await userService.existsUser(followedId);

    if (!existsUser) return { error: "Usuário não encontrado" };

    const existsFollow = await this.existsFollow(followerId, followedId);

    if (!existsFollow) return { error: "Você já não segue esse usuário" };

    await Follow.destroy({
      where: { follower: followerId, followed: followedId },
    });

    return { message: "Unfollow realizado com sucesso" };
  }

  async existsFollow(followerId: number, followedId: number) {
    const existFollow = await Follow.findOne({
      where: { follower: followerId, followed: followedId },
    });

    return existFollow ? true : false;
  }
}

export default FollowService;
