import React from "react";
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
import {
  BarChart2,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  PieChart,
  LineChart,
  BarChart,
  Users,
  Map,
  Calendar,
  Database,
  Cloud,
  HelpCircle,
  Users2,
} from "lucide-react";

interface DetailViewProps {
  dimension: string;
  score?: number; // Score out of 100
}

const DetailView = ({ dimension, score = 75 }: DetailViewProps) => {
  const getDimensionTitle = () => {
    switch (dimension) {
      case "who":
        return "WHO - Entity Analysis";
      case "where":
        return "WHERE - Spatial Analysis";
      case "when":
        return "WHEN - Temporal Analysis";
      case "what":
        return "WHAT - Activity Analysis";
      case "why":
        return "WHY - Causal Analysis";
      case "withWhom":
        return "WITH WHOM - Relationship Analysis";
      case "risks":
        return "RISKS - Threat Assessment";
      case "conditions":
        return "CONDITIONS - Environmental Factors";
      default:
        return "Select a dimension";
    }
  };

  const getDimensionColor = () => {
    switch (dimension) {
      case "who":
        return "text-skyvidya-deepBlue";
      case "where":
        return "text-skyvidya-seaBlue";
      case "when":
        return "text-skyvidya-skyBlue";
      case "what":
        return "text-skyvidya-vibrantGreen";
      case "why":
        return "text-rose-600";
      case "withWhom":
        return "text-indigo-600";
      case "risks":
        return "text-skyvidya-coral";
      case "conditions":
        return "text-skyvidya-freshGreen";
      default:
        return "text-gray-700";
    }
  };

  const getDimensionBgColor = () => {
    switch (dimension) {
      case "who":
        return "bg-skyvidya-deepBlue/10";
      case "where":
        return "bg-skyvidya-seaBlue/10";
      case "when":
        return "bg-skyvidya-skyBlue/10";
      case "what":
        return "bg-skyvidya-vibrantGreen/10";
      case "why":
        return "bg-rose-100";
      case "withWhom":
        return "bg-indigo-100";
      case "risks":
        return "bg-skyvidya-coral/10";
      case "conditions":
        return "bg-skyvidya-freshGreen/10";
      default:
        return "bg-gray-100";
    }
  };

  const getDimensionIcon = () => {
    switch (dimension) {
      case "who":
        return <Users className="h-5 w-5" />;
      case "where":
        return <Map className="h-5 w-5" />;
      case "when":
        return <Calendar className="h-5 w-5" />;
      case "what":
        return <Database className="h-5 w-5" />;
      case "why":
        return <HelpCircle className="h-5 w-5" />;
      case "withWhom":
        return <Users2 className="h-5 w-5" />;
      case "risks":
        return <AlertTriangle className="h-5 w-5" />;
      case "conditions":
        return <Cloud className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getDimensionDescription = () => {
    switch (dimension) {
      case "who":
        return "Analysis of entities, organizations, and individuals within the monitored ecosystem.";
      case "where":
        return "Geospatial analysis of locations, regions, and spatial relationships.";
      case "when":
        return "Temporal patterns, trends, and time-based analysis of events.";
      case "what":
        return "Activities, events, and actions occurring within the monitored ecosystem.";
      case "why":
        return "Causal analysis and reasoning behind observed patterns and events.";
      case "withWhom":
        return "Relationship mapping and network analysis between entities.";
      case "risks":
        return "Potential threats, vulnerabilities, and risk assessment.";
      case "conditions":
        return "Environmental conditions, climate factors, and contextual elements.";
      default:
        return "Select a dimension to view detailed analysis.";
    }
  };

  // Determine score status color
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = () => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-amber-100";
    return "bg-red-100";
  };

  const getScoreStatus = () => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Warning";
    return "Critical";
  };

  // Mock data for status breakdown
  const getStatusBreakdown = () => {
    if (score >= 80) {
      return {
        good: 85,
        warning: 12,
        critical: 3,
      };
    } else if (score >= 60) {
      return {
        good: 65,
        warning: 25,
        critical: 10,
      };
    } else {
      return {
        good: 30,
        warning: 35,
        critical: 35,
      };
    }
  };

  const statusBreakdown = getStatusBreakdown();

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${getDimensionBgColor()}`}>
            {getDimensionIcon()}
          </div>
          <div>
            <CardTitle className={`text-xl ${getDimensionColor()}`}>
              {getDimensionTitle()}
            </CardTitle>
            <CardDescription>{getDimensionDescription()}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="score-analysis">Score Analysis</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dimension Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{score}/100</div>
                    <Badge
                      className={`${getScoreBgColor()} ${getScoreColor()} border-none`}
                    >
                      {getScoreStatus()}
                    </Badge>
                  </div>
                  <Progress value={score} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Contribution to overall SKYVIDYA SCORE
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Status Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Good</span>
                      </div>
                      <span className="font-medium">
                        {statusBreakdown.good}%
                      </span>
                    </div>
                    <Progress
                      value={statusBreakdown.good}
                      className="h-1.5 bg-gray-100"
                    />

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Warning</span>
                      </div>
                      <span className="font-medium">
                        {statusBreakdown.warning}%
                      </span>
                    </div>
                    <Progress
                      value={statusBreakdown.warning}
                      className="h-1.5 bg-gray-100"
                    />

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Critical</span>
                      </div>
                      <span className="font-medium">
                        {statusBreakdown.critical}%
                      </span>
                    </div>
                    <Progress
                      value={statusBreakdown.critical}
                      className="h-1.5 bg-gray-100"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Last Updated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Data refreshed every 24 hours. Next update in 14 hours.
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                    <div className="flex flex-col items-center">
                      <BarChart2 className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        Metrics visualization for {dimension.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                    <div className="flex flex-col items-center">
                      <PieChart className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        Distribution chart for {dimension.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Historical Trends
                </CardTitle>
                <CardDescription>
                  Trend analysis for the {dimension.toUpperCase()} dimension
                  over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center">
                    <LineChart className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Trend analysis for {dimension.toUpperCase()} dimension
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="score-analysis">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Score Composition
                  </CardTitle>
                  <CardDescription>
                    How this dimension's score is calculated and contributes to
                    the SKYVIDYA SCORE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-full ${getDimensionBgColor()}`}
                      >
                        <Zap className={`h-5 w-5 ${getDimensionColor()}`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Current Score</div>
                        <div
                          className={`text-2xl font-bold ${getScoreColor()}`}
                        >
                          {score}/100
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-right">
                        Weight in SKYVIDYA SCORE
                      </div>
                      <div className="text-2xl font-bold text-right">15%</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Data Quality
                        </span>
                        <span className="text-sm font-medium">30/30</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Coverage</span>
                        <span className="text-sm font-medium">25/30</span>
                      </div>
                      <Progress value={83} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Reliability</span>
                        <span className="text-sm font-medium">20/40</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          Score Impact
                        </p>
                        <p className="text-sm text-blue-600">
                          Improving the reliability of this dimension by 20%
                          would increase the overall SKYVIDYA SCORE by 3 points.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Historical Score Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <div className="flex flex-col items-center">
                        <LineChart className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Score trend over the last 12 months
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Comparative Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <div className="flex flex-col items-center">
                        <BarChart className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Score comparison with similar assets
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Detailed Breakdown
                </CardTitle>
                <CardDescription>
                  Comprehensive analysis of all factors within the{" "}
                  {dimension.toUpperCase()} dimension
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center">
                    <Database className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Detailed breakdown of {dimension.toUpperCase()} dimension
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Generated Reports
                </CardTitle>
                <CardDescription>
                  Automated reports and insights for the{" "}
                  {dimension.toUpperCase()} dimension
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center">
                    <Activity className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Reports for {dimension.toUpperCase()} dimension
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DetailView;
