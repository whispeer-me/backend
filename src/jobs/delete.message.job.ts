import { CronJob } from "cron";

import { IDatabasePool } from "@interfaces/db/IDatabasePool";
import { Log } from "@interfaces/utils/ILog";
import { MessageService } from "@services/message.service";
import { JobService } from "@services/job.service";

export class DeleteMessageJob {
  // Yeah tightly coupled to `MessageService` for now.
  private messageService: MessageService;
  private logger: Log;
  private job?: CronJob<null, null>;

  // Every hour
  private jobInterval = "0 * * * *";

  constructor(logger: Log, dbPool: IDatabasePool) {
    this.logger = logger;
    this.messageService = new MessageService(dbPool);
  }

  async startJob() {
    this.job = await JobService.createJob(
      this.jobInterval,
      this.run.bind(this)
    );
    this.logger.info("Started delete expired messages job");
  }

  async run() {
    try {
      this.logger.info("Running delete expired messages job");
      await this.messageService.deleteExpiredMessages();
      this.logger.info("Delete expired messages job completed successfully");
    } catch (err) {
      this.logger.error("Error deleting expired messages job: ", err);
    }
  }

  async stop() {
    if (this.job) {
      this.job.stop();
      this.logger.info("Stopped delete expired messages job");
    }
  }
}
