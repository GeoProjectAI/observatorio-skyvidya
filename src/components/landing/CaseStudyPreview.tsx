import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CaseStudyPreviewProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  color: string;
  route: string;
  stats?: Array<{ label: string; value: string }>;
}

const CaseStudyPreview: React.FC<CaseStudyPreviewProps> = ({
  title,
  description,
  icon,
  imageSrc,
  color,
  route,
  stats = [],
}) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-${color}/50 to-transparent`}
        ></div>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className={`p-2 rounded-full bg-white/90 shadow-md`}>{icon}</div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="outline" className="bg-white">
            Case Study
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>

        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-50 p-2 rounded-md">
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
                <div className="text-lg font-semibold">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        <Button asChild className="w-full mt-2">
          <Link to={route}>
            View Full Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CaseStudyPreview;
