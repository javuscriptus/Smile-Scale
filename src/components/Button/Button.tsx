import React from "react";
import cn from "classnames";
import { Tooltip } from "react-tooltip";

import styles from "./Button.module.css";

type TooltipType = {
  id: string;
  content: string;
};

type ButtonProps<T extends (...args: any[]) => void> = {
  onClick: T;
  children: React.ReactNode;
  type?: "submit" | "info";
  disabled?: boolean;
  tooltip?: TooltipType;
};

export const Button = <T extends (...args: any[]) => void>({
  onClick,
  children,
  type = "submit",
  disabled,
  tooltip
}: ButtonProps<T>) => {
  const { id, content } = tooltip || {};

  return (
    <div className={styles["btn-container"]}>
      <div data-tooltip-id={id} data-tooltip-content={content}>
        <button
          className={cn(styles.button, styles[type])}
          onClick={onClick as React.MouseEventHandler}
          type={type === "submit" ? "submit" : "button"}
          disabled={disabled}
        >
          {children}
        </button>
      </div>
      {tooltip && disabled && (
        <Tooltip id={id} className={styles.gradientBackground}>
          {content}
        </Tooltip>
      )}
    </div>
  );
};
