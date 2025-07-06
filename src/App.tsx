
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Test component for debugging
import TestComponent from "./components/TestComponent";

// Direct imports instead of lazy loading for debugging
import Observatory from "./components/observatory/Observatory";
import LandingPage from "./components/landing/LandingPage";

console.log("App.tsx: Starting to render App component");

function App() {
  console.log("App.tsx: App component rendering");
  
  // Temporarily show test component to verify basic rendering
  return (
    <div className="min-h-screen bg-background p-4">
      <TestComponent />
      <div className="mt-4">
        <Routes>
          {/* Landing page (marketing platform) */}
          <Route path="/" element={<LandingPage />} />

          {/* Observatory platform (SaaS) with all features */}
          <Route path="/observatory/*" element={<Observatory />} />

          {/* Legacy routes - redirect to observatory */}
          <Route path="/dashboard" element={<Navigate to="/observatory" replace />} />
          <Route path="/map" element={<Navigate to="/observatory/map" replace />} />
          <Route path="/weather" element={<Navigate to="/observatory/weather" replace />} />
          <Route path="/monitoring" element={<Navigate to="/observatory/monitoring" replace />} />
          <Route path="/alerts" element={<Navigate to="/observatory/alerts" replace />} />
          <Route path="/ai" element={<Navigate to="/observatory/ai" replace />} />

          {/* Catchall route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

console.log("App.tsx: App component defined");

export default App;
