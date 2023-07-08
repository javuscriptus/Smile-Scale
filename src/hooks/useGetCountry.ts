import { useEffect, useState } from "react";
import { COUNTRY_LIST_MEASUREMENT_SYSTEM } from "../consts";

type MeasurementSystem = {
  weight: string;
  height: string;
  countries?: string[]; // Делаем свойство "countries" необязательным
};

type CountryMeasurementSystem = {
  [key: string]: MeasurementSystem;
};

const useGetCountry = () => {
  const [country, setCountry] = useState("");
  const [
    measurementSystem,
    setMeasurementSystem
  ] = useState<MeasurementSystem | null>(null);

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        if (response.ok) {
          const data = await response.json();
          const ip = data.ip;
          const ipInfoResponse = await fetch(
            `https://geo.ipify.org/api/v2/country?apiKey=at_AwBtE962fuVKpKWOLujgaVUl7yx8F&ipAddress=${ip}`
          );
          if (ipInfoResponse.ok) {
            const ipInfoData = await ipInfoResponse.json();
            setCountry(ipInfoData.location.country);

            if (
              COUNTRY_LIST_MEASUREMENT_SYSTEM.hasOwnProperty(
                ipInfoData.location.country
              )
            ) {
              const system = (COUNTRY_LIST_MEASUREMENT_SYSTEM as CountryMeasurementSystem)[
                ipInfoData.location.country
              ] as MeasurementSystem;

              setMeasurementSystem(system);
            } else {
              const {
                weight,
                height
              } = COUNTRY_LIST_MEASUREMENT_SYSTEM.EU as MeasurementSystem;

              setMeasurementSystem({ weight, height });
            }
          } else {
            throw new Error("Failed to get IP information");
          }
        } else {
          throw new Error("Failed to get IP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchIPInfo();
  }, []);

  return {
    country,
    measurementSystem
  };
};

export default useGetCountry;
