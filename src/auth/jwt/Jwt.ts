import { SignOptions, VerifyCallback } from "jsonwebtoken";
import jwt from 'jsonwebtoken';


interface Idecoded {
  id: number, 
  iat: number,
  exp: number;
}

interface Ipalyload {
  id: number;
}

class JwtAuth {

  public static sign(params: Ipalyload, otherOptions?: Partial<SignOptions>) {
    return jwt.sign(params, process.env.JWT_SECRET_KEY ,otherOptions);
  }

  public static verify(token: string, cb: VerifyCallback<Idecoded>) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, cb);
  }
}

export default JwtAuth;