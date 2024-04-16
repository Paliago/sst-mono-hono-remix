import { database } from "./database";

export const api = new sst.aws.Function("Hono", {
  url: true,
  link: [database],
  handler: "./packages/functions/src/index.handler",
});
