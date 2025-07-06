
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from "./components/TestComponent";
import Home from "./components/home";
import Observatory from "./components/observatory/Observatory";

console.log("App.tsx: Starting to render App with Observatory routing");

const App: React.FC = () => {
  console.log("App.tsx: App component rendering with Observatory routing");
  
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/observatory/*" element={<Observatory />} />
          <Route path="*" element={<Home />} />
        </Routes>
        
        <div className="fixed bottom-4 left-4 p-4 bg-blue-100 text-blue-800 rounded-md text-sm">
          <h3 className="font-bold">Step 3: Observatory Added</h3>
          <p>✅ React Router working</p>
          <p>✅ Basic navigation functional</p>
          <p>✅ Observatory component restored</p>
        </div>
      </div>
    </Router>
  );
};

console.log("App.tsx: App component with Observatory routing defined");

export default App;
