import React, { useState } from "react";
import { isEmpty } from "lodash";

import { Button, AdditionalModal } from "../";
import { Calculation } from "../../hooks/useHappinessCalculator";

import styles from "./CalculationHistory.module.css";

type CalculationHistoryProps = {
  history: Calculation[];
};

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  history
}) => {
  const [isActiveModal, setIsActiveModal] = useState(false);

  if (isEmpty(history)) {
    return <>Clear history</>;
  }

  const toggleIsShowModal = () => {
    setIsActiveModal((prev) => !prev);
  };

  return (
    <section className={styles["history-container"]}>
      <div className={styles["history-header"]}>
        <h3 className={styles["history-title"]}>Calculation History:</h3>
        <Button type="info" onClick={toggleIsShowModal}>
          Show Additional Info
        </Button>
      </div>
      {history.map((calculation, index) => (
        <div key={index} className={styles["calculation-item"]}>
          <div className={styles["calculation-info"]}>
            {Object.entries(calculation).map(([field, value]) => (
              <p className={styles["calculation-info-row"]} key={field}>
                <span className={styles["calculation-label"]}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </span>
                <span>{value}</span>
              </p>
            ))}
          </div>
        </div>
      ))}
      <AdditionalModal
        isActive={isActiveModal}
        onToggle={toggleIsShowModal}
        history={history}
      />
    </section>
  );
};
