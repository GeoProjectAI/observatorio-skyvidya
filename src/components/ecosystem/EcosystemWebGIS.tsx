import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkyvidyaButton } from "@/components/ui/skyvidya-button";
import {
  Map,
  Layers,
  Filter,
  Download,
  Info,
  Database,
  Activity,
} from "lucide-react";
import { EnhancedMapContainer } from "../map/EnhancedMapContainer";
import { EcosystemSelector } from "./EcosystemSelector";
import { DimensionGrid } from "./DimensionGrid";

interface EcosystemData {
  id: string;
  title: string;
  dimensions: {
    who: string;
    what: string;
    when: string;
    where: string;
    why: string;
    withWhom: string;
    withXIssue: string;
    withYIssue: string;
    vidyaScore: string;
  };
  mapViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

export function EcosystemWebGIS() {
  const [activeEcosystem, setActiveEcosystem] = useState("climate");
  const [activeTab, setActiveTab] = useState("map");
  const [mapboxToken, setMapboxToken] = useState(
    "pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNscXh4eHh4eDAwMDEycXFxcXF4eHh4eHgifQ.xxxxxxxxxxxxxxxxxxx",
  );

  // Ecosystem data
  const ecosystemsData: Record<string, EcosystemData> = {
    climate: {
      id: "climate",
      title: "Climate Intelligence",
      dimensions: {
        who: "Climate Research Institutions",
        what: "Temperature & Precipitation Anomalies",
        when: "1980-Present (Monthly Resolution)",
        where: "Global Coverage (H3 Resolution 5)",
        why: "Climate Change Adaptation Planning",
        withWhom: "IPCC, WMO, NOAA",
        withXIssue: "Extreme Weather Events (+28%)",
        withYIssue: "Carbon Sequestration Capacity",
        vidyaScore: "72.4",
      },
      mapViewState: { longitude: 0, latitude: 20, zoom: 2 },
    },
    forest: {
      id: "forest",
      title: "Forest Intelligence",
      dimensions: {
        who: "Forest Management Agencies",
        what: "Deforestation & Reforestation Activities",
        when: "2000-Present (Weekly Resolution)",
        where: "Tropical & Boreal Forests (H3 Resolution 7)",
        why: "Sustainable Forest Management",
        withWhom: "FAO, WWF, Local Communities",
        withXIssue: "Illegal Logging Hotspots (+15%)",
        withYIssue: "Carbon Stock Resilience",
        vidyaScore: "68.9",
      },
      mapViewState: { longitude: -60, latitude: -10, zoom: 4 },
    },
    rural: {
      id: "rural",
      title: "Rural Intelligence",
      dimensions: {
        who: "Agricultural Extension Services",
        what: "Crop Yields & Soil Health Indicators",
        when: "2010-Present (Seasonal Resolution)",
        where: "Major Agricultural Regions (H3 Resolution 6)",
        why: "Food Security & Rural Livelihoods",
        withWhom: "FAO, Local Farmer Cooperatives",
        withXIssue: "Water Stress Vulnerability (+32%)",
        withYIssue: "Sustainable Farming Practices",
        vidyaScore: "75.2",
      },
      mapViewState: { longitude: 25, latitude: 10, zoom: 3 },
    },
    greendeal: {
      id: "greendeal",
      title: "Green Deal EGS",
      dimensions: {
        who: "Environmental Policy Institutions",
        what: "Green Investment & Transition Metrics",
        when: "2015-Present (Quarterly Resolution)",
        where: "European Union (H3 Resolution 5)",
        why: "Green Transition Policy Implementation",
        withWhom: "EU Commission, Member States",
        withXIssue: "Carbon Leakage Risk (+18%)",
        withYIssue: "Green Technology Adoption",
        vidyaScore: "81.7",
      },
      mapViewState: { longitude: 10, latitude: 50, zoom: 4 },
    },
  };

  const currentEcosystem = ecosystemsData[activeEcosystem];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Map className="h-5 w-5 text-skyvidya-cta" />
            Ecosystem Intelligence WebGIS
          </h1>
          <p className="text-sm text-slate-500">
            Interactive geospatial analysis with SKYVIDYA framework dimensions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 h-8">
            <Filter className="h-3 w-3" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1 h-8">
            <Download className="h-3 w-3" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-grow">
        {/* Left sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <EcosystemSelector
                onSelect={setActiveEcosystem}
                activeEcosystem={activeEcosystem}
              />
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3 flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-grow flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="map" className="flex items-center gap-1">
                  <Map className="h-4 w-4" />
                  Map View
                </TabsTrigger>
                <TabsTrigger
                  value="dimensions"
                  className="flex items-center gap-1"
                >
                  <Database className="h-4 w-4" />
                  SKYVIDYA Dimensions
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-1"
                >
                  <Activity className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <Badge className="bg-skyvidya-deepBlue text-white">
                {currentEcosystem.title}
              </Badge>
            </div>

            <TabsContent value="map" className="flex-grow flex flex-col mt-0">
              <Card className="flex-grow flex flex-col">
                <CardContent className="p-0 flex-grow">
                  <div className="h-full rounded-md overflow-hidden">
                    <EnhancedMapContainer
                      initialViewState={currentEcosystem.mapViewState}
                      mapboxAccessToken={mapboxToken}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dimensions" className="flex-grow mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-medium">
                      {currentEcosystem.title} - SKYVIDYA Framework Dimensions
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Complete dimensional analysis according to the SKYVIDYA
                      framework
                    </p>
                  </div>

                  <DimensionGrid
                    dimensions={currentEcosystem.dimensions}
                    ecosystemId={currentEcosystem.id}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="flex-grow mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-medium">
                      {currentEcosystem.title} - Analytics
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Detailed analytics and insights for this ecosystem
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-2">
                          Temporal Trends
                        </h3>
                        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md border border-slate-200">
                          <Activity className="h-12 w-12 text-slate-300" />
                          <span className="ml-2 text-slate-400">
                            Temporal trend visualization would appear here
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-2">
                          Risk Assessment
                        </h3>
                        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md border border-slate-200">
                          <Info className="h-12 w-12 text-slate-300" />
                          <span className="ml-2 text-slate-400">
                            Risk assessment visualization would appear here
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <SkyvidyaButton
                      variant="primary"
                      className="w-full justify-center"
                    >
                      Generate Comprehensive Report
                    </SkyvidyaButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
