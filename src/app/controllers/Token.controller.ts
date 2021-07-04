import { Request, Response } from "express";
import Token from "../models/Token.model";
import User from "../models/User.model";
import TokenService from "../service/Token.service";

const tokenService = new TokenService();

class TokenController {

  async getTokens(request: Request, response: Response) {
    const data = (await tokenService.getTokens());
    
    return response.status(200).json(data);
  }

}

export default TokenController;