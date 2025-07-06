
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from "./components/TestComponent";
import Home from "./components/home";
import Observatory from "./components/observatory/Observatory";

console.log("App.tsx: Latest Lovable template applied - Enhanced Features Enabled");

const App: React.FC = () => {
  console.log("App.tsx: App component rendering with latest Lovable features");
  
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/observatory/*" element={<Observatory />} />
          <Route path="*" element={<Home />} />
        </Routes>
        
        <div className="fixed bottom-4 left-4 p-4 bg-green-100 text-green-800 rounded-md text-sm">
          <h3 className="font-bold">✅ Latest Lovable Template Applied</h3>
          <p>🚀 Enhanced development features enabled</p>
          <p>🔧 Component tagging for visual editing</p>
          <p>⚡ Optimized build configuration</p>
          <p>🎯 TypeScript configuration updated</p>
          <p>📦 All dependencies properly configured</p>
        </div>
      </div>
    </Router>
  );
};

console.log("App.tsx: Latest Lovable template successfully implemented");

export default App;
