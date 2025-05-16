import React, { useState, useRef, useCallback } from "react";
import Map, {
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
  MapRef,
  Popup,
} from "react-map-gl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Map as MapIcon,
  Hexagon,
  Ruler,
  Pencil,
  Filter,
  Download,
  Maximize2,
  Minimize2,
  Info,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import { H3HexagonLayer } from "./H3HexagonLayer";
import { SkyvidyaButton } from "@/components/ui/skyvidya-button";

interface EnhancedMapContainerProps {
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  mapboxAccessToken: string;
}

export function EnhancedMapContainer({
  initialViewState = { longitude: -56.0, latitude: -10.0, zoom: 4 },
  mapboxAccessToken,
}: EnhancedMapContainerProps) {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState(initialViewState);
  const [activeTab, setActiveTab] = useState("layers");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHexId, setSelectedHexId] = useState<string | null>(null);
  const [popupInfo, setPopupInfo] = useState<{
    longitude: number;
    latitude: number;
    content: string;
  } | null>(null);

  // Sample hexagon data
  const hexagons = [
    { id: "89283082837ffff", value: 75 },
    { id: "89283082833ffff", value: 45 },
    { id: "89283082831ffff", value: 90 },
    { id: "8928308283bffff", value: 30 },
    { id: "89283082839ffff", value: 60 },
  ];

  const hexValues = hexagons.reduce(
    (acc, hex) => {
      acc[hex.id] = hex.value;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Sample layers
  const layers = [
    {
      id: "deforestation",
      name: "Deforestation",
      color: "#e63946",
      visible: true,
    },
    {
      id: "temperature",
      name: "Temperature Anomalies",
      color: "#f4a261",
      visible: true,
    },
    {
      id: "precipitation",
      name: "Precipitation",
      color: "#2a9d8f",
      visible: false,
    },
    {
      id: "biodiversity",
      name: "Biodiversity Index",
      color: "#264653",
      visible: false,
    },
    { id: "carbon", name: "Carbon Storage", color: "#8338ec", visible: false },
  ];

  const toggleLayer = (layerId: string) => {
    // In a real app, this would update the layer visibility state
    console.log(`Toggling layer: ${layerId}`);
  };

  const toggleTool = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleHexagonClick = useCallback(
    (hexId: string) => {
      setSelectedHexId(hexId);
      setPopupInfo({
        longitude: -56.0, // This would be calculated from the hexagon center
        latitude: -10.0,
        content: `Hexagon ID: ${hexId}\nRisk Score: ${hexValues[hexId] || 0}/100`,
      });
    },
    [hexValues],
  );

  const colorScale = (value: number) => {
    // Simple linear color scale from green to red
    if (value < 25) return "#4ade80"; // green
    if (value < 50) return "#facc15"; // yellow
    if (value < 75) return "#fb923c"; // orange
    return "#ef4444"; // red
  };

  return (
    <div
      className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-white" : "h-full w-full"}`}
    >
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Card className="bg-white/90 backdrop-blur-sm shadow-md">
          <CardContent className="p-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <MapIcon className="h-3 w-3 mr-1" />
                SKYVIDYA WebGIS
              </Badge>

              <Badge variant="outline" className="bg-white text-slate-700">
                Lon: {viewState.longitude.toFixed(4)} | Lat:{" "}
                {viewState.latitude.toFixed(4)} | Zoom:{" "}
                {viewState.zoom.toFixed(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-white/90 backdrop-blur-sm shadow-md"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-white/90 backdrop-blur-sm shadow-md">
          <CardContent className="p-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3 w-3" />
                Filter
              </Button>

              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3 w-3" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <Card className="bg-white/90 backdrop-blur-sm shadow-md">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <Button
                variant={activeTool === "pan" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={() => toggleTool("pan")}
              >
                <MapIcon className="h-5 w-5" />
              </Button>

              <Button
                variant={activeTool === "hexagon" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={() => toggleTool("hexagon")}
              >
                <Hexagon className="h-5 w-5" />
              </Button>

              <Button
                variant={activeTool === "measure" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={() => toggleTool("measure")}
              >
                <Ruler className="h-5 w-5" />
              </Button>

              <Button
                variant={activeTool === "draw" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={() => toggleTool("draw")}
              >
                <Pencil className="h-5 w-5" />
              </Button>

              <Button
                variant={activeTool === "info" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={() => toggleTool("info")}
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-4 right-4 z-10 w-80">
        <Card className="bg-white/90 backdrop-blur-sm shadow-md">
          <CardContent className="p-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="layers" className="text-xs">
                  <Layers className="h-3 w-3 mr-1" />
                  Layers
                </TabsTrigger>
                <TabsTrigger value="legend" className="text-xs">
                  <Info className="h-3 w-3 mr-1" />
                  Legend
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="layers"
                className="mt-2 max-h-60 overflow-y-auto"
              >
                <div className="space-y-2">
                  {layers.map((layer) => (
                    <div
                      key={layer.id}
                      className="flex items-center justify-between p-2 hover:bg-slate-100 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: layer.color }}
                        ></div>
                        <span className="text-sm">{layer.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleLayer(layer.id)}
                      >
                        {layer.visible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200">
                  <SkyvidyaButton
                    variant="outline"
                    size="sm"
                    className="w-full justify-center text-xs"
                  >
                    Add New Layer
                  </SkyvidyaButton>
                </div>
              </TabsContent>

              <TabsContent value="legend" className="mt-2">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium mb-1">Risk Score</h4>
                    <div className="h-2 w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium mb-1">Alerts</h4>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-xs">Critical Alert</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-xs">Warning</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="text-xs">Information</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={mapboxAccessToken}
      >
        <NavigationControl position="bottom-right" />
        <ScaleControl position="bottom-left" />

        <H3HexagonLayer
          hexIds={hexagons.map((h) => h.id)}
          colorScale={colorScale}
          values={hexValues}
          onClick={handleHexagonClick}
          selectedHexId={selectedHexId || undefined}
        />

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="p-1">
              <div className="text-xs whitespace-pre-line">
                {popupInfo.content}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
