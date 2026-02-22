function SideNav({ active, onChange, onLogout }) {
  return (
    <aside className="side-nav">
      <NavItem
        label="Dashboard"
        active={active === "dashboard"}
        onClick={() => onChange("dashboard")}
      />

      <NavItem
        label="Patients"
        active={active === "patients"}
        onClick={() => onChange("patients")}
      />

      <NavItem
        label="Handoff"
        active={active === "handoff"}
        onClick={() => onChange("handoff")}
      />

      <div className="nav-spacer" />

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}

function NavItem({ label, active, onClick }) {
  return (
    <div
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default SideNav;
