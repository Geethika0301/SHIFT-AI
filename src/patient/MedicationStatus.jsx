function MedicationStatus() {
  return (
    <div className="patient-card">
      <h4>Medications</h4>

      <p className="med-warning">
        ⚠️ 2 medications missed
      </p>

      <ul>
        <li>Insulin – Missed</li>
        <li>Paracetamol – Given</li>
      </ul>
    </div>
  );
}

export default MedicationStatus;