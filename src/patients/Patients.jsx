import { useState, useMemo } from "react";

const patientsData = [
  {
    id: 1,
    name: "Robert Williams",
    room: "203B",
    risk: "critical",
    diagnosis: "Acute respiratory distress syndrome (ARDS)",
    vitals: { bp: "140/88", hr: 98, temp: "37.8°", o2: "88%" },
    checked: "Not checked",
    alerts: [
      {
        type: "vital",
        message: "O2 saturation at 88%. Consider increasing oxygen.",
        time: "13:26"
      }
    ]
  },
  {
    id: 2,
    name: "Margaret Chen",
    room: "201A",
    risk: "critical",
    diagnosis: "Post-op cardiac bypass, elevated troponin",
    vitals: { bp: "158/95", hr: 112, temp: "38.2°", o2: "91%" },
    checked: "Not checked",
    alerts: []
  },
  {
    id: 3,
    name: "Susan Martinez",
    room: "205",
    risk: "moderate",
    diagnosis: "Type 2 diabetes with cellulitis",
    vitals: { bp: "132/82", hr: 78, temp: "37.4°", o2: "97%" },
    checked: "Checked 04:00 PM",
    alerts: [
      {
        type: "lab",
        message: "WBC count elevated at 14.2",
        time: "13:26"
      }
    ]
  },
  {
    id: 4,
    name: "James Thompson",
    room: "207A",
    risk: "moderate",
    diagnosis: "CHF exacerbation",
    vitals: { bp: "145/90", hr: 88, temp: "36.9°", o2: "94%" },
    checked: "Checked 02:45 PM",
    alerts: [
      {
        type: "medication",
        message: "Potassium level 3.2 mEq/L",
        time: "13:26"
      }
    ]
  }
];

export default function Patients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notes, setNotes] = useState("");

  /* ================= FILTER LOGIC ================= */
  const filteredPatients = useMemo(() => {
    return patientsData.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.room.toLowerCase().includes(search.toLowerCase());

      const matchFilter = filter === "all" || p.risk === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  /* ================= ALERTS ================= */
  const criticalAlerts = patientsData.flatMap((p) =>
    p.alerts.map((a) => ({
      ...a,
      patient: p.name,
      room: p.room
    }))
  );

  return (
    <>
      {/* SEARCH + FILTER */}
      <div className="patients-toolbar">
        <input
          type="text"
          placeholder="Search patients or rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Patients</option>
          <option value="critical">Critical</option>
          <option value="moderate">Moderate</option>
          <option value="stable">Stable</option>
        </select>
      </div>

      <div className="patients-layout">
        {/* ================= PATIENT CARDS ================= */}
        <div className="patients-grid">
          {filteredPatients.map((p) => (
            <div
              key={p.id}
              className={`patient-card ${p.risk}`}
              onClick={() => {
                setSelectedPatient(p);
                setNotes("");
              }}
            >
              <div className="card-header">
                <div>
                  <h3>{p.name}</h3>
                  <p className="muted">Room {p.room}</p>
                </div>
                <span className={`risk-badge ${p.risk}`}>{p.risk}</span>
              </div>

              <p className="diagnosis">{p.diagnosis}</p>

              <div className="vitals-row">
                <span>BP {p.vitals.bp}</span>
                <span>HR {p.vitals.hr}</span>
                <span>Temp {p.vitals.temp}</span>
                <span>O₂ {p.vitals.o2}</span>
              </div>

              <p className="muted">{p.checked}</p>
            </div>
          ))}
        </div>

        {/* ================= CRITICAL ALERTS PANEL ================= */}
        <aside className="alerts-panel">
          <h3>
            🔔 Critical Alerts
            <span className="alert-count">{criticalAlerts.length}</span>
          </h3>

          {criticalAlerts.map((a, i) => (
            <div key={i} className={`alert-card ${a.type}`}>
              <p className="alert-title">
                {a.patient} <span>Room {a.room}</span>
              </p>
              <p>{a.message}</p>
              <div className="alert-footer">
                <span>{a.time}</span>
                <button className="btn-secondary">Acknowledge</button>
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* ================= MODAL (RESTORED) ================= */}
      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{selectedPatient.name}</h3>
              <span className={`risk-badge ${selectedPatient.risk}`}>
                {selectedPatient.risk}
              </span>
            </div>

            <p className="muted">Room {selectedPatient.room}</p>
            <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>

            <div className="modal-vitals">
              <div>BP {selectedPatient.vitals.bp}</div>
              <div>HR {selectedPatient.vitals.hr}</div>
              <div>Temp {selectedPatient.vitals.temp}</div>
              <div>O₂ {selectedPatient.vitals.o2}</div>
            </div>

            <textarea
              placeholder="Add nursing notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setSelectedPatient(null)}
              >
                Close
              </button>
              <button className="btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}