import { Control, Controller, FieldValues } from "react-hook-form";
import cn from "classnames";

import { InputNumberField } from "../";
import {
  validateNonDefaultValues,
  validatePositiveNumber
} from "../../helpers";

import styles from "./PersonalInfoForm.module.css";

type Field = {
  name: string;
  label: string;
  errorMessage: string;
  placeholder?: string | number;
};

type Props<T extends FieldValues> = {
  control: Control<T>;

  fields: Field[];
  className?: string;
};

export const PersonalInfoForm = <T extends FieldValues>({
  control,
  fields,
  className
}: Props<T>) => {
  return (
    <div className={cn(styles["input-groups"], className)}>
      {fields?.map(({ errorMessage, label, name, placeholder }) => {
        return (
          <div className={styles["input-group"]} key={name}>
            <label className={styles.label}>{label}:</label>
            <Controller
              name={name}
              control={control}
              rules={{
                required: true,
                validate: {
                  nonDefault: validateNonDefaultValues,
                  positiveNumber: validatePositiveNumber
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <InputNumberField
                    field={field}
                    fieldState={fieldState}
                    label={label}
                    errorMessage={errorMessage}
                    placeholder={placeholder}
                  />
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
