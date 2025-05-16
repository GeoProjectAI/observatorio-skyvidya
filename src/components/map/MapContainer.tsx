import React, { useState, useRef, useEffect } from "react";
import { DeckGL } from "@deck.gl/react";
import { MapView } from "@deck.gl/core";
import Map from "react-map-gl";
import { ScatterplotLayer, GeoJsonLayer } from "@deck.gl/layers";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapContainer.css";
import * as h3 from "h3-js";
import { AlertTriangle } from "lucide-react";

// Make sure to define these components or import them
import MapControls from "./MapControls";
import LayerPanel from "./LayerPanel";
import SpatialQueryTools from "./SpatialQueryTools";
import MapLegend from "./MapLegend";

interface MapContainerProps {
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch?: number;
    bearing?: number;
  };
  mapStyle?: string;
  layers?: any[];
  onViewStateChange?: (viewState: any) => void;
  onLayerVisibilityChange?: (layerId: string, visible: boolean) => void;
  onSpatialQuery?: (queryType: string, geometry: any) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  initialViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    pitch: 45,
    bearing: 0,
  },
  mapStyle = "mapbox://styles/mapbox/dark-v11",
  layers = [],
  onViewStateChange = () => {},
  onLayerVisibilityChange = () => {},
  onSpatialQuery = () => {},
}) => {
  const [viewState, setViewState] = useState(initialViewState);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeDrawingTool, setActiveDrawingTool] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showQueryTools, setShowQueryTools] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Generate H3 hexagons for demonstration
  const generateH3Data = () => {
    const h3Data = [];
    // Generate hexagons around the US
    const centerPoints = [
      { lat: 37.7749, lng: -122.4194, name: "San Francisco" },
      { lat: 40.7128, lng: -74.006, name: "New York" },
      { lat: 29.7604, lng: -95.3698, name: "Houston" },
      { lat: 41.8781, lng: -87.6298, name: "Chicago" },
      { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
      { lat: 39.7392, lng: -104.9903, name: "Denver" },
      { lat: 47.6062, lng: -122.3321, name: "Seattle" },
      { lat: 25.7617, lng: -80.1918, name: "Miami" },
    ];

    centerPoints.forEach((point) => {
      const h3Index = h3.latLngToCell(point.lat, point.lng, 5);
      const value = Math.floor(Math.random() * 100);
      h3Data.push({
        h3Index,
        position: [point.lng, point.lat],
        value,
        name: point.name,
        riskLevel: value > 75 ? "high" : value > 40 ? "medium" : "low",
      });
    });

    return h3Data;
  };

  const h3Data = generateH3Data();

  // Sample point data for demonstration
  const pointData = [
    { position: [-122.4, 37.8], radius: 1000, color: [255, 0, 0] },
    { position: [-110, 40], radius: 1000, color: [0, 255, 0] },
    { position: [-90, 38], radius: 1000, color: [0, 0, 255] },
  ];

  // Sample GeoJSON data for demonstration
  const geoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-95, 35],
              [-95, 45],
              [-85, 45],
              [-85, 35],
              [-95, 35],
            ],
          ],
        },
        properties: {
          name: "Risk Zone Alpha",
          riskLevel: "High",
        },
      },
    ],
  };

  // Default layers
  const defaultLayers = [
    new ScatterplotLayer({
      id: "sensors",
      data: pointData,
      getPosition: (d: any) => d.position,
      getRadius: (d: any) => d.radius,
      getFillColor: (d: any) => d.color,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 5,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
    }),
    new GeoJsonLayer({
      id: "risk-zones",
      data: geoJsonData,
      filled: true,
      getFillColor: [255, 0, 0, 100],
      getLineColor: [255, 0, 0],
      getLineWidth: 2,
      lineWidthMinPixels: 2,
      pickable: true,
    }),
    new H3HexagonLayer({
      id: "h3-hexagon-layer",
      data: h3Data,
      pickable: true,
      wireframe: true,
      filled: true,
      extruded: true,
      elevationScale: 20,
      getHexagon: (d) => d.h3Index,
      getFillColor: (d) => {
        const value = d.value || 0;
        if (value > 75) return [240, 52, 52, 180]; // high risk - red
        if (value > 40) return [250, 173, 20, 180]; // medium risk - orange
        return [50, 205, 50, 180]; // low risk - green
      },
      getElevation: (d) => d.value || 0,
      getLineColor: [255, 255, 255, 80],
      getLineWidth: 2,
      lineWidthMinPixels: 1,
      opacity: 0.7,
    }),
  ];

  // Make sure to set Mapbox access token
  useEffect(() => {
    // Use environment variable for the token
    const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    if (!MAPBOX_TOKEN) {
      console.error(
        "MAPBOX_ACCESS_TOKEN is not defined in environment variables",
      );
    }

    // Important: This is needed for the map to render
    if (typeof window !== "undefined") {
      window.MAPBOX_TOKEN = MAPBOX_TOKEN;
    }

    // Clean up on unmount
    return () => {
      if (typeof window !== "undefined") {
        delete window.MAPBOX_TOKEN;
      }
    };
  }, []);

  const handleViewStateChange = ({ viewState }: { viewState: any }) => {
    setViewState(viewState);
    onViewStateChange(viewState);
  };

  const getTooltip = ({ object }: { object: any }) => {
    if (!object) return null;

    if (object.h3Index) {
      return {
        html: `
          <div style="background: rgba(255, 255, 255, 0.9); padding: 8px; border-radius: 4px; font-size: 12px;">
            <div style="font-weight: 600;">${object.name || "Location"}</div>
            <div>Risk Score: ${object.value}</div>
            <div>Risk Level: ${object.riskLevel}</div>
          </div>
        `,
      };
    }

    if (object.properties) {
      return {
        html: `
          <div style="background: rgba(255, 255, 255, 0.9); padding: 8px; border-radius: 4px; font-size: 12px;">
            <div style="font-weight: 600;">${object.properties.name || "Area"}</div>
            <div>Risk Level: ${object.properties.riskLevel || "High"}</div>
          </div>
        `,
      };
    }

    return object.value !== undefined ? `Value: ${object.value}` : null;
  };

  const handleZoomIn = () => {
    setViewState((prev) => ({
      ...prev,
      zoom: Math.min(prev.zoom + 1, 20),
    }));
  };

  const handleZoomOut = () => {
    setViewState((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom - 1, 1),
    }));
  };

  const handleReset = () => {
    setViewState(initialViewState);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleLayerToggle = (layerId: string, visible: boolean) => {
    onLayerVisibilityChange(layerId, visible);
  };

  const handleLayersClick = () => {
    setShowLayerPanel(!showLayerPanel);
    setShowQueryTools(false);
  };

  const handleDrawClick = () => {
    setShowQueryTools(!showQueryTools);
    setShowLayerPanel(false);
  };

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full h-full"
      style={{ height: "100vh" }}
    >
      {window.MAPBOX_TOKEN ? (
        <DeckGL
          viewState={viewState}
          onViewStateChange={handleViewStateChange}
          controller={true}
          layers={[...defaultLayers, ...layers]}
          getTooltip={getTooltip}
        >
          <Map
            mapStyle={mapStyle}
            mapboxAccessToken={window.MAPBOX_TOKEN}
            reuseMaps={true}
          />
        </DeckGL>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-amber-500 mb-2">
              <AlertTriangle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">Map Loading Error</h3>
            <p className="text-slate-600 mb-4">
              Mapbox access token is missing. Please check your environment
              variables.
            </p>
          </div>
        </div>
      )}

      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
        onLayersClick={handleLayersClick}
        onDrawClick={handleDrawClick}
      />

      {showLayerPanel && (
        <div className="absolute left-4 top-20 z-10">
          <LayerPanel onLayerToggle={handleLayerToggle} />
        </div>
      )}

      {showQueryTools && (
        <div className="absolute left-4 top-20 z-10">
          <SpatialQueryTools
            onDrawArea={() => {}}
            isDrawing={isDrawing}
            activeDrawingTool={activeDrawingTool}
          />
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs text-slate-700 font-mono">
        Lon: {viewState.longitude.toFixed(4)} | Lat:{" "}
        {viewState.latitude.toFixed(4)} | Zoom: {viewState.zoom.toFixed(2)}
      </div>

      <MapLegend
        title="Risk Levels"
        position="bottom-right"
        items={[
          { color: "rgb(240, 52, 52)", label: "High Risk", value: "75-100" },
          { color: "rgb(250, 173, 20)", label: "Medium Risk", value: "40-75" },
          { color: "rgb(50, 205, 50)", label: "Low Risk", value: "0-40" },
        ]}
      />
    </div>
  );
};

// Add TypeScript declaration for the MAPBOX_TOKEN
declare global {
  interface Window {
    MAPBOX_TOKEN: string;
  }
}

export default MapContainer;
