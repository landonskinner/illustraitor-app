import { useEffect } from "react";
import InteractiveCanvasOverlay from "./canvas-overlay";

type GameOverOverlayProps = {
  score: number;
  onClick: () => void;
};

const GameOverOverlay = ({ score, onClick }: GameOverOverlayProps) => {
  const isSingular = score === 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const highScore = localStorage.getItem("highScore") || "0";
    if (score > parseInt(highScore)) {
      localStorage.setItem("highScore", score.toString());
    }
  }, [score]);

  return (
    <InteractiveCanvasOverlay
      isInteractive
      onClick={onClick}
      className="rounded-2xl"
    >
      <h3 className="text-5xl">Time&apos;s up!</h3>
      <p className="text-2xl text-ai-pink/70">
        You&apos;ve received {score} passing {"grade" + (isSingular ? "" : "s")}
        !
      </p>
      <p className="text-sm text-ai-pink/70">Click to play again</p>
    </InteractiveCanvasOverlay>
  );
};

export default GameOverOverlay;
