import { DeleteMessageJob } from "@jobs/delete.message.job";
import { IDatabasePool } from "@interfaces/db/IDatabasePool";
import { Log } from "@interfaces/utils/ILog";

export const initializeJobs = (logger: Log, dbPool: IDatabasePool) => {
  const deleteMessageJob = new DeleteMessageJob(logger, dbPool);
  deleteMessageJob.startJob();
};
