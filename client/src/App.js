import { useState } from "react";
import axios from "axios";
import "./styles/argon-design-system-react.css";
import "./App.css";

import formatAiText from "./formatAIText";

function App() {
  const [fileData, setFileData] = useState(null);
  const [responseLoading, setResponseLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const getScriptSummaryAndEntities = async (e) => {
    e.preventDefault();
    if (!fileData) {
      return alert("Document File can not be empty.");
    }

    const formData = new FormData();
    formData.append("file", fileData);

    try {
      setResponseLoading(true);
      const response = await axios.post("/api/v1/summary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setSummaryData(formatAiText(response.data.text));
      setResponseLoading(false);
    } catch (error) {
      setResponseLoading(false);
      console.error(error);
      alert("Error generating summary");
    }
  };

  const handleInputChangeEventHandler = (e) => {
    const file = e.target.files[0];
    setFileData(file);
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
              <label htmlFor="file-input">Click to Upload PDF</label>
              <input
                type="file"
                name="file"
                className="form-control form-control-file"
                accept="application/pdf"
                onChange={(e) => handleInputChangeEventHandler(e)}
              />
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
