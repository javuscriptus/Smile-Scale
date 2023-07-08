import React, { FormEventHandler } from "react";
import { useFormState } from "react-hook-form";
import { Tooltip } from "react-tooltip";

import { SEX_OPTIONS } from "../../consts";
import { PersonalInfoForm, Button, SexSelect } from "../";

import styles from "./Form.module.css";

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isShowFields: boolean;
  control: any;
  onShowFields: (value: boolean) => void;
  happinessPrediction: number;
};

const fields = [
  {
    name: "weight",
    placeholder: "0",
    label: "Weight",
    errorMessage: "Please enter weight"
  },
  {
    name: "age",
    placeholder: "0",
    label: "Age",
    errorMessage: "Please enter age"
  },
  {
    name: "height",
    placeholder: "0",
    label: "Height",
    errorMessage: "Please enter height"
  }
];

export const Form: React.FC<FormProps> = ({
  onSubmit,
  isShowFields,
  control,
  onShowFields,
  happinessPrediction
}) => {
  const { isValid } = useFormState({
    control
  });

  return (
    <form onSubmit={onSubmit} className={styles["form-container"]}>
      <SexSelect
        label="Sex"
        control={control}
        options={SEX_OPTIONS}
        className={styles["form-field"]}
        onValueChange={(value) => {
          onShowFields(value !== "");
        }}
      />
      {isShowFields && (
        <PersonalInfoForm
          fields={fields}
          control={control}
          className={styles["form-field"]}
        />
      )}
      {isShowFields && (
        <>
          <Button
            disabled={!isValid}
            type="submit"
            onClick={onSubmit}
            tooltip={{
              id: "submit-btn",
              content:
                "You will surely win the marathon, but fill in all the fields before clicking me"
            }}
          >
            Calculate
          </Button>
        </>
      )}
      {happinessPrediction > 0 && (
        <section className={styles["prediction-container"]}>
          <h2 className={styles["prediction-title"]}>
            Your prediction of happiness: {happinessPrediction}
          </h2>
        </section>
      )}
    </form>
  );
};
