
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Map,
  Cloud,
  Layers,
  Activity,
  Bell,
  MessageSquare,
  Info,
} from "lucide-react";

interface NavigationTabsProps {
  activeSection: string;
  onNavigate: (route: string) => void;
}

export const NavigationTabs = ({ activeSection, onNavigate }: NavigationTabsProps) => {
  const navigationItems = [
    { id: "framework", label: "Framework", icon: "home" },
    { id: "map", label: "Map Explorer", icon: "map" },
    { id: "weather", label: "Weather Study", icon: "cloud" },
    { id: "ecosystem", label: "Ecosystem Intelligence", icon: "layers" },
    { id: "monitoring", label: "Monitoring", icon: "activity" },
    { id: "alerts", label: "Alerts", icon: "bell" },
    { id: "ai", label: "AI Assistant", icon: "messageSquare" },
  ];

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

  return (
    <div className="mb-6 border-b">
      <div className="flex space-x-1 overflow-x-auto pb-2">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => onNavigate(item.id)}
          >
            {getIconComponent(item.icon)}
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
