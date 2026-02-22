function AcknowledgementCheckbox({ label, checked, onChange }) {
  return (
    <label className="ack-row">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

export default AcknowledgementCheckbox;