import { useState } from "react";
import axios from "axios";
import "./styles/argon-design-system-react.css";
import "./App.css";

import formatAiText from "./formatAIText";

function App() {
  const [script, setScript] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const getScriptSummaryAndEntities = async (e) => {
    e.preventDefault();
    if (script.length === 0) {
      return alert("Text Script can not be empty.");
    }
    try {
      setResponseLoading(true);
      const response = await axios.post("/api/v1/summary", script, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      setSummaryData(formatAiText(response.data.text));
      setResponseLoading(false);
      setScript("");
    } catch (error) {
      console.error(error);
      alert("Error generating summary");
    }
  };

  return (
    <div className="app-container">
      <div className="app-contents-container">
        <div className="summarizer-controls">
          <h1 className="text-center">Movie/Tv Script Summarizer</h1>
          <p className="text-center">
            Quickly Read Through movie scripts and find the important points as
            well as the Main characters
          </p>
          <form onSubmit={getScriptSummaryAndEntities}>
            <div className="form-group">
              <textarea
                rows={10}
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="form-control"
                placeholder="paste your script here"
              ></textarea>
            </div>
            <div className="form-group">
              <button
                disabled={responseLoading === true}
                type="submit"
                className="btn btn-default mt-3"
              >
                {responseLoading === false ? "Generate Summary" : "Loading..."}
              </button>
            </div>
          </form>
        </div>
        <div className="summary-output">
          <h2 className="text-center">The Summary.</h2>
          {summaryData !== null && (
            <>
              <p className="summary-header">Summary</p>
              <p className="mb-3 text-summary">{summaryData.summary}</p>

              <p className="summary-header">Actors</p>
              {summaryData.actors.map(
                (actor, index) =>
                  index !== 0 && (
                    <p className="text-summary-item" key={index}>
                      {actor}
                    </p>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
