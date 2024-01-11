import { CronJob } from "cron";

/**
 * Service for creating jobs using cron expressions.
 */
export class JobService {
  /**
   * Creates a new job with the specified interval and function.
   * @param interval - The cron expression representing the interval at which the job should run.
   * @param fn - The function to be executed by the job.
   * @returns A new CronJob instance.
   */
  static async createJob(
    interval: string,
    fn: () => void
  ): Promise<CronJob<null, null>> {
    return new CronJob(interval, fn, null, true, "UTC");
  }
}
