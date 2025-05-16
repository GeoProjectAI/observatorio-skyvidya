import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Pencil,
  Square,
  Circle,
  MousePointer,
  Trash2,
  Save,
  Map,
} from "lucide-react";

interface SpatialQueryToolsProps {
  onDrawArea?: (type: string) => void;
  onSelectBoundary?: (boundaryId: string) => void;
  onPointSelection?: (enabled: boolean) => void;
  onClearSelection?: () => void;
  onSaveSelection?: (name: string) => void;
  availableBoundaries?: Array<{ id: string; name: string }>;
  isDrawing?: boolean;
  activeDrawingTool?: string;
}

const SpatialQueryTools = ({
  onDrawArea = () => {},
  onSelectBoundary = () => {},
  onPointSelection = () => {},
  onClearSelection = () => {},
  onSaveSelection = () => {},
  availableBoundaries = [
    { id: "countries", name: "Countries" },
    { id: "states", name: "States/Provinces" },
    { id: "counties", name: "Counties/Districts" },
    { id: "watersheds", name: "Watersheds" },
    { id: "h3-cells", name: "H3 Hexagons" },
  ],
  isDrawing = false,
  activeDrawingTool = "",
}: SpatialQueryToolsProps) => {
  const [activeTab, setActiveTab] = useState("draw");
  const [selectionName, setSelectionName] = useState("");

  return (
    <Card className="w-[300px] bg-white shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-blue-800">
          Spatial Query Tools
        </CardTitle>
        <CardDescription>Select areas of interest for analysis</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-2">
            <TabsTrigger value="draw">Draw</TabsTrigger>
            <TabsTrigger value="select">Select</TabsTrigger>
            <TabsTrigger value="point">Point</TabsTrigger>
          </TabsList>

          <TabsContent value="draw" className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        activeDrawingTool === "polygon" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => onDrawArea("polygon")}
                      className="flex items-center gap-1"
                    >
                      <Pencil size={16} />
                      <span>Polygon</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Draw a custom polygon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        activeDrawingTool === "rectangle"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => onDrawArea("rectangle")}
                      className="flex items-center gap-1"
                    >
                      <Square size={16} />
                      <span>Rectangle</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Draw a rectangle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        activeDrawingTool === "circle" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => onDrawArea("circle")}
                      className="flex items-center gap-1"
                    >
                      <Circle size={16} />
                      <span>Circle</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Draw a circle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {isDrawing && (
              <div className="text-sm text-blue-600 italic">
                Click on the map to start drawing. Double-click to finish.
              </div>
            )}
          </TabsContent>

          <TabsContent value="select" className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Select boundary type:
              </label>
              <Select onValueChange={onSelectBoundary}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose boundary type" />
                </SelectTrigger>
                <SelectContent>
                  {availableBoundaries.map((boundary) => (
                    <SelectItem key={boundary.id} value={boundary.id}>
                      {boundary.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-500 mt-1">
                After selecting a boundary type, click on the map to select
                specific regions.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="point" className="space-y-3">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPointSelection(true)}
                className="flex items-center gap-1 w-full justify-center"
              >
                <MousePointer size={16} />
                <span>Enable Point Selection</span>
              </Button>
              <div className="text-sm text-gray-500">
                Click on the map to select individual points or features for
                analysis.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onClearSelection}
          className="flex items-center gap-1"
        >
          <Trash2 size={16} />
          <span>Clear</span>
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                onClick={() => onSaveSelection(selectionName)}
                className="flex items-center gap-1"
              >
                <Save size={16} />
                <span>Save Selection</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save current selection for future use</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default SpatialQueryTools;
