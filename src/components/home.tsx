import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MapContainer from "./map/MapContainer";
import FrameworkDashboard from "./dashboard/FrameworkDashboard";
import RealTimeMonitor from "./monitoring/RealTimeMonitor";
import { WeatherStudyCase } from "./weather";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Map,
  BarChart2,
  Activity,
  AlertTriangle,
  Bell,
  Layers,
  Cloud,
  Thermometer,
} from "lucide-react";
import ChatbotInterface from "./ai/ChatbotInterface";

// This component is deprecated and kept for backward compatibility
// The main application now uses Observatory.tsx for the SaaS platform
function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const isObservatoryRoute = location.pathname === "/observatory";
  const [activeRoute, setActiveRoute] = useState(
    isObservatoryRoute ? "observatory" : "dashboard",
  );

  // Redirect to the new Observatory component
  useEffect(() => {
    // Redirect to the new Observatory routes
    navigate("/observatory/framework", { replace: true });
  }, [navigate]);

  const handleNavigate = (route: string) => {
    // Map old routes to new observatory routes
    const routeMapping: Record<string, string> = {
      map: "/observatory/map",
      monitoring: "/observatory/monitoring",
      alerts: "/observatory/alerts",
      weather: "/observatory/weather",
      ai: "/observatory/ai",
      observatory: "/observatory/framework",
      dashboard: "/observatory/framework",
    };

    if (routeMapping[route]) {
      navigate(routeMapping[route]);
    } else {
      navigate("/observatory/framework");
    }
  };

  // This component is deprecated, so we'll just show a loading state
  // before redirecting to the new Observatory component
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium">
          Redirecting to SKYVIDYA Observatory...
        </p>
      </div>
    </div>
  );
}

export default Home;
