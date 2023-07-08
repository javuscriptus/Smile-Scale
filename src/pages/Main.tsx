import React from "react";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { useHappinessCalculator } from "../hooks";
import { Sex } from "../components/SexSelect/SexSelect";
import { Header, CalculationHistory, Form } from "../components";

import "../styles.css";

type FormData = {
  sex: Sex | "Please select sex";
  weight: number | string;
  age: number | string;
  height: number | string;
};
const MainPage: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      sex: "Please select sex",
      weight: "",
      age: "",
      height: ""
    }
  });
  const {
    isShowFields,
    happinessPrediction,
    history,
    calculatePrediction,
    onShowFields
  } = useHappinessCalculator();

  const onSubmit = (data: FormData) => {
    calculatePrediction(data);
  };

  return (
    <div className="app-container">
      <Header>Smile Scale</Header>
      <main className="app-main">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          isShowFields={isShowFields}
          control={control}
          onShowFields={onShowFields}
          happinessPrediction={happinessPrediction}
        />

        {!isEmpty(history) && <CalculationHistory history={history} />}
      </main>
    </div>
  );
};

export default MainPage;
