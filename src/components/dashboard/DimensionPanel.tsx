import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  BarChart,
  Activity,
  Users,
  MapPin,
  Calendar,
  Briefcase,
  HelpCircle,
  Users2,
  AlertTriangle,
  Cloud,
  Zap,
} from "lucide-react";

export type DimensionType =
  | "WHO"
  | "WHERE"
  | "WHEN"
  | "WHAT"
  | "WHY"
  | "WITH WHOM"
  | "RISKS"
  | "CONDITIONS";

interface DimensionPanelProps {
  type: DimensionType;
  title?: string;
  description?: string;
  value?: string | number;
  trend?: "up" | "down" | "stable";
  trendValue?: string | number;
  score?: number; // Score contribution to SKYVIDYA SCORE (0-100)
  onClick?: () => void;
}

const dimensionConfig = {
  WHO: {
    icon: Users,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    description: "Entity visualization and tracking",
  },
  WHERE: {
    icon: MapPin,
    color: "bg-green-100",
    iconColor: "text-green-600",
    description: "Location analysis and mapping",
  },
  WHEN: {
    icon: Calendar,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    description: "Temporal analysis and trends",
  },
  WHAT: {
    icon: Briefcase,
    color: "bg-amber-100",
    iconColor: "text-amber-600",
    description: "Activity monitoring and analysis",
  },
  WHY: {
    icon: HelpCircle,
    color: "bg-rose-100",
    iconColor: "text-rose-600",
    description: "Causal analysis and reasoning",
  },
  "WITH WHOM": {
    icon: Users2,
    color: "bg-indigo-100",
    iconColor: "text-indigo-600",
    description: "Relationship mapping and networks",
  },
  RISKS: {
    icon: AlertTriangle,
    color: "bg-red-100",
    iconColor: "text-red-600",
    description: "Threat assessment and risk analysis",
  },
  CONDITIONS: {
    icon: Cloud,
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
    description: "Environmental factors and conditions",
  },
};

const DimensionPanel = ({
  type = "WHO",
  title,
  description,
  value = "0",
  trend = "stable",
  trendValue = "0%",
  score = 0,
  onClick = () => {},
}: DimensionPanelProps) => {
  const config = dimensionConfig[type];
  const Icon = config.icon;

  const getTrendIcon = () => {
    if (trend === "up") return <BarChart className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <BarChart className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getTrendClass = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  // Determine score status color
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card
      className={`w-full h-full ${config.color} border-none cursor-pointer transition-all hover:shadow-md`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-full ${config.color}`}>
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="bg-white/50 hover:bg-white/70"
                  >
                    {type}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{config.description}</p>
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
        <CardTitle className="text-lg mt-2">{title || type}</CardTitle>
        <CardDescription>{description || config.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-2xl font-bold">{value}</div>
        {score > 0 && (
          <div className="mt-2">
            <Progress value={score} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-1">
          {getTrendIcon()}
          <span className={`text-xs font-medium ${getTrendClass()}`}>
            {trendValue}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DimensionPanel;
