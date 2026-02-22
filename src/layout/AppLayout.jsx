import { useState } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import FooterStatusBar from "./FooterStatusBar";

import ShiftOverview from "../dashboard/ShiftOverview";
import PatientList from "../dashboard/PatientList";
import SignOffChecklist from "../signoff/SignOffChecklist";

import "../styles/layout.css";

function AppLayout({ role, onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <ShiftOverview />;

      case "patients":
        return <PatientList />;

      case "handoff":
        return <SignOffChecklist />;

      default:
        return <ShiftOverview />;
    }
  };

  return (
    <div className="app-shell">
      <TopNav role={role} />

      <div className="app-body">
        <SideNav
          active={activeSection}
          onChange={setActiveSection}
          onLogout={onLogout}
        />

        <main className="app-content">
          {renderContent()}
        </main>
      </div>

      <FooterStatusBar />
    </div>
  );
}

export default AppLayout;
