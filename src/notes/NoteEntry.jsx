import { useState } from "react";


function NoteEntry() {
  const [noteText, setNoteText] = useState("");
  const [patient, setPatient] = useState("");
  const [shift, setShift] = useState("");

  const handleSubmit = () => {
    if (!noteText || !patient || !shift) {
      alert("Please complete all fields before submitting.");
      return;
    }

    // Placeholder for backend / AI processing
    console.log({
      patient,
      shift,
      noteText,
    });

    alert("Nursing note saved successfully.");
    setNoteText("");
  };

  return (
    <div className="note-page">
      <h2 className="page-title">Nursing Notes</h2>
      <p className="page-subtitle">
        Enter patient updates for documentation and AI-assisted handoff
      </p>

      <div className="note-layout">
        {/* LEFT: NOTE ENTRY */}
        <div className="note-form-card">
          <div className="note-header">
            <span className="note-icon">📝</span>
            <div>
              <h3>New Nursing Note</h3>
              <p>Document observations, medications, and concerns</p>
            </div>
          </div>

          <div className="note-row">
            <div className="note-field">
              <label>Patient</label>
              <select
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              >
                <option value="">Select patient</option>
                <option>James Anderson</option>
                <option>Margaret Thompson</option>
                <option>Robert Chen</option>
              </select>
            </div>

            <div className="note-field">
              <label>Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="">Select shift</option>
                <option>Day (7am - 3pm)</option>
                <option>Evening (3pm - 11pm)</option>
                <option>Night (11pm - 7am)</option>
              </select>
            </div>
          </div>

          <div className="note-field">
            <label>Nursing Note</label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Example: Patient drowsy, missed evening insulin dose, no bowel movement in 4 days, requires assistance when ambulating..."
            />
          </div>

          <p className="note-helper">
            Tip: Include vitals, medications given or missed, bowel movements,
            mobility status, intake, and mental status.
          </p>

          <button className="primary-btn" onClick={handleSubmit}>
            Save Note
          </button>
        </div>

        {/* RIGHT: GUIDANCE / RECENT */}
        <div className="note-side-panel">
          <div className="note-tips-card">
            <h4>✨ Documentation Tips</h4>
            <ul>
              <li>Use clear, clinical language</li>
              <li>Mention timeframes (e.g., “no BM in 96 hrs”)</li>
              <li>Document missed or delayed medications</li>
              <li>Note fall risk or mobility changes</li>
              <li>Include intake percentages if low</li>
            </ul>
          </div>

          <div className="note-recent-card">
            <h4>Recent Notes</h4>
            <p className="empty-state">No recent notes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteEntry;
