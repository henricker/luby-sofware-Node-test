import { Request, Response } from "express";
import Token from "../models/Token.model";
import User from "../models/User.model";

class TokenController {

  async getTokens(request: Request, response: Response) {
    const data = await Token.findAll({ attributes: { exclude: ["createdAt", "updatedAt", "userId", "user_id"] }, include: { model: User, as: 'user'} });
    
    return response.status(200).json({ data, count: data.length });
  }

}

export default TokenController;