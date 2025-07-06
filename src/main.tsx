
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("main.tsx: Starting simplified application initialization");

const rootElement = document.getElementById("root");
console.log("main.tsx: root element found:", !!rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("main.tsx: Simplified application rendered successfully");
} else {
  console.error("main.tsx: Root element not found!");
}
