import { Request, Response } from "express";
import BaseController from "./base.controller";

import { Message } from "../models/message";

// In-memory storage
const messages: Message[] = [];

// Hello World! Programming is awesome! Enjoy it while you can.

export default class MessageController extends BaseController {
  get = async (req: Request, res: Response) => {
    try {
      // Find the message in memory by id
      const message = messages.find((message) => message.id === req.params.id);

      // If the message is not found
      if (!message) {
        return this.notFound(res, "Message not found or has expired.");
      }

      return this.success(res, message);
    } catch (error) {
      return this.error(res, error as Error);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      console.log("message is creating", req.body);

      let id = Math.random().toString(36).substr(2, 9);

      const message: Message = {
        id: id,
        content: req.body.content,
        iv: req.body.iv,
        salt: req.body.salt,
        isPrivate: req.body.isPrivate,
        viewCount: 42,
        createdAt: new Date(),
      };

      // Save the message in memory
      messages.push(message);

      console.log("message is created", message);

      return this.success(res, message);
    } catch (error) {
      return this.error(res, error as Error);
    }
  };

  stats = async (req: Request, res: Response) => {
    const totalMessages = messages.length;
    const messagesExpiring = totalMessages;

    return this.success(res, {
      totalMessages,
      messagesExpiring,
    });
  };
}
