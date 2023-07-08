import React from "react";
import ReactCountryFlag from "react-country-flag";

import { useGetCountry } from "../../hooks";

import styles from "./Header.module.css";

type HeaderProps = {
  children: string;
};

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const { country } = useGetCountry();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {children} <ReactCountryFlag countryCode={country} svg />
        </h1>
      </div>
    </header>
  );
};
