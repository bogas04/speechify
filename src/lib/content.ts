import { useState, useEffect } from 'react';

// API
const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/content`

interface APIResponse {
  content: string;
}

const fetchContent = async () => {
  try {
    const response: APIResponse = await fetch(ENDPOINT).then(res => res.json());
    return response.content;
  } catch (err) {
    throw err;
  }
}

const parseContentIntoSentences = (content: string): Array<string> => {
  // '<', 's', 'p', ...
  const exploded = content.trim().split("");


  // to mark if we are in a <s> tag
  let inASentence = false;
  // a buffer to store currently read characters
  let buffer = '';
  // the sentence inside currently read <s>
  let sentence = '';
  // final sentences as parsed (ignoring everything but textContent of <s>)
  const sentences: string[] = [];

  for (let index = 0; index < exploded.length; index++) {
    const character = exploded[index];
    const nextCharacter = exploded[index + 1];

    switch (character) {
      // start of a tag
      case '<': {
        // reset buffer, ignore everything we have parsed so far
        buffer = '';

        // closing tag, for eg: </s>
        if (nextCharacter === '/') {
          // save everything we have in sentence (inner bits of <s></s>)
          sentences.push(sentence);
          // reset sentence
          sentence = '';
          /**
           skip the index to the end of the closing tag
            </sometag>
            ^ we were here
                      ^ we move to here
          
          */
          index = index + exploded.slice(index, -1).indexOf('>') + 1;
          // not in a sentence anymore
          inASentence = false;
        }
        break;
      }
      case '>': {
        // if buffer is <s> then we are in a sentence
        inASentence = buffer === 's';
        // reset the buffer
        buffer = '';
        break;
      }
      default: {
        if (inASentence) {
          sentence += character;
        }
        buffer += character;
      }

    }
  }

  return sentences;
};

function useContent() {
  const [content, setContent] = useState('');
  const [error, setError] = useState<any>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [refetch, setRefetch] = useState(false);
  
  useEffect(() => {
    setStatus('loading');

    fetchContent().then(res => {
      setStatus('success');
      setContent(res);
    }).catch(err => {
      setError(err);
      setStatus('error');
    });
  }, [refetch]);

  return {
    content,
    status,
    isLoading: status === 'loading',
    error,
    refetch: () => setRefetch(x => !x),
  };
}

export { fetchContent, parseContentIntoSentences, useContent };
