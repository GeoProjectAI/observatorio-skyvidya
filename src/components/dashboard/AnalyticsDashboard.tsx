import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkyvidyaButton } from "@/components/ui/skyvidya-button";
import { Separator } from "@/components/ui/separator";
import {
  BarChart2,
  Map,
  FileText,
  Activity,
  Globe,
  ArrowRight,
  Users,
  Calendar,
  Database,
  AlertTriangle,
  Cloud,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  description,
  trend,
}) => {
  return (
    <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-blue-50">{icon}</div>
          {trend && (
            <Badge
              variant="outline"
              className={`
                ${trend === "up" ? "bg-green-50 text-green-700" : ""}
                ${trend === "down" ? "bg-red-50 text-red-700" : ""}
                ${trend === "neutral" ? "bg-gray-50 text-gray-700" : ""}
              `}
            >
              {change && change > 0
                ? `+${change}%`
                : change
                  ? `${change}%`
                  : "No change"}
            </Badge>
          )}
        </div>
        <CardTitle className="text-sm text-slate-500 mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="text-xs text-slate-500 mt-1">{description}</div>
        )}
      </CardContent>
    </Card>
  );
};

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Environmental Analytics Dashboard
          </h1>
          <p className="text-slate-500">
            Comprehensive insights across all SKYVIDYA framework dimensions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md">
            <Button
              variant={timeRange === "7d" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("7d")}
              className="text-xs h-7"
            >
              7D
            </Button>
            <Button
              variant={timeRange === "30d" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("30d")}
              className="text-xs h-7"
            >
              30D
            </Button>
            <Button
              variant={timeRange === "90d" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("90d")}
              className="text-xs h-7"
            >
              90D
            </Button>
            <Button
              variant={timeRange === "1y" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("1y")}
              className="text-xs h-7"
            >
              1Y
            </Button>
          </div>

          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="spatial" className="flex items-center gap-1">
            <Map className="h-4 w-4" />
            Spatial Analysis
          </TabsTrigger>
          <TabsTrigger value="temporal" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Temporal Trends
          </TabsTrigger>
          <TabsTrigger value="risks" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Risk Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Assets Monitored"
              value="516"
              change={8}
              trend="up"
              icon={<Database className="h-5 w-5 text-blue-600" />}
              description="Across all regions"
            />

            <MetricCard
              title="Average VIDYA Score"
              value="68.5"
              change={3.2}
              trend="up"
              icon={<Activity className="h-5 w-5 text-green-600" />}
              description="Out of 100 possible points"
            />

            <MetricCard
              title="High Risk Assets"
              value="131"
              change={-5}
              trend="down"
              icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
              description="Requiring priority intervention"
            />

            <MetricCard
              title="Data Freshness"
              value="2h 15m"
              icon={<RefreshCw className="h-5 w-5 text-blue-600" />}
              description="Since last update"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                  VIDYA Score Distribution by Dimension
                </CardTitle>
                <CardDescription>
                  Breakdown of scores across the 8 SKYVIDYA framework dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border border-slate-200">
                  <BarChart2 className="h-16 w-16 text-slate-300" />
                  <span className="ml-2 text-slate-400">
                    Chart visualization would appear here
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Map className="h-5 w-5 text-blue-600" />
                  Geographic Distribution
                </CardTitle>
                <CardDescription>
                  Asset distribution by geographic region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      <span className="text-sm">South America</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">187</span>
                      <span className="text-xs text-slate-500">36%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      <span className="text-sm">North America</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">142</span>
                      <span className="text-xs text-slate-500">28%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                      <span className="text-sm">Europe</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">98</span>
                      <span className="text-xs text-slate-500">19%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      <span className="text-sm">Asia</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">64</span>
                      <span className="text-xs text-slate-500">12%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      <span className="text-sm">Other Regions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">25</span>
                      <span className="text-xs text-slate-500">5%</span>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <SkyvidyaButton
                    variant="outline"
                    className="w-full justify-center mt-2"
                    iconRight={<ArrowRight className="h-4 w-4" />}
                  >
                    View Detailed Map
                  </SkyvidyaButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spatial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Spatial Analysis</CardTitle>
              <CardDescription>
                Geographic distribution of environmental indicators and risk
                factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md border border-slate-200">
                <Map className="h-16 w-16 text-slate-300" />
                <span className="ml-2 text-slate-400">
                  Interactive map would appear here
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temporal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Temporal Trends</CardTitle>
              <CardDescription>
                Time-series analysis of environmental indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md border border-slate-200">
                <Activity className="h-16 w-16 text-slate-300" />
                <span className="ml-2 text-slate-400">
                  Time-series chart would appear here
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Comprehensive analysis of environmental risks and
                vulnerabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md border border-slate-200">
                <AlertTriangle className="h-16 w-16 text-slate-300" />
                <span className="ml-2 text-slate-400">
                  Risk assessment visualization would appear here
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
