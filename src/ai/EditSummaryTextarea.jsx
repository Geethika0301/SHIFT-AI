import { useState } from "react";

function EditSummaryTextarea({ initialText }) {
  const [text, setText] = useState(initialText);
  const [edited, setEdited] = useState(false);

  return (
    <div className="ai-edit-box">
      <label>Edit AI Summary (if needed)</label>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setEdited(true);
        }}
      />

      {edited && (
        <p className="edit-note">
          ✏️ Edited by nurse
        </p>
      )}
    </div>
  );
}

export default EditSummaryTextarea;