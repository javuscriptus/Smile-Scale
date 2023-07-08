import {
  getAveragePrediction,
  getMaximumPrediction,
  getPredictionCountBySex
} from "../../../helpers";
import { Sex } from "../../SexSelect/SexSelect";
import { Calculation } from "../../../hooks/useHappinessCalculator";
import { Modal } from "../../";

type AdditionalModalProps = {
  history: Calculation[];
  onToggle: () => void;
  isActive: boolean;
};

export const AdditionalModal: React.FC<AdditionalModalProps> = ({
  history,
  onToggle,
  isActive
}) => {
  const averagePrediction: number = getAveragePrediction(history);
  const maximumPrediction: number = getMaximumPrediction(history);
  const malePredictionCount: number = getPredictionCountBySex(
    Sex.Male,
    history
  );
  const femalePredictionCount: number = getPredictionCountBySex(
    Sex.Female,
    history
  );

  return (
    <Modal isOpen={isActive} onClose={onToggle}>
      <div className="additional-info">
        <p className="additional-info-item">
          Average Prediction: {averagePrediction}
        </p>
        <p className="additional-info-item">
          Maximum Prediction: {maximumPrediction}
        </p>
        <p className="additional-info-item">
          Prediction Count (Male): {malePredictionCount}
        </p>
        <p className="additional-info-item">
          Prediction Count (Female): {femalePredictionCount}
        </p>
      </div>
    </Modal>
  );
};
