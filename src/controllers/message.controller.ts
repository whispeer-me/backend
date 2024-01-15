import { Request, Response } from "express";

import BaseController from "@controllers/base.controller";

import { Log } from "@interfaces/utils/ILog";
import { IDatabasePool } from "@interfaces/db/IDatabasePool";

import { Message } from "@models/message";
import { MessageService } from "@services/message.service";

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

      if (message.id) {
        this.messageService.increaseViewCount(message.id);
      }

      message.expires_in = this.createExpireTimeMessage(message.created_at);

      return this.success(res, message);
    } catch (err) {
      let error = err as Error;
      this.logger.error(error);
      return this.error(res, error);
    }
  };

  createExpireTimeMessage = (createdAt: Date | undefined) => {
    if (!createdAt) {
      return undefined;
    }

    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) - hours * 60;

    const hoursLeft = 24 - hours;
    const minutesLeft = 60 - minutes;

    let expireMessage = "";

    if (hoursLeft > 0) {
      expireMessage += `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""}`;
    }

    if (minutesLeft > 0) {
      if (hoursLeft > 0) {
        expireMessage += " and ";
      }

      expireMessage += `${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}`;
    }

    return expireMessage;
  };

  create = async (req: Request, res: Response) => {
    try {
      const newMessage: Message = {
        content: req.body.content,
        iv: req.body.iv,
        salt: req.body.salt,
        is_private: req.body.is_private,
        // Will be created by the db
        id: undefined,
        view_count: undefined,
        created_at: undefined,
        expires_in: undefined,
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

      return this.success(res, stats);
    } catch (err) {
      let error = err as Error;
      this.logger.error(error);
    }
  };
}
