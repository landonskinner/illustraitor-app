import { Shape } from "../types/drawing-styles";

const drawRect = ({
  ctx,
  pos,
  prevMouseX,
  prevMouseY,
}: {
  ctx: CanvasRenderingContext2D;
  pos: { x: number; y: number };
  prevMouseX: number;
  prevMouseY: number;
}) => {
  const width = prevMouseX - pos.x;
  const height = prevMouseY - pos.y;
  ctx.fillRect(pos.x, pos.y, width, height);
};

const drawCircle = ({
  ctx,
  pos,
  prevMouseX,
  prevMouseY,
}: {
  ctx: CanvasRenderingContext2D;
  pos: { x: number; y: number };
  prevMouseX: number;
  prevMouseY: number;
}) => {
  ctx.beginPath();
  const radius = Math.sqrt(
    (prevMouseX - pos.x) ** 2 + (prevMouseY - pos.y) ** 2
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  ctx.fill();
};

const drawTriangle = ({
  ctx,
  pos,
  prevMouseX,
  prevMouseY,
}: {
  ctx: CanvasRenderingContext2D;
  pos: { x: number; y: number };
  prevMouseX: number;
  prevMouseY: number;
}) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(pos.x, pos.y);
  ctx.lineTo(prevMouseX * 2 - pos.x, pos.y);
  ctx.closePath();
  ctx.fill();
};

const drawLine = ({
  ctx,
  pos,
  prevMouseX,
  prevMouseY,
}: {
  ctx: CanvasRenderingContext2D;
  pos: { x: number; y: number };
  prevMouseX: number;
  prevMouseY: number;
}) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
};

export const drawShape = (shape: Shape) => {
  return shape
    ? {
        rectangle: drawRect,
        circle: drawCircle,
        triangle: drawTriangle,
        line: drawLine,
      }[shape]
    : null;
};
