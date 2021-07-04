import Token from "../models/Token.model";
import User from "../models/User.model";

class TokenService {

  async getTokens() {
    const data = (await Token.findAll({ attributes: {exclude:['createdAt', 'updatedAt']}})).map(token => token.toJSON());
    
    return { data, count: data.length };
  }

  async create(user_id: number) {
    const token = await Token.create({ user_id });
    return token;
  }

}

export default TokenService;