import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./card";
import { Progress } from "./progress";
import { cn } from "@/lib/utils";
import { Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherCardProps {
  location: string;
  country?: string;
  temperature: {
    current: number;
    unit: "C" | "F";
    high?: number;
    low?: number;
  };
  precipitation?: {
    value: number;
    unit: "%" | "mm";
  };
  wind?: {
    speed: number;
    unit: "km/h" | "mph";
    direction?: string;
  };
  airQuality?: {
    index: number;
    label: string;
    description?: string;
  };
  className?: string;
}

export function WeatherCard({
  location,
  country,
  temperature,
  precipitation,
  wind,
  airQuality,
  className,
}: WeatherCardProps) {
  return (
    <Card className={cn("bg-white shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-skyvidya-teal">
              {location}
            </CardTitle>
            {country && (
              <CardDescription className="text-skyvidya-darkGray">
                {country}
              </CardDescription>
            )}
          </div>
          <div className="text-sm text-skyvidya-darkGray">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Temperature */}
          <div className="bg-skyvidya-deepBlue/10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-5 w-5 text-skyvidya-deepBlue" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <div className="text-3xl font-bold text-skyvidya-deepBlue">
              {temperature.current}°{temperature.unit}
            </div>
            {temperature.high && temperature.low && (
              <div className="text-xs text-skyvidya-darkGray mt-1">
                H: {temperature.high}° L: {temperature.low}°
              </div>
            )}
          </div>

          {/* Precipitation */}
          {precipitation && (
            <div className="bg-skyvidya-skyBlue/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-skyvidya-skyBlue" />
                <span className="text-sm font-medium">Precipitation</span>
              </div>
              <div className="text-3xl font-bold text-skyvidya-skyBlue">
                {precipitation.value}
                {precipitation.unit}
              </div>
              <Progress
                value={
                  precipitation.unit === "%"
                    ? precipitation.value
                    : Math.min(precipitation.value / 2, 100)
                }
                className="h-1 mt-2 bg-skyvidya-skyBlue/20"
              />
            </div>
          )}

          {/* Wind */}
          {wind && (
            <div className="bg-skyvidya-freshGreen/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="h-5 w-5 text-skyvidya-freshGreen" />
                <span className="text-sm font-medium">Wind Speed</span>
              </div>
              <div className="text-3xl font-bold text-skyvidya-freshGreen">
                {wind.speed} {wind.unit}
              </div>
              {wind.direction && (
                <div className="text-xs text-skyvidya-darkGray mt-1">
                  {wind.direction}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Air Quality */}
        {airQuality && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Air Quality</span>
              <span className="text-lg font-bold">{airQuality.index}</span>
            </div>
            <Progress
              value={Math.min(airQuality.index / 2, 100)}
              className="h-2 bg-gray-100"
            />
            <div className="flex justify-between mt-1">
              <span className="text-sm font-medium text-skyvidya-vibrantGreen">
                {airQuality.label}
              </span>
              {airQuality.description && (
                <span className="text-xs text-skyvidya-darkGray">
                  {airQuality.description}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
