import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import {
  fetchContent,
  useContent,
  parseContentIntoSentences,
} from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const { content, isLoading, error, refetch } = useContent();

  const sentences = useMemo(
    () => parseContentIntoSentences(content),
    [content]
  );
  const { wordIndex, currentWord, currentSentence, controls } =
    useSpeech(sentences);

  if (error) {
    return (
      <div className="App">
        <h1>Something went wrong :(</h1>
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="App">
        <h1>Please wait while we load the content...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        <CurrentlyReading
          wordIndex={wordIndex}
          currentWord={currentWord}
          currentSentence={currentSentence}
        />
      </div>

      <p className="sentences-wrapper">
        {sentences.map((s) => (
          <>
            <span
              style={{
                textDecoration: currentSentence === s ? "underline" : "none",
              }}
            >
              {s}
            </span>{" "}
          </>
        ))}
      </p>

      <Controls controls={controls} loadMore={refetch} />

      {true && <div className="developer">
        <h1>Developer Info</h1>
        <hr />
        <h2>Parser Output</h2>
        <pre>
          <code>{JSON.stringify(sentences, null, 2)}</code>
        </pre>

        <h2>Content from server</h2>
        <div
          style={{
            backgroundColor: "#cacaca",
            width: "70%",
            padding: 12,
            borderRadius: 8,
          }}
        >
          {content}
        </div>
      </div>}
    </div>
  );
}

export default App;
