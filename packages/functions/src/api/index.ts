import { Resource } from "sst";
import { Example } from "@lagom-popcorn/core/example";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

const getRoute = app.get("/api", async (c) => {
  console.log("testing");

  return c.json({
    message: `${Example.hello()} hello linked resource ${Resource.Dynamo.name}`,
  });
});

export type GetRoute = typeof getRoute;

const postRoute = app.post(
  "/posts",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      color: z.string(),
    })
  ),
  (c) => {
    const { name, color } = c.req.valid("json");

    return c.json({
      message: `Hello! ${name}! Your favorite color is ${color}!`,
    });
  }
);

export type PostRoute = typeof postRoute;

export const handler = handle(app);
