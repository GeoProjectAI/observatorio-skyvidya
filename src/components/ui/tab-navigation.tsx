import React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline";
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className,
  variant = "default",
}: TabNavigationProps) {
  const getTabStyles = (isActive: boolean) => {
    switch (variant) {
      case "pills":
        return isActive
          ? "bg-skyvidya-deepBlue text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200";
      case "underline":
        return isActive
          ? "border-b-2 border-skyvidya-deepBlue text-skyvidya-deepBlue"
          : "border-b-2 border-transparent text-gray-600 hover:text-skyvidya-deepBlue hover:border-gray-300";
      default:
        return isActive
          ? "bg-white text-skyvidya-deepBlue shadow-sm"
          : "bg-gray-100 text-gray-600 hover:bg-gray-50";
    }
  };

  return (
    <div
      className={cn(
        "flex",
        variant === "default" ? "bg-gray-100 p-1 rounded-md" : "",
        variant === "underline" ? "border-b border-gray-200" : "",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
            variant === "default" || variant === "pills" ? "rounded-md" : "",
            variant === "underline" ? "pb-3" : "",
            getTabStyles(activeTab === tab.id),
          )}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
