function BMTracker() {
  return (
    <div className="patient-card">
      <h4>Bowel Movement</h4>

      <p className="bm-alert">
        🚽 No BM in <strong>96 hours</strong>
      </p>

      <p>Last recorded: Feb 10, 2026</p>
    </div>
  );
}

export default BMTracker;