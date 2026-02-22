function AIHighlight({ text }) {
  const safeText = text || "";

  const highlights = [
    { word: "missed", className: "risk-critical" },
    { word: "fall risk", className: "risk-critical" },
    { word: "no bowel movement", className: "risk-warning" },
    { word: "drowsy", className: "risk-warning" },
    { word: "25%", className: "risk-warning" }
  ];

  let output = safeText;

  highlights.forEach(({ word, className }) => {
    const regex = new RegExp(word, "gi");
    output = output.replace(
      regex,
      `<span class="${className}">${word}</span>`
    );
  });

  return (
    <p
      className="ai-highlight-text"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}

export default AIHighlight;