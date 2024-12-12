import { Grading } from "../types/grading";
import InteractiveCanvasOverlay from "./canvas-overlay";

type ScoringOverlayProps = {
  grading: Grading | null;
  onClick: () => void;
};

const ScoringOverlay = ({ grading, onClick }: ScoringOverlayProps) => {
  return (
    <InteractiveCanvasOverlay
      className="rounded-b-xl h-[400px] mt-[100px]"
      isInteractive={!!grading}
      onClick={onClick}
    >
      {grading ? (
        <>
          <h3 className="text-9xl">{grading.grade}</h3>
          <p className="text-2xl text-ai-pink/70">{grading.comment}</p>
          <p className="text-sm text-ai-pink/70">Click to draw again</p>
        </>
      ) : (
        <>
          <p>Analyzing</p>
          <div className="bouncing-loader inline-flex items-center justify-end">
            {Array.from({ length: 3 }).map((_, i) => (
              <i
                key={i}
                className="size-2 mt-4 mx-0.5 rounded-full bg-ai-pink"
                style={{
                  animation:
                    "bouncing-loader 0.6s infinite alternate, background-loader 3s infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </InteractiveCanvasOverlay>
  );
};

export default ScoringOverlay;
