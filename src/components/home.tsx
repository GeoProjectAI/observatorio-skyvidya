
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  console.log("Home: Rendering home component - Step 4 Observatory section testing");
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-skyvidya-deepBlue mb-4">
            SKYVIDYA Platform - Step 4: Observatory Section Testing
          </h1>
          <p className="text-slate-600 mb-4">
            Welcome to the SKYVIDYA platform. We're now testing individual Observatory sections.
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
                <li>• Framework Observatory working</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-800">🔄 Current Testing</h3>
              <ul className="text-sm text-blue-700 mt-2">
                <li>• Observatory section navigation</li>
                <li>• Framework components validation</li>
                <li>• Individual section loading</li>
                <li>• Context data sharing</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <Link 
              to="/observatory/map" 
              className="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors text-center"
            >
              Map Test →
            </Link>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-bold text-amber-800 mb-2">Step 4 Goals</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-amber-700">
              <div>• Test Framework section ✅</div>
              <div>• Test Map section 🔄</div>
              <div>• Test Weather section 🔄</div>
              <div>• Test Ecosystem section 🔄</div>
              <div>• Test Monitoring section 🔄</div>
              <div>• Test AI Assistant 🔄</div>
              <div>• Verify all dependencies 🔄</div>
              <div>• Check component integration 🔄</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
