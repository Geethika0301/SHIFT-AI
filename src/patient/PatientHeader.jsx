function PatientHeader() {
  return (
    <div className="patient-header">
      <div>
        <h2>James Anderson</h2>
        <p>82 yrs • Room 207B</p>
        <span className="code-status">Code Status: Full Code</span>
      </div>

      <div className="risk-flag critical">
        CRITICAL
      </div>
    </div>
  );
}

export default PatientHeader;