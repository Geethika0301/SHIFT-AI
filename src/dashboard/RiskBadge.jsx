function RiskBadge({ level }) {
  return (
    <span className={`risk-badge ${level}`}>
      {level} risk
    </span>
  );
}

export default RiskBadge;
