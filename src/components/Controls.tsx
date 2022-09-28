import { PlayingState } from "../lib/speech";

interface ControlsProps {
  controls: { state?: PlayingState; play: VoidFunction; pause: VoidFunction };
  loadMore: VoidFunction;
}
// Implement a component that provides basic UI options such as playing, pausing and loading new content
export const Controls = ({ controls, loadMore }: ControlsProps) => {
  return (
    <div className='controls-wrapper'>
      <button
        disabled={controls.state === "playing"}
        className="controls-button"
        aria-label="Play"
        onClick={() => controls.play()}
      >
        ▶️ Play
      </button>
      <button
        disabled={controls.state === "paused"}
        className="controls-button"
        aria-label="Pause"
        onClick={() => controls.pause()}
      >
        ⏸️ Pause
      </button>
      <button
        className="controls-button"
        aria-label="Load More"
        onClick={() => loadMore()}
      >
        🔄 Load More
      </button>
    </div>
  );
};
