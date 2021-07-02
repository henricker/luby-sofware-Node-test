import { NextFunction, Request, Response } from 'express';
import User from '../app/models/User.model';
import TokenService from '../app/service/Token.service';
import UserService from '../app/service/User.service';

import JwtAuth from './jwt/Jwt';
const tokenService = new TokenService();
const userService = new UserService();

class Auth {

  private static allowEndpoints = ["/user:POST", "/user/auth:POST", "/user:GET", "/token:GET", "/user/:DELETE", "/user/:PUT", "/user/:GET"]

  static async authenticate(request: Request, response: Response) {
    const { username } = request.body;
  
    const user = await User.findOne({ where: { username } });

    if(!user)
      return response.status(404).json({ error: "Usuário não encontrado" });

    const token = JwtAuth.sign({ 
      id: user.getDataValue('id')
    }, 
    { 
      expiresIn: '1h',
      algorithm: 'HS256' 
    });

    const user_id = user.getDataValue('id');
    await tokenService.create(user_id);
    return response.status(200).json({ data: user, token });
  }

  static async authFilter(request: Request, response: Response, next: NextFunction) {

    console.log(`${request.path}:${request.method}`.replace(/\d{1,}/, ''))

    if(Auth.allowEndpoints.includes(`${request.path}:${request.method}`.replace(/\d{1,}/, '')))
      return next();
    
    if(request.headers.authorization === undefined)
      return response.status(403).json({ error: "token não provido" });

    const parts = request.headers.authorization.split(' ');

    if(parts.length !== 2)
      return response.status(403).json({ error: "token inválido" });

    const [ schema, token ] = parts;


    if(schema !== 'Bearer')
      return response.status(401).json({ error: "token mal formatado" });
    

    JwtAuth.verify(token, async (err, decoded) => {
      if(err)
        return response.status(401).json({ error: "token inválido" });
      
      if(!(await userService.existsUser(decoded.id)))
        return response.status(401).json({ error: "Usuário pertencente ao token não encontrado" });

      request['id'] = decoded.id;
      return next();
    });
  }
}

export default Auth;