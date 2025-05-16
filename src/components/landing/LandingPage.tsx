import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SkyvidyaButton } from "@/components/ui/skyvidya-button";
import { SkyvidyaLogo } from "@/components/ui/skyvidya-logo";
import {
  SkyvidyaTheme,
  SkyvidyaGradientText,
} from "@/components/ui/skyvidya-theme";
import { colors } from "@/lib/colors";
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
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Play,
  CheckCircle2,
  Sparkles,
  Zap,
  LineChart,
  Layers,
  Thermometer,
  Wind,
  Droplets,
  Building,
  ChevronDown,
} from "lucide-react";
import { EcosystemIntelligence } from "@/components/ecosystem/EcosystemIntelligence";
// Import only what's needed for the landing page
// We'll create simplified case study previews instead of using the full components

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("climate");
  const [isVisible, setIsVisible] = useState(false);
  const [animateCount, setAnimateCount] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "urban resilience",
      "rural resilience",
      "climate resilience",
      "planetary resilience",
    ],
    [],
  );
  const [counts, setCounts] = useState({
    who: 0,
    where: 0,
    when: 0,
    risks: 0,
  });

  // Animation for section visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      setAnimateCount(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Title animation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // Counter animation
  useEffect(() => {
    if (animateCount) {
      const interval = setInterval(() => {
        setCounts((prev) => ({
          who: Math.min(prev.who + 25, 1245),
          where: Math.min(prev.where + 75, 3782),
          when: Math.min(prev.when + 130, 6521),
          risks: Math.min(prev.risks + 43, 2156),
        }));
      }, 30);

      if (
        counts.who === 1245 &&
        counts.where === 3782 &&
        counts.when === 6521 &&
        counts.risks === 2156
      ) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [animateCount, counts]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#1b7fa8] text-white overflow-hidden">
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50 py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SkyvidyaLogo size="sm" variant="dark" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <div className="relative group">
                <button className="text-white flex items-center gap-1 text-sm font-medium">
                  Platform <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <button className="text-white text-sm font-medium">
                Solutions
              </button>
              <div className="relative group">
                <button className="text-white flex items-center gap-1 text-sm font-medium">
                  Resources <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <button className="text-white text-sm font-medium">
                Pricing
              </button>
            </div>
            <button className="bg-white text-[#1b7fa8] px-4 py-2 rounded-lg text-sm font-medium">
              Get Started
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-32 pb-20 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1.5 bg-[#65d0e6]/20 rounded-full backdrop-blur-sm border border-[#65d0e6]/20">
                  <span className="animate-pulse w-2 h-2 rounded-full bg-[#65d0e6] mr-2"></span>
                  <span className="text-sm font-medium text-[#ffffff]">
                    EarthAI-powered Innovation
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-none text-white">
                  <span className="text-white">EarthAI</span>
                  <div className="h-24 relative mt-4">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={titleNumber}
                        className="absolute text-4xl lg:text-5xl xl:text-6xl inset-0 bg-gradient-to-r from-[#ffffff] via-[#f7a58c] to-[#ffc29e] bg-clip-text text-transparent font-semibold"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ type: "spring", stiffness: 50 }}
                      >
                        for {titles[titleNumber]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </h1>
              </div>

              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl font-light">
                Skyvidya transforms planetary data into actionable insights,
                empowering organizations to solve critical environmental
                challenges and build Earth resilience through scientific
                excellence and technological innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-8 mt-2">
                <Link
                  to="/observatory/framework"
                  className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-xl bg-white text-[#1b7fa8] hover:bg-[#e0e0e0] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10"
                >
                  Explore Observatory
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Solutions
                </a>
              </div>

              <div className="pt-16 space-y-8">
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 bg-[#65d0e6]/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                    <BarChart2 className="h-7 w-7 text-[#65d0e6]" />
                    <div>
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm font-medium text-[#ffffff]">
                        Data Sources
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-[#65d0e6]/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                    <Building className="h-7 w-7 text-[#65d0e6]" />
                    <div>
                      <div className="text-3xl font-bold">2000+</div>
                      <div className="text-sm font-medium text-[#ffffff]">
                        Organizations
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-[#65d0e6]/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                    <Map className="h-7 w-7 text-[#65d0e6]" />
                    <div>
                      <div className="text-3xl font-bold">150+</div>
                      <div className="text-sm font-medium text-[#ffffff]">
                        Countries
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#69c998] animate-pulse"></div>
                    <span className="text-[#ffffff] text-sm font-medium">
                      Scientific Excellence
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#f7a58c] animate-pulse"></div>
                    <span className="text-[#ffffff] text-sm font-medium">
                      Sustainable Impact
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#65d0e6] animate-pulse"></div>
                    <span className="text-[#ffffff] text-sm font-medium">
                      Global Resilience
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative w-full aspect-square max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="https://cdn.midjourney.com/6a372114-76d5-47b9-9bbb-0af1a33b7410/0_0.png"
                  alt="Earth view from astronaut helmet"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1b7fa8]/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-center bg-black/30 backdrop-blur-sm p-3 rounded-xl text-white text-sm font-medium">
                  "Exploring new frontiers in Earth intelligence and
                  environmental monitoring"
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={scrollToFeatures}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#ffffff] hover:text-white transition-colors"
          >
            <span className="text-sm font-medium mb-3">Explore Platform</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Framework Overview with Animation */}
      <section
        id="features"
        className="py-20 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-skyvidya-lightGray opacity-50 -skew-x-12 transform translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-skyvidya-skyBlue/20 text-skyvidya-deepBlue hover:bg-skyvidya-skyBlue/30 px-3 py-1 text-sm">
              Proprietary Methodology
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              The SKYVIDYA Framework
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our comprehensive 8-dimensional approach to understanding complex
              environmental systems and their interconnections for better
              decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* WHO Dimension - Animated */}
            <Card className="bg-skyvidya-skyBlue/10 border-none hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-full bg-skyvidya-skyBlue/20 shadow-inner">
                    <Users className="h-6 w-6 text-skyvidya-deepBlue" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/70 hover:bg-white shadow-sm"
                  >
                    WHO
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3 text-skyvidya-deepBlue">
                  Entity Visualization
                </CardTitle>
                <CardDescription className="text-skyvidya-deepBlue/80">
                  Tracking and analyzing key stakeholders and entities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-skyvidya-deepBlue">
                  {animateCount ? counts.who.toLocaleString() : "1,245"}
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <BarChart2 className="h-4 w-4 text-skyvidya-vibrantGreen" />
                  <span className="text-sm font-medium text-skyvidya-vibrantGreen">
                    +12% growth
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* WHERE Dimension - Animated */}
            <Card className="bg-skyvidya-vibrantGreen/10 border-none hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-full bg-skyvidya-vibrantGreen/20 shadow-inner">
                    <Map className="h-6 w-6 text-skyvidya-vibrantGreen" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/70 hover:bg-white shadow-sm"
                  >
                    WHERE
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3 text-skyvidya-vibrantGreen">
                  Location Analysis
                </CardTitle>
                <CardDescription className="text-skyvidya-vibrantGreen/80">
                  Geospatial mapping and location intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-skyvidya-vibrantGreen">
                  {animateCount ? counts.where.toLocaleString() : "3,782"}
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <BarChart2 className="h-4 w-4 text-skyvidya-vibrantGreen" />
                  <span className="text-sm font-medium text-skyvidya-vibrantGreen">
                    +8% growth
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* WHEN Dimension - Animated */}
            <Card className="bg-skyvidya-seaBlue/10 border-none hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-full bg-skyvidya-seaBlue/20 shadow-inner">
                    <Calendar className="h-6 w-6 text-skyvidya-seaBlue" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/70 hover:bg-white shadow-sm"
                  >
                    WHEN
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3 text-skyvidya-seaBlue">
                  Temporal Analysis
                </CardTitle>
                <CardDescription className="text-skyvidya-seaBlue/80">
                  Time-series analysis and temporal patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-skyvidya-seaBlue">
                  {animateCount ? counts.when.toLocaleString() : "6,521"}
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Stable
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* RISKS Dimension - Animated */}
            <Card className="bg-skyvidya-coral/10 border-none hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-full bg-skyvidya-coral/20 shadow-inner">
                    <AlertTriangle className="h-6 w-6 text-skyvidya-coral" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/70 hover:bg-white shadow-sm"
                  >
                    RISKS
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3 text-skyvidya-coral">
                  Threat Assessment
                </CardTitle>
                <CardDescription className="text-skyvidya-coral/80">
                  Risk analysis and vulnerability mapping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-skyvidya-coral">
                  {animateCount ? counts.risks.toLocaleString() : "2,156"}
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <BarChart2 className="h-4 w-4 text-skyvidya-coral" />
                  <span className="text-sm font-medium text-skyvidya-coral">
                    +23% increase
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <SkyvidyaButton variant="outline" className="group">
              Explore All 8 Dimensions
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </SkyvidyaButton>
          </div>
        </div>
      </section>

      {/* Interactive Map Preview Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-skyvidya-lightGray">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-skyvidya-vibrantGreen/20 text-skyvidya-vibrantGreen hover:bg-skyvidya-vibrantGreen/30 px-3 py-1 text-sm">
                Interactive Visualization
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Advanced Geospatial Intelligence
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Explore environmental data through our powerful WebGIS interface
                with H3 hexagon grid technology for optimized spatial analysis
                and visualization.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-skyvidya-skyBlue/20 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">
                      Multi-layered Visualization
                    </h3>
                    <p className="text-slate-600">
                      Toggle between different data layers to reveal patterns
                      and insights
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-skyvidya-skyBlue/20 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">
                      Custom Spatial Queries
                    </h3>
                    <p className="text-slate-600">
                      Draw areas of interest or select existing boundaries for
                      targeted analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-skyvidya-skyBlue/20 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">
                      Real-time Data Integration
                    </h3>
                    <p className="text-slate-600">
                      Connect to live environmental data sources for
                      up-to-the-minute insights
                    </p>
                  </div>
                </div>
              </div>

              <SkyvidyaButton>
                Explore Map Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </SkyvidyaButton>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80"
                  alt="Map visualization"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-skyvidya-deepBlue/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs text-slate-700 font-mono">
                  Lon: -122.4194 | Lat: 37.7749 | Zoom: 9.2
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-sm">
                    <Layers className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-sm">
                    <Map className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                </div>
                <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 text-skyvidya-deepBlue hover:bg-white backdrop-blur-sm">
                  <Play className="mr-2 h-4 w-4" />
                  Interactive Demo
                </Button>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-skyvidya-vibrantGreen/20 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-skyvidya-vibrantGreen" />
                  <span className="font-medium text-skyvidya-vibrantGreen">
                    H3 Hexagon Technology
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Intelligence - Integrated from storyboard */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-skyvidya-skyBlue/20 text-skyvidya-deepBlue hover:bg-skyvidya-skyBlue/30 px-3 py-1 text-sm">
              Specialized Analysis
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Ecosystem Intelligence
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Tailored analytics and insights for different environmental
              ecosystems, designed to address specific challenges and
              opportunities.
            </p>
          </div>

          <EcosystemIntelligence />
        </div>
      </section>

      {/* Weather Study Case Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-skyvidya-lightGray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-skyvidya-vibrantGreen/20 text-skyvidya-vibrantGreen hover:bg-skyvidya-vibrantGreen/30 px-3 py-1 text-sm">
              Climate Analytics
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Advanced Weather Intelligence
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Comprehensive weather analysis with historical trends, risk
              assessment, and actionable recommendations for climate resilience
              planning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-skyvidya-deepBlue mb-4">
                Climate-Driven Decision Support
              </h3>
              <p className="text-slate-600 mb-6">
                Our weather intelligence platform combines real-time data with
                historical patterns to provide actionable insights for urban
                planning, infrastructure development, and risk management.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-skyvidya-skyBlue/20 mt-1">
                    <Thermometer className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Temperature Trend Analysis
                    </h4>
                    <p className="text-slate-600">
                      Compare current temperatures with 30-year historical
                      averages to identify climate shifts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-skyvidya-skyBlue/20 mt-1">
                    <Droplets className="h-5 w-5 text-skyvidya-skyBlue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Precipitation Pattern Recognition
                    </h4>
                    <p className="text-slate-600">
                      Identify changing rainfall patterns and extreme
                      precipitation events
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-skyvidya-skyBlue/20 mt-1">
                    <AlertTriangle className="h-5 w-5 text-skyvidya-coral" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Asset Risk Assessment
                    </h4>
                    <p className="text-slate-600">
                      Evaluate climate-related risks to infrastructure and
                      environmental assets
                    </p>
                  </div>
                </div>
              </div>

              <SkyvidyaButton asChild>
                <Link to="/observatory/weather">
                  Explore Weather Intelligence
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </SkyvidyaButton>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-skyvidya-deepBlue">
                    New York
                  </h3>
                  <p className="text-slate-600">USA</p>
                </div>
                <Badge className="bg-skyvidya-skyBlue/10 text-skyvidya-deepBlue">
                  <Cloud className="h-3 w-3 mr-1" />
                  Weather Preview
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-skyvidya-deepBlue/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="h-4 w-4 text-skyvidya-deepBlue" />
                    <span className="text-xs font-medium">Temperature</span>
                  </div>
                  <div className="text-2xl font-bold text-skyvidya-deepBlue">
                    5.2°C
                  </div>
                </div>

                <div className="bg-skyvidya-skyBlue/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="h-4 w-4 text-skyvidya-skyBlue" />
                    <span className="text-xs font-medium">Precipitation</span>
                  </div>
                  <div className="text-2xl font-bold text-skyvidya-skyBlue">
                    65%
                  </div>
                </div>

                <div className="bg-skyvidya-freshGreen/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind className="h-4 w-4 text-skyvidya-freshGreen" />
                    <span className="text-xs font-medium">Wind</span>
                  </div>
                  <div className="text-2xl font-bold text-skyvidya-freshGreen">
                    5.6 km/h
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <SkyvidyaButton variant="outline" size="sm" asChild>
                  <Link to="/observatory/weather">
                    View Full Weather Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </SkyvidyaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-skyvidya-lightGray to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-skyvidya-skyBlue/20 text-skyvidya-deepBlue hover:bg-skyvidya-skyBlue/30 px-3 py-1 text-sm">
              Platform Capabilities
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Comprehensive tools for environmental intelligence and data-driven
              decision support across all dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Enhanced */}
            <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="p-4 bg-skyvidya-skyBlue/20 rounded-2xl w-fit mb-4 group-hover:bg-skyvidya-skyBlue/30 transition-colors">
                  <Map className="h-8 w-8 text-skyvidya-deepBlue" />
                </div>
                <CardTitle className="text-xl group-hover:text-skyvidya-deepBlue transition-colors">
                  Interactive WebGIS
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Advanced geospatial visualization with H3 hexagon grid for
                  optimized spatial queries and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-skyBlue/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-deepBlue"></div>
                    </div>
                    <span>
                      Layered visualization of environmental data with
                      customizable opacity and styling
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-skyBlue/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-deepBlue"></div>
                    </div>
                    <span>
                      Custom spatial query tools with polygon, rectangle, and
                      circle drawing capabilities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-skyBlue/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-deepBlue"></div>
                    </div>
                    <span>
                      Real-time data integration with satellite imagery and
                      sensor networks
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <SkyvidyaButton
                    variant="outline"
                    className="w-full justify-between group-hover:bg-skyvidya-skyBlue/10 group-hover:text-skyvidya-deepBlue transition-colors"
                    iconRight={
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    }
                  >
                    Learn More
                  </SkyvidyaButton>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 - Enhanced */}
            <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="p-4 bg-skyvidya-seaBlue/20 rounded-2xl w-fit mb-4 group-hover:bg-skyvidya-seaBlue/30 transition-colors">
                  <MessageSquare className="h-8 w-8 text-skyvidya-seaBlue" />
                </div>
                <CardTitle className="text-xl group-hover:text-skyvidya-seaBlue transition-colors">
                  AI Assistant
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Conversational interface with geospatial intelligence and
                  multi-LLM capabilities for intuitive data exploration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-seaBlue/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-seaBlue"></div>
                    </div>
                    <span>
                      Natural language geospatial queries with contextual
                      understanding of environmental terms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-seaBlue/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-seaBlue"></div>
                    </div>
                    <span>
                      Contextual environmental insights with access to real-time
                      and historical data
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-seaBlue/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-seaBlue"></div>
                    </div>
                    <span>
                      Automated report generation with customizable templates
                      and export options
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <SkyvidyaButton
                    variant="outline"
                    className="w-full justify-between group-hover:bg-skyvidya-seaBlue/10 group-hover:text-skyvidya-seaBlue transition-colors"
                    iconRight={
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    }
                  >
                    Learn More
                  </SkyvidyaButton>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 - Enhanced */}
            <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="p-4 bg-skyvidya-vibrantGreen/20 rounded-2xl w-fit mb-4 group-hover:bg-skyvidya-vibrantGreen/30 transition-colors">
                  <Activity className="h-8 w-8 text-skyvidya-vibrantGreen" />
                </div>
                <CardTitle className="text-xl group-hover:text-skyvidya-vibrantGreen transition-colors">
                  Real-time Monitoring
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Stream processing of environmental data with anomaly detection
                  and intelligent alerting system for proactive response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-vibrantGreen/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-vibrantGreen"></div>
                    </div>
                    <span>
                      Real-time stream processing of environmental sensor data
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-vibrantGreen/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-vibrantGreen"></div>
                    </div>
                    <span>
                      AI-powered anomaly detection with configurable thresholds
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-skyvidya-vibrantGreen/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-skyvidya-vibrantGreen"></div>
                    </div>
                    <span>
                      Multi-channel alerting system with escalation workflows
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <SkyvidyaButton
                    variant="outline"
                    className="w-full justify-between group-hover:bg-skyvidya-vibrantGreen/10 group-hover:text-skyvidya-vibrantGreen transition-colors"
                    iconRight={
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    }
                  >
                    Learn More
                  </SkyvidyaButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-skyvidya-deepBlue/20 text-skyvidya-deepBlue hover:bg-skyvidya-deepBlue/30 px-4 py-1.5 text-sm font-medium">
              Our Mission
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              About SKYVIDYA
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform environmental data into actionable
              intelligence for a more resilient and sustainable planet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80"
                  alt="Earth from space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-skyvidya-deepBlue p-6 rounded-xl shadow-xl text-white max-w-xs">
                <h3 className="text-xl font-bold mb-2">Founded in 2018</h3>
                <p className="text-sm text-blue-100">
                  Our team of scientists and engineers are dedicated to pushing
                  the boundaries of environmental intelligence.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-skyvidya-deepBlue mb-6">
                Pioneering Earth Intelligence
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                SKYVIDYA brings together experts in environmental science, data
                analytics, and artificial intelligence to create a revolutionary
                platform for monitoring and understanding our planet's complex
                systems.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-skyvidya-skyBlue/20 mt-1 shadow-md">
                    <Globe className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-slate-900 mb-1">
                      Global Impact
                    </h4>
                    <p className="text-slate-600">
                      Our solutions are deployed in over 150 countries, helping
                      organizations make data-driven decisions for environmental
                      resilience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-skyvidya-skyBlue/20 mt-1 shadow-md">
                    <Zap className="h-5 w-5 text-skyvidya-deepBlue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-slate-900 mb-1">
                      Innovative Technology
                    </h4>
                    <p className="text-slate-600">
                      We continuously push the boundaries of what's possible
                      with cutting-edge AI, geospatial analysis, and data
                      visualization techniques.
                    </p>
                  </div>
                </div>
              </div>

              <SkyvidyaButton className="px-8 py-6 text-base shadow-lg shadow-skyvidya-deepBlue/10 hover:shadow-xl hover:shadow-skyvidya-deepBlue/20 transition-all duration-300">
                Learn About Our Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </SkyvidyaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-skyvidya-lightGray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-skyvidya-vibrantGreen/20 text-skyvidya-vibrantGreen hover:bg-skyvidya-vibrantGreen/30 px-4 py-1.5 text-sm font-medium">
              Success Stories
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              What Our Partners Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Organizations around the world trust SKYVIDYA to deliver critical
              environmental intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="text-skyvidya-deepBlue mb-4">
                <svg
                  width="45"
                  height="36"
                  viewBox="0 0 45 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27H18V36H9C4.02944 36 0 31.9706 0 27V13.5C0 6.04416 6.04416 0 13.5 0ZM40.5 0C33.0442 0 27 6.04416 27 13.5C27 20.9558 33.0442 27 40.5 27H45V36H36C31.0294 36 27 31.9706 27 27V13.5C27 6.04416 33.0442 0 40.5 0Z"
                    fill="#1b7fa8"
                    fillOpacity="0.2"
                  />
                </svg>
              </div>
              <p className="text-lg text-slate-700 mb-6 italic leading-relaxed">
                "SKYVIDYA has revolutionized how we monitor and respond to
                environmental changes. The platform's ability to integrate
                diverse data sources and provide actionable insights has been
                invaluable for our conservation efforts."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-skyvidya-skyBlue/20">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                    alt="Maria Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-skyvidya-deepBlue">
                    Maria Rodriguez
                  </h4>
                  <p className="text-slate-600">
                    Environmental Director, Global Conservation Initiative
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="text-skyvidya-deepBlue mb-4">
                <svg
                  width="45"
                  height="36"
                  viewBox="0 0 45 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27H18V36H9C4.02944 36 0 31.9706 0 27V13.5C0 6.04416 6.04416 0 13.5 0ZM40.5 0C33.0442 0 27 6.04416 27 13.5C27 20.9558 33.0442 27 40.5 27H45V36H36C31.0294 36 27 31.9706 27 27V13.5C27 6.04416 33.0442 0 40.5 0Z"
                    fill="#1b7fa8"
                    fillOpacity="0.2"
                  />
                </svg>
              </div>
              <p className="text-lg text-slate-700 mb-6 italic leading-relaxed">
                "The SKYVIDYA framework has transformed our approach to climate
                resilience planning. The platform's predictive capabilities and
                intuitive visualizations have helped us make more informed
                decisions about infrastructure investments."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-skyvidya-skyBlue/20">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                    alt="James Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-skyvidya-deepBlue">
                    James Chen
                  </h4>
                  <p className="text-slate-600">
                    Chief Sustainability Officer, Urban Resilience Corp
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="text-skyvidya-deepBlue mb-4">
                <svg
                  width="45"
                  height="36"
                  viewBox="0 0 45 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27H18V36H9C4.02944 36 0 31.9706 0 27V13.5C0 6.04416 6.04416 0 13.5 0ZM40.5 0C33.0442 0 27 6.04416 27 13.5C27 20.9558 33.0442 27 40.5 27H45V36H36C31.0294 36 27 31.9706 27 27V13.5C27 6.04416 33.0442 0 40.5 0Z"
                    fill="#1b7fa8"
                    fillOpacity="0.2"
                  />
                </svg>
              </div>
              <p className="text-lg text-slate-700 mb-6 italic leading-relaxed">
                "As a research institution, we needed a platform that could
                handle complex environmental data while remaining accessible to
                non-technical stakeholders. SKYVIDYA delivers on both fronts,
                making it an essential tool for our climate research."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-skyvidya-skyBlue/20">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    alt="Dr. Sarah Okonjo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-skyvidya-deepBlue">
                    Dr. Sarah Okonjo
                  </h4>
                  <p className="text-slate-600">
                    Lead Researcher, Climate Science Institute
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Client logos */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <p className="text-center text-sm text-slate-500 mb-8">
              Trusted by leading organizations worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
              <div className="h-12 flex items-center">Company Logo 1</div>
              <div className="h-12 flex items-center">Company Logo 2</div>
              <div className="h-12 flex items-center">Company Logo 3</div>
              <div className="h-12 flex items-center">Company Logo 4</div>
              <div className="h-12 flex items-center">Company Logo 5</div>
              <div className="h-12 flex items-center">Company Logo 6</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-skyvidya-coral/20 text-skyvidya-coral hover:bg-skyvidya-coral/30 px-4 py-1.5 text-sm font-medium">
              Latest Updates
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              News & Insights
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest developments in environmental
              intelligence and planetary resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569163139599-0f4517e36f31?w=800&q=80"
                  alt="Climate conference"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-skyvidya-deepBlue/90 text-white text-xs font-medium py-1 px-2 rounded">
                  Research
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span>June 12, 2023</span>
                </div>
                <CardTitle className="text-xl group-hover:text-skyvidya-deepBlue transition-colors">
                  New Study Reveals Accelerating Climate Patterns in Urban Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  Our research team has published groundbreaking findings on the
                  acceleration of climate change impacts in major metropolitan
                  regions.
                </p>
                <SkyvidyaButton
                  variant="outline"
                  className="w-full justify-between group-hover:bg-skyvidya-deepBlue/5 transition-colors"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </SkyvidyaButton>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80"
                  alt="Technology innovation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-skyvidya-vibrantGreen/90 text-white text-xs font-medium py-1 px-2 rounded">
                  Technology
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span>May 28, 2023</span>
                </div>
                <CardTitle className="text-xl group-hover:text-skyvidya-deepBlue transition-colors">
                  SKYVIDYA Launches Enhanced H3 Spatial Analysis Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  Our latest platform update introduces advanced spatial
                  analysis capabilities using the H3 hexagonal grid system for
                  unprecedented precision.
                </p>
                <SkyvidyaButton
                  variant="outline"
                  className="w-full justify-between group-hover:bg-skyvidya-deepBlue/5 transition-colors"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </SkyvidyaButton>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80"
                  alt="Partnership announcement"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-skyvidya-skyBlue/90 text-white text-xs font-medium py-1 px-2 rounded">
                  Partnership
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span>April 15, 2023</span>
                </div>
                <CardTitle className="text-xl group-hover:text-skyvidya-deepBlue transition-colors">
                  SKYVIDYA Partners with Global Conservation Initiative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  We're excited to announce a strategic partnership with the
                  Global Conservation Initiative to monitor and protect critical
                  ecosystems worldwide.
                </p>
                <SkyvidyaButton
                  variant="outline"
                  className="w-full justify-between group-hover:bg-skyvidya-deepBlue/5 transition-colors"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </SkyvidyaButton>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <SkyvidyaButton
              variant="outline"
              className="group hover:bg-skyvidya-skyBlue/5"
            >
              View All News
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </SkyvidyaButton>
          </div>
        </div>
      </section>

      {/* Final CTA and Waitlist Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-skyvidya-deepBlue via-skyvidya-seaBlue to-skyvidya-skyBlue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to transform your environmental intelligence?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join our waitlist to be among the first to access the SKYVIDYA
                platform and receive exclusive early adopter benefits.
              </p>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 mb-8">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <div className="flex">
                      <input
                        type="email"
                        id="email"
                        placeholder="you@company.com"
                        className="flex-1 px-4 py-3 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                      <button className="px-6 py-3 bg-white text-skyvidya-deepBlue font-medium rounded-r-lg hover:bg-opacity-90 transition-colors">
                        Join Waitlist
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-blue-200">
                    We'll never share your email. Unsubscribe anytime.
                  </p>
                </form>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-skyvidya-vibrantGreen flex items-center justify-center text-xs font-medium">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-skyvidya-coral flex items-center justify-center text-xs font-medium">
                    MK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-skyvidya-skyBlue flex items-center justify-center text-xs font-medium">
                    AR
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium">
                    +
                  </div>
                </div>
                <p className="text-sm text-blue-100">
                  Join 2,500+ professionals already on the waitlist
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Early Access Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-white/20 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Priority Access</h4>
                    <p className="text-blue-100">
                      Be among the first to experience the full SKYVIDYA
                      platform
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-white/20 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Exclusive Pricing</h4>
                    <p className="text-blue-100">
                      Special founding member pricing locked in for life
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-white/20 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Dedicated Support</h4>
                    <p className="text-blue-100">
                      Direct access to our expert team during onboarding
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-white/20 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Feature Input</h4>
                    <p className="text-blue-100">
                      Help shape the future of the platform with your feedback
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <SkyvidyaLogo size="sm" variant="dark" />
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Advanced geospatial intelligence for planetary resilience and
              environmental monitoring.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Release Notes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm text-center">
            &copy; {new Date().getFullYear()} SKYVIDYA GeoIntelligence Platform.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
