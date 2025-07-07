
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import MapContainer from "../map/MapContainer";
import FrameworkObservatory from "./FrameworkObservatory";
import RealTimeMonitor from "../monitoring/RealTimeMonitor";
import { WeatherStudyCase } from "../weather";
import { EcosystemIntelligence } from "../ecosystem/EcosystemIntelligence";
import ChatbotInterface from "../ai/ChatbotInterface";
import { SkyvidyaContext, SkyvidyaContextType } from "./context/SkyvidyaContext";
import { AlertsSection } from "./components/AlertsSection";
import { NavigationTabs } from "./components/NavigationTabs";
import { DimensionConnectionBanner } from "./components/DimensionConnectionBanner";
import { useObservatoryNavigation } from "./hooks/useObservatoryNavigation";

const Observatory = () => {
  const { activeSection, handleNavigate } = useObservatoryNavigation();
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

  // Function to navigate to ecosystem with selected dimension
  const navigateToEcosystem = (dimension: string) => {
    setSelectedDimension(dimension);
    handleNavigate("ecosystem");
  };

  // Context value to share across components
  const contextValue: SkyvidyaContextType = {
    selectedDimension,
    setSelectedDimension,
    dimensionScores,
    ecosystemType,
    setEcosystemType,
  };

  return (
    <SkyvidyaContext.Provider value={contextValue}>
      <AppLayout onNavigate={handleNavigate} activeRoute={activeSection}>
        <div className="h-full w-full p-4 bg-slate-50">
          <NavigationTabs 
            activeSection={activeSection} 
            onNavigate={handleNavigate} 
          />

          <DimensionConnectionBanner 
            activeSection={activeSection} 
            onNavigate={handleNavigate} 
          />

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

export { Observatory };
export default Observatory;
