
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Main.tsx loading - start");

const rootElement = document.getElementById("root");

if (rootElement) {
  console.log("Root element found, creating React root");
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App rendered successfully");
} else {
  console.error("Root element not found - this is the problem!");
}
