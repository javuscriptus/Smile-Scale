import styles from "./InputNumberField.module.css";

type InputNumberFieldProps = {
  field: any;
  fieldState: any;
  label: string;
  errorMessage: string;
  placeholder?: string | number;
};

export const InputNumberField: React.FC<InputNumberFieldProps> = ({
  field,
  fieldState,
  errorMessage,
  placeholder
}) => {
  return (
    <>
      <input
        type="number"
        placeholder={placeholder}
        className={styles.input}
        {...field}
      />
      {fieldState?.error?.type === "required" && (
        <span className={styles["error-message"]}>{errorMessage}</span>
      )}
      {fieldState?.error?.type === "nonDefault" && (
        <span className={styles["error-message"]}>
          The number must not be "0"
        </span>
      )}
      {fieldState?.error?.type === "positiveNumber" && (
        <span className={styles["error-message"]}>
          The number must not be less than "0"
        </span>
      )}
    </>
  );
};
