import AIHighlight from "./AIHighlight";
import EditSummaryTextarea from "./EditSummaryTextarea";
import SummaryConfidenceTag from "./SummaryConfidenceTag";

function AISummaryPanel({ summary, confidence }) {
  return (
    <div className="ai-summary-panel">
      <div className="ai-header">
        <h3>AI Shift Summary</h3>
        <SummaryConfidenceTag confidence={confidence} />
      </div>

      <AIHighlight text={summary} />

      <EditSummaryTextarea initialText={summary} />
    </div>
  );
}

export default AISummaryPanel;