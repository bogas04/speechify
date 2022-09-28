# Speechify Functional Test

## Goal

- Create an app that calls an api to fetch SSML content and then synthesizes this content into speech and renders a sentence and word UI for the same.

### SSML

- The API returns the content in form of an SSML string. This string will only contain a subset of SSML features: `<speak>`, `<p>`, `<s>`.
- The assignment only requires focus on the `<s>`element which defines the beginning and the end of the sentences.
- To complete this assignment, you must extract all the sentences from the SSML files ignoring everything else that is invalid.

#### Parsing the SSML.

- Your parser implementation should have the same output as below.

```ts
/**
 * input: "<speak><s>This is a sentence.</s><s>This is another sentence</s></speak>",
 * sentences: ['This is a sentence.', 'This is another sentence']
 *
 * input: <speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text</speak>
 * sentences: ['This is a sentence.', 'This is another sentence']
 *
 * input: <speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>
 * sentences: ['This is a sentence.', 'This is another sentence', 'This is a longer piece of content']
 */
```

#### Implementation Checklist: 

- [x] **fetchContent**: Fetch content from the API end point using a GET request.
- [xß] **parseContentIntoSentences**: Parse the fetched content into sentences based on rules described above.
- [x] **useSpeech**: Hook that takes the current set of sentences and plays it using the speechEngine in ``speech.ts``
- [x] **UI**: A ``Controls`` component that allows you to play, pause and fetch new content. A Currently Reading component that displays the currently read sentence and word. 

### An example of a working project.
![Example](example.gif)

