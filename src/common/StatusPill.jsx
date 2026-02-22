function StatusPill({ label, type = "default" }) {
  return (
    <span className={`status-pill ${type}`}>
      {label}
    </span>
  );
}

export default StatusPill;