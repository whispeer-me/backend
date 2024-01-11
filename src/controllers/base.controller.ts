import { Response } from "express";
import { Log } from "../interfaces/utils/ILog";

class BaseController {
  logger: Log;

  constructor(logger: Log) {
    this.logger = logger;
  }

  success(res: Response, data: unknown) {
    return res.status(200).send({ data });
  }

  notFound(res: Response, message?: string) {
    return res.status(404).send({
      data: { message: message === undefined ? "Not Found" : message },
    });
  }

  error(res: Response, error: Error, message?: string) {
    this.logger.error(error);
    return res.status(500).send({
      data: {
        message: message === undefined ? "Error occurred and logged." : message,
      },
    });
  }
}

export default BaseController;
