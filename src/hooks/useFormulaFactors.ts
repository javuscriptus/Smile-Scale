import { useState } from "react";

type Factor = {
  name: string;
  value: number;
};

type UseFormulaFactorsResult = {
  factors: Factor[];
  addFactor: (name: string, value: number) => void;
  removeFactor: (index: number) => void;
};

const useFormulaFactors = (): UseFormulaFactorsResult => {
  const [factors, setFactors] = useState<Factor[]>([]);

  const addFactor = (name: string, value: number) => {
    const newFactor: Factor = {
      name,
      value
    };
    setFactors((prevFactors) => [...prevFactors, newFactor]);
  };

  const removeFactor = (index: number) => {
    setFactors((prevFactors) => prevFactors.filter((_, i) => i !== index));
  };

  return {
    factors,
    addFactor,
    removeFactor
  };
};

export default useFormulaFactors;
