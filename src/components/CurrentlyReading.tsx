interface CurrentlyReadingProps {
  currentWord: string;
  currentSentence: string;
  wordIndex: number;
}

// Implement a component that displays the currently read word and sentence
export const CurrentlyReading = ({ wordIndex, currentWord, currentSentence }: CurrentlyReadingProps) => {
  return (
    <div className="currently-reading">
      {currentSentence?.split(" ").map((word, index) => {
        return <><span
          key={word}
          style={{ backgroundColor: index === wordIndex ? "#FFBF00" : "transparent", padding: 4, borderRadius: 8 }}
        >
          {word}
        </span></>;
      })}
    </div>
  );
};
