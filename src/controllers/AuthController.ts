import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";
import 'dotenv/config';

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const token = jwt.sign(JWTPayload, process.env.JWT_SECERT, {
        expiresIn: "365d",
      });
      res.json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong from backend.please try again!" 
      });
      return;
    }
  }
}

export default AuthController;