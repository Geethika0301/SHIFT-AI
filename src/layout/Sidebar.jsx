function Sidebar({ activeSection, setActiveSection, onLogout }) {
  return (
    <div className="sidebar">
      {/* ===== MAIN NAV ===== */}
      <div
        className={`menu ${activeSection === "dashboard" ? "active" : ""}`}
        onClick={() => setActiveSection("dashboard")}
      >
        Dashboard
      </div>

      <div
        className={`menu ${activeSection === "note" ? "active" : ""}`}
        onClick={() => setActiveSection("note")}
      >
        Note Entry
      </div>

      <div
        className={`menu ${activeSection === "patients" ? "active" : ""}`}
        onClick={() => setActiveSection("patients")}
      >
        Patients
      </div>

      <div
        className={`menu ${activeSection === "handoff" ? "active" : ""}`}
        onClick={() => setActiveSection("handoff")}
      >
        Handoff
      </div>

      <hr style={{ margin: "20px 0", opacity: 0.3 }} />

      {/* ===== INFO NAV ===== */}
      <div
        className={`menu ${activeSection === "home" ? "active" : ""}`}
        onClick={() => setActiveSection("home")}
      >
        Home
      </div>

      <div
        className={`menu ${activeSection === "about" ? "active" : ""}`}
        onClick={() => setActiveSection("about")}
      >
        About
      </div>

      <div
        className={`menu ${activeSection === "feedback" ? "active" : ""}`}
        onClick={() => setActiveSection("feedback")}
      >
        Feedback
      </div>

      <div
        className={`menu ${activeSection === "contact" ? "active" : ""}`}
        onClick={() => setActiveSection("contact")}
      >
        Contact
      </div>

      {/* ===== LOGOUT ===== */}
      <div className="menu logout" onClick={onLogout}>
        Logout
      </div>
    </div>
  );
}

export default Sidebar;