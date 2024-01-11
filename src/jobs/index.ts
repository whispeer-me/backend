import { DeleteMessageJob } from "./DeleteMessageJob";
import { IDatabasePool } from "../db/IDatabasePool"; // Update the import path as necessary
import { Log } from "../utils/log"; // Update the import path as necessary

export const initializeJobs = (logger: Log, dbPool: IDatabasePool) => {
  const deleteMessageJob = new DeleteMessageJob(logger, dbPool);
  deleteMessageJob.startJob();
};
