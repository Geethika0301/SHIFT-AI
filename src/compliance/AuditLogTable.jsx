function AuditLogTable() {
  return (
    <div className="audit-card">
      <h3>Audit Log</h3>

      <table className="audit-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Performed By</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shift Signed Off</td>
            <td>Priya (Senior Nurse)</td>
            <td>Feb 14, 2026 • 2:55 PM</td>
          </tr>
          <tr>
            <td>AI Summary Generated</td>
            <td>System</td>
            <td>Feb 14, 2026 • 2:40 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AuditLogTable;