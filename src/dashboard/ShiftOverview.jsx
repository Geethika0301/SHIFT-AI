function ShiftOverview() {
  return (
    <div className="shift-overview">
      <div className="welcome">
        <div>
          <h3>Hello, Priya</h3>
          <p>Senior Nurse • 6 years experience</p>
        </div>
        <div className="avatar">👩‍⚕️</div>
      </div>

      <div className="shift-stats">
        <div className="stat">
          <h4>5</h4>
          <p>Patients</p>
        </div>
        <div className="stat critical">
          <h4>2</h4>
          <p>High Risk</p>
        </div>
        <div className="stat warning">
          <h4>1</h4>
          <p>Missed Meds</p>
        </div>
      </div>
    </div>
  );
}

export default ShiftOverview;
