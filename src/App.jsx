import { useState } from "react";
import "./App.css";

import SignIn from "./auth/SignIn";
import Sidebar from "./layout/Sidebar";
import RightPanel from "./layout/RightPanel";

/* Pages */
import Dashboard from "./dashboard/Dashboard";
import NoteEntry from "./notes/NoteEntry";
import Patients from "./patients/Patients";
import Handoff from "./handoff/Handoff";

/* AI */
import AISummaryPanel from "./ai/AISummaryPanel";

/* Alerts */
import ToastNotification from "./alerts/ToastNotification";
import AlertTimeline from "./alerts/AlertTimeline";
import CriticalAlertModal from "./alerts/CriticalAlertModal";

/* Patient */
import PatientDetails from "./patient/PatientDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showToast, setShowToast] = useState(false);
  const [showCriticalModal, setShowCriticalModal] = useState(false);

  /* ================= SIGN IN ================= */
  if (!isLoggedIn) {
    return (
      <SignIn
        onLogin={() => {
          setIsLoggedIn(true);
          setActiveSection("dashboard");
        }}
      />
    );
  }

  /* ================= MAIN APP ================= */
  return (
    <div className="app-wrapper">
      <div className="dashboard-container">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={() => setIsLoggedIn(false)}
        />

        <main className="main-content">
          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <Dashboard
              onNewNote={() => setActiveSection("note")}
              onViewHandoff={() => setActiveSection("handoff")}
            />
          )}

          {/* NOTE ENTRY */}
          {activeSection === "note" && <NoteEntry />}

          {/* PATIENTS */}
          {activeSection === "patients" && <Patients />}

          {/* HANDOFF */}
          {activeSection === "handoff" && (
            <>
              <Handoff />

              <AISummaryPanel
                summary="Mr. Smith had 2 missed medications and high fall risk."
                confidence={84}
              />

              <PatientDetails />

              <button
                className="primary-btn"
                onClick={() => setShowToast(true)}
              >
                Review Critical Alerts
              </button>

              <AlertTimeline />

              {showToast && (
                <ToastNotification
                  message="⚠️ High fall risk detected"
                  onClose={() => {
                    setShowToast(false);
                    setShowCriticalModal(true);
                  }}
                />
              )}

              {showCriticalModal && (
                <CriticalAlertModal
                  onClose={() => setShowCriticalModal(false)}
                />
              )}
            </>
          )}

          {/* INFO PAGES */}
          {activeSection === "home" && (
            <div className="content-card">
              <h2>Home</h2>
              <p>Welcome to the Shift Care Dashboard.</p>
            </div>
          )}

          {activeSection === "about" && (
            <div className="content-card">
              <h2>About</h2>
              <p>This app helps nurses with safe handoff using AI.</p>
            </div>
          )}

          {activeSection === "feedback" && (
            <div className="content-card">
              <h2>Feedback</h2>
              <p>We value your feedback to improve patient safety.</p>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="content-card">
              <h2>Contact</h2>
              <p>Email: support@shiftcare.ai</p>
            </div>
          )}
        </main>

        <RightPanel />
      </div>
    </div>
  );
}

export default App;