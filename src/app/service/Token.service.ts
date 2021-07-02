import Token from "../models/Token.model";
import User from "../models/User.model";

class TokenService {

  async getTokens() {
    const data = await Token.findAll({ attributes: { exclude: ["createdAt", "updatedAt", "userId", "user_id"] }, include: { model: User, as: 'user'} });
    
    return { data, count: data.length };
  }

  async create(user_id: number) {
    const token = await Token.create({ user_id });
    return token;
  }

}

export default TokenService;