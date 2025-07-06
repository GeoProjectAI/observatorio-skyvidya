
import React from "react";

const TestComponent = () => {
  console.log("TestComponent: Rendering test component");
  
  return (
    <div className="p-4 bg-blue-100 text-blue-800 rounded-md">
      <h1 className="text-2xl font-bold">System Test</h1>
      <p>If you can see this, the basic React rendering is working!</p>
    </div>
  );
};

export default TestComponent;
