
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from "./components/TestComponent";
import Home from "./components/home";
import Observatory from "./components/observatory/Observatory";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/observatory/*" element={<Observatory />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
