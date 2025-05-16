import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  BarChart3,
  Building2,
  Map,
  ChevronDown,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "./button";
import { useInView } from "react-intersection-observer";

const titles = [
  "urban resilience",
  "rural resilience",
  "climate resilience",
  "planetary resilience",
];

// Stats for the hero section
const stats = [
  {
    icon: <BarChart3 className="h-6 w-6 text-[#65d0e6]" />,
    value: "500+",
    label: "Data Sources",
    delay: 0.1,
  },
  {
    icon: <Building2 className="h-6 w-6 text-[#65d0e6]" />,
    value: "2000+",
    label: "Organizations",
    delay: 0.2,
  },
  {
    icon: <Map className="h-6 w-6 text-[#65d0e6]" />,
    value: "150+",
    label: "Countries",
    delay: 0.3,
  },
];

// Features for the hero section
const features = [
  {
    icon: <Zap className="h-5 w-5 text-[#69c998]" />,
    label: "Scientific Excellence",
    color: "bg-[#69c998]",
    delay: 0.1,
  },
  {
    icon: <Shield className="h-5 w-5 text-[#f7a58c]" />,
    label: "Sustainable Impact",
    color: "bg-[#f7a58c]",
    delay: 0.2,
  },
  {
    icon: <Globe2 className="h-5 w-5 text-[#65d0e6]" />,
    label: "Global Resilience",
    color: "bg-[#65d0e6]",
    delay: 0.3,
  },
];

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { ref: heroRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-[#1b7fa8] via-[#4fb3ce] to-[#65d0e6] dark:from-[#0f172a] dark:via-[#1b2237] dark:to-[#1e293b] text-white overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animated-grid opacity-30"></div>
        <div className="absolute inset-0 dot-pattern opacity-20"></div>

        {/* Animated gradient overlay */}
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#69c998]/20 to-[#69c998]/40 dark:via-[#65d0e6]/10 dark:to-[#65d0e6]/20"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center px-3 py-1.5 glass-card rounded-full"
              >
                <Sparkles className="h-4 w-4 text-[#65d0e6] mr-2" />
                <span className="text-sm font-medium text-[#ffffff] tracking-wide">
                  EarthAI-powered Innovation
                </span>
              </motion.div>

              <h1 className="heading-xl text-white">
                EarthAI for
                <div className="h-20 relative mt-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleNumber}
                      className="absolute inset-0 bg-gradient-to-r from-[#ffffff] via-[#f7a58c] to-[#ffc29e] dark:from-[#ffffff] dark:via-[#65d0e6] dark:to-[#4fb3ce] bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ type: "spring", stiffness: 50 }}
                    >
                      {titles[titleNumber]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-lg text-[#ffffff] font-light"
            >
              Skyvidya transforms{" "}
              <span className="font-medium">planetary data</span> into{" "}
              <span className="font-medium">actionable insights</span>,
              empowering organizations to solve critical environmental
              challenges and build Earth resilience through scientific
              excellence and technological innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                variant="default"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-white text-[#1b7fa8] hover:bg-[#e0e0e0] dark:bg-[#65d0e6] dark:text-[#0f172a] dark:hover:bg-[#4fb3ce] shadow-glow hover:shadow-glow-lg transition-all duration-300"
                onClick={() => {
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Observatory
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="glass-button inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white"
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Solutions
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-12 space-y-6"
            >
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + stat.delay }}
                    className="flex items-center gap-3 glass-card rounded-lg p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.icon}
                    <div>
                      <motion.div
                        className="text-2xl font-bold font-heading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + stat.delay }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-[#ffffff] font-medium tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + feature.delay }}
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${feature.color} flex items-center justify-center`}
                    >
                      {feature.icon}
                    </div>
                    <span className="text-[#ffffff] text-sm font-medium tracking-wide">
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
              <img
                src="https://cdn.midjourney.com/6a372114-76d5-47b9-9bbb-0af1a33b7410/0_0.png"
                alt="Futuristic Globe in Alien Landscape"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b7fa8]/50 via-transparent to-transparent rounded-2xl"></div>

              {/* Cinematic overlay text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-8 left-8 right-8 text-white"
              >
                <div className="glass-card rounded-lg px-6 py-4 backdrop-blur-sm">
                  <p className="text-sm font-medium opacity-90">
                    "Exploring new frontiers in Earth intelligence and
                    environmental monitoring"
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#ffffff] hover:text-white transition-colors"
        >
          <span className="text-sm mb-2 font-medium tracking-wide">
            Explore Platform
          </span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

export { AnimatedHero as Hero, AnimatedHero };
