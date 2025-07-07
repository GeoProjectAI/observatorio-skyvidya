
import React from "react";
import { AlertCircle, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AlertsSection = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-skyvidya-deepBlue">
          System Alerts
        </h2>
        <p className="text-slate-600 mt-1">
          Real-time monitoring alerts and notifications
        </p>
      </div>
      <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
        2 Active Alerts
      </div>
    </div>

    <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Weather Warning: Heavy Rainfall
        </CardTitle>
        <CardDescription>
          Alert ID: WTH-2023-0516 • Priority: Medium
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">
          Potential flooding risk in monitored regions. Precipitation levels
          exceeding seasonal averages by 40%. Affected areas include northern
          watershed regions and coastal zones.
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-slate-500">Issued: 2 hours ago</span>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>

    <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Critical: Deforestation Activity Detected
        </CardTitle>
        <CardDescription>
          Alert ID: DEF-2023-0789 • Priority: High
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">
          Unauthorized land clearing detected in protected area. Approximately
          5 hectares affected in the last 24 hours. Satellite imagery confirms
          active clearing operations in progress.
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-slate-500">
            Issued: 30 minutes ago
          </span>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>

    <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-green-500" />
          Resolved: Air Quality Threshold Exceeded
        </CardTitle>
        <CardDescription>
          Alert ID: AQI-2023-0432 • Priority: Low
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">
          Previously reported air quality issues in urban monitoring stations
          have returned to normal levels. All stations now reporting values
          within acceptable parameters.
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-slate-500">
            Resolved: 3 hours ago
          </span>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Resolved
          </Badge>
        </div>
      </CardContent>
    </Card>
  </div>
);
