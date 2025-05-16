import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import DimensionPanel from "./DimensionPanel";
import DetailView from "./DetailView";
import {
  Globe,
  AlertTriangle,
  Users,
  MapPin,
  Calendar,
  Briefcase,
  HelpCircle,
  Users2,
  Cloud,
  Activity,
  BarChart2,
  ArrowRight,
  Download,
  Filter,
  Layers,
  Zap,
} from "lucide-react";

// Define the DimensionType locally since we can't import it
type DimensionType =
  | "WHO"
  | "WHERE"
  | "WHEN"
  | "WHAT"
  | "WHY"
  | "WITH WHOM"
  | "RISKS"
  | "CONDITIONS";

interface FrameworkDashboardProps {
  title?: string;
  description?: string;
  onDimensionSelect?: (dimension: DimensionType) => void;
  assetId?: string;
  ecosystemType?: "climate" | "forest" | "rural" | "greendeal";
}

const FrameworkDashboard = ({
  title = "SKYVIDYA Framework Observatory",
  description = "Comprehensive visualization of the 8 dimensions of the SKYVIDYA framework",
  onDimensionSelect = () => {},
  assetId = "AST-2023-0516",
  ecosystemType = "climate",
}: FrameworkDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "detail" | "score">(
    "overview",
  );
  const [selectedDimension, setSelectedDimension] =
    useState<DimensionType | null>(null);

  // Ecosystem-specific styling
  const ecosystemStyles = {
    climate: {
      primary: "text-blue-600",
      secondary: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      highlight: "bg-blue-100",
    },
    forest: {
      primary: "text-green-600",
      secondary: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-200",
      highlight: "bg-green-100",
    },
    rural: {
      primary: "text-amber-600",
      secondary: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      highlight: "bg-amber-100",
    },
    greendeal: {
      primary: "text-emerald-600",
      secondary: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      highlight: "bg-emerald-100",
    },
  };

  const styles = ecosystemStyles[ecosystemType];

  const dimensionData: Record<
    DimensionType,
    {
      value: string;
      trend: "up" | "down" | "stable";
      trendValue: string;
      description: string;
      score: number; // Score contribution to SKYVIDYA SCORE (0-100)
      details: {
        key: string;
        value: string;
        status?: "good" | "warning" | "critical";
      }[];
    }
  > = {
    WHO: {
      value: "1,245",
      trend: "up",
      trendValue: "+12%",
      description: "Entities tracked across global monitoring network",
      score: 78,
      details: [
        { key: "Primary Stakeholders", value: "Environmental Agencies" },
        { key: "Secondary Stakeholders", value: "Local Communities" },
        { key: "Affected Population", value: "12,500", status: "warning" },
        { key: "Vulnerability Index", value: "Medium (0.65)" },
      ],
    },
    WHERE: {
      value: "3,782",
      trend: "up",
      trendValue: "+8%",
      description: "Locations with active environmental monitoring",
      score: 82,
      details: [
        { key: "Primary Region", value: "Amazon Basin" },
        { key: "Coordinates", value: "Lat: -3.4653, Long: -62.2159" },
        { key: "Area Coverage", value: "15,200 km²", status: "good" },
        { key: "H3 Resolution", value: "Level 8 (0.74 km²)" },
      ],
    },
    WHEN: {
      value: "6,521",
      trend: "stable",
      trendValue: "0%",
      description: "Temporal data points collected in past 30 days",
      score: 65,
      details: [
        { key: "Data Timespan", value: "2018-2023" },
        { key: "Update Frequency", value: "Daily" },
        { key: "Seasonal Patterns", value: "Detected", status: "warning" },
        { key: "Temporal Resolution", value: "6-hour intervals" },
      ],
    },
    WHAT: {
      value: "2,890",
      trend: "down",
      trendValue: "-5%",
      description: "Activities monitored across all tracking systems",
      score: 71,
      details: [
        { key: "Primary Activities", value: "Deforestation, Mining" },
        { key: "Activity Intensity", value: "Moderate", status: "warning" },
        { key: "Change Rate", value: "-5% (Improving)" },
        { key: "Activity Sources", value: "Multiple (12)" },
      ],
    },
    WHY: {
      value: "1,672",
      trend: "up",
      trendValue: "+15%",
      description: "Causal relationships identified in analysis",
      score: 68,
      details: [
        { key: "Primary Drivers", value: "Economic Development" },
        { key: "Secondary Drivers", value: "Resource Extraction" },
        { key: "Policy Factors", value: "Regulatory Gaps", status: "critical" },
        { key: "Mitigation Efforts", value: "In Progress" },
      ],
    },
    "WITH WHOM": {
      value: "4,321",
      trend: "stable",
      trendValue: "+2%",
      description: "Network connections between monitored entities",
      score: 76,
      details: [
        { key: "Key Partners", value: "NGOs, Government Agencies" },
        { key: "Stakeholder Engagement", value: "High", status: "good" },
        { key: "Community Involvement", value: "Medium" },
        { key: "International Support", value: "Present" },
      ],
    },
    RISKS: {
      value: "2,156",
      trend: "up",
      trendValue: "+23%",
      description: "Potential threats identified requiring attention",
      score: 58,
      details: [
        { key: "Primary Risks", value: "Habitat Loss, Biodiversity Decline" },
        { key: "Risk Severity", value: "High", status: "critical" },
        { key: "Risk Trend", value: "Increasing (+23%)" },
        { key: "Mitigation Status", value: "Insufficient" },
      ],
    },
    CONDITIONS: {
      value: "5,432",
      trend: "down",
      trendValue: "-7%",
      description: "Environmental factors affecting monitored regions",
      score: 63,
      details: [
        { key: "Climate Conditions", value: "Changing Rapidly" },
        {
          key: "Precipitation Patterns",
          value: "Irregular",
          status: "warning",
        },
        { key: "Temperature Anomalies", value: "+1.8°C above average" },
        { key: "Ecosystem Health", value: "Declining" },
      ],
    },
  };

  // Calculate SKYVIDYA SCORE as weighted average of dimension scores
  const calculateSkyvidyaScore = () => {
    const dimensions = Object.keys(dimensionData) as DimensionType[];
    const totalScore = dimensions.reduce(
      (sum, dim) => sum + dimensionData[dim].score,
      0,
    );
    return Math.round(totalScore / dimensions.length);
  };

  const skyvidyaScore = calculateSkyvidyaScore();

  // Determine score status
  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: "Good", color: "text-green-600" };
    if (score >= 60) return { label: "Moderate", color: "text-amber-600" };
    return { label: "Critical", color: "text-red-600" };
  };

  const scoreStatus = getScoreStatus(skyvidyaScore);

  const handleDimensionClick = (dimension: DimensionType) => {
    setSelectedDimension(dimension);
    setActiveTab("detail");
    onDimensionSelect(dimension);
  };

  return (
    <Card className="w-full h-full bg-white border-border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <Globe className={`h-5 w-5 ${styles.primary}`} />
              <CardTitle className="text-xl font-bold text-slate-800">
                {title}
              </CardTitle>
              <Badge className={`${styles.bg} ${styles.primary} ml-2`}>
                Asset ID: {assetId}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className={`h-5 w-5 ${scoreStatus.color}`} />
              <div>
                <div className="text-xl font-bold flex items-center">
                  {skyvidyaScore}
                  <span className="text-xs ml-1">/100</span>
                </div>
                <div className={`text-xs ${scoreStatus.color}`}>
                  {scoreStatus.label} SKYVIDYA SCORE
                </div>
              </div>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "overview" | "detail" | "score")
              }
            >
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detail" disabled={!selectedDimension}>
                  Detail View
                </TabsTrigger>
                <TabsTrigger value="score">SKYVIDYA SCORE</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "overview" | "detail" | "score")
          }
        >
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.keys(dimensionData).map((dimension) => {
                const dim = dimension as DimensionType;
                const data = dimensionData[dim];
                return (
                  <DimensionPanel
                    key={dimension}
                    type={dim}
                    value={data.value}
                    trend={data.trend}
                    trendValue={data.trendValue}
                    description={data.description}
                    score={data.score}
                    onClick={() => handleDimensionClick(dim)}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="detail">
            {selectedDimension && (
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    {selectedDimension === "WHO" && (
                      <Users className="h-5 w-5 text-blue-600" />
                    )}
                    {selectedDimension === "WHERE" && (
                      <MapPin className="h-5 w-5 text-green-600" />
                    )}
                    {selectedDimension === "WHEN" && (
                      <Calendar className="h-5 w-5 text-purple-600" />
                    )}
                    {selectedDimension === "WHAT" && (
                      <Briefcase className="h-5 w-5 text-amber-600" />
                    )}
                    {selectedDimension === "WHY" && (
                      <HelpCircle className="h-5 w-5 text-rose-600" />
                    )}
                    {selectedDimension === "WITH WHOM" && (
                      <Users2 className="h-5 w-5 text-indigo-600" />
                    )}
                    {selectedDimension === "RISKS" && (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    {selectedDimension === "CONDITIONS" && (
                      <Cloud className="h-5 w-5 text-cyan-600" />
                    )}
                    <span className="font-bold">{selectedDimension}</span>{" "}
                    Detailed Analysis
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Activity className="h-3 w-3" />
                      Score: {dimensionData[selectedDimension].score}/100
                    </Badge>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("overview")}
                    >
                      Back to Overview
                    </Button>
                  </div>
                </div>
                <DetailView
                  title={`${selectedDimension} Analysis`}
                  description={`Detailed analysis of the ${selectedDimension} dimension in the SKYVIDYA framework`}
                  dimensionType={selectedDimension}
                  data={{
                    tableData: dimensionData[selectedDimension].details.map(
                      (detail) => ({
                        name: detail.key,
                        value: detail.value,
                        change: Math.random() * 20 - 10, // Random change for demo
                        status: detail.status || "Active",
                      }),
                    ),
                    chartData: [],
                  }}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="score">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SKYVIDYA SCORE Card */}
                <Card className="md:col-span-1 border-2 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      SKYVIDYA SCORE
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
                            strokeDasharray={`${(2 * Math.PI * 40 * skyvidyaScore) / 100} ${2 * Math.PI * 40}`}
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
                            {skyvidyaScore}
                          </div>
                          <div className="text-xs text-gray-500">
                            out of 100
                          </div>
                        </div>
                      </div>
                      <div
                        className={`mt-4 text-center ${scoreStatus.color} font-medium`}
                      >
                        {scoreStatus.label} Risk Level
                      </div>
                      <div className="text-sm text-gray-500 mt-1 text-center">
                        Asset ID: {assetId}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="w-full">
                      <div className="text-xs text-gray-500 mb-1">
                        Score Trend (Last 6 Months)
                      </div>
                      <div className="h-10 bg-slate-50 rounded-md border flex items-end">
                        {[65, 68, 70, 72, 75, skyvidyaScore].map((score, i) => (
                          <div
                            key={i}
                            className="flex-1 mx-0.5"
                            style={{ height: `${score}%` }}
                          >
                            <div
                              className={`w-full h-full rounded-t-sm ${i === 5 ? scoreStatus.color : "bg-gray-300"}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                {/* Dimension Contribution Card */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5 text-blue-600" />
                      Dimension Contributions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.keys(dimensionData).map((dimension) => {
                        const dim = dimension as DimensionType;
                        const data = dimensionData[dim];
                        const scoreStatus = getScoreStatus(data.score);

                        return (
                          <div key={dim} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                {dim === "WHO" && (
                                  <Users className="h-4 w-4 text-blue-600" />
                                )}
                                {dim === "WHERE" && (
                                  <MapPin className="h-4 w-4 text-green-600" />
                                )}
                                {dim === "WHEN" && (
                                  <Calendar className="h-4 w-4 text-purple-600" />
                                )}
                                {dim === "WHAT" && (
                                  <Briefcase className="h-4 w-4 text-amber-600" />
                                )}
                                {dim === "WHY" && (
                                  <HelpCircle className="h-4 w-4 text-rose-600" />
                                )}
                                {dim === "WITH WHOM" && (
                                  <Users2 className="h-4 w-4 text-indigo-600" />
                                )}
                                {dim === "RISKS" && (
                                  <AlertTriangle className="h-4 w-4 text-red-600" />
                                )}
                                {dim === "CONDITIONS" && (
                                  <Cloud className="h-4 w-4 text-cyan-600" />
                                )}
                                <span className="text-sm font-medium">
                                  {dim}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm font-medium ${scoreStatus.color}`}
                                >
                                  {data.score}/100
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleDimensionClick(dim)}
                                >
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <Progress value={data.score} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Aggregated Data Table */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-blue-600" />
                      SKYVIDYA Framework Aggregated Data
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Filter className="h-3 w-3 mr-1" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Dimension
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Key Metrics
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Trend
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {Object.keys(dimensionData).map((dimension) => {
                          const dim = dimension as DimensionType;
                          const data = dimensionData[dim];
                          const scoreStatus = getScoreStatus(data.score);

                          return (
                            <tr key={dim} className="hover:bg-slate-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                                <div className="flex items-center gap-2">
                                  {dim === "WHO" && (
                                    <Users className="h-4 w-4 text-blue-600" />
                                  )}
                                  {dim === "WHERE" && (
                                    <MapPin className="h-4 w-4 text-green-600" />
                                  )}
                                  {dim === "WHEN" && (
                                    <Calendar className="h-4 w-4 text-purple-600" />
                                  )}
                                  {dim === "WHAT" && (
                                    <Briefcase className="h-4 w-4 text-amber-600" />
                                  )}
                                  {dim === "WHY" && (
                                    <HelpCircle className="h-4 w-4 text-rose-600" />
                                  )}
                                  {dim === "WITH WHOM" && (
                                    <Users2 className="h-4 w-4 text-indigo-600" />
                                  )}
                                  {dim === "RISKS" && (
                                    <AlertTriangle className="h-4 w-4 text-red-600" />
                                  )}
                                  {dim === "CONDITIONS" && (
                                    <Cloud className="h-4 w-4 text-cyan-600" />
                                  )}
                                  <span className="font-medium">{dim}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                                <span
                                  className={`font-medium ${scoreStatus.color}`}
                                >
                                  {data.score}/100
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${scoreStatus.color === "text-green-600" ? "bg-green-100" : scoreStatus.color === "text-amber-600" ? "bg-amber-100" : "bg-red-100"}`}
                                >
                                  {scoreStatus.label}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                                {data.details[0].key}: {data.details[0].value}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span
                                  className={`inline-flex items-center gap-1 ${data.trend === "up" ? "text-green-600" : data.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                                >
                                  {data.trend === "up" && "↑"}
                                  {data.trend === "down" && "↓"}
                                  {data.trend === "stable" && "→"}
                                  {data.trendValue}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                        {/* SKYVIDYA SCORE Row */}
                        <tr className="bg-blue-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-slate-900">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-blue-600" />
                              <span>SKYVIDYA SCORE</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-slate-900">
                            <span className={scoreStatus.color}>
                              {skyvidyaScore}/100
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${scoreStatus.color === "text-green-600" ? "bg-green-100" : scoreStatus.color === "text-amber-600" ? "bg-amber-100" : "bg-red-100"}`}
                            >
                              {scoreStatus.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                            Aggregated from 8 dimensions
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span className="text-green-600">↑ +5.2%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FrameworkDashboard;
