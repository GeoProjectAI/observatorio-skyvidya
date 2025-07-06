
import React from "react";
import TestComponent from "./components/TestComponent";

console.log("App.tsx: Starting to render simplified App component");

const App: React.FC = () => {
  console.log("App.tsx: Simplified App component rendering");
  
  return (
    <div className="min-h-screen bg-background p-4">
      <TestComponent />
      <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
        <h2 className="text-xl font-bold">Step 1: Basic App Working</h2>
        <p>If you see this, the basic React setup is functional!</p>
        <p>Next step: We'll gradually add back the complex components.</p>
      </div>
    </div>
  );
};

console.log("App.tsx: Simplified App component defined");

export default App;
