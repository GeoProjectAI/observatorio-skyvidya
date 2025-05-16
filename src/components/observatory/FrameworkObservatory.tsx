import React from "react";
import DimensionPanel from "./DimensionPanel";
import DetailView from "./DetailView";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Users,
  Map,
  Calendar,
  Database,
  AlertTriangle,
  Cloud,
  Activity,
  HelpCircle,
  Users2,
  Zap,
  BarChart2,
  PieChart,
  LineChart,
  Download,
  Share2,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Filter,
  Layers,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FrameworkObservatoryProps {
  onDimensionSelect?: (dimension: string) => void;
}

const FrameworkObservatory = ({
  onDimensionSelect,
}: FrameworkObservatoryProps = {}) => {
  const [selectedDimension, setSelectedDimension] = React.useState("who");
  const [activeTab, setActiveTab] = React.useState("dimensions");

  const handleDimensionSelect = (dimension: string) => {
    setSelectedDimension(dimension);
    setActiveTab("dimensions");

    // If onDimensionSelect is provided, call it with the selected dimension
    if (onDimensionSelect) {
      onDimensionSelect(dimension);
    }
  };

  // Calculate overall SKYVIDYA SCORE based on dimension scores
  const dimensionScores = {
    who: 85,
    where: 72,
    when: 64,
    what: 91,
    why: 68,
    withWhom: 77,
    risks: 42,
    conditions: 78,
  };

  // Weights for each dimension (total should be 100)
  const dimensionWeights = {
    who: 15,
    where: 15,
    when: 10,
    what: 15,
    why: 10,
    withWhom: 10,
    risks: 15,
    conditions: 10,
  };

  // Calculate weighted score
  const calculateSkyvidyaScore = () => {
    let totalScore = 0;
    let totalWeight = 0;

    for (const [dimension, score] of Object.entries(dimensionScores)) {
      const weight =
        dimensionWeights[dimension as keyof typeof dimensionWeights];
      totalScore += score * weight;
      totalWeight += weight;
    }

    return Math.round(totalScore / totalWeight);
  };

  const skyvidyaScore = calculateSkyvidyaScore();

  // Determine score status color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-amber-100";
    return "bg-red-100";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Warning";
    return "Critical";
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-skyvidya-deepBlue">
            SKYVIDYA Framework Observatory
          </h2>
          <p className="text-muted-foreground">
            Comprehensive view of all framework dimensions and SKYVIDYA SCORE
          </p>
        </div>
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() =>
                    onDimensionSelect && onDimensionSelect(selectedDimension)
                  }
                >
                  <Database className="h-4 w-4" />
                  View in Ecosystem
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See how this dimension applies to ecosystem case studies</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full md:w-auto mb-6">
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
          <TabsTrigger value="skyvidya-score">SKYVIDYA SCORE</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dimensions" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <DimensionPanel
                title="STAKEHOLDERS"
                description="Entity visualization and tracking"
                icon={<Users className="h-5 w-5" />}
                value={85}
                score={dimensionScores.who}
                trend="up"
                trendValue={12}
                color="deepBlue"
                isSelected={selectedDimension === "who"}
                onClick={() => handleDimensionSelect("who")}
              />
              <DimensionPanel
                title="LOCATION"
                description="Location analysis and mapping"
                icon={<Map className="h-5 w-5" />}
                value={72}
                score={dimensionScores.where}
                trend="up"
                trendValue={8}
                color="seaBlue"
                isSelected={selectedDimension === "where"}
                onClick={() => handleDimensionSelect("where")}
              />
              <DimensionPanel
                title="TIMING"
                description="Temporal analysis and trends"
                icon={<Calendar className="h-5 w-5" />}
                value={64}
                score={dimensionScores.when}
                trend="down"
                trendValue={3}
                color="skyBlue"
                isSelected={selectedDimension === "when"}
                onClick={() => handleDimensionSelect("when")}
              />
              <DimensionPanel
                title="ACTIVITY"
                description="Activity monitoring and analysis"
                icon={<Database className="h-5 w-5" />}
                value={91}
                score={dimensionScores.what}
                trend="up"
                trendValue={15}
                color="vibrantGreen"
                isSelected={selectedDimension === "what"}
                onClick={() => handleDimensionSelect("what")}
              />
              <DimensionPanel
                title="PURPOSE"
                description="Causal analysis and reasoning"
                icon={<HelpCircle className="h-5 w-5" />}
                value={68}
                score={dimensionScores.why}
                trend="up"
                trendValue={4}
                color="coral"
                isSelected={selectedDimension === "why"}
                onClick={() => handleDimensionSelect("why")}
              />
              <DimensionPanel
                title="PARTNERSHIPS"
                description="Relationship mapping and networks"
                icon={<Users2 className="h-5 w-5" />}
                value={77}
                score={dimensionScores.withWhom}
                trend="up"
                trendValue={6}
                color="deepBlue"
                isSelected={selectedDimension === "withWhom"}
                onClick={() => handleDimensionSelect("withWhom")}
              />
              <DimensionPanel
                title="EXTERNAL CONDITIONS"
                description="Threat assessment and vulnerabilities"
                icon={<AlertTriangle className="h-5 w-5" />}
                value={42}
                score={dimensionScores.risks}
                trend="down"
                trendValue={7}
                color="coral"
                isSelected={selectedDimension === "risks"}
                onClick={() => handleDimensionSelect("risks")}
              />
              <DimensionPanel
                title="INTERNAL RESILIENCE"
                description="Environmental factors and context"
                icon={<Cloud className="h-5 w-5" />}
                value={78}
                score={dimensionScores.conditions}
                trend="up"
                trendValue={5}
                color="freshGreen"
                isSelected={selectedDimension === "conditions"}
                onClick={() => handleDimensionSelect("conditions")}
              />
            </div>

            <div className="md:col-span-3">
              <DetailView
                dimension={selectedDimension}
                score={
                  dimensionScores[
                    selectedDimension as keyof typeof dimensionScores
                  ]
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skyvidya-score" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card className="bg-gradient-to-r from-skyvidya-deepBlue/5 to-skyvidya-skyBlue/5 border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                      <Badge className="bg-skyvidya-deepBlue text-white px-3 py-1 text-sm font-medium">
                        SKYVIDYA FRAMEWORK
                      </Badge>
                      <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
                        SKYVIDYA SCORE
                      </h2>
                      <p className="text-muted-foreground text-center md:text-left max-w-md">
                        Comprehensive assessment of ecosystem resilience based
                        on all 8 dimensions of the SKYVIDYA framework
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-gray-200"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className={`${skyvidyaScore >= 80 ? "text-green-500" : skyvidyaScore >= 60 ? "text-amber-500" : "text-red-500"}`}
                            strokeWidth="8"
                            strokeDasharray={`${(2 * Math.PI * 40 * skyvidyaScore) / 100} ${2 * Math.PI * 40 * (1 - skyvidyaScore / 100)}`}
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
                          <span className="text-4xl font-bold">
                            {skyvidyaScore}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">
                            / 100
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`mt-2 ${getScoreBgColor(skyvidyaScore)} ${getScoreColor(skyvidyaScore)} border-none px-3 py-1`}
                      >
                        {getScoreStatus(skyvidyaScore)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Dimension Contributions</CardTitle>
                  <CardDescription>
                    How each dimension contributes to the overall SKYVIDYA SCORE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dimensionScores).map(
                      ([dimension, score]) => {
                        const weight =
                          dimensionWeights[
                            dimension as keyof typeof dimensionWeights
                          ];
                        const contribution = Math.round((score * weight) / 100);
                        const dimensionName =
                          dimension.charAt(0).toUpperCase() +
                          dimension.slice(1);
                        const formattedName =
                          dimension === "withWhom"
                            ? "PARTNERSHIPS"
                            : dimension === "who"
                              ? "STAKEHOLDERS"
                              : dimension === "where"
                                ? "LOCATION"
                                : dimension === "when"
                                  ? "TIMING"
                                  : dimension === "what"
                                    ? "ACTIVITY"
                                    : dimension === "why"
                                      ? "PURPOSE"
                                      : dimension === "risks"
                                        ? "EXTERNAL CONDITIONS"
                                        : dimension === "conditions"
                                          ? "INTERNAL RESILIENCE"
                                          : dimensionName.toUpperCase();

                        return (
                          <div key={dimension} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {formattedName}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  Weight: {weight}%
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  Score: {score}/100
                                </span>
                                <span className="text-sm font-medium text-skyvidya-deepBlue">
                                  Contribution: {contribution} points
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-1 h-2">
                              <div
                                className={`h-full ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                                style={{ width: `${score}%` }}
                              ></div>
                              <div
                                className="h-full bg-gray-200"
                                style={{ width: `${100 - score}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Aggregated Data Table</CardTitle>
                  <CardDescription>
                    Comprehensive view of all dimensions and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Dimension</th>
                          <th className="text-left py-3 px-4">Score</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Weight</th>
                          <th className="text-left py-3 px-4">Contribution</th>
                          <th className="text-left py-3 px-4">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(dimensionScores).map(
                          ([dimension, score]) => {
                            const weight =
                              dimensionWeights[
                                dimension as keyof typeof dimensionWeights
                              ];
                            const contribution = Math.round(
                              (score * weight) / 100,
                            );
                            const dimensionName =
                              dimension.charAt(0).toUpperCase() +
                              dimension.slice(1);
                            const formattedName =
                              dimension === "withWhom"
                                ? "PARTNERSHIPS"
                                : dimension === "who"
                                  ? "STAKEHOLDERS"
                                  : dimension === "where"
                                    ? "LOCATION"
                                    : dimension === "when"
                                      ? "TIMING"
                                      : dimension === "what"
                                        ? "ACTIVITY"
                                        : dimension === "why"
                                          ? "PURPOSE"
                                          : dimension === "risks"
                                            ? "EXTERNAL CONDITIONS"
                                            : dimension === "conditions"
                                              ? "INTERNAL RESILIENCE"
                                              : dimensionName.toUpperCase();

                            // Mock trend data
                            const trends: Record<
                              string,
                              {
                                trend: "up" | "down" | "neutral";
                                value: number;
                              }
                            > = {
                              who: { trend: "up", value: 12 },
                              where: { trend: "up", value: 8 },
                              when: { trend: "down", value: 3 },
                              what: { trend: "up", value: 15 },
                              why: { trend: "up", value: 4 },
                              withWhom: { trend: "up", value: 6 },
                              risks: { trend: "down", value: 7 },
                              conditions: { trend: "up", value: 5 },
                            };

                            const trendInfo = trends[dimension];

                            return (
                              <tr
                                key={dimension}
                                className="border-b hover:bg-gray-50"
                              >
                                <td className="py-3 px-4 font-medium">
                                  {formattedName}
                                </td>
                                <td className="py-3 px-4">{score}/100</td>
                                <td className="py-3 px-4">
                                  <Badge
                                    className={`${score >= 80 ? "bg-green-100 text-green-800" : score >= 60 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                                  >
                                    {score >= 80
                                      ? "Good"
                                      : score >= 60
                                        ? "Warning"
                                        : "Critical"}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">{weight}%</td>
                                <td className="py-3 px-4">
                                  {contribution} points
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1">
                                    {trendInfo.trend === "up" ? (
                                      <ArrowRight className="h-4 w-4 text-green-500 rotate-[-45deg]" />
                                    ) : trendInfo.trend === "down" ? (
                                      <ArrowRight className="h-4 w-4 text-red-500 rotate-45" />
                                    ) : (
                                      <ArrowRight className="h-4 w-4 text-gray-500 rotate-0" />
                                    )}
                                    <span
                                      className={`${trendInfo.trend === "up" ? "text-green-500" : trendInfo.trend === "down" ? "text-red-500" : "text-gray-500"}`}
                                    >
                                      {trendInfo.trend === "up"
                                        ? "+"
                                        : trendInfo.trend === "down"
                                          ? "-"
                                          : ""}
                                      {trendInfo.value}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          },
                        )}
                        {/* SKYVIDYA SCORE Row */}
                        <tr className="bg-blue-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-slate-900">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-blue-600" />
                              <span>SKYVIDYA SCORE</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-slate-900">
                            <span className={getScoreColor(skyvidyaScore)}>
                              {skyvidyaScore}/100
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getScoreColor(skyvidyaScore) === "text-green-600" ? "bg-green-100" : getScoreColor(skyvidyaScore) === "text-amber-600" ? "bg-amber-100" : "bg-red-100"}`}
                            >
                              {getScoreStatus(skyvidyaScore)}
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
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  In-depth analysis of the SKYVIDYA framework dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center">
                    <Activity className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg">
                      Advanced analytics visualization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>
                  Automated reports and insights based on the SKYVIDYA framework
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-skyvidya-deepBlue/10 rounded-full">
                        <BarChart2 className="h-5 w-5 text-skyvidya-deepBlue" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Monthly Framework Analysis
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive analysis of all dimensions
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-skyvidya-vibrantGreen/10 rounded-full">
                        <LineChart className="h-5 w-5 text-skyvidya-vibrantGreen" />
                      </div>
                      <div>
                        <h3 className="font-medium">Trend Analysis Report</h3>
                        <p className="text-sm text-muted-foreground">
                          Historical trends and future projections
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-skyvidya-coral/10 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-skyvidya-coral" />
                      </div>
                      <div>
                        <h3 className="font-medium">Risk Assessment Report</h3>
                        <p className="text-sm text-muted-foreground">
                          Detailed analysis of identified risks
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrameworkObservatory;
