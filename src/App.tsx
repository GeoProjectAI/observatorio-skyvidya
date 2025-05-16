import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import { Loader2 } from "lucide-react";

// Lazy load components for better performance
const Observatory = lazy(() => import("./components/observatory/Observatory"));
const LandingPage = lazy(() => import("./components/landing/LandingPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen bg-background">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            <p className="text-lg font-medium">Loading SKYVIDYA Platform...</p>
          </div>
        </div>
      }
    >
      <>
        {/* Tempo routes for storyboards */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        {/* Main application routes */}
        <Routes>
          {/* Landing page (marketing platform) */}
          <Route path="/" element={<LandingPage />} />

          {/* Observatory platform (SaaS) with all features */}
          <Route path="/observatory/*" element={<Observatory />} />

          {/* Legacy routes - redirect to observatory */}
          <Route path="/dashboard" element={<Navigate to="/observatory" />} />
          <Route path="/map" element={<Navigate to="/observatory/map" />} />
          <Route
            path="/weather"
            element={<Navigate to="/observatory/weather" />}
          />
          <Route
            path="/monitoring"
            element={<Navigate to="/observatory/monitoring" />}
          />
          <Route
            path="/alerts"
            element={<Navigate to="/observatory/alerts" />}
          />
          <Route path="/ai" element={<Navigate to="/observatory/ai" />} />

          {/* Add route for Tempo storyboards to prevent catchall from capturing them */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}

          {/* Catchall route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
