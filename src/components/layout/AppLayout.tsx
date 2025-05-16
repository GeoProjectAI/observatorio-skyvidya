import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ChatbotInterface from "../ai/ChatbotInterface";

interface AppLayoutProps {
  children?: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
  showAIAssistant?: boolean;
  userName?: string;
  onNavigate?: (route: string) => void;
  activeRoute?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showSidebar = true,
  showHeader = true,
  showAIAssistant = true,
  userName = "Alex Johnson",
  onNavigate,
  activeRoute,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {showSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigate}
          activeRoute={activeRoute}
          userName={userName}
        />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        {showHeader && (
          <Header
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            userName={userName}
          />
        )}

        <main className="flex-1 overflow-auto relative">
          {children || <Outlet />}

          {/* AI Assistant - fixed position */}
          {showAIAssistant && (
            <div className="fixed bottom-4 right-4 z-40">
              <ChatbotInterface floatingMode={true} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
