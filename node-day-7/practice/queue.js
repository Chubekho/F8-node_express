require("dotenv").config();
require("./src/configs/database");

const tasks = require("./src/tasks");
const queueModel = require("./src/models/queue.model");
const sleep = require("./src/utils/sleep");
const constants = require("./src/configs/constants");

(async () => {
  while (true) {
    const pendingJob = await queueModel.findOnePending();
    if (pendingJob) {
      const type = pendingJob.type;
      const payload = JSON.parse(pendingJob.payload);

      try {
        await queueModel.updateQueueStatus(
          pendingJob.id,
          constants.QUEUE_STATUS.INPROGRESS,
        );
        console.log(`Job: ${type} is processing. . .`);

        const handler = tasks[type];
        if (!handler) {
            throw new Error(`Task handler is not found for ${type}`)
        }
        await handler(payload);

        await queueModel.updateQueueStatus(
          pendingJob.id,
          constants.QUEUE_STATUS.COMPLETED,
        );
        console.log(`Job: ${type} is completed`);
      } catch (error) {
        await queueModel.updateQueueStatus(
          pendingJob.id,
          constants.QUEUE_STATUS.FAILED,
        );
        console.log(`Job: ${type} is fail`);
      }
    }

    await sleep(1000);
  }
})();
