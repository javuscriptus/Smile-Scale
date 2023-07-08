import React from "react";
import cn from "classnames";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

const modalRoot = document.getElementById("modal-root");

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!modalRoot) {
    return null; // Проверка наличия корневого узла для портала
  }

  const modalClasses = cn(styles.modal, {
    [styles.open]: isOpen
  });

  return createPortal(
    <div className={modalClasses}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.content}>{children}</div>
    </div>,
    modalRoot
  );
};
