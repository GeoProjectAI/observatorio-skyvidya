import React, { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import {
  Home,
  Map,
  BarChart2,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  User,
  Menu,
  ChevronRight,
  ChevronLeft,
  Layers,
  Activity,
  Database,
  AlertTriangle,
  Cloud,
  Users,
  Calendar,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onNavigate?: (route: string) => void;
  activeRoute?: string;
}

const Sidebar = ({
  isOpen = true,
  onToggle = () => {},
  userName = "Alex Johnson",
  userRole = "Environmental Analyst",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  onNavigate = () => {},
  activeRoute = "home",
}: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      id: "map",
      label: "Map Explorer",
      icon: <Map className="h-5 w-5" />,
      description: "Interactive geospatial visualization",
    },
    {
      id: "home",
      label: "Framework",
      icon: <Home className="h-5 w-5" />,
      description: "Platform overview and key metrics",
    },
    {
      id: "monitoring",
      label: "Monitoring",
      icon: <Activity className="h-5 w-5" />,
      description: "Real-time environmental monitoring",
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: <Bell className="h-5 w-5" />,
      description: "Notifications and warnings",
      badge: 3,
    },
    {
      id: "ai",
      label: "AI Assistant",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Conversational geospatial AI",
    },
  ];

  const frameworkItems = [
    {
      id: "who",
      label: "WHO",
      icon: <Users className="h-5 w-5" />,
      description: "Entity visualization",
    },
    {
      id: "where",
      label: "WHERE",
      icon: <Map className="h-5 w-5" />,
      description: "Location analysis",
    },
    {
      id: "when",
      label: "WHEN",
      icon: <Calendar className="h-5 w-5" />,
      description: "Temporal analysis",
    },
    {
      id: "what",
      label: "WHAT",
      icon: <Database className="h-5 w-5" />,
      description: "Activity monitoring",
    },
    {
      id: "risks",
      label: "RISKS",
      icon: <AlertTriangle className="h-5 w-5" />,
      description: "Threat assessment",
    },
    {
      id: "conditions",
      label: "CONDITIONS",
      icon: <Cloud className="h-5 w-5" />,
      description: "Environmental factors",
    },
  ];

  const handleNavigate = (route: string) => {
    onNavigate(route);
    setIsMobileOpen(false);
  };

  const renderNavItem = (item: any) => (
    <Button
      key={item.id}
      variant={activeRoute === item.id ? "secondary" : "ghost"}
      className={`w-full justify-start mb-1 ${isOpen ? "px-4" : "px-2"}`}
      onClick={() => handleNavigate(item.id)}
    >
      <div className="flex items-center w-full">
        <div
          className={`${activeRoute === item.id ? "text-primary" : "text-muted-foreground"} ${isOpen ? "mr-3" : ""}`}
        >
          {item.icon}
        </div>
        {isOpen && (
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{item.label}</span>
            {item.description && (
              <span className="text-xs text-muted-foreground hidden group-hover:block">
                {item.description}
              </span>
            )}
          </div>
        )}
        {isOpen && item.badge && (
          <div className="ml-auto bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {item.badge}
          </div>
        )}
      </div>
    </Button>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
            SV
          </div>
          {isOpen && (
            <div>
              <h2 className="font-bold text-lg">SKYVIDYA</h2>
              <p className="text-xs text-muted-foreground">
                GeoIntelligence Platform
              </p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hidden md:flex"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      <Separator className="mb-4" />

      {isOpen && (
        <div className="px-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-sm">{userName}</h3>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto px-2">
        <div className="space-y-1">
          {isOpen && (
            <p className="text-xs font-medium text-muted-foreground px-4 py-2">
              MAIN NAVIGATION
            </p>
          )}
          {navigationItems.map(renderNavItem)}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {isOpen && (
            <p className="text-xs font-medium text-muted-foreground px-4 py-2">
              SKYVIDYA FRAMEWORK
            </p>
          )}
          {frameworkItems.map(renderNavItem)}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <Separator className="mb-4" />
        <div className="space-y-1">
          {renderNavItem({
            id: "settings",
            label: "Settings",
            icon: <Settings className="h-5 w-5" />,
          })}
          {renderNavItem({
            id: "help",
            label: "Help & Support",
            icon: <HelpCircle className="h-5 w-5" />,
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex h-full flex-col border-r transition-all duration-300 ${isOpen ? "w-[280px]" : "w-[70px]"}`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
