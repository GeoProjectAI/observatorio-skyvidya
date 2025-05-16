import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Globe,
  Menu,
  Search,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  User,
  Map,
  BarChart2,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onMenuToggle?: () => void;
  onSearchToggle?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onHelpClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const Header = ({
  userName = "User",
  userAvatar = "",
  notificationCount = 3,
  onMenuToggle = () => console.log("Menu toggle clicked"),
  onSearchToggle = () => console.log("Search toggle clicked"),
  onNotificationsClick = () => console.log("Notifications clicked"),
  onProfileClick = () => console.log("Profile clicked"),
  onHelpClick = () => console.log("Help clicked"),
  onSettingsClick = () => console.log("Settings clicked"),
  onLogoutClick = () => console.log("Logout clicked"),
}: HeaderProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="w-full h-16 bg-background border-b border-border flex items-center justify-between px-4 shadow-sm z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-lg hidden sm:inline text-blue-800">
            SKYVIDYA
          </span>
          <span className="text-sm text-muted-foreground hidden md:inline">
            GeoIntelligence Platform
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  <Map className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Interactive Map Interface</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Data Analytics Dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  AI Assistant
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>AI Chatbot Interface</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Alerts
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Real-time Monitoring Alerts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isSearchActive ? (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-[200px] md:w-[300px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              autoFocus
              onBlur={() => setIsSearchActive(false)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setIsSearchActive(false)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchActive(true)}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNotificationsClick}
                aria-label="Notifications"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onHelpClick}
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help & Documentation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 p-0"
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{userName}</span>
                <span className="text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogoutClick}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
