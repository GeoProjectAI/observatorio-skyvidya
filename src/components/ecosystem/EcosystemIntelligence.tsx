import React, { useState, useEffect } from "react";
import { useSkyvidyaContext } from "../observatory/context/SkyvidyaContext";
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
  Leaf,
  Droplets,
  Wind,
  Building,
  TreePine,
  Tractor,
  Sprout,
} from "lucide-react";
import { EnhancedMapContainer } from "../map/EnhancedMapContainer";

interface EcosystemCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  active: boolean;
  onClick: () => void;
}

const EcosystemCard: React.FC<EcosystemCardProps> = ({
  title,
  icon,
  description,
  active,
  onClick,
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all ${active ? "border-skyvidya-cta ring-2 ring-skyvidya-cta/20" : "border-slate-200 hover:border-skyvidya-cta/50"}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div
            className={`p-2 rounded-lg ${active ? "bg-skyvidya-cta/10" : "bg-slate-100"}`}
          >
            {icon}
          </div>
          {active && (
            <Badge className="bg-skyvidya-cta text-white">Active</Badge>
          )}
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
};

interface DimensionCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  description?: string;
  color?: string;
}

const DimensionCard: React.FC<DimensionCardProps> = ({
  title,
  icon,
  value,
  description,
  color = "bg-blue-50 text-blue-600",
}) => {
  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        </div>
        <CardTitle className="text-sm text-slate-500 mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{value}</div>
        {description && (
          <div className="text-xs text-slate-500 mt-1">{description}</div>
        )}
      </CardContent>
    </Card>
  );
};

