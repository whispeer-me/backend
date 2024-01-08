import pino from "pino";
import dayjs from "dayjs";

import { Log } from "./log";

export class AppLogger implements Log {
  private logger = pino({
    prettifier: true,
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  });

  info(message: string, ...args: unknown[]): void {
    this.logger.info({ args }, message);
  }

  error(message: string | Error, ...args: unknown[]): void {
    if (message instanceof Error) {
      this.logger.error(args);
    } else {
      this.logger.error({ args }, message);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn({ args }, message);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug({ args }, message);
  }
}
