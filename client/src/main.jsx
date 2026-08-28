import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");
const initialMedia = JSON.parse(document.getElementById("site-media")?.textContent || "{}");
const app = <React.StrictMode><App initialMedia={initialMedia} /></React.StrictMode>;
if (root.querySelector("main")) hydrateRoot(root, app);
else createRoot(root).render(app);
