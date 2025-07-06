
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Use the correct error boundary
import { ErrorBoundary } from "./components/ui/error-boundary";

console.log("main.tsx: Starting application initialization");

const basename = import.meta.env.BASE_URL;

console.log("main.tsx: basename:", basename);

const rootElement = document.getElementById("root");
console.log("main.tsx: root element found:", !!rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>,
  );
  console.log("main.tsx: Application rendered successfully");
} else {
  console.error("main.tsx: Root element not found!");
}
