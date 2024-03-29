import pino from "pino";
import dayjs from "dayjs";

import { Log } from "@interfaces/utils/ILog";

export class AppLogger implements Log {
  private logger = pino({
    prettifier: true,
    base: {
      pid: false,
    },
    prettyPrint: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  });

  info(message: string, ...args: unknown[]): void {
    this.logger.info({ args }, message);
  }

  error(message: string | Error, ...args: unknown[]): void {
    if (message instanceof Error) {
      // Log the error message and stack trace
      this.logger.error({ ...args, err: message }, message.message);
    } else {
      this.logger.error({ ...args }, message);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn({ args }, message);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug({ args }, message);
  }
}
