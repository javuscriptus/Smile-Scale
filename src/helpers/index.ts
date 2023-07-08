export const getAveragePrediction = (history) => {
  const total = history.reduce(
    (sum: number, { prediction }) => sum + prediction,
    0
  );

  return total / Math.max(history.length, 1);
};

export const getMaximumPrediction = (history) => {
  const predictions = [...history].map(({ prediction }) => prediction);
  return Math.max(0, ...predictions);
};

export const getPredictionCountBySex = (sex: Sex, history) => {
  const filteredPredictions = Array.from(history, ({ sex: calculationSex }) =>
    calculationSex === sex ? 1 : 0
  );
  return filteredPredictions.reduce(
    (sum: number, count) => sum + count,
    0 as 1 | 0
  );
};

export const validateNonDefaultValues = (value: number) => {
  return Number(value) !== 0;
};

export const validatePositiveNumber = (value: number) => {
  return Number(value) >= 0;
};
