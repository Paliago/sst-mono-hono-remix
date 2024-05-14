import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { hc } from "hono/client";
import { json, useLoaderData } from "@remix-run/react";
import type { GetRoute } from "@lagom-popcorn/functions/api";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const client = hc<GetRoute>("/api");
  const res = await client.api.$get({
    query: {
      name: "Hono",
    },
  });

  const data = await res.json();

  return json({ message: data.message });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
