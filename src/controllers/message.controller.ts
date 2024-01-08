import { Request, Response } from "express";
const crypto = require("crypto");

import BaseController from "./base.controller";
import { Message } from "../models/message";
import { MessageService } from "../services/MessageService";

const messageService = new MessageService();

// Hello World! Programming is awesome! Enjoy it while you can.

export default class MessageController extends BaseController {
  get = async (req: Request, res: Response) => {
    try {
      const message = await messageService.getMessageById(req.params.id);

      if (!message) {
        return this.notFound(res, "Message not found or has expired.");
      }

      messageService.increaseViewCount(message.id);

      return this.success(res, message);
    } catch (error) {
      return this.error(res, error as Error);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const id = crypto.randomBytes(5).toString("hex");
      const newMessage: Message = {
        id,
        content: req.body.content,
        iv: req.body.iv,
        salt: req.body.salt,
        is_private: req.body.is_private,
      };

      const createdMessage = await messageService.createMessage(newMessage);

      return this.success(res, createdMessage);
    } catch (error) {
      return this.error(res, error as Error);
    }
  };

  stats = async (_: Request, res: Response) => {
    const stats = await messageService.getStats();

    const totalMessages = stats.totalMessages;
    const messagesExpiring = stats.messagesExpiring;

    return this.success(res, {
      totalMessages,
      messagesExpiring,
    });
  };
}
