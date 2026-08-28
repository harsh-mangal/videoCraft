import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import Layout from "./Layout";
import { MediaProvider } from "./components/MediaProvider";

// Static generation waits for all lazy routes instead of emitting streaming placeholders.
export async function render(url, media = {}) {
  const errors = [];
  const { prelude, postponed } = await prerenderToNodeStream(
    <StaticRouter location={url}><MediaProvider initialMedia={media} live={false}><Layout /></MediaProvider></StaticRouter>,
    // Keep each completed Suspense boundary inline, even on image long pages.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER, onError: error => errors.push(error) },
  );
  if (postponed || errors.length) throw errors[0] || new Error("Static page was not fully rendered: " + url);
  let html = "";
  for await (const chunk of prelude) html += chunk.toString();
  return html;
}
