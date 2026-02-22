import PatientHeader from "./PatientHeader";
import VitalsSummary from "./VitalsSummary";
import MedicationStatus from "./MedicationStatus";
import NutritionIntake from "./NutritionIntake";
import MobilityFallRisk from "./MobilityFallRisk";
import BMTracker from "./BMTracker";

function PatientDetails() {
  return (
    <div className="patient-details">
      <PatientHeader />

      <div className="patient-grid">
        <VitalsSummary />
        <MedicationStatus />
        <NutritionIntake />
        <MobilityFallRisk />
        <BMTracker />
      </div>
    </div>
  );
}

export default PatientDetails;