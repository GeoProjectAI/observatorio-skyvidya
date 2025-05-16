import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Share2,
  Bell,
  BarChart2,
  LineChart,
  PieChart,
  Table,
  Map,
  ChevronDown,
  ExternalLink,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

interface DetailViewProps {
  title?: string;
  description?: string;
  data?: any;
  dimensionType?:
    | "WHO"
    | "WHERE"
    | "WHEN"
    | "WHAT"
    | "WHY"
    | "WITH WHOM"
    | "RISKS"
    | "CONDITIONS";
  onExport?: (format: string) => void;
  onShare?: () => void;
  onCreateAlert?: () => void;
}

const DetailView = ({
  title = "Detailed Analysis",
  description = "Comprehensive view of selected data element",
  data = mockData,
  dimensionType = "RISKS",
  onExport = () => console.log("Export triggered"),
  onShare = () => console.log("Share triggered"),
  onCreateAlert = () => console.log("Create alert triggered"),
}: DetailViewProps) => {
  const [activeTab, setActiveTab] = useState("table");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");

  // Calculate dimension score from data
  const calculateDimensionScore = () => {
    if (!data || !data.tableData || data.tableData.length === 0) return 0;

    // Count critical, warning, and good statuses
    const statuses = data.tableData.map((row: any) => row.status.toLowerCase());
    const criticalCount = statuses.filter(
      (s: string) => s === "critical",
    ).length;
    const warningCount = statuses.filter((s: string) => s === "warning").length;
    const goodCount = statuses.filter(
      (s: string) => s === "good" || s === "active",
    ).length;

    // Calculate weighted score (critical has more impact)
    const totalItems = data.tableData.length;
    const score = Math.round(
      (goodCount * 100 + warningCount * 60 + criticalCount * 20) / totalItems,
    );

    return score;
  };

  const dimensionScore = calculateDimensionScore();

  // Determine score status
  const getScoreStatus = (score: number) => {
    if (score >= 80)
      return {
        label: "Good",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    if (score >= 60)
      return {
        label: "Moderate",
        color: "text-amber-600",
        bgColor: "bg-amber-100",
      };
    return { label: "Critical", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const scoreStatus = getScoreStatus(dimensionScore);

  // Get dimension-specific color
  const getDimensionColor = () => {
    switch (dimensionType) {
      case "WHO":
        return "text-blue-600";
      case "WHERE":
        return "text-green-600";
      case "WHEN":
        return "text-purple-600";
      case "WHAT":
        return "text-amber-600";
      case "WHY":
        return "text-rose-600";
      case "WITH WHOM":
        return "text-indigo-600";
      case "RISKS":
        return "text-red-600";
      case "CONDITIONS":
        return "text-cyan-600";
      default:
        return "text-blue-600";
    }
  };

  const dimensionColor = getDimensionColor();

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-slate-800">
              {title}
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium bg-opacity-20 px-2 py-1 rounded ${dimensionColor} bg-current bg-opacity-10`}
              >
                {dimensionType}
              </span>
              <span className="text-xs text-slate-500 ml-2">
                Last updated: {new Date().toLocaleDateString()}
              </span>
              <Badge
                variant="outline"
                className={`ml-2 ${scoreStatus.color} ${scoreStatus.bgColor}`}
              >
                <Zap className="h-3 w-3 mr-1" />
                Score: {dimensionScore}/100
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onExport("csv")}>
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("json")}>
                  JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("pdf")}>
                  PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("image")}>
                  Image
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={onCreateAlert}>
              <Bell className="h-4 w-4 mr-1" />
              Create Alert
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b px-6 py-2">
            <TabsList>
              <TabsTrigger value="table">
                <Table className="h-4 w-4 mr-1" />
                Table
              </TabsTrigger>
              <TabsTrigger value="chart">
                <BarChart2 className="h-4 w-4 mr-1" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="map">
                <Map className="h-4 w-4 mr-1" />
                Map
              </TabsTrigger>
              <TabsTrigger value="score">
                <Zap className="h-4 w-4 mr-1" />
                Score Analysis
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="table" className="p-6">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {data.tableData.map((row: any, index: number) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 font-medium">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {row.value}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {row.change > 0 ? "+" : ""}
                          {row.change.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.status.toLowerCase() === "active" || row.status.toLowerCase() === "good" ? "bg-green-100 text-green-800" : row.status.toLowerCase() === "warning" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                        >
                          {row.status.toLowerCase() === "active" ||
                          row.status.toLowerCase() === "good" ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : row.status.toLowerCase() === "warning" ? (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="chart" className="p-6">
            <div className="flex space-x-4 mb-4">
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("bar")}
              >
                <BarChart2 className="h-4 w-4 mr-1" />
                Bar
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4 mr-1" />
                Line
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("pie")}
              >
                <PieChart className="h-4 w-4 mr-1" />
                Pie
              </Button>
            </div>
            <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center border">
              <div className="text-center">
                {chartType === "bar" && (
                  <BarChart2 className="h-16 w-16 mx-auto text-slate-300" />
                )}
                {chartType === "line" && (
                  <LineChart className="h-16 w-16 mx-auto text-slate-300" />
                )}
                {chartType === "pie" && (
                  <PieChart className="h-16 w-16 mx-auto text-slate-300" />
                )}
                <p className="mt-2 text-slate-500">
                  {chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart
                  visualization of {dimensionType} data
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="p-6">
            <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center border">
              <div className="text-center">
                <Map className="h-16 w-16 mx-auto text-slate-300" />
                <p className="mt-2 text-slate-500">
                  Geospatial visualization of {dimensionType} data
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="score" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score Card */}
              <Card className="md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className={dimensionColor} />
                    {dimensionType} Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={scoreStatus.color}
                          strokeWidth="10"
                          strokeDasharray={`${(2 * Math.PI * 40 * dimensionScore) / 100} ${2 * Math.PI * 40}`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold">
                          {dimensionScore}
                        </div>
                        <div className="text-xs text-gray-500">out of 100</div>
                      </div>
                    </div>
                    <div
                      className={`mt-4 text-center ${scoreStatus.color} font-medium`}
                    >
                      {scoreStatus.label} Status
                    </div>
                    <div className="text-sm text-gray-500 mt-1 text-center">
                      Contribution to SKYVIDYA SCORE
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Breakdown */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className={dimensionColor} />
                    Status Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Calculate status counts */}
                    {(() => {
                      const statuses = data.tableData.map((row: any) =>
                        row.status.toLowerCase(),
                      );
                      const criticalCount = statuses.filter(
                        (s: string) => s === "critical",
                      ).length;
                      const warningCount = statuses.filter(
                        (s: string) => s === "warning",
                      ).length;
                      const goodCount = statuses.filter(
                        (s: string) => s === "good" || s === "active",
                      ).length;
                      const totalCount = data.tableData.length;

                      return (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium">
                                  Good/Active
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {goodCount}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({Math.round((goodCount / totalCount) * 100)}
                                  %)
                                </span>
                              </div>
                            </div>
                            <Progress
                              value={(goodCount / totalCount) * 100}
                              className="h-2 bg-gray-100"
                            >
                              <div className="h-full bg-green-600 rounded-full" />
                            </Progress>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                <span className="text-sm font-medium">
                                  Warning
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {warningCount}
                                </span>
                                <span className="text-xs text-gray-500">
                                  (
                                  {Math.round(
                                    (warningCount / totalCount) * 100,
                                  )}
                                  %)
                                </span>
                              </div>
                            </div>
                            <Progress
                              value={(warningCount / totalCount) * 100}
                              className="h-2 bg-gray-100"
                            >
                              <div className="h-full bg-amber-600 rounded-full" />
                            </Progress>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium">
                                  Critical
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {criticalCount}
                                </span>
                                <span className="text-xs text-gray-500">
                                  (
                                  {Math.round(
                                    (criticalCount / totalCount) * 100,
                                  )}
                                  %)
                                </span>
                              </div>
                            </div>
                            <Progress
                              value={(criticalCount / totalCount) * 100}
                              className="h-2 bg-gray-100"
                            >
                              <div className="h-full bg-red-600 rounded-full" />
                            </Progress>
                          </div>
                        </>
                      );
                    })()}

                    <Separator className="my-4" />

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-800">
                            Score Calculation
                          </h4>
                          <p className="text-xs text-blue-700 mt-1">
                            The {dimensionType} dimension score is calculated
                            based on the status of all metrics. Good/Active
                            metrics contribute positively, while Warning and
                            Critical metrics reduce the score.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t p-4">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-slate-500">
            Showing data for {dimensionType} dimension • {data.tableData.length}{" "}
            records
          </div>
          <Button variant="link" size="sm" className="text-blue-600">
            View full report <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Mock data for demonstration
const mockData = {
  tableData: [
    { name: "Flood Risk", value: "78.5", change: 12.3, status: "Warning" },
    { name: "Drought Severity", value: "45.2", change: -8.7, status: "Active" },
    { name: "Fire Hazard", value: "92.1", change: 23.5, status: "Critical" },
    { name: "Storm Probability", value: "63.8", change: 5.2, status: "Active" },
    { name: "Landslide Risk", value: "31.4", change: -2.8, status: "Active" },
    { name: "Coastal Erosion", value: "58.7", change: 7.9, status: "Warning" },
    {
      name: "Air Quality Index",
      value: "142.3",
      change: 15.6,
      status: "Critical",
    },
    {
      name: "Water Contamination",
      value: "27.8",
      change: -4.3,
      status: "Active",
    },
  ],
  chartData: [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 55 },
    { month: "May", value: 60 },
    { month: "Jun", value: 80 },
    { month: "Jul", value: 95 },
    { month: "Aug", value: 87 },
    { month: "Sep", value: 72 },
  ],
};

export default DetailView;
