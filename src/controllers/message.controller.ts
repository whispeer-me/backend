import { Request, Response } from "express";

import BaseController from "@controllers/base.controller";

import { Log } from "@interfaces/utils/ILog";
import { IDatabasePool } from "@interfaces/db/IDatabasePool";

import { Message } from "@models/message";
import { MessageService } from "@services/message.service";
import { TimeUtils } from "@utils/time.utils";

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

      const now = new Date();

      message.expires_in = TimeUtils.createExpireTimeMessage(
        message.created_at,
        now
      );

      return this.success(res, message);
    } catch (err) {
      let error = err as Error;
      this.logger.error(error);
      return this.error(res, error);
    }
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
