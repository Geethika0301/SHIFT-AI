function AuditStamp() {
  const now = new Date().toLocaleString();

  return (
    <div className="audit-stamp">
      <p><strong>Signed by:</strong> Priya (Senior Nurse)</p>
      <p><strong>Date & Time:</strong> {now}</p>
      <p className="audit-note">
        This handoff is locked after sign-off.
      </p>
    </div>
  );
}

export default AuditStamp;