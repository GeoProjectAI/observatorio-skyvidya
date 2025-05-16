import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  AlertTriangle,
  Bell,
  BellRing,
  Eye,
  LineChart,
  BarChart,
  PieChart,
  RefreshCw,
  Settings,
  Zap,
  Droplets,
  Wind,
  Thermometer,
  Cloud,
} from "lucide-react";

interface DataStream {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

interface Anomaly {
  id: string;
  streamId: string;
  streamName: string;
  detectedAt: string;
  severity: "low" | "medium" | "high";
  description: string;
  acknowledged: boolean;
}

interface RealTimeMonitorProps {
  dataStreams?: DataStream[];
  anomalies?: Anomaly[];
  refreshInterval?: number;
  onAcknowledgeAnomaly?: (anomalyId: string) => void;
  onConfigureAlerts?: () => void;
  onViewStreamDetails?: (streamId: string) => void;
}

const defaultDataStreams: DataStream[] = [
  {
    id: "stream-1",
    name: "Temperature",
    value: 28.5,
    unit: "°C",
    status: "normal",
    trend: "up",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "stream-2",
    name: "Precipitation",
    value: 42.3,
    unit: "mm",
    status: "warning",
    trend: "up",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "stream-3",
    name: "Wind Speed",
    value: 15.7,
    unit: "km/h",
    status: "normal",
    trend: "stable",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "stream-4",
    name: "Humidity",
    value: 78.2,
    unit: "%",
    status: "normal",
    trend: "down",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "stream-5",
    name: "Air Quality",
    value: 142,
    unit: "AQI",
    status: "critical",
    trend: "up",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "stream-6",
    name: "Wildfire Risk",
    value: 87.3,
    unit: "%",
    status: "warning",
    trend: "up",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "stream-7",
    name: "Soil Moisture",
    value: 23.1,
    unit: "%",
    status: "warning",
    trend: "down",
    lastUpdated: new Date().toISOString(),
  },
];

const defaultAnomalies: Anomaly[] = [
  {
    id: "anomaly-1",
    streamId: "stream-2",
    streamName: "Precipitation",
    detectedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    severity: "medium",
    description: "Unusual precipitation pattern detected in region",
    acknowledged: false,
  },
  {
    id: "anomaly-2",
    streamId: "stream-5",
    streamName: "Air Quality",
    detectedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    severity: "high",
    description: "Critical air quality levels exceeding safety thresholds",
    acknowledged: false,
  },
  {
    id: "anomaly-3",
    streamId: "stream-6",
    streamName: "Wildfire Risk",
    detectedAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 minutes ago
    severity: "high",
    description: "Rapid increase in wildfire risk index in San Francisco area",
    acknowledged: false,
  },
  {
    id: "anomaly-4",
    streamId: "stream-7",
    streamName: "Soil Moisture",
    detectedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
    severity: "medium",
    description:
      "Soil moisture levels dropping below critical threshold in agricultural regions",
    acknowledged: false,
  },
];

const RealTimeMonitor: React.FC<RealTimeMonitorProps> = ({
  dataStreams = defaultDataStreams,
  anomalies = defaultAnomalies,
  refreshInterval = 30000, // 30 seconds
  onAcknowledgeAnomaly = () => {},
  onConfigureAlerts = () => {},
  onViewStreamDetails = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("streams");
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [timeToRefresh, setTimeToRefresh] = useState(100);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - lastRefreshed.getTime();
      const percent = Math.min(100, (elapsed / refreshInterval) * 100);
      setTimeToRefresh(percent);

      if (percent >= 100) {
        setLastRefreshed(new Date());
        // In a real app, you would fetch new data here
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastRefreshed, refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStreamIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("temperature"))
      return <Thermometer className="h-4 w-4" />;
    if (lowerName.includes("precipitation") || lowerName.includes("humidity"))
      return <Droplets className="h-4 w-4" />;
    if (lowerName.includes("wind")) return <Wind className="h-4 w-4" />;
    if (lowerName.includes("air") || lowerName.includes("quality"))
      return <Cloud className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <LineChart className="h-4 w-4 text-red-500" />;
      case "down":
        return <LineChart className="h-4 w-4 text-green-500" />;
      case "stable":
        return <LineChart className="h-4 w-4 text-gray-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleRefresh = () => {
    setLastRefreshed(new Date());
    // In a real app, you would fetch new data here
  };

  return (
    <Card className="w-full h-full bg-background border-border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>Real-Time Monitoring</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              <span className="text-xs">
                Updated {formatTime(lastRefreshed.toISOString())}
              </span>
            </Badge>
            <button
              onClick={handleRefresh}
              className="p-1 rounded-full hover:bg-accent"
              title="Refresh now"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onConfigureAlerts}
              className="p-1 rounded-full hover:bg-accent"
              title="Configure alerts"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
        <CardDescription>
          Monitor environmental data streams and anomaly alerts in real-time
        </CardDescription>
        <Progress value={timeToRefresh} className="h-1 mt-2" />
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="streams" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Data Streams
              <Badge className="ml-1">{dataStreams.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Anomalies
              <Badge variant="destructive" className="ml-1">
                {anomalies.filter((a) => !a.acknowledged).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="streams" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-3">
              {dataStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/10 cursor-pointer"
                  onClick={() => onViewStreamDetails(stream.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${getStatusColor(stream.status)}`}
                    >
                      {getStreamIcon(stream.name)}
                    </div>
                    <div>
                      <div className="font-medium">{stream.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Last updated: {formatTime(stream.lastUpdated)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(stream.trend)}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        {stream.value}{" "}
                        <span className="text-sm">{stream.unit}</span>
                      </div>
                      <Badge className={getStatusColor(stream.status)}>
                        {stream.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4 mt-4">
            {anomalies.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-100 text-green-800 mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium">All Clear</h3>
                <p className="text-muted-foreground">
                  No anomalies detected in the monitored data streams.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {anomalies.map((anomaly) => (
                  <Alert
                    key={anomaly.id}
                    variant={
                      anomaly.severity === "high" ? "destructive" : "default"
                    }
                    className={`border ${anomaly.acknowledged ? "opacity-60" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <AlertTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          {anomaly.streamName} Anomaly
                          <Badge className={getStatusColor(anomaly.severity)}>
                            {anomaly.severity.toUpperCase()}
                          </Badge>
                        </AlertTitle>
                        <AlertDescription>
                          <p>{anomaly.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Detected at {formatTime(anomaly.detectedAt)}
                          </p>
                        </AlertDescription>
                      </div>
                      {!anomaly.acknowledged && (
                        <button
                          onClick={() => onAcknowledgeAnomaly(anomaly.id)}
                          className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </Alert>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Monitoring {dataStreams.length} data streams
        </div>
        <button
          onClick={onConfigureAlerts}
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <BellRing className="h-4 w-4" />
          Configure Alerts
        </button>
      </CardFooter>
    </Card>
  );
};

export default RealTimeMonitor;
