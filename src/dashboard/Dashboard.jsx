function Dashboard({ onNewNote, onViewHandoff }) {
  return (
    <>
      {/* ================= NEW SHIFT DASHBOARD (ADDED) ================= */}
      <div className="shift-dashboard">
        <div className="shift-header">
          <div>
            <h1>Shift Dashboard</h1>
            <p>Thursday, February 19 • Day Shift</p>
          </div>

          <div className="shift-actions">
            <button className="btn-primary" onClick={onNewNote}>
              + New Note
            </button>
            <button className="btn-secondary" onClick={onViewHandoff}>
              View Handoff
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card highlight">
            <p className="stat-title">TOTAL PATIENTS</p>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <p className="stat-title">TODAY'S NOTES</p>
            <h2>0</h2>
            <span className="muted">0 need attention</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">CRITICAL / HIGH RISK</p>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <p className="stat-title">FALL RISK</p>
            <h2>0</h2>
          </div>
        </div>

        <div className="shift-content">
          <div className="priority-patients">
            <h3>Priority Patients</h3>
            <div className="empty-box">
              <p>No patients added yet</p>
            </div>
          </div>

          <div className="recent-notes">
            <h3>Recent Notes</h3>
            <div className="empty-box">
              <p>No notes today</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= YOUR ORIGINAL DASHBOARD (UNCHANGED) ================= */}
      <h2>Dashboard</h2>

      <div className="welcome-card">
        <div>
          <h3>Hello, Priya</h3>
          <p>Senior Nurse with 6 years experience</p>
        </div>
        <div className="avatar">👩‍⚕️</div>
      </div>

      <div className="content-card health-card">
        <div className="health-left">
          <div className="health-title">Patient Health Activity</div>

          <div className="search-box">
            <input type="text" placeholder="Search" />
          </div>

          <div className="chart-area">
            <svg viewBox="0 0 300 120" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                points="0,80 60,40 120,60 180,100 240,70 300,65"
              />
            </svg>
          </div>

          <div className="patient-card">
            <div>
              <h4>Patient</h4>
              <p>General Ward</p>
              <p>Age 45, Room 101</p>
            </div>
            <div className="patient-id">#250</div>
          </div>
        </div>

        <div className="health-right">
          <h4>Pharmacy / Lab Requests</h4>
          <table className="request-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Medicine</th>
                <th>Dept</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#REQ-2031</td>
                <td>Blood Culture Kit</td>
                <td>Pharmacy</td>
                <td>08:40AM</td>
                <td><span className="status inprogress">In progress</span></td>
              </tr>
              <tr>
                <td>#REQ-2032</td>
                <td>Amoxicillin</td>
                <td>Pharmacy</td>
                <td>10:10AM</td>
                <td><span className="status given">Given</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-card">
        <h3 className="card-title">Medication Administration Overview</h3>
        <table className="med-table">
          <thead>
            <tr>
              <th>Nurse</th>
              <th>Patient</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Priya</td>
              <td>Abdul</td>
              <td>Paracetamol</td>
              <td>500mg</td>
              <td>08:00 AM</td>
              <td><span className="status given">Given</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;