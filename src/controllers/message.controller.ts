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

  create = async (req: Request, res: Response) => {
    try {
      let content = req.body.content;
      let isPrivate = req.body.isPrivate;

      let id = Math.random().toString(36).substr(2, 9);

      const message: Message = {
        id: id,
        content: content,
        isPrivate: isPrivate,
        viewCount: 42,
        createdAt: new Date(),
      };

      return this.success(res, message);
    } catch (error) {
      return this.error(res, error as Error);
    }
  };
}
