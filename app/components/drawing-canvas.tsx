"use client";

import { useEffect, useRef, useState } from "react";
import {
  EASY_PROMPTS,
  HARD_PROMPTS,
  MEDIUM_PROMPTS,
} from "@/app/data/image-prompts";
import {
  drawRect,
  drawCircle,
  drawTriangle,
  drawLine,
} from "../utils/draw-shapes";
import { COLORS, DrawStyle } from "../types/drawing-styles";
import { ArtistPalette } from "@/components/artist-palette";
import { Button } from "@/components/ui/button";
import IntroForm from "./intro-form";
import { Difficulty } from "../types/difficulty";
import { useCountdown } from "../utils/use-countdown";
import InteractiveCanvasOverlay from "./canvas-overlay";
import CanvasWrapper, { CanvasHeader } from "./canvas-wrapper";

const getCanvasContext = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d", { willReadFrequently: true });
  return { canvas, ctx };
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
  const [highScore, setHighScore] = useState(0);
  const { time, toggleTimer, isRunning, resetTimer } = useCountdown(60);
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
        ctx.fillStyle = "#fff";
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
    if (!time && !!score) {
      const highScore = Number(window?.localStorage.getItem("highScore"));
      if (highScore && score > highScore) {
        window?.localStorage.setItem("highScore", String(score));
        setHighScore(score);
      }
    }
  }, [time]);

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const resetGame = () => {
    setGeneration(null);
    clearCanvas();
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  const gameInProgress = showCanvas && !generation && !!time;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString()}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getTouchPos = (canvas: HTMLCanvasElement, touchEvent: TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
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
      ctx.strokeStyle = drawStyle.tool === "eraser" ? "#fff" : drawStyle.color;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else {
      const drawFunction = {
        rectangle: drawRect,
        circle: drawCircle,
        triangle: drawTriangle,
        line: drawLine,
      }[drawStyle.shape];
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
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="m-auto w-full relative">
      <section className="grid grid-rows-[48px_1fr_auto] max-w-[500px] gap-y-4 mx-auto">
        <CanvasHeader>
          {showCanvas ? (
            <>
              <div className="w-fit grid grid-cols-2 gap-x-4">
                {!!highScore && (
                  <>
                    <div>High</div>
                    <div className="font-bold">{highScore}</div>
                  </>
                )}
                <div>Current</div>
                <div className="font-bold">{score}</div>
              </div>
              <div className="text-center text-loading animate-border-loader uppercase font-bold text-3xl text-transparent">
                {prompt}
              </div>
              <div className="text-3xl font-bold text-right">
                {formatTime(time)}
              </div>
            </>
          ) : (
            // <div className="text-center text-3xl font-bold col-span-3">
            //   AI Art Teacher
            // </div>
            <></>
          )}
        </CanvasHeader>
        <CanvasWrapper>
          {showCanvas ? (
            <>
              {(isLoading || !gameInProgress) && !!time && (
                <InteractiveCanvasOverlay
                  isLoading={isLoading}
                  isInteractive={!!generation}
                  onClick={resetGame}
                >
                  {generation ? (
                    <div className="text-center">
                      <div className="text-8xl">{generation.grade}</div>
                      <div className="text-2xl">{generation.comment}</div>
                      <div className="text-2xl">Click to draw again</div>
                    </div>
                  ) : (
                    "Analyzing..."
                  )}
                </InteractiveCanvasOverlay>
              )}
              {!time && (
                <InteractiveCanvasOverlay
                  isLoading={false}
                  isInteractive={true}
                  onClick={() => {
                    resetTimer();
                    resetGame();
                    setScore(0);
                    setShowCanvas(false);
                  }}
                >
                  <div>
                    Time&apos;s up! You&apos;ve received {score} passing grade
                    {score === 1 ? "" : "s"}!
                  </div>
                </InteractiveCanvasOverlay>
              )}
              <canvas
                className="cursor-crosshair w-full h-full"
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
              showFirstStep={!highScore}
              startGame={(difficulty: Difficulty) => {
                setDifficulty(difficulty);
                setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
                setShowCanvas(true);
              }}
            />
          )}
        </CanvasWrapper>

        {gameInProgress && (
          <CanvasHeader>
            <Button
              className="h-full shadow-lg border-loading animate-border-loader"
              id="clear-canvas"
              variant="outline"
              onClick={clearCanvas}
            >
              Clear
            </Button>
            <ArtistPalette drawStyle={drawStyle} setDrawStyle={setDrawStyle} />
            <Button
              className="save-img h-full shadow-lg"
              onClick={async () => {
                if (isRunning) toggleTimer();
                setIsLoading(true);
                const { canvas } = getCanvasContext(canvasRef);
                if (canvas) {
                  await fetch("/api/chat", {
                    method: "POST",
                    body: JSON.stringify({
                      prompt,
                      image: canvas.toDataURL("image/jpeg"),
                    }),
                  }).then((response) => {
                    response.json().then((json) => {
                      setGeneration({
                        grade: json.grade,
                        comment: json.comment,
                      });
                      setIsLoading(false);
                      if (json.grade !== "F") {
                        setScore(score + 1);
                      }
                    });
                  });
                }
              }}
            >
              Submit
            </Button>
          </CanvasHeader>
        )}
      </section>
    </div>
  );
}
