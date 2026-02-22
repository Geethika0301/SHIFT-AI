import { useState } from "react";
import AcknowledgementCheckbox from "./AcknowledgementCheckbox";
import SignOfButton from "./SignOfButton";
import AuditStamp from "./AuditStamp";

function SignOffChecklist() {
  const [acks, setAcks] = useState({
    risks: false,
    meds: false,
    bm: false,
    fall: false,
  });

  const allChecked = Object.values(acks).every(Boolean);
  const [signed, setSigned] = useState(false);

  if (signed) {
    return <AuditStamp />;
  }

  return (
    <div className="signoff-card">
      <h3>Shift Sign-Off</h3>
      <p className="signoff-subtitle">
        Confirm all critical items before signing off
      </p>

      <AcknowledgementCheckbox
        label="Reviewed AI-flagged risks"
        checked={acks.risks}
        onChange={(v) => setAcks({ ...acks, risks: v })}
      />

      <AcknowledgementCheckbox
        label="Reviewed medications (missed / due)"
        checked={acks.meds}
        onChange={(v) => setAcks({ ...acks, meds: v })}
      />

      <AcknowledgementCheckbox
        label="Reviewed bowel movement & intake status"
        checked={acks.bm}
        onChange={(v) => setAcks({ ...acks, bm: v })}
      />

      <AcknowledgementCheckbox
        label="Reviewed fall risk & mobility"
        checked={acks.fall}
        onChange={(v) => setAcks({ ...acks, fall: v })}
      />

      <SignOffButton
        disabled={!allChecked}
        onClick={() => setSigned(true)}
      />
    </div>
  );
}

export default SignOffChecklist;