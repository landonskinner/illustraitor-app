export const drawRect = ({
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

export const drawCircle = ({
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

export const drawTriangle = ({
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

export const drawLine = ({
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
