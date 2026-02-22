function ReadOnlySnapshot() {
  return (
    <div className="readonly-snapshot">
      <h3>Final Handoff Summary</h3>

      <p>
        Mr. Smith had 2 missed medications, is at high fall risk,
        and has had no bowel movement in 96 hours. Resident was
        drowsy and consumed less than 25% of meals.
      </p>

      <p className="snapshot-note">
        This summary is locked after sign-off.
      </p>
    </div>
  );
}

export default ReadOnlySnapshot;