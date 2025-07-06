
import React from "react";
import { Navigate } from "react-router-dom";

// This component redirects to the observatory framework
function Home() {
  return <Navigate to="/observatory/framework" replace />;
}

export default Home;
