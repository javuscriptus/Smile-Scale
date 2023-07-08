import { useEffect, useState } from "react";
import { useGetCountry } from ".";
import { Sex } from "../components/SexSelect/SexSelect";

export type Calculation = {
  sex: Sex;
  weight: number;
  age: number;
  height: number;
  prediction: number;
};

type UseHappinessCalculatorResult = {
  isShowFields: boolean;
  onShowFields: (value?: boolean) => void;
  happinessPrediction: number;
  history: Calculation[];
  calculatePrediction: (data: Calculation) => void;
  clearHistory: () => void;
};

const HAPPINESS_FORMULA = {
  maleCoefficient: 1,
  femaleCoefficient: 2,
  weightMultiplier: 0.13,
  ageMultiplier: 0.013,
  heightMultiplier: 1.3
};

const useHappinessCalculator = (): UseHappinessCalculatorResult => {
  const [isShowFields, setIsShowFields] = useState<boolean>(false);
  const [happinessPrediction, setHappinessPrediction] = useState<number>(0);
  const [history, setHistory] = useState<Calculation[]>([]);
  const { measurementSystem } = useGetCountry();

  const calculatePrediction = (data: Calculation) => {
    const { sex, weight, age, height } = data;
    if (sex && weight && age && height && measurementSystem) {
      const {
        maleCoefficient,
        femaleCoefficient,
        weightMultiplier,
        ageMultiplier,
        heightMultiplier
      } = HAPPINESS_FORMULA;

      const coefficient = sex === "Male" ? maleCoefficient : femaleCoefficient;
      const weightMultiplierValue =
        measurementSystem.weight === "lb"
          ? weightMultiplier / 2.20462
          : weightMultiplier;
      const heightMultiplierValue =
        measurementSystem.height === "in"
          ? heightMultiplier * 30.48
          : heightMultiplier;

      const resultWithoutSex =
        weightMultiplierValue * weight +
        ageMultiplier * age +
        heightMultiplierValue * height;
      const prediction = coefficient * resultWithoutSex;
      const roundedPredictionNum = parseFloat(prediction.toFixed(3));
      setHappinessPrediction(roundedPredictionNum);

      const newCalculation: Calculation = {
        sex,
        weight,
        age,
        height,
        prediction: roundedPredictionNum
      };

      setHistory((prevHistory) => [...prevHistory, newCalculation]);
    }
  };

  const onShowFields = (value = false) => {
    setIsShowFields(value);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("calculationHistory");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calculationHistory", JSON.stringify(history));
  }, [history]);

  return {
    isShowFields,
    onShowFields,
    happinessPrediction,
    calculatePrediction,
    history,
    clearHistory
  };
};

export default useHappinessCalculator;
