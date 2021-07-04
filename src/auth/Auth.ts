import { NextFunction, Request, Response } from "express";
import TokenService from "../app/service/Token.service";
import UserService from "../app/service/User.service";

import JwtAuth from "./jwt/Jwt";
const tokenService = new TokenService();
const userService = new UserService();

class Auth {
  static async authenticate(request: Request, response: Response) {
    const { username } = request.body;

    const user = await userService.getUserByUsername(username);

    if (user["error"]) return response.status(404).json(user);

    const token = JwtAuth.sign(
      {
        id: user["id"],
      },
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    const user_id = user["id"];
    await tokenService.create(user_id);
    return response.status(200).json({ user, token });
  }

  static async authFilter(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (request.headers.authorization === undefined)
      return response.status(403).json({ error: ["token não provido"] });

    const parts = request.headers.authorization.split(" ");

    if (parts.length !== 2)
      return response.status(403).json({ error: ["token inválido"] });

    const [schema, token] = parts;

    if (schema !== "Bearer")
      return response.status(401).json({ error: ["token mal formatado"] });

    JwtAuth.verify(token, async (err, decoded) => {
      if (err) return response.status(401).json({ error: ["token inválido"] });

      if (!(await userService.existsUser(decoded.id)))
        return response
          .status(401)
          .json({
            error: ["Usuário relacionado com o token não foi encontrado"],
          });

      request["id"] = decoded.id;
      return next();
    });
  }
}

export default Auth;
