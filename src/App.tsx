
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from "./components/TestComponent";
import Home from "./components/home";

console.log("App.tsx: Starting to render App with routing");

const App: React.FC = () => {
  console.log("App.tsx: App component rendering with routing");
  
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="*" element={<Home />} />
        </Routes>
        
        <div className="fixed bottom-4 left-4 p-4 bg-green-100 text-green-800 rounded-md text-sm">
          <h3 className="font-bold">Step 2: Routing Added</h3>
          <p>✅ React Router working</p>
          <p>✅ Basic navigation functional</p>
        </div>
      </div>
    </Router>
  );
};

console.log("App.tsx: App component with routing defined");

export default App;
