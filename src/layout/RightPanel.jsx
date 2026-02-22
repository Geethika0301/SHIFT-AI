import { useState } from "react";

function RightPanel() {
  const [view, setView] = useState("current");
  const [showSignOff, setShowSignOff] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const currentNurse = {
    name: "Nurse Priya",
    role: "Senior Nurse",
    shift: "Day Shift",
    shiftStart: "08:00 AM",
  };

  const nextNurse = {
    name: "Nurse Kavya",
    role: "Staff Nurse",
    shift: "Evening Shift",
    shiftStartsAt: "04:00 PM",
  };

  const previousNurse = {
    name: "Nurse Anjali",
    role: "Staff Nurse",
    shift: "Night Shift",
    shiftEnd: "07:45 AM",
    patientsHandled: 6,
    notesWritten: 4,
    alertsAcknowledged: 3,
    signOffTime: "07:50 AM",
  };

  return (
    <aside className="right-panel">
      {/* ================= CURRENT NURSE ================= */}
      {view === "current" && (
        <>
          <div className="profile-card">
            <div className="profile-avatar">👩‍⚕️</div>
            <h3>{currentNurse.name}</h3>
            <p>{currentNurse.role}</p>

            <div style={{ marginTop: "10px", fontSize: "13px" }}>
              <p><strong>Shift:</strong> {currentNurse.shift}</p>
              <p><strong>Started:</strong> {currentNurse.shiftStart}</p>
            </div>

            {/* SHIFT SIGN-OFF */}
            <button
              className="primary-btn"
              style={{ marginTop: "15px", width: "100%" }}
              onClick={() => setShowSignOff(true)}
            >
              ✅ Shift Sign-Off
            </button>

            <button
              className="secondary-btn"
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => setView("previous")}
            >
              View Previous Nurse
            </button>
          </div>

          {/* ================= NEXT SHIFT NURSE ================= */}
          <div
            className="profile-card"
            style={{ marginTop: "20px", background: "#f8fafc" }}
          >
            <h4 style={{ marginBottom: "8px" }}>Next Shift Nurse</h4>
            <p><strong>{nextNurse.name}</strong></p>
            <p>{nextNurse.role}</p>

            <div style={{ fontSize: "13px", marginTop: "6px" }}>
              <p><strong>Shift:</strong> {nextNurse.shift}</p>
              <p><strong>Starts At:</strong> {nextNurse.shiftStartsAt}</p>
            </div>
          </div>
        </>
      )}

      {/* ================= PREVIOUS NURSE ================= */}
      {view === "previous" && (
        <div className="profile-card">
          <div className="profile-avatar">👩‍⚕️</div>
          <h3>{previousNurse.name}</h3>
          <p>{previousNurse.role}</p>

          <div style={{ marginTop: "10px", fontSize: "13px" }}>
            <p><strong>Shift Ended:</strong> {previousNurse.shiftEnd}</p>
            <p><strong>Patients Handled:</strong> {previousNurse.patientsHandled}</p>
            <p><strong>Notes Written:</strong> {previousNurse.notesWritten}</p>
            <p><strong>Alerts Acknowledged:</strong> {previousNurse.alertsAcknowledged}</p>
            <p><strong>Signed Off At:</strong> {previousNurse.signOffTime}</p>
          </div>

          <button
            className="secondary-btn"
            style={{ marginTop: "15px", width: "100%" }}
            onClick={() => setView("current")}
          >
            Back to Current Nurse
          </button>
        </div>
      )}

      {/* ================= SIGN-OFF MODAL ================= */}
      {showSignOff && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Shift Sign-Off</h3>
            <p className="muted">
              Complete your shift handoff with one-click sign-off
            </p>

            <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
              <div className="stat-box">
                <strong>5/6</strong>
                <p className="muted">Patients Reviewed</p>
              </div>
              <div className="stat-box">
                <strong>2</strong>
                <p className="muted">Alerts Acknowledged</p>
              </div>
            </div>

            <div className="warning-box">
              ⚠️ Critical patient still needs review:
              <br />• Margaret Chen (Room 201A)
            </div>

            <div className="summary-box">
              During your shift, multiple high-risk patients were monitored.
              Please ensure follow-up on unresolved alerts.
            </div>

            <textarea
              placeholder="Additional handoff notes (optional)"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() => setShowSignOff(false)}
              >
                Cancel
              </button>
              <button className="primary-btn" disabled>
                Sign Off
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default RightPanel;