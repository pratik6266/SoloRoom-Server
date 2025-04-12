import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import 'dotenv/config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if(authHeader === null || authHeader === undefined){
    res.json({
      status: 401,
      message: "Unauthorized"
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECERT, (err, user) => {
    if(err){
      res.json({
        status: 402,
        message: "jwt token verify goes wrong",
      });
      return;
    }
    req.user = user as AuthUser
    next();
  })
} 

export default authMiddleware;