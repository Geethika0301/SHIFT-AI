function CriticalAlertModal({ onClose }) {
  return (
    <div className="critical-modal-overlay">
      <div className="critical-modal">
        <h2>⚠️ Critical Patient Alert</h2>

        <p>
          A patient is at <strong>high fall risk</strong> with
          missed medications. Immediate review is required.
        </p>

        <button className="danger-btn" onClick={onClose}>
          Acknowledge & Continue
        </button>
      </div>
    </div>
  );
}

export default CriticalAlertModal;