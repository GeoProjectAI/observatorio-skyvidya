import React, { useState } from "react";
import {
  Layers,
  Eye,
  EyeOff,
  Map,
  Database,
  Activity,
  BarChart2,
  Droplets,
  Wind,
  Thermometer,
  Cloud,
  Sun,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface LayerCategory {
  name: string;
  icon: React.ReactNode;
  layers: Layer[];
}

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  description?: string;
  opacity?: number;
}

interface LayerPanelProps {
  categories?: LayerCategory[];
  onLayerToggle?: (layerId: string, visible: boolean) => void;
  onOpacityChange?: (layerId: string, opacity: number) => void;
}

const defaultCategories: LayerCategory[] = [
  {
    name: "Base Maps",
    icon: <Map className="h-5 w-5" />,
    layers: [
      { id: "satellite", name: "Satellite Imagery", visible: true },
      { id: "terrain", name: "Terrain", visible: false },
      { id: "streets", name: "Streets", visible: false },
    ],
  },
  {
    name: "Environmental Data",
    icon: <Droplets className="h-5 w-5" />,
    layers: [
      { id: "water-bodies", name: "Water Bodies", visible: true },
      { id: "vegetation", name: "Vegetation Cover", visible: true },
      { id: "land-use", name: "Land Use", visible: false },
    ],
  },
  {
    name: "Climate Layers",
    icon: <Cloud className="h-5 w-5" />,
    layers: [
      {
        id: "temperature",
        name: "Temperature",
        visible: false,
        description: "Global temperature data",
      },
      {
        id: "precipitation",
        name: "Precipitation",
        visible: false,
        description: "Rainfall and precipitation patterns",
      },
      {
        id: "wind",
        name: "Wind Patterns",
        visible: false,
        description: "Wind direction and speed",
      },
    ],
  },
  {
    name: "Analytics",
    icon: <BarChart2 className="h-5 w-5" />,
    layers: [
      {
        id: "h3-grid",
        name: "H3 Hexagon Grid",
        visible: true,
        description: "Spatial indexing system",
      },
      { id: "risk-zones", name: "Risk Assessment Zones", visible: false },
      { id: "anomalies", name: "Detected Anomalies", visible: false },
    ],
  },
  {
    name: "Data Sources",
    icon: <Database className="h-5 w-5" />,
    layers: [
      { id: "sensors", name: "Sensor Network", visible: false },
      { id: "satellites", name: "Satellite Data Feeds", visible: true },
      { id: "user-reports", name: "User Reports", visible: false },
    ],
  },
];

const LayerPanel: React.FC<LayerPanelProps> = ({
  categories = defaultCategories,
  onLayerToggle = () => {},
  onOpacityChange = () => {},
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Base Maps",
  ]);
  const [layerStates, setLayerStates] = useState<Record<string, boolean>>(
    categories
      .flatMap((cat) => cat.layers)
      .reduce(
        (acc, layer) => {
          acc[layer.id] = layer.visible;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
  );

  const handleLayerToggle = (layerId: string) => {
    setLayerStates((prev) => {
      const newState = { ...prev, [layerId]: !prev[layerId] };
      onLayerToggle(layerId, newState[layerId]);
      return newState;
    });
  };

  const toggleAllLayers = (categoryName: string, visible: boolean) => {
    const category = categories.find((c) => c.name === categoryName);
    if (!category) return;

    const newStates = { ...layerStates };
    category.layers.forEach((layer) => {
      newStates[layer.id] = visible;
      onLayerToggle(layer.id, visible);
    });

    setLayerStates(newStates);
  };

  return (
    <Card className="w-full max-w-sm bg-background border-border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Map Layers
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const allVisible = Object.values(layerStates).every((v) => v);
              const newState = !allVisible;

              const newStates = { ...layerStates };
              categories
                .flatMap((c) => c.layers)
                .forEach((layer) => {
                  newStates[layer.id] = newState;
                  onLayerToggle(layer.id, newState);
                });

              setLayerStates(newStates);
            }}
          >
            {Object.values(layerStates).every((v) => v) ? (
              <>
                <EyeOff className="h-4 w-4 mr-1" />
                Hide All
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Show All
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          value={expandedCategories}
          onValueChange={setExpandedCategories}
          className="w-full"
        >
          {categories.map((category) => (
            <AccordionItem key={category.name} value={category.name}>
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">
                    Toggle all in category
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => toggleAllLayers(category.name, true)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Show
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => toggleAllLayers(category.name, false)}
                    >
                      <EyeOff className="h-3 w-3 mr-1" />
                      Hide
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  {category.layers.map((layer) => (
                    <div
                      key={layer.id}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`layer-${layer.id}`}
                          checked={layerStates[layer.id]}
                          onCheckedChange={() => handleLayerToggle(layer.id)}
                        />
                        <label
                          htmlFor={`layer-${layer.id}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {layer.name}
                          {layer.description && (
                            <p className="text-xs text-muted-foreground">
                              {layer.description}
                            </p>
                          )}
                        </label>
                      </div>
                      <Switch
                        checked={layerStates[layer.id]}
                        onCheckedChange={() => handleLayerToggle(layer.id)}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default LayerPanel;
