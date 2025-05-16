import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  Calendar,
  Map,
  Activity,
  AlertTriangle,
  Leaf,
} from "lucide-react";

interface DimensionGridProps {
  dimensions: {
    who: string;
    what: string;
    when: string;
    where: string;
    why: string;
    withWhom: string;
    withXIssue: string;
    withYIssue: string;
    vidyaScore: string;
  };
  ecosystemId: string;
}

export function DimensionGrid({ dimensions, ecosystemId }: DimensionGridProps) {
  // Color schemes for different ecosystems
  const colorSchemes: Record<string, { primary: string; secondary: string }> = {
    climate: {
      primary: "bg-blue-50 text-blue-700",
      secondary: "bg-blue-100 text-blue-800",
    },
    forest: {
      primary: "bg-green-50 text-green-700",
      secondary: "bg-green-100 text-green-800",
    },
    rural: {
      primary: "bg-amber-50 text-amber-700",
      secondary: "bg-amber-100 text-amber-800",
    },
    greendeal: {
      primary: "bg-emerald-50 text-emerald-700",
      secondary: "bg-emerald-100 text-emerald-800",
    },
  };

  const colors = colorSchemes[ecosystemId] || colorSchemes.climate;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* First row: WHO, WHAT, WHEN, WHERE */}
      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${colors.primary}`}>
              <Users className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">WHO (Quem)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dimensions.who}</p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${colors.primary}`}>
              <FileText className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">WHAT (O quê)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dimensions.what}</p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${colors.primary}`}>
              <Calendar className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">WHEN (Quando)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dimensions.when}</p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${colors.primary}`}>
              <Map className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">WHERE (Onde)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dimensions.where}</p>
        </CardContent>
      </Card>

      {/* Second row: WHY, WITH WHOM, WITH X ISSUE, WITH Y ISSUE */}
      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${colors.primary}`}>
              <Activity className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">WHY (Por quê)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dimensions.why}</p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${colors.primary}`}>
              <Users className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">
              WITH WHOM (Com quem)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dimensions.withWhom}</p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md bg-amber-50 text-amber-700`}>
              <AlertTriangle className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">CONDITIONS</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <p className="text-sm">{dimensions.withXIssue.split("(")[0]}</p>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 text-xs"
            >
              {dimensions.withXIssue.split("(")[1]?.replace(")", "")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md bg-green-50 text-green-700`}>
              <Leaf className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium">RISKS</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dimensions.withYIssue}</p>
        </CardContent>
      </Card>

      {/* VIDYA Score - Highlighted */}
      <Card className="border-2 border-skyvidya-cta col-span-1 md:col-span-2 lg:col-span-4 bg-skyvidya-cta/5">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-skyvidya-cta/20 text-skyvidya-cta">
              <Activity className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-medium text-skyvidya-cta">
              VIDYA SCORE INTEGRADO
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-skyvidya-cta">
              {dimensions.vidyaScore}
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Risco de Colapso e Qualidade de Vida do Asset
            </p>
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-2/3 max-w-md">
            <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-skyvidya-cta rounded-full"
                style={{
                  width: `${parseFloat(dimensions.vidyaScore)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
