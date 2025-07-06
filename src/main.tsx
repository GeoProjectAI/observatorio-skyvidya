
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("main.tsx: Starting application with WebSocket error handling");

// Handle WebSocket connection errors gracefully
window.addEventListener('error', (event) => {
  if (event.message?.includes('WebSocket') || event.message?.includes('ERR_CONNECTION_CLOSED')) {
    console.warn('WebSocket connection issue detected, but application will continue to work');
    event.preventDefault();
  }
});

// Handle unhandled promise rejections from WebSocket
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('WebSocket') || event.reason?.message?.includes('ERR_CONNECTION_CLOSED')) {
    console.warn('WebSocket promise rejection handled gracefully');
    event.preventDefault();
  }
});

const rootElement = document.getElementById("root");
console.log("main.tsx: root element found:", !!rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("main.tsx: Application rendered successfully with WebSocket error handling");
} else {
  console.error("main.tsx: Root element not found!");
}
