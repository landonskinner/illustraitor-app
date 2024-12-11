"use client";

import { useEffect, useRef, useState } from "react";
import {
  EASY_PROMPTS,
  HARD_PROMPTS,
  MEDIUM_PROMPTS,
} from "@/app/data/image-prompts";
import { drawShape } from "../utils/draw-shapes";
import { COLORS, DrawStyle } from "../types/drawing-styles";
import { ArtistPalette } from "@/components/artist-palette";
import IntroForm from "./intro-form";
import { Difficulty } from "../types/difficulty";
import { useCountdown } from "../utils/use-countdown";
import Logo from "./logo";
import { EvaluateDrawing } from "../utils/evaluate-drawing";
import GameOverOverlay from "./game-over-overlay";
import ScoringOverlay from "./scoring-overlay";
import GameHeader from "./game-header";
import { cn } from "@/lib/utils";

enum GameState {
  Finished = "finished",
  Evaluation = "evaluation",
  Active = "active",
  Inactive = "inactive",
}

const getCanvasContext = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d", { willReadFrequently: true });
  return { canvas, ctx };
};

const getTouchPos = (canvas: HTMLCanvasElement, touchEvent: TouchEvent) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top,
  };
};

const getHighScore = () => {
  if (typeof window === "undefined") return 0;
  return Number(window?.localStorage.getItem("highScore")) || 0;
};

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStyle, setDrawStyle] = useState<DrawStyle>({
    tool: "pencil",
    brushWidth: 20,
    color: COLORS[0],
    shape: null,
  });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generation, setGeneration] = useState<{
    grade: string;
    comment: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const { time, toggleTimer, isRunning, resetTimer, formattedTime } =
    useCountdown(60);

  const gameState: GameState = (() => {
    if (!time) {
      return GameState.Finished;
    } else if (isLoading || generation) {
      return GameState.Evaluation;
    } else return showCanvas ? GameState.Active : GameState.Inactive;
  })();

  const prompts =
    {
      easy: EASY_PROMPTS,
      medium: MEDIUM_PROMPTS,
      hard: HARD_PROMPTS,
    }[difficulty] || [];

  useEffect(() => {
    const { canvas, ctx } = getCanvasContext(canvasRef);

    const setCanvasBackground = () => {
      if (ctx && canvas) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setCanvasBackground();
    }
  }, [showCanvas]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (gameState === GameState.Finished) {
      const highScore = getHighScore();
      if (score > highScore) {
        window?.localStorage.setItem("highScore", String(score));
      }
    }
  }, [gameState]);

  const handleMouseUp = () => setIsDrawing(false);

  const resetGame = () => {
    setGeneration(null);
    clearCanvas();
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  const startDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const { canvas, ctx } = getCanvasContext(canvasRef);
    if (ctx && canvas) {
      setIsDrawing(true);
      if (!isRunning) toggleTimer();
      const pos =
        "touches" in e
          ? getTouchPos(canvas, e.nativeEvent)
          : { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
      prevMouseRef.current = { x: pos.x, y: pos.y };
      ctx.beginPath();
      ctx.lineWidth = drawStyle.brushWidth;
      ctx.strokeStyle = drawStyle.color;
      ctx.fillStyle = drawStyle.color;
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  };

  const drawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const { canvas, ctx } = getCanvasContext(canvasRef);
    if (!isDrawing || !ctx || !canvas) return;
    ctx.putImageData(snapshot!, 0, 0);

    const pos =
      "touches" in e
        ? getTouchPos(canvas, e.nativeEvent)
        : { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };

    if (!drawStyle.shape) {
      ctx.strokeStyle = drawStyle.tool === "eraser" ? "white" : drawStyle.color;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else {
      const drawFunction = drawShape(drawStyle.shape);
      if (drawFunction) {
        drawFunction({
          ctx,
          pos,
          prevMouseX: prevMouseRef.current.x,
          prevMouseY: prevMouseRef.current.y,
        });
      }
    }
  };

  const clearCanvas = () => {
    const { canvas, ctx } = getCanvasContext(canvasRef);
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const evaluateDrawing = async () => {
    const { canvas } = getCanvasContext(canvasRef);
    if (isRunning) toggleTimer();
    setIsLoading(true);
    if (canvas) {
      const { grade, comment } = await EvaluateDrawing({ prompt, canvas });
      if (grade && comment) {
        setGeneration({ grade, comment });
        if (grade !== "F") setScore(score + 1);
      } else {
        setGeneration({
          grade: "Oops!",
          comment: "Your teacher is out. Try again later!",
        });
      }
    }
    setIsLoading(false);
  };

  const showHeader =
    gameState === GameState.Active || gameState === GameState.Evaluation;

  return (
    <div className="m-auto w-full h-fit grid gap-y-4 grid-rows-[60px_1fr_60px] max-w-[500px]">
      <Logo className={showCanvas ? "" : "opacity-0"} />
      <div
        className={cn(
          "relative h-[500px] w-full shimmer-border rounded-2xl animate-border-loader shadow-lg shadow-ai-pink/50",
          showHeader ? "thick-border" : "overflow-hidden"
        )}
        style={{
          transitionProperty: "border-top-width",
          transitionDuration: "1500ms",
        }}
      >
        <GameHeader
          showHeader={showHeader}
          prompt={prompt}
          highScore={getHighScore()}
          score={score}
          time={formattedTime}
        />
        <div className="overflow-hidden h-full rounded-b-2xl">
          {showCanvas ? (
            <>
              {gameState === GameState.Evaluation && (
                <ScoringOverlay generation={generation} onClick={resetGame} />
              )}
              {gameState === GameState.Finished && (
                <GameOverOverlay
                  score={score}
                  onClick={() => {
                    resetTimer();
                    resetGame();
                    setScore(0);
                    setShowCanvas(false);
                  }}
                />
              )}
              <canvas
                className="cursor-crosshair w-full"
                height={400}
                ref={canvasRef}
                onTouchStart={startDraw}
                onTouchMove={drawing}
                onTouchEnd={handleMouseUp}
                onMouseDown={startDraw}
                onMouseMove={drawing}
                onMouseUp={handleMouseUp}
              />
            </>
          ) : (
            <IntroForm
              showFirstStep={!getHighScore()}
              startGame={(difficulty: Difficulty) => {
                setDifficulty(difficulty);
                setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
                setShowCanvas(true);
              }}
            />
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-[80px_1fr_80px] sm:grid-cols-[120px_1fr_120px] items-center justify-between">
        {gameState === GameState.Active ? (
          <ArtistPalette
            setDrawStyle={setDrawStyle}
            drawStyle={drawStyle}
            clearCanvas={clearCanvas}
            evaluateDrawing={evaluateDrawing}
          />
        ) : null}
      </div>
    </div>
  );
}
