
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useObservatoryNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("framework");

  useEffect(() => {
    const path = location.pathname.split("/");
    const section = path[path.length - 1];

    if (section && section !== "observatory") {
      setActiveSection(section);
    } else {
      setActiveSection("framework");
      navigate("/observatory/framework", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleNavigate = (route: string) => {
    setActiveSection(route);
    navigate(`/observatory/${route}`);
  };

  return {
    activeSection,
    handleNavigate,
  };
};