export function EcosystemIntelligence() {
  // Get context values from SkyvidyaContext
  const {
    selectedDimension,
    ecosystemType,
    setEcosystemType,
    dimensionScores,
  } = useSkyvidyaContext();

  const [activeEcosystem, setActiveEcosystem] = useState(
    ecosystemType || "climate",
  );
  const [activeTab, setActiveTab] = useState("dimensions"); // Default to dimensions tab to show connection
  const [mapboxToken, setMapboxToken] = useState(
    "pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNscXh4eHh4eDAwMDEycXFxcXF4eHh4eHgifQ.xxxxxxxxxxxxxxxxxxx",
  );

  // Update local state when context changes
  useEffect(() => {
    if (ecosystemType) {
      setActiveEcosystem(ecosystemType);
    }
  }, [ecosystemType]);

  // Update context when local state changes
  useEffect(() => {
    setEcosystemType(activeEcosystem);
  }, [activeEcosystem, setEcosystemType]);

  // Ecosystem data
  const ecosystems = [
    {
      id: "climate",
      title: "Climate Intelligence",
      icon: <Wind className="h-5 w-5 text-blue-600" />,
      description:
        "Monitor climate patterns, anomalies, and resilience metrics",
      dimensions: {
        who: "Climate Research Institution",
        what: "Temperature & Precipitation Anomalies",
        when: "1980-Present (Monthly Resolution)",
        where: "Global Coverage (H3 Resolution 5)",
        why: "Climate Change Adaptation Planning",
        withWhom: "IPCC, WMO, NOAA",
        withXIssue: "Extreme Weather Events (+28%)",
        withYIssue: "Carbon Sequestration Capacity",
        vidyaScore: "72.4/100",
      },
      mapViewState: { longitude: 0, latitude: 20, zoom: 2 },
    },
    {
      id: "forest",
      title: "Forest Intelligence",
      icon: <TreePine className="h-5 w-5 text-green-600" />,
      description:
        "Track forest cover, deforestation, and biodiversity metrics",
      dimensions: {
        who: "Forest Management Agencies",
        what: "Deforestation & Reforestation Activities",
        when: "2000-Present (Weekly Resolution)",
        where: "Tropical & Boreal Forests (H3 Resolution 7)",
        why: "Sustainable Forest Management",
        withWhom: "FAO, WWF, Local Communities",
        withXIssue: "Illegal Logging Hotspots (+15%)",
        withYIssue: "Carbon Stock Resilience",
        vidyaScore: "68.9/100",
      },
      mapViewState: { longitude: -60, latitude: -10, zoom: 4 },
    },
    {
      id: "rural",
      title: "Rural Intelligence",
      icon: <Tractor className="h-5 w-5 text-amber-600" />,
      description:
        "Analyze agricultural practices, soil health, and rural development",
      dimensions: {
        who: "Agricultural Extension Services",
        what: "Crop Yields & Soil Health Indicators",
        when: "2010-Present (Seasonal Resolution)",
        where: "Major Agricultural Regions (H3 Resolution 6)",
        why: "Food Security & Rural Livelihoods",
        withWhom: "FAO, Local Farmer Cooperatives",
        withXIssue: "Water Stress Vulnerability (+32%)",
        withYIssue: "Sustainable Farming Practices",
        vidyaScore: "75.2/100",
      },
      mapViewState: { longitude: 25, latitude: 10, zoom: 3 },
    },
    {
      id: "greendeal",
      title: "Green Deal EGS",
      icon: <Sprout className="h-5 w-5 text-emerald-600" />,
      description:
        "Track environmental goods & services and green transition metrics",
      dimensions: {
        who: "Environmental Policy Institutions",
        what: "Green Investment & Transition Metrics",
        when: "2015-Present (Quarterly Resolution)",
        where: "European Union (H3 Resolution 5)",
        why: "Green Transition Policy Implementation",
        withWhom: "EU Commission, Member States",
        withXIssue: "Carbon Leakage Risk (+18%)",
        withYIssue: "Green Technology Adoption",
        vidyaScore: "81.7/100",
      },
      mapViewState: { longitude: 10, latitude: 50, zoom: 4 },
    },
  ];

  const activeEcosystemData = ecosystems.find(
    (eco) => eco.id === activeEcosystem,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ecosystem Intelligence</h1>
          <p className="text-slate-500">
            Specialized intelligence modules for specific ecosystem types
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          {selectedDimension && (
            <div className="bg-skyvidya-lightGray px-3 py-2 rounded-md">
              <div className="text-xs text-slate-500 mb-1">
                Selected Framework Dimension
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-skyvidya-deepBlue text-white">
                  {selectedDimension === "withWhom"
                    ? "PARTNERSHIPS"
                    : selectedDimension === "who"
                      ? "STAKEHOLDERS"
                      : selectedDimension === "where"
                        ? "LOCATION"
                        : selectedDimension === "when"
                          ? "TIMING"
                          : selectedDimension === "what"
                            ? "ACTIVITY"
                            : selectedDimension === "why"
                              ? "PURPOSE"
                              : selectedDimension === "risks"
                                ? "EXTERNAL CONDITIONS"
                                : selectedDimension === "conditions"
                                  ? "INTERNAL RESILIENCE"
                                  : selectedDimension.toUpperCase()}
                </Badge>
                <span className="text-sm font-medium">
                  Score:{" "}
                  {
                    dimensionScores[
                      selectedDimension as keyof typeof dimensionScores
                    ]
                  }
                  /100
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>

            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Ecosystem Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ecosystems.map((ecosystem) => (
          <EcosystemCard
            key={ecosystem.id}
            title={ecosystem.title}
            icon={ecosystem.icon}
            description={ecosystem.description}
            active={activeEcosystem === ecosystem.id}
            onClick={() => setActiveEcosystem(ecosystem.id)}
          />
        ))}
      </div>

      {/* Active Ecosystem Content */}
      {activeEcosystemData && (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="dimensions"
                className="flex items-center gap-1 relative"
              >
                <Database className="h-4 w-4" />
                SKYVIDYA Dimensions
                {selectedDimension && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-skyvidya-deepBlue rounded-full"></span>
                )}
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                Spatial View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {activeEcosystemData.icon}
                    {activeEcosystemData.title} Overview
                  </CardTitle>
                  <CardDescription>
                    Comprehensive analysis of{" "}
                    {activeEcosystemData.title.toLowerCase()} metrics and
                    indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">VIDYA Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-skyvidya-cta">
                            {activeEcosystemData.dimensions.vidyaScore}
                          </div>
                          <div className="mt-2 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-skyvidya-cta rounded-full"
                              style={{
                                width: `${parseFloat(activeEcosystemData.dimensions.vidyaScore)}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            Overall ecosystem health and resilience score
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Risk Factors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-lg font-medium text-amber-600">
                            {
                              activeEcosystemData.dimensions.withXIssue.split(
                                "(",
                              )[0]
                            }
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-1 bg-amber-50 text-amber-700"
                          >
                            {activeEcosystemData.dimensions.withXIssue
                              .split("(")[1]
                              ?.replace(")", "")}
                          </Badge>
                          <p className="text-xs text-slate-500 mt-2">
                            Primary external risk factors affecting this
                            ecosystem
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Resilience Factors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-lg font-medium text-green-600">
                            {activeEcosystemData.dimensions.withYIssue}
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-1 bg-green-50 text-green-700"
                          >
                            Positive Factor
                          </Badge>
                          <p className="text-xs text-slate-500 mt-2">
                            Key internal resilience factors supporting this
                            ecosystem
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Chart Placeholder */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Temporal Trends
                        </CardTitle>
                        <CardDescription>
                          Historical trends of key indicators for{" "}
                          {activeEcosystemData.title.toLowerCase()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md border border-slate-200">
                          <Activity className="h-12 w-12 text-slate-300" />
                          <span className="ml-2 text-slate-400">
                            Temporal trend visualization would appear here
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dimensions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    SKYVIDYA Framework Dimensions
                  </CardTitle>
                  <CardDescription>
                    Complete dimensional analysis for{" "}
                    {activeEcosystemData.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DimensionCard
                      title="STAKEHOLDERS (Quem)"
                      icon={<Users className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.who}
                      color={
                        selectedDimension === "who"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-blue-50 text-blue-600"
                      }
                    />

                    <DimensionCard
                      title="ACTIVITY (O quê)"
                      icon={<FileText className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.what}
                      color={
                        selectedDimension === "what"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-purple-50 text-purple-600"
                      }
                    />

                    <DimensionCard
                      title="TIMING (Quando)"
                      icon={<Calendar className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.when}
                      color={
                        selectedDimension === "when"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-amber-50 text-amber-600"
                      }
                    />

                    <DimensionCard
                      title="LOCATION (Onde)"
                      icon={<Map className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.where}
                      color={
                        selectedDimension === "where"
                          ? "bg-green-100 text-green-700"
                          : "bg-green-50 text-green-600"
                      }
                    />

                    <DimensionCard
                      title="PURPOSE (Por quê)"
                      icon={<Activity className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.why}
                      color={
                        selectedDimension === "why"
                          ? "bg-red-100 text-red-700"
                          : "bg-red-50 text-red-600"
                      }
                    />

                    <DimensionCard
                      title="PARTNERSHIPS (Com quem)"
                      icon={<Users className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.withWhom}
                      color={
                        selectedDimension === "withWhom"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-indigo-50 text-indigo-600"
                      }
                    />
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DimensionCard
                      title="EXTERNAL CONDITIONS (Fatores de Risco)"
                      icon={<AlertTriangle className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.withXIssue}
                      color={
                        selectedDimension === "risks"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-amber-50 text-amber-600"
                      }
                    />

                    <DimensionCard
                      title="INTERNAL RESILIENCE (Resiliência)"
                      icon={<Leaf className="h-5 w-5" />}
                      value={activeEcosystemData.dimensions.withYIssue}
                      color={
                        selectedDimension === "conditions"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-emerald-50 text-emerald-600"
                      }
                    />

                    <Card className="border-2 border-skyvidya-cta bg-skyvidya-cta/5">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="p-2 rounded-lg bg-skyvidya-cta/10">
                            <Activity className="h-5 w-5 text-skyvidya-cta" />
                          </div>
                        </div>
                        <CardTitle className="text-sm text-skyvidya-cta mt-2">
                          VIDYA SCORE INTEGRADO
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-skyvidya-cta">
                          {activeEcosystemData.dimensions.vidyaScore}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Risco de Colapso e Qualidade de Vida do Asset
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    {selectedDimension && (
                      <Card className="bg-skyvidya-lightGray/50 border-skyvidya-mediumGray/30 mb-4">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Selected Framework Dimension
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-skyvidya-deepBlue text-white">
                                {selectedDimension === "withWhom"
                                  ? "PARTNERSHIPS"
                                  : selectedDimension === "who"
                                    ? "STAKEHOLDERS"
                                    : selectedDimension === "where"
                                      ? "LOCATION"
                                      : selectedDimension === "when"
                                        ? "TIMING"
                                        : selectedDimension === "what"
                                          ? "ACTIVITY"
                                          : selectedDimension === "why"
                                            ? "PURPOSE"
                                            : selectedDimension === "risks"
                                              ? "EXTERNAL CONDITIONS"
                                              : selectedDimension ===
                                                  "conditions"
                                                ? "INTERNAL RESILIENCE"
                                                : selectedDimension.toUpperCase()}
                              </Badge>
                              <span className="text-sm">
                                Framework Score:{" "}
                                {
                                  dimensionScores[
                                    selectedDimension as keyof typeof dimensionScores
                                  ]
                                }
                                /100
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-slate-500">
                                Ecosystem Value:{" "}
                                {
                                  activeEcosystemData.dimensions[
                                    selectedDimension as keyof typeof activeEcosystemData.dimensions
                                  ]
                                }
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <SkyvidyaButton
                      variant="primary"
                      className="w-full justify-center"
                      iconRight={<ArrowRight className="h-4 w-4" />}
                    >
                      View Detailed Dimension Analysis
                    </SkyvidyaButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-blue-600" />
                    Spatial Analysis
                  </CardTitle>
                  <CardDescription>
                    Geographic distribution of{" "}
                    {activeEcosystemData.title.toLowerCase()} indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] rounded-md overflow-hidden border border-slate-200">
                    <EnhancedMapContainer
                      initialViewState={activeEcosystemData.mapViewState}
                      mapboxAccessToken={mapboxToken}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
