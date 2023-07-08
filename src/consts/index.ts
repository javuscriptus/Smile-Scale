import { Sex } from "../components/SexSelect/SexSelect";

export const SEX_OPTIONS = [
  { label: "Male", value: Sex.Male },
  { label: "Female", value: Sex.Female }
];

export const COUNTRY_LIST_MEASUREMENT_SYSTEM = {
  US: {
    weight: "lb",
    height: "in"
  },
  CA: {
    weight: "kg",
    height: "cm"
  },
  UK: {
    weight: "stone",
    height: "ft"
  },
  EU: {
    weight: "kg",
    height: "cm",
    countries: [
      "SK",
      "SI",
      "ES",
      "SE",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO"
    ]
  }
};
