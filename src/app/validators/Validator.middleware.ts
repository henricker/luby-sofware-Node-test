import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';

export default async function(request: Request, response: Response, next: NextFunction, validator: yup.ObjectSchema<any, any> ) {
  try {
    const result = await validator.validate(request.body, { abortEarly: false });
    return next();
  } catch(err) {
    return response.status(400).json({ message: 'Erro de validação', errors: err.errors });
  }
}