
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  console.log("Home component rendering - component loaded");
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            SKYVIDYA Platform - TESTE
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Sistema de observatório inteligente para análise de ecossistemas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Link 
              to="/observatory" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center block"
            >
              Observatory
            </Link>
            <Link 
              to="/observatory/framework" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center block"
            >
              Framework
            </Link>
            <Link 
              to="/observatory/map" 
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors text-center block"
            >
              Map Explorer
            </Link>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-green-800 font-bold text-xl mb-3">
              ✅ Sistema SKYVIDYA
            </h3>
            <p className="text-green-700">
              Plataforma de observatório inteligente para análise de ecossistemas funcionando corretamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
