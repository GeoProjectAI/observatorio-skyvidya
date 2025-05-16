import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ZoomIn,
  ZoomOut,
  Layers,
  Home,
  Compass,
  Map,
  PenLine,
  Maximize,
  Minimize,
} from "lucide-react";

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
  onCompassClick?: () => void;
  onLayersClick?: () => void;
  onDrawClick?: () => void;
  onMapStyleChange?: () => void;
}

const MapControls = ({
  onZoomIn = () => console.log("Zoom in clicked"),
  onZoomOut = () => console.log("Zoom out clicked"),
  onReset = () => console.log("Reset view clicked"),
  onToggleFullscreen = () => console.log("Toggle fullscreen clicked"),
  isFullscreen = false,
  onCompassClick = () => console.log("Compass clicked"),
  onLayersClick = () => console.log("Layers clicked"),
  onDrawClick = () => console.log("Draw clicked"),
  onMapStyleChange = () => console.log("Map style changed"),
}: MapControlsProps) => {
  return (
    <div className="absolute right-4 top-20 flex flex-col gap-2 bg-background/80 p-2 rounded-lg shadow-md backdrop-blur-sm border border-border z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomIn}
              className="bg-background hover:bg-accent"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom In</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomOut}
              className="bg-background hover:bg-accent"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom Out</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              className="bg-background hover:bg-accent"
            >
              <Home className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Reset View</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCompassClick}
              className="bg-background hover:bg-accent"
            >
              <Compass className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Orient North</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLayersClick}
              className="bg-background hover:bg-accent"
            >
              <Layers className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Toggle Layers</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDrawClick}
              className="bg-background hover:bg-accent"
            >
              <PenLine className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Draw Tools</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onMapStyleChange}
              className="bg-background hover:bg-accent"
            >
              <Map className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Change Map Style</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFullscreen}
              className="bg-background hover:bg-accent"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MapControls;
