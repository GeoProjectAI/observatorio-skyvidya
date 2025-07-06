
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  console.log("Home: Rendering home component - Step 3 Observatory test");
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-skyvidya-deepBlue mb-4">
            SKYVIDYA Platform - Step 3: Observatory Test
          </h1>
          <p className="text-slate-600 mb-4">
            Welcome to the SKYVIDYA platform. We're gradually rebuilding the system step by step.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-800">✅ Working Components</h3>
              <ul className="text-sm text-green-700 mt-2">
                <li>• Basic React rendering</li>
                <li>• Tailwind CSS styling</li>
                <li>• TypeScript compilation</li>
                <li>• React Router navigation</li>
                <li>• Observatory component restored</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-800">🔄 Next Steps</h3>
              <ul className="text-sm text-blue-700 mt-2">
                <li>• Test Observatory sections</li>
                <li>• Verify framework components</li>
                <li>• Check all dependencies</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/test" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
            >
              Test Component →
            </Link>
            <Link 
              to="/observatory" 
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-center"
            >
              Observatory →
            </Link>
            <Link 
              to="/observatory/framework" 
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-center"
            >
              Framework →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
