import { ChangeEvent } from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import cn from "classnames";

import styles from "./SexSelect.module.css";

export enum Sex {
  Male = "Male",
  Female = "Female"
}

type Option = {
  label: string;
  value: Sex;
};

type Props<T extends FieldValues> = {
  options: Option[];
  label: string;
  onValueChange: (value: string) => void;
  control: Control<T>;
} & JSX.IntrinsicElements["select"];

export const SexSelect = <T extends FieldValues>({
  options,
  label,
  onValueChange,
  control,
  className
}: Props<T>) => {
  const handleValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    onValueChange(value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}:</label>
      <Controller
        name="sex"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <select
            className={cn(styles.select, {
              [className!]: className
            })}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              handleValueChange(e);
            }}
          >
            <option value="">Please select</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};
