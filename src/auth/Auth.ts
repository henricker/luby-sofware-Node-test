import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import User from '../models/User.model';
import Token from '../models/Token.model';

import JwtAuth from './jwt/Jwt';

class Auth {

  private static allowEndpoints = ["/user:POST", "/user/auth:POST"]

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
    return response.status(200).json({ token });
  }

  static async authFilter(request: Request, response: Response, next: NextFunction) {


    if(Auth.allowEndpoints.includes(`${request.path}:${request.method}`))
      return next();
    
    if(request.headers.authorization === undefined)
      return response.status(403).json({ error: "token não provido" });

    const parts = request.headers.authorization.split(' ');

    if(parts.length !== 2)
      return response.status(403).json({ error: "token inválido" });

    const [ schema, token ] = parts;


    if(schema !== 'Bearer')
      return response.status(401).json({ error: "token mal formatado" });
    

    JwtAuth.verify(token, (err, decoded) => {
      if(err)
        return response.status(401).json({ error: "token inválido" });
    

      request['id'] = decoded.id;
      return next();
    });
  }
}

export default Auth;