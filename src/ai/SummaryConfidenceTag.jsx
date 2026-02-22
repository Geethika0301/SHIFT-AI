function SummaryConfidenceTag({ confidence }) {
  const level =
    confidence >= 85 ? "high" :
    confidence >= 65 ? "medium" :
    "low";

  return (
    <span className={`ai-confidence ${level}`}>
      AI Confidence: {confidence}%
    </span>
  );
}

export default SummaryConfidenceTag;