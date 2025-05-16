import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Thermometer,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Cloud,
  CloudRain,
  Leaf,
  Building,
  Car,
  Heart,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Info,
  Globe,
  RefreshCw,
} from "lucide-react";

interface WeatherStudyCaseProps {
  location: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  currentWeather: {
    temperature: number;
    temperatureUnit: "C" | "F";
    temperatureHigh: number;
    temperatureLow: number;
    precipitation: number;
    precipitationUnit: "%" | "mm";
    windSpeed: number;
    windDirection: string;
    windSpeedUnit: "km/h" | "mph";
    airQuality: {
      index: number;
      label: string;
      description: string;
    };
    localTime: string;
  };
  dailyInfo: {
    sunrise: string;
    sunset: string;
  };
  forecast: Array<{
    day: string;
    tempLow: number;
    tempHigh: number;
    precipitation: string;
    humidity: string;
    windSpeed: string;
    icon: "sunny" | "rainy" | "cloudy" | "partlyCloudy";
  }>;
  trends: {
    temperatureVsHistoricalAverage: number;
    temperatureVsLastYear: number;
    monthlyPrecipitation: number;
    precipitationVsAverage: number;
  };
  extremeEvents: {
    annualMeanChange: number;
    summerMaximum: number;
    winterMinimum: number;
    annualPrecipitationChange: number;
    heavyEvents: number;
    droughtIntensity: number;
  };
  assetRisk: {
    environmental: Array<{
      name: string;
      risk: "Low Risk" | "Medium Risk" | "High Risk";
    }>;
    infrastructure: Array<{
      name: string;
      risk: "Low Risk" | "Medium Risk" | "High Risk";
    }>;
  };
  recommendations: {
    urbanPlanning: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    infrastructure: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

export function WeatherStudyCase({
  location = "New York",
  country = "USA",
  coordinates = { latitude: 40.7128, longitude: -74.006 },
  currentWeather = {
    temperature: 5.2,
    temperatureUnit: "C" as const,
    temperatureHigh: 10.2,
    temperatureLow: 0.2,
    precipitation: 65,
    precipitationUnit: "%" as const,
    windSpeed: 5.6,
    windDirection: "NE",
    windSpeedUnit: "km/h" as const,
    airQuality: {
      index: 32,
      label: "Good",
      description: "Air quality is good. Perfect for outdoor activities.",
    },
    localTime: "21:26:08",
  },
  dailyInfo = {
    sunrise: "06:30",
    sunset: "19:45",
  },
  forecast = [
    {
      day: "Monday",
      tempLow: 1,
      tempHigh: 14,
      precipitation: "NaN% rain",
      humidity: "NaN%",
      windSpeed: "NaN km/h",
      icon: "sunny" as const,
    },
    {
      day: "Tuesday",
      tempLow: 1,
      tempHigh: 14,
      precipitation: "NaN% rain",
      humidity: "NaN%",
      windSpeed: "NaN km/h",
      icon: "sunny" as const,
    },
    {
      day: "Wednesday",
      tempLow: 3,
      tempHigh: 13,
      precipitation: "NaN% rain",
      humidity: "NaN%",
      windSpeed: "NaN km/h",
      icon: "sunny" as const,
    },
    {
      day: "Thursday",
      tempLow: 3,
      tempHigh: 10,
      precipitation: "NaN% rain",
      humidity: "NaN%",
      windSpeed: "NaN km/h",
      icon: "sunny" as const,
    },
    {
      day: "Friday",
      tempLow: 1,
      tempHigh: 8,
      precipitation: "NaN% rain",
      humidity: "NaN%",
      windSpeed: "NaN km/h",
      icon: "sunny" as const,
    },
    {
      day: "Saturday",
      tempLow: 1,
      tempHigh: 15,
      precipitation: "NaN% rain",
      humidity: "NaN%",
      windSpeed: "NaN km/h",
      icon: "sunny" as const,
    },
  ],
  trends = {
    temperatureVsHistoricalAverage: -0.4,
    temperatureVsLastYear: 0.9,
    monthlyPrecipitation: 106.7,
    precipitationVsAverage: 11.4,
  },
  extremeEvents = {
    annualMeanChange: 2.1,
    summerMaximum: 3.5,
    winterMinimum: 1.8,
    annualPrecipitationChange: 12,
    heavyEvents: 25,
    droughtIntensity: 15,
  },
  assetRisk = {
    environmental: [
      { name: "Agriculture Impact", risk: "Low Risk" as const },
      { name: "Urban Heat", risk: "Low Risk" as const },
    ],
    infrastructure: [
      { name: "Water Resources", risk: "Low Risk" as const },
      { name: "Transportation", risk: "Low Risk" as const },
    ],
  },
  recommendations = {
    urbanPlanning: [
      {
        title: "Heat Mitigation",
        description:
          "Implement green infrastructure and cool roofs to reduce urban heat island effects.",
        icon: "thermometer",
      },
      {
        title: "Water Management",
        description:
          "Enhance stormwater systems and implement water-sensitive urban design.",
        icon: "droplets",
      },
    ],
    infrastructure: [
      {
        title: "Transport Resilience",
        description:
          "Strengthen transport infrastructure against extreme weather events.",
        icon: "car",
      },
      {
        title: "Public Health",
        description:
          "Establish cooling centers and emergency response systems.",
        icon: "heart",
      },
    ],
  },
}: WeatherStudyCaseProps) {
  const [activeTab, setActiveTab] = useState("daily");

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low Risk":
        return "bg-green-100 text-green-800";
      case "Medium Risk":
        return "bg-amber-100 text-amber-800";
      case "High Risk":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sunny":
        return (
          <div className="h-6 w-6 text-amber-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
        );
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "partlyCloudy":
        return <Cloud className="h-6 w-6 text-gray-400" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  const getRecommendationIcon = (iconName: string) => {
    switch (iconName) {
      case "thermometer":
        return <Thermometer className="h-5 w-5 text-skyvidya-deepBlue" />;
      case "droplets":
        return <Droplets className="h-5 w-5 text-skyvidya-skyBlue" />;
      case "car":
        return <Car className="h-5 w-5 text-skyvidya-deepBlue" />;
      case "heart":
        return <Heart className="h-5 w-5 text-skyvidya-coral" />;
      default:
        return <Info className="h-5 w-5 text-skyvidya-deepBlue" />;
    }
  };

  const getTrendArrow = (value: number) => {
    if (value > 0) {
      return <ArrowUp className="h-4 w-4 text-red-500" />;
    } else if (value < 0) {
      return <ArrowDown className="h-4 w-4 text-blue-500" />;
    }
    return null;
  };

  const formatTrendValue = (value: number) => {
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${value}`;
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-skyvidya-teal">
              {location}
            </h1>
            <p className="text-skyvidya-darkGray">{country}</p>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <div className="text-sm text-skyvidya-darkGray">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Current Weather Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Temperature */}
          <div className="bg-skyvidya-deepBlue/10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-5 w-5 text-skyvidya-deepBlue" />
              <span className="text-sm font-medium">Current Temperature</span>
            </div>
            <div className="text-4xl font-bold text-skyvidya-deepBlue">
              {currentWeather.temperature}°{currentWeather.temperatureUnit}
            </div>
            <div className="text-xs text-skyvidya-darkGray mt-1 flex items-center">
              <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
              {currentWeather.temperatureHigh}°
              <ArrowDown className="h-3 w-3 text-blue-500 mx-1" />
              {currentWeather.temperatureLow}°
            </div>
          </div>

          {/* Precipitation */}
          <div className="bg-skyvidya-skyBlue/10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-5 w-5 text-skyvidya-skyBlue" />
              <span className="text-sm font-medium">Precipitation</span>
            </div>
            <div className="text-4xl font-bold text-skyvidya-skyBlue">
              {currentWeather.precipitation}
              {currentWeather.precipitationUnit}
            </div>
            <Progress
              value={currentWeather.precipitation}
              className="h-1 mt-2 bg-skyvidya-skyBlue/20"
            />
          </div>

          {/* Wind */}
          <div className="bg-skyvidya-freshGreen/10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="h-5 w-5 text-skyvidya-freshGreen" />
              <span className="text-sm font-medium">Wind Speed</span>
            </div>
            <div className="text-4xl font-bold text-skyvidya-freshGreen">
              {currentWeather.windSpeed} {currentWeather.windSpeedUnit}
            </div>
            <div className="text-xs text-skyvidya-darkGray mt-1">
              {currentWeather.windDirection}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="extreme-events">Extreme Events</TabsTrigger>
            <TabsTrigger value="asset-risk">Asset Risk</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Daily Tab Content */}
          <TabsContent value="daily" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Daily Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Sunrise className="h-5 w-5 text-amber-500" />
                        <span>Sunrise</span>
                      </div>
                      <span className="font-medium">{dailyInfo.sunrise}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Sunset className="h-5 w-5 text-orange-500" />
                        <span>Sunset</span>
                      </div>
                      <span className="font-medium">{dailyInfo.sunset}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-300 via-orange-400 to-red-500"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-4">Air Quality</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-500">
                        {currentWeather.airQuality.label}
                      </span>
                      <span className="text-2xl font-bold">
                        {currentWeather.airQuality.index}
                      </span>
                    </div>
                    <Progress
                      value={currentWeather.airQuality.index}
                      className="h-2 bg-gray-100"
                    />
                    <p className="text-sm text-skyvidya-darkGray mt-2">
                      {currentWeather.airQuality.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Location Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-skyvidya-darkGray">Latitude</span>
                      <span className="font-medium">
                        {coordinates.latitude.toFixed(4)}°
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-skyvidya-darkGray">Longitude</span>
                      <span className="font-medium">
                        {coordinates.longitude.toFixed(4)}°
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-skyvidya-darkGray">Local Time</span>
                      <span className="font-medium">
                        {currentWeather.localTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-4">
                    Current Conditions
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-skyvidya-darkGray">Humidity</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-skyvidya-darkGray">Wind Speed</span>
                      <span className="font-medium">
                        {currentWeather.windSpeed}{" "}
                        {currentWeather.windSpeedUnit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-skyvidya-darkGray">
                        Precipitation
                      </span>
                      <span className="font-medium">
                        {currentWeather.precipitation}
                        {currentWeather.precipitationUnit}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forecast Tab Content */}
          <TabsContent value="forecast" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {forecast.map((day, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-medium mb-2">{day.day}</h3>
                      <div className="flex justify-center mb-2">
                        {getIcon(day.icon)}
                      </div>
                      <div className="text-lg font-bold">
                        {day.tempLow}° - {day.tempHigh}°
                      </div>
                      <div className="text-xs text-skyvidya-darkGray mt-2">
                        Humidity: {day.humidity}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-skyvidya-darkGray mt-1">
                        <Droplets className="h-3 w-3" />
                        {day.precipitation}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-skyvidya-darkGray mt-1">
                        <Wind className="h-3 w-3" />
                        {day.windSpeed}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trends Tab Content */}
          <TabsContent value="trends" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Temperature Trends
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          vs. Historical Average
                        </span>
                        <div className="flex items-center gap-1">
                          {getTrendArrow(trends.temperatureVsHistoricalAverage)}
                          <span
                            className={`font-medium ${trends.temperatureVsHistoricalAverage > 0 ? "text-red-500" : "text-blue-500"}`}
                          >
                            {formatTrendValue(
                              trends.temperatureVsHistoricalAverage,
                            )}
                            ° C
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${trends.temperatureVsHistoricalAverage > 0 ? "bg-red-500" : "bg-blue-500"}`}
                          style={{
                            width: `${Math.abs(trends.temperatureVsHistoricalAverage) * 10}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          vs. Last Year
                        </span>
                        <div className="flex items-center gap-1">
                          {getTrendArrow(trends.temperatureVsLastYear)}
                          <span
                            className={`font-medium ${trends.temperatureVsLastYear > 0 ? "text-red-500" : "text-blue-500"}`}
                          >
                            {formatTrendValue(trends.temperatureVsLastYear)}°C
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${trends.temperatureVsLastYear > 0 ? "bg-red-500" : "bg-blue-500"}`}
                          style={{
                            width: `${Math.abs(trends.temperatureVsLastYear) * 10}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Precipitation Analysis
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          Monthly Total
                        </span>
                        <span className="font-medium text-skyvidya-skyBlue">
                          {trends.monthlyPrecipitation}mm
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-skyvidya-skyBlue"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          vs. Average
                        </span>
                        <div className="flex items-center gap-1">
                          {getTrendArrow(trends.precipitationVsAverage)}
                          <span
                            className={`font-medium ${trends.precipitationVsAverage > 0 ? "text-skyvidya-skyBlue" : "text-amber-500"}`}
                          >
                            {formatTrendValue(trends.precipitationVsAverage)}mm
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${trends.precipitationVsAverage > 0 ? "bg-skyvidya-skyBlue" : "bg-amber-500"}`}
                          style={{
                            width: `${Math.abs(trends.precipitationVsAverage) * 5}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Comparison based on 30-year historical averages from this
                  location and current data.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Extreme Events Tab Content */}
          <TabsContent value="extreme-events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Temperature Extremes
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          Annual Mean Change
                        </span>
                        <span className="font-medium text-red-500">
                          +{extremeEvents.annualMeanChange}°C
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-300 to-red-500"
                          style={{
                            width: `${extremeEvents.annualMeanChange * 10}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          Summer Maximum
                        </span>
                        <span className="font-medium text-red-600">
                          +{extremeEvents.summerMaximum}°C
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-400 to-red-600"
                          style={{
                            width: `${extremeEvents.summerMaximum * 10}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          Winter Minimum
                        </span>
                        <span className="font-medium text-amber-500">
                          +{extremeEvents.winterMinimum}°C
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-300 to-amber-500"
                          style={{
                            width: `${extremeEvents.winterMinimum * 10}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Precipitation Extremes
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          Annual Change
                        </span>
                        <span className="font-medium text-skyvidya-skyBlue">
                          +{extremeEvents.annualPrecipitationChange}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-skyvidya-skyBlue"
                          style={{
                            width: `${extremeEvents.annualPrecipitationChange * 2}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          Heavy Events
                        </span>
                        <span className="font-medium text-blue-600">
                          +{extremeEvents.heavyEvents}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${extremeEvents.heavyEvents * 2}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-skyvidya-darkGray">
                          Drought Intensity
                        </span>
                        <span className="font-medium text-amber-600">
                          +{extremeEvents.droughtIntensity}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500"
                          style={{
                            width: `${extremeEvents.droughtIntensity * 2}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Comparison based on 30-year historical averages from this
                  location and current data. Positive values indicate increases
                  compared to historical norms.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Asset Risk Tab Content */}
          <TabsContent value="asset-risk" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Environmental Risks
                  </h3>
                  <div className="space-y-4">
                    {assetRisk.environmental.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-500" />
                          <span>{item.name}</span>
                        </div>
                        <Badge
                          className={getRiskBadgeColor(item.risk)}
                          variant="outline"
                        >
                          {item.risk}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Infrastructure Risks
                  </h3>
                  <div className="space-y-4">
                    {assetRisk.infrastructure.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-500" />
                          <span>{item.name}</span>
                        </div>
                        <Badge
                          className={getRiskBadgeColor(item.risk)}
                          variant="outline"
                        >
                          {item.risk}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Risk assessments are based on 30-year historical averages and
                  current climate projections for this location.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Recommendations Tab Content */}
          <TabsContent value="recommendations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Urban Planning</h3>
                  <div className="space-y-6">
                    {recommendations.urbanPlanning.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getRecommendationIcon(item.icon)}
                          <h4 className="font-medium">{item.title}</h4>
                        </div>
                        <p className="text-sm text-skyvidya-darkGray pl-7">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Infrastructure</h3>
                  <div className="space-y-6">
                    {recommendations.infrastructure.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getRecommendationIcon(item.icon)}
                          <h4 className="font-medium">{item.title}</h4>
                        </div>
                        <p className="text-sm text-skyvidya-darkGray pl-7">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Recommendations Note
                  </p>
                  <p className="text-sm text-blue-700">
                    These recommendations are based on 30-year historical
                    averages from this location and current climate projections.
                    Strategies are designed to address specific regional
                    patterns and asset risks identified for this area.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 flex items-center gap-1"
            >
              <Globe className="h-3 w-3" />
              200+ Countries Coverage
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 flex items-center gap-1"
            >
              <AlertTriangle className="h-3 w-3" />
              95% Forecast Accuracy
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Real-time Updates
            </Badge>
          </div>
          <div className="text-xs text-skyvidya-darkGray">
            Data sources: tomorrow.io and ECMWF AIFS climate forecast
          </div>
        </div>
      </div>
    </div>
  );
}
