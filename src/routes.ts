import { Express, Request, Response, NextFunction } from "express";
import TodoController from "./controllers/todo.controller";
import log from "./utils/logger";

export default function (app: Express) {
  const todoController = new TodoController();
  app.get("/todos", todoController.getTodos);

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
    log.warn(
      { method: req.method, url: req.url, status: 404, body: req.body },
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
    log.error(err, "Unhandled error", {
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
