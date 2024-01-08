import { Request, Response } from "express";
import crypto from "crypto";

import BaseController from "./base.controller";
import { Message } from "../models/message";
import { MessageService } from "../services/MessageService";
import { Log } from "../utils/log";
import { IDatabasePool } from "../db/IDatabasePool";

// Hello World! Programming is awesome! Enjoy it while you can.

export default class MessageController extends BaseController {
  private messageService: MessageService;

  constructor(logger: Log, dbPool: IDatabasePool) {
    super(logger);
    this.messageService = new MessageService(dbPool);
  }

  get = async (req: Request, res: Response) => {
    try {
      const message = await this.messageService.getMessageById(req.params.id);

      if (!message) {
        return this.notFound(res, "Message not found or has expired.");
      }

      this.messageService.increaseViewCount(message.id);

      return this.success(res, message);
    } catch (err) {
      let error = err as Error;
      this.logger.error(error);
      return this.error(res, error);
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

      const createdMessage = await this.messageService.createMessage(
        newMessage
      );

      return this.success(res, createdMessage);
    } catch (err) {
      let error = err as Error;
      this.logger.error(error);
      return this.error(res, error as Error);
    }
  };

  stats = async (_: Request, res: Response) => {
    try {
      const stats = await this.messageService.getStats();

      const totalMessages = stats.totalMessages;
      const messagesExpiring = stats.messagesExpiring;

      return this.success(res, {
        totalMessages,
        messagesExpiring,
      });
    } catch (err) {
      let error = err as Error;
      this.logger.error(error);
    }
  };
}
