
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Observatory from "./components/observatory/Observatory";

const App: React.FC = () => {
  console.log("App component rendering - start");
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <>
              {console.log("Home route matched")}
              <Home />
            </>
          } />
          <Route path="/observatory/*" element={<Observatory />} />
          <Route path="*" element={
            <>
              {console.log("Fallback route matched")}
              <Home />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
