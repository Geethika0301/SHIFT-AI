import RiskBadge from "./RiskBadge";

function PatientCard({ name, room, age, condition, risk }) {
  return (
    <div className={`patient-card ${risk}`}>
      <div className="patient-header">
        <h4>{name}</h4>
        <RiskBadge level={risk} />
      </div>

      <p>Room {room} • {age} yrs</p>
      <p className="condition">{condition}</p>
    </div>
  );
}

export default PatientCard;
