const formatAiText = (text) => {
  const summaryIndex = text.indexOf("Summary");
  const actorsIndex = text.indexOf("Actors");

  const summary = text.substring(summaryIndex + 8, actorsIndex).trim();

  const actorsSection = text.substring(actorsIndex).trim();
  const actors = actorsSection
    .split("\n")
    .map((line) => line.replace("-", "").trim())
    .filter((line) => line !== "");

  return {
    summary,
    actors,
  };
};

export default formatAiText;
