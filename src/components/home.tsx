
import React from "react";
import { Navigate } from "react-router-dom";

// This component is deprecated and kept for backward compatibility
// The main application now uses Observatory.tsx for the SaaS platform
function Home() {
  // Simply redirect to the new Observatory component
  return <Navigate to="/observatory/framework" replace />;
}

export default Home;
