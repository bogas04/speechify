import { useCallback, useEffect, useState } from "react";
import { createSpeechEngine, PlayingState, SpeechEngine } from "./speech";


const useSpeech = (sentences: Array<string>) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [playingState, setPlayingState] = useState<PlayingState>();

  useEffect(() => {
    setWordIndex(0);
    setSentenceIndex(0);
  }, [sentences]);

  const engine = createSpeechEngine({
    onBoundary: (e) => {
      console.log(e);
      setWordIndex(w => w + 1);
    },
    onEnd: (e) => {
      setSentenceIndex(s => (s + 1) % sentences.length);
      setWordIndex(0);
    },
    onStateUpdate: (state: PlayingState) => {
      setPlayingState(state);
    }
  })
  /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */

  const currentSentence = sentences[sentenceIndex];
  const currentWord = currentSentence?.trim().split(' ')?.[wordIndex];

  engine.load(sentences[sentenceIndex]);

  return {
    currentSentence,
    currentWord,
    wordIndex,
    sentenceIndex,
    controls: {
      state: playingState,
      play: engine.play,
      pause: engine.pause,
      cancel: engine.cancel,
    }
  }
};

export { useSpeech };
