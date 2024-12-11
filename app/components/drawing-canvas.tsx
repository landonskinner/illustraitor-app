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
import { CanvasHeader } from "./canvas-wrapper";
import Logo from "./logo";
import { BadgeCheck, Trash2 } from "lucide-react";

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
    if (!time) {
      const highScore = Number(window?.localStorage.getItem("highScore")) || 0;
      if (score > highScore) {
        window?.localStorage.setItem("highScore", String(score));
        setHighScore(score);
      }
      setPrompt("");
    }
  }, [time]);

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const resetGame = () => {
    setGeneration(null);
    clearCanvas();
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
    <div className="m-auto w-full h-full relative flex">
      <section className="grid basis-[500px] gap-y-4 m-auto grid-rows-[60px_1fr_60px]">
        <Logo className={showCanvas ? "" : "opacity-0"} />
        <div
          className={`relative max-w-[500px] h-[500px] w-full bg-white shimmer-border rounded-2xl animate-border-loader shadow-lg shadow-[#e990fb46] ${
            !!prompt ? "thick-border" : "overflow-hidden"
          }`}
          style={{
            transitionProperty: "border-top-width",
            transitionDuration: "1500ms",
          }}
        >
          <div
            className={`order-last px-4 grid grid-cols-[100px_1fr_100px] gap-x-4 justify-between items-center text-white absolute w-full h-[100px] leading-[100px] left-0 transition-[top_opacity] delay-1000 duration-300 ${
              !!prompt ? "opacity-100 -top-[100px]" : "opacity-0 top-0"
            }`}
          >
            <div className="w-fit h-fit grid grid-cols-[1fr_auto] gap-x-4">
              {!!highScore && (
                <>
                  <div>High</div>
                  <div className="font-bold">{highScore}</div>
                </>
              )}
              <div>Current</div>
              <div className="font-bold">{score}</div>
            </div>
            <div className="font-black text-xl sm:text-4xl uppercase text-center">
              {prompt}
            </div>
            <div className="text-xl sm:text-3xl font-bold text-right">
              {formatTime(time)}
            </div>
          </div>
          <div className="overflow-hidden h-full rounded-b-2xl">
            {showCanvas ? (
              <>
                {(isLoading || !gameInProgress) && !!time && (
                  <InteractiveCanvasOverlay
                    className="rounded-b-xl"
                    isInteractive={!!generation}
                    onClick={() => {
                      if (!!generation) {
                        resetGame();
                        setPrompt(
                          prompts[Math.floor(Math.random() * prompts.length)]
                        );
                      }
                    }}
                  >
                    {generation ? (
                      <div className="text-center space-y-4">
                        <div className="text-9xl">{generation.grade}</div>
                        <div className="text-2xl text-ai-pink/70">
                          {generation.comment}
                        </div>
                        <div className="text-sm text-ai-pink/70">
                          Click to draw again
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        Analyzing
                        <div className="bouncing-loader flex items-center justify-end">
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    )}
                  </InteractiveCanvasOverlay>
                )}
                {!time && (
                  <InteractiveCanvasOverlay
                    isInteractive={true}
                    onClick={() => {
                      resetTimer();
                      resetGame();
                      setScore(0);
                      setShowCanvas(false);
                    }}
                  >
                    <div className="space-y-4">
                      <div className="text-5xl">Time&apos;s up!</div>
                      <div>
                        You&apos;ve received {score} passing grade
                        {score === 1 ? "" : "s"}!
                      </div>
                      <div className="text-sm text-ai-pink/70">
                        Click to play again
                      </div>
                    </div>
                  </InteractiveCanvasOverlay>
                )}
                <canvas
                  className="cursor-crosshair w-full h-[400px]"
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
                  setPrompt(
                    prompts[Math.floor(Math.random() * prompts.length)]
                  );
                  setShowCanvas(true);
                }}
              />
            )}
          </div>
        </div>

        <CanvasHeader>
          {gameInProgress ? (
            <>
              <Button
                className="group aspect-square hover:scale-105 transition-transform w-fit shadow-lg rounded-full shimmer-button backdrop-blur-lg animate-border-loader p-6 [&_svg]:size-6"
                id="clear-canvas"
                variant="outline"
                onClick={clearCanvas}
              >
                <Trash2 className="icon-standby" stroke="currentColor" />
              </Button>
              <ArtistPalette
                drawStyle={drawStyle}
                setDrawStyle={setDrawStyle}
              />
              <Button
                className="aspect-square hover:scale-105 transition-transform justify-self-end w-fit shadow-lg rounded-full shimmer-button backdrop-blur-lg animate-border-loader p-6 [&_svg]:size-6"
                variant="outline"
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
                <BadgeCheck className="icon-standby" stroke="currentColor" />
              </Button>
            </>
          ) : null}
        </CanvasHeader>
      </section>
    </div>
  );
}
