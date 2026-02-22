function AlertTimeline() {
  return (
    <div className="alert-timeline">
      <h3>Alert History</h3>

      <div className="alert-item critical">
        ⚠️ High fall risk detected — James Anderson
        <span>10:15 AM</span>
      </div>

      <div className="alert-item warning">
        ⏰ No bowel movement in 96 hours — Margaret Thompson
        <span>08:40 AM</span>
      </div>

      <div className="alert-item info">
        💊 Missed insulin dose — Robert Chen
        <span>Yesterday</span>
      </div>
    </div>
  );
}

export default AlertTimeline;