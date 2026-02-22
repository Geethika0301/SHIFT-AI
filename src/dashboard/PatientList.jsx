import PatientCard from "./PatientCard";

function PatientList() {
  return (
    <div className="patient-list">
      <h3>My Patients</h3>

      <div className="patient-grid">
        <PatientCard
          name="James Anderson"
          room="207B"
          age={82}
          condition="Acute kidney injury"
          risk="critical"
        />

        <PatientCard
          name="Margaret Thompson"
          room="201A"
          age={78}
          condition="CHF, Diabetes"
          risk="high"
        />

        <PatientCard
          name="Robert Chen"
          room="203B"
          age={65}
          condition="Post hip surgery"
          risk="moderate"
        />
      </div>
    </div>
  );
}

export default PatientList;
