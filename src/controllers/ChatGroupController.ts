import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {

  static async index(req: Request, res: Response) {
    try {
      const user = req.user;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      res.json({ data: groups });
      return;
    } catch (error) {
      res .json({
        status: 500,
        message: "Something went wrong, Please try again"
      });
      return;
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        res.json({ data: group });
        return;
      }

      res.status(404).json({ message: "No groups found" });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
      return;
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body = req.body
      const user = req.user
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id
        }
      })
      res.json({
        status: 201,
        message:"ChatGroup Created"
      })
      return;
    } catch (error) {
      res.json({
        status: 500,
        message: "Something went wrong backend chatgroupcontroller"
      });
      return;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, passcode } = req.body;
  
      if (!id) {
        res.status(400).json({ message: "Missing group id" });
        return;
      }
  
      if (!title && !passcode) {
        res.status(400).json({ message: "No fields to update" });
        return;
      }
  
      await prisma.chatGroup.update({
        data: {
          ...(title && { title }),
          ...(passcode && { passcode }),
        },
        where: {
          id: id,
        },
      });
  
      res.json({ message: "Group updated successfully!" });
      return;
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ message: "Group not found" });
        return;
      }
  
      res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again!",
      });
      return;
    }
  }
  

  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "Chat Deleted successfully!" });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong.please try again!" 
      });
      return;
    }
  }

}

export default ChatGroupController;