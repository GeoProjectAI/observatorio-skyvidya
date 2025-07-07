
import { createContext, useContext } from "react";

export interface SkyvidyaContextType {
  selectedDimension: string;
  setSelectedDimension: (dimension: string) => void;
  dimensionScores: Record<string, number>;
  ecosystemType: string;
  setEcosystemType: (type: string) => void;
}

export const SkyvidyaContext = createContext<SkyvidyaContextType>({
  selectedDimension: "who",
  setSelectedDimension: () => {},
  dimensionScores: {
    who: 85,
    where: 72,
    when: 64,
    what: 91,
    why: 68,
    withWhom: 77,
    risks: 42,
    conditions: 78,
  },
  ecosystemType: "climate",
  setEcosystemType: () => {},
});

export const useSkyvidyaContext = () => useContext(SkyvidyaContext);
