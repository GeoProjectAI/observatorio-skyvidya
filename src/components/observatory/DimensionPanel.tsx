import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DimensionPanelProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  value: number;
  score: number; // Score out of 100
  trend: "up" | "down" | "neutral";
  trendValue: number;
  color:
    | "deepBlue"
    | "seaBlue"
    | "skyBlue"
    | "vibrantGreen"
    | "freshGreen"
    | "coral"
    | "peach";
  isSelected?: boolean;
  onClick?: () => void;
}

const DimensionPanel = ({
  title,
  description,
  icon,
  value,
  score,
  trend,
  trendValue,
  color = "deepBlue",
  isSelected = false,
  onClick = () => {},
}: DimensionPanelProps) => {
  const getColorClass = () => {
    switch (color) {
      case "deepBlue":
        return "bg-skyvidya-deepBlue";
      case "seaBlue":
        return "bg-skyvidya-seaBlue";
      case "skyBlue":
        return "bg-skyvidya-skyBlue";
      case "vibrantGreen":
        return "bg-skyvidya-vibrantGreen";
      case "freshGreen":
        return "bg-skyvidya-freshGreen";
      case "coral":
        return "bg-skyvidya-coral";
      case "peach":
        return "bg-skyvidya-peach";
      default:
        return "bg-skyvidya-deepBlue";
    }
  };

  const getColorTextClass = () => {
    switch (color) {
      case "deepBlue":
        return "text-skyvidya-deepBlue";
      case "seaBlue":
        return "text-skyvidya-seaBlue";
      case "skyBlue":
        return "text-skyvidya-skyBlue";
      case "vibrantGreen":
        return "text-skyvidya-vibrantGreen";
      case "freshGreen":
        return "text-skyvidya-freshGreen";
      case "coral":
        return "text-skyvidya-coral";
      case "peach":
        return "text-skyvidya-peach";
      default:
        return "text-skyvidya-deepBlue";
    }
  };

  const getColorLightClass = () => {
    switch (color) {
      case "deepBlue":
        return "bg-skyvidya-deepBlue/10";
      case "seaBlue":
        return "bg-skyvidya-seaBlue/10";
      case "skyBlue":
        return "bg-skyvidya-skyBlue/10";
      case "vibrantGreen":
        return "bg-skyvidya-vibrantGreen/10";
      case "freshGreen":
        return "bg-skyvidya-freshGreen/10";
      case "coral":
        return "bg-skyvidya-coral/10";
      case "peach":
        return "bg-skyvidya-peach/10";
      default:
        return "bg-skyvidya-deepBlue/10";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") {
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    } else if (trend === "down") {
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getTrendClass = () => {
    if (trend === "up") {
      return "text-green-500";
    } else if (trend === "down") {
      return "text-red-500";
    }
    return "text-gray-500";
  };

  // Determine score status color
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? `ring-2 ring-${getColorTextClass()}` : ""} ${getColorLightClass()} border-none h-full`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className={`${getColorClass()} p-2 rounded-full text-white`}>
            {icon}
          </div>
          <div className="flex flex-col items-end gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="bg-white/50 hover:bg-white/70"
                  >
                    {title}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{description || `${title} dimension analysis`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {score > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 ${getScoreColor()} bg-white/50`}
                    >
                      <Zap className="h-3 w-3" />
                      {score}/100
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Contribution to SKYVIDYA SCORE</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center space-x-1 mt-1">
            {getTrendIcon()}
            <span className={`text-xs font-medium ${getTrendClass()}`}>
              {trendValue}%
            </span>
          </div>
        </div>
        {score > 0 && (
          <div className="mt-3">
            <Progress value={score} className="h-1" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DimensionPanel;
