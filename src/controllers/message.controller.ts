import { Request, Response } from "express";
import BaseController from "./base.controller";

import {Message} from "../models/message";

export default class MessageController extends BaseController {

  get = async (req: Request, res: Response) => {
    try {
      const message: Message = {
        id: req.params.id,
        content: "Hello World! Programming is awesome! Enjoy it while you can.",
        isPrivate: false,
        viewCount: 42,
        // Create an hour ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
      };

      return this.success(res, message);
    } catch (error) {
      return this.error(res, error as Error);
    }
  };
}
