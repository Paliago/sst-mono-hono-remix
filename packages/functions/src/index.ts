import { Resource } from "sst";
import { Example } from "@lagom-popcorn/core/example";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono().get("/", async (c) => {
  console.log("testing");

  return c.text(
    `${Example.hello()} hello linked resource ${Resource.Dynamo.name}`
  );
});

export const handler = handle(app);
