import { Express, Request, Response, NextFunction } from "express";
import { AppLogger } from "./utils/whispeer.logger";
import MessageController from "./controllers/message.controller";
import { PgPool } from "./db/PgPool";

let logger = new AppLogger();

require("dotenv").config();
const dbPool = new PgPool(process.env.DATABASE_URL || "");

export default function (app: Express) {
  const messageController = new MessageController(logger, dbPool);

  app.get("/message/stats", messageController.stats);
  app.get("/message/:id", messageController.get);
  app.post("/message", messageController.create);
  app.get("/ping", (_req: Request, res: Response) => {
    res.send("pong");
  });

  httpsRedirection(app);

  // 500
  unhandledErrors(app);

  // 404
  notFoundRoutes(app);
}

function httpsRedirection(app: Express) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    if (req.get("X-Forwarded-Proto") == "http") {
      res.redirect("https://" + req.headers.host + req.url);
    } else {
      next();
    }
  });
}

function notFoundRoutes(app: Express) {
  app.use(function (req: Request, res: Response) {
    logger.warn(
      JSON.stringify({
        method: req.method,
        url: req.url,
        status: 404,
        body: req.body,
      }),
      "404 - NOT FOUND"
    );
    return res.status(404).send({ message: "The Route NOT FOUND!" });
  });
}

function unhandledErrors(app: Express) {
  app.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (res.headersSent) {
      return next(err);
    }
    logger.error(err, "Unhandled error", {
      method: req.method,
      url: req.url,
      status: 500,
      body: req.body,
    });
    return res
      .status(500)
      .send({ message: "Error happened and we have been notified" });
  });
}
