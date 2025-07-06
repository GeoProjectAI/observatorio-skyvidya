
import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import MapContainer from "../map/MapContainer";
import FrameworkObservatory from "./FrameworkObservatory";
import RealTimeMonitor from "../monitoring/RealTimeMonitor";
import { WeatherStudyCase } from "../weather";
import { EcosystemIntelligence } from "../ecosystem/EcosystemIntelligence";
import ChatbotInterface from "../ai/ChatbotInterface";
import {
  AlertCircle,
  Info,
  Home,
  Map,
  Cloud,
  Layers,
  Activity,
  Bell,
  MessageSquare,
  ArrowRight,
  Database,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

console.log("Observatory: Starting Observatory component initialization - Step 4");

// Create a context to share selected dimension data across components
export interface SkyvidyaContextType {
  selectedDimension: string;
  setSelectedDimension: (dimension: string) => void;
  dimensionScores: Record<string, number>;
  ecosystemType: string;
  setEcosystemType: (type: string) => void;
}

export const SkyvidyaContext = createContext<SkyvidyaContextType>({
  selectedDimension: "who",
  setSelectedDimension: () => {},
  dimensionScores: {
    who: 85,
    where: 72,
    when: 64,
    what: 91,
    why: 68,
    withWhom: 77,
    risks: 42,
    conditions: 78,
  },
  ecosystemType: "climate",
  setEcosystemType: () => {},
});

export const useSkyvidyaContext = () => useContext(SkyvidyaContext);

const Observatory = () => {
  console.log("Observatory: Rendering Observatory component - Step 4 testing");
  
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("framework");
  const [selectedDimension, setSelectedDimension] = useState<string>("who");
  const [ecosystemType, setEcosystemType] = useState<string>("climate");

  // Dimension scores - shared between Framework and Ecosystem sections
  const dimensionScores = {
    who: 85,
    where: 72,
    when: 64,
    what: 91,
    why: 68,
    withWhom: 77,
    risks: 42,
    conditions: 78,
  };

  // Navigation items for the Observatory
  const navigationItems = [
    { id: "framework", label: "Framework", icon: "home" },
    { id: "map", label: "Map Explorer", icon: "map" },
    { id: "weather", label: "Weather Study", icon: "cloud" },
    { id: "ecosystem", label: "Ecosystem Intelligence", icon: "layers" },
    { id: "monitoring", label: "Monitoring", icon: "activity" },
    { id: "alerts", label: "Alerts", icon: "bell" },
    { id: "ai", label: "AI Assistant", icon: "messageSquare" },
  ];

  // Extract the current section from the URL path
  useEffect(() => {
    console.log("Observatory: URL changed to:", location.pathname);
    const path = location.pathname.split("/");
    const section = path[path.length - 1];

    if (section && section !== "observatory") {
      console.log("Observatory: Setting active section to:", section);
      setActiveSection(section);
    } else {
      console.log("Observatory: Defaulting to framework section");
      setActiveSection("framework");
      navigate("/observatory/framework", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleNavigate = (route: string) => {
    console.log("Observatory: Navigating to:", route);
    setActiveSection(route);
    navigate(`/observatory/${route}`);
  };

  // Helper function to get the icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "map":
        return <Map className="h-5 w-5" />;
      case "cloud":
        return <Cloud className="h-5 w-5" />;
      case "layers":
        return <Layers className="h-5 w-5" />;
      case "activity":
        return <Activity className="h-5 w-5" />;
      case "bell":
        return <Bell className="h-5 w-5" />;
      case "messageSquare":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  // Component Testing Status Card
  const ComponentTestCard = () => (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardContent className="py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Observatory Component Testing - Step 4
              </h3>
              <p className="text-xs text-blue-700">
                Testing individual Observatory sections and framework components
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              ✅ Framework Working
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              ✅ Navigation Active
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              🔄 Testing Sections
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              📊 Active: {activeSection}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Alert component for the alerts section
  const AlertsSection = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-skyvidya-deepBlue">
            System Alerts
          </h2>
          <p className="text-slate-600 mt-1">
            Real-time monitoring alerts and notifications
          </p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
          2 Active Alerts
        </div>
      </div>

      <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Weather Warning: Heavy Rainfall
          </CardTitle>
          <CardDescription>
            Alert ID: WTH-2023-0516 • Priority: Medium
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Potential flooding risk in monitored regions. Precipitation levels
            exceeding seasonal averages by 40%. Affected areas include northern
            watershed regions and coastal zones.
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-slate-500">Issued: 2 hours ago</span>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View Details
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Critical: Deforestation Activity Detected
          </CardTitle>
          <CardDescription>
            Alert ID: DEF-2023-0789 • Priority: High
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Unauthorized land clearing detected in protected area. Approximately
            5 hectares affected in the last 24 hours. Satellite imagery confirms
            active clearing operations in progress.
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-slate-500">
              Issued: 30 minutes ago
            </span>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View Details
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-green-500" />
            Resolved: Air Quality Threshold Exceeded
          </CardTitle>
          <CardDescription>
            Alert ID: AQI-2023-0432 • Priority: Low
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Previously reported air quality issues in urban monitoring stations
            have returned to normal levels. All stations now reporting values
            within acceptable parameters.
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-slate-500">
              Resolved: 3 hours ago
            </span>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Resolved
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Function to navigate to ecosystem with selected dimension
  const navigateToEcosystem = (dimension: string) => {
    console.log("Observatory: Navigating to ecosystem with dimension:", dimension);
    setSelectedDimension(dimension);
    navigate("/observatory/ecosystem");
    setActiveSection("ecosystem");
  };

  // Context value to share across components
  const contextValue = {
    selectedDimension,
    setSelectedDimension,
    dimensionScores,
    ecosystemType,
    setEcosystemType,
  };

  console.log("Observatory: Context value prepared:", contextValue);

  return (
    <SkyvidyaContext.Provider value={contextValue}>
      <AppLayout onNavigate={handleNavigate} activeRoute={activeSection}>
        <div className="h-full w-full p-4 bg-slate-50">
          <ComponentTestCard />
          
          {/* Navigation tabs for Observatory sections */}
          <div className="mb-6 border-b">
            <div className="flex space-x-1 overflow-x-auto pb-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate(item.id)}
                >
                  {getIconComponent(item.icon)}
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Dimension Connection Banner - shows when navigating between Framework and Ecosystem */}
          {(activeSection === "framework" || activeSection === "ecosystem") && (
            <Card className="mb-6 bg-skyvidya-lightGray/50 border-skyvidya-mediumGray/30">
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-skyvidya-deepBlue" />
                    <div>
                      <h3 className="text-sm font-medium">
                        SKYVIDYA Framework Integration
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        The Framework dimensions form the structure for
                        ecosystem case studies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-white">
                      {activeSection === "framework"
                        ? "Viewing Framework"
                        : "Viewing Ecosystem"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() =>
                        handleNavigate(
                          activeSection === "framework"
                            ? "ecosystem"
                            : "framework",
                        )
                      }
                    >
                      {activeSection === "framework"
                        ? "Go to Ecosystem"
                        : "Go to Framework"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <FrameworkObservatory onDimensionSelect={navigateToEcosystem} />
                }
              />
              <Route
                path="/framework"
                element={
                  <FrameworkObservatory onDimensionSelect={navigateToEcosystem} />
                }
              />
              <Route path="/map" element={<MapContainer />} />
              <Route path="/weather" element={<WeatherStudyCase />} />
              <Route path="/ecosystem" element={<EcosystemIntelligence />} />
              <Route path="/monitoring" element={<RealTimeMonitor />} />
              <Route path="/alerts" element={<AlertsSection />} />
              <Route
                path="/ai"
                element={<ChatbotInterface floatingMode={false} />}
              />
              <Route
                path="*"
                element={
                  <FrameworkObservatory onDimensionSelect={navigateToEcosystem} />
                }
              />
            </Routes>
          </div>
        </div>
      </AppLayout>
    </SkyvidyaContext.Provider>
  );
};

console.log("Observatory: Observatory component definition complete");

export { Observatory };
export default Observatory;
